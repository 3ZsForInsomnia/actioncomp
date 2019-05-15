import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  ForEachTemplate,
  getValueFromContext,
  ThunkifiedStringTemplate,
  transform,
  transformList,
  TransformMap,
  transformTemplate,
} from './../src/transformer';

describe('get a value from a context by path', () => {
  it('should find the value if present at the expected location', () => {
    const path = ['a', 'b', 0, 'c'];
    const context = {
      a: {
        b: [
          {
            c: 'value',
          },
          {
            c: 'fakeValue',
          },
        ],
        d: {
          e: 'anotherFake',
        },
      },
      f: {
        g: 'fakefake',
      },
    };
    const expected = 'value';
    const actual = getValueFromContext(path, context);
    expect(actual).to.equal(expected);
  });

  it('should return an empty string if the expected location does not exist', () => {
    const path = ['a', 'b', 5, 'c'];
    const context = {
      a: {
        b: [
          {
            c: 'value',
          },
          {
            c: 'fakeValue',
          },
        ],
        d: {
          e: 'anotherFake',
        },
      },
      f: {
        g: 'fakefake',
      },
    };
    const expected = '';
    const actual = getValueFromContext(path, context);
    expect(actual).to.equal(expected);
  });

  it('should be able to return false as a value', () => {
    const path = ['a', 'b', 0, 'c'];
    const context = {
      a: {
        b: [
          {
            c: false,
          },
          {
            c: 'fakeValue',
          },
        ],
        d: {
          e: 'anotherFake',
        },
      },
      f: {
        g: 'fakefake',
      },
    };
    const expected = false;
    const actual = getValueFromContext(path, context);
    expect(actual).to.equal(expected);
  });
});

describe('create a list from the given context', () => {
  it('should create a new list by transforming an existing one', () => {
    const context = {
      listToTransform: [
        {
          name: 'dudeguy',
          address: {
            street: 'its a street',
            city: 'some city',
          },
          id: 12345,
        },
        {
          name: 'second dude',
          address: {
            street: 'its a street 2',
            city: 'second city',
          },
          id: 12346,
        },
        {
          name: 'last dude',
          address: {
            street: 'its a street 3',
            city: 'last city',
          },
          id: 12347,
        },
      ],
    };
    const config = {
      forEach: {
        name: ['element', 'name'],
        address: {
          street: ['element', 'address', 'street'],
          city: ['element', 'address', 'city'],
        },
        role: 'member',
      },
      listInContext: ['listToTransform'],
    };
    const expected = [
      {
        name: 'dudeguy',
        address: {
          street: 'its a street',
          city: 'some city',
        },
        role: 'member',
      },
      {
        name: 'second dude',
        address: {
          street: 'its a street 2',
          city: 'second city',
        },
        role: 'member',
      },
      {
        name: 'last dude',
        address: {
          street: 'its a street 3',
          city: 'last city',
        },
        role: 'member',
      },
    ];
    const actual = transformList(config.forEach, context.listToTransform, context);
    expect(actual).to.eql(expected);
  });
});

describe('create a string from the given context', () => {
  it('should create a string using data pulled from the given context', () => {
    const context = {
      a: {
        name: 'dude',
        address: {
          street: 'strrrrr',
        },
      },
      b: {
        email: 'guy@a.com',
      },
    };
    const config = {
      paths: [['a', 'name'], ['b', 'email'], ['a', 'address', 'street']],
      thunkTemplate: (...args: any[]) => `Name: ${args[0]}, email: ${args[1]}, address: ${args[2]}`,
    };
    const expected = 'Name: dude, email: guy@a.com, address: strrrrr';
    const actual = transformTemplate(config, context);
    expect(actual).to.equal(expected);
  });
});

describe('create a custom prop by passing in a function', () => {
  it('should set the prop to whatever the function returns', () => {
    const map = {
      customVal: (data: any) => data.myValue,
    };
    const context = {
      myValue: 'derp',
    };
    const actual = transform(map, context);
    const expected = { customVal: 'derp' };
    expect(actual).to.eql(expected);
  });

  it('should not swallow errors from custom code', () => {
    const map = {
      customVal: (data: any) => { throw new Error('bad code'); },
    };
    const context = { myValue: 'derp' };
    expect(() => transform(map, context)).to.throw();
  });
});

describe('create an object from the given context', () => {
  it('should use the value provided if it is a plain string', () => {
    const map = { value: 'const value' };
    const expected = { value: 'const value' };
    const actual = transform(map, {});
    expect(actual).to.eql(expected);
  });

  it('should create a new object according to the provided map', () => {
    const map = {
      const: 'const value',
      getThis: ['nested', 'value'],
    };
    const context = {
      nested: {
        value: 'abc',
      },
    };
    const expected = {
      const: 'const value',
      getThis: 'abc',
    };
    const actual = transform(map, context);
    expect(actual).to.eql(expected);
  });
});

describe('create a recursively defined object from the given context', () => {
  it('should create a new object according to the provided map', () => {
    const map = {
      address: {
        street: ['userData', 'address', 'street'],
        city: ['userData', 'address', 'city'],
      },
    };
    const context = {
      userData: {
        address: {
          street: 'some street',
          city: 'some city',
        },
      },
    };
    const expected = {
      address: {
        street: 'some street',
        city: 'some city',
      },
    };
    const actual = transform(map, context);
    expect(actual).to.eql(expected);
  });
});

describe('transformer is able to use helper methods properly', () => {

});
