import { expect } from 'chai';
import * as sinon from 'sinon';
import { aggregateThunk } from '../src/aggregateThunk';

describe('aggregate thunk', () => {
  it('should call the dispatch spy for each action listed', () => {
    const dispatchSpy = sinon.spy();
    const actions = [
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
    ];
    aggregateThunk(actions, {})(dispatchSpy);
    expect(dispatchSpy.callCount).to.equal(actions.length);
  });

  it('should transform the payload for each action accordingly', () => {
    let actual = {};
    const dispatchSpy = (newProps: any) => {
      actual = {
        ...actual,
        ...newProps.payload,
      };
    };
    const context = {
      firstName: 'dude',
      lastName: 'guy',
      userData: {
        id: 1,
        address: {
          street: 'place',
        },
      },
      results: {
        dudes: [
          {
            firstName: 'dude1',
            lastName: 'guy1',
            age: 25,
            id: 2,
          },
          {
            firstName: 'dude2',
            lastName: 'guy2',
            age: 26,
            id: 3,
          },
          {
            firstName: 'dude3',
            lastName: 'guy3',
            age: 27,
            id: 4,
          },
        ],
      },
    };
    const spy = sinon.spy(dispatchSpy);
    const actions = [
      { type: 'myAction', payload: {
        myConst: 'its a const!',
      }},
      { type: 'myAction', payload: {
        myString: {
          paths: [['firstName'], ['lastName']],
          thunkTemplate: (...args: any[]) => `name: ${args[0]} ${args[1]}`,
        },
      }},
      { type: 'myAction', payload: {
        valueGet: ['userData', 'address', 'street'],
      }},
      { type: 'myAction', payload: {
        nestedGet: {
          myConst: 'const2',
          dudeHasName: ['firstName'],
        },
      }},
      { type: 'myAction', payload: {
        dudes: {
          forEach: {
            name: {
              paths: [['element', 'firstName'], ['element', 'lastName']],
              thunkTemplate: (...args: any[]) => `name: ${args[0]} ${args[1]}`,
            },
            age: ['element', 'age'],
          },
          listInContext: ['results', 'dudes'],
        },
      }},
    ];
    aggregateThunk(actions, context)(spy);

    const expected = {
      myConst: 'its a const!',
      myString: 'name: dude guy',
      valueGet: 'place',
      nestedGet: {
        myConst: 'const2',
        dudeHasName: 'dude',
      },
      dudes: [
        {
          name: 'name: dude1 guy1',
          age: 25,
        },
        {
          name: 'name: dude2 guy2',
          age: 26,
        },
        {
          name: 'name: dude3 guy3',
          age: 27,
        },
      ],
    };
    expect(actual).to.eql(expected);
  });
});
