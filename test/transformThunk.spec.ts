import { expect } from 'chai';
import { transformThunk } from './../src/transformThunk';

describe('transform thunk', () => {
  it('should dispatch an action whose payload is the result of transforming values', () => {
    const action = {
      type: 'myAction',
      transformMap: {
        muhStringz: {
          paths: [['firstName'], ['lastName']],
          thunkTemplate: (...args: any[]) => `name: ${args[0]} ${args[1]}`,
        },
        role: 'member',
        details: {
          age: ['userData', 'age'],
          address: {
            street: ['userData', 'address', 'street'],
            city: ['userData', 'address', 'city'],
          },
        },
      },
    };
    const context = {
      firstName: 'dude',
      lastName: 'guy',
      email: 'itsmyemail',
      userData: {
        age: 37,
        address: {
          street: 'place',
          city: 'derp',
          state: 'md',
        },
      },
    };
    const dispatch = (result: any) => result;
    const actual = transformThunk(action.type, action.transformMap)(context)(dispatch);
    const expected = {
      muhStringz: 'name: dude guy',
      role: 'member',
      details: {
        age: 37,
        address: {
          street: 'place',
          city: 'derp',
        },
      },
    };
    expect(actual.payload).to.eql(expected);
  });
});
