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
    let result = {};
    const dispatchSpy = (newProps: any) => result = newProps;
    const context = {

    };
    const spy = sinon.spy(dispatchSpy);
    const actions = [
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
      { type: 'myAction' },
    ];
    aggregateThunk(actions, context)(spy);

    const expected = {};
    console.log(result);
    // expect(result).to.eql(expected);
  });
});
