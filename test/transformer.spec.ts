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

describe('create a custom prop by passing in a function', () => {});

describe('create an object from the given context', () => {});

describe('create a recursively defined object from the given context', () => {});
