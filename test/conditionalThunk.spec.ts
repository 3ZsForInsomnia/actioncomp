import { expect } from 'chai';
import * as sinon from 'sinon';
import { conditionalThunk } from './../src/conditionalThunk';

describe('conditional thunk', () => {
  it('should run the predicate function and then dispatch if it returns true', () => {
    const dispatch = sinon.spy();
    const spyOnPredicate = sinon.spy(() => true);
    conditionalThunk(spyOnPredicate, 'myAction')(dispatch, () => {});
    expect(spyOnPredicate.called).to.be.true;
    expect(dispatch.called).to.be.true;
  });
  it('should run the predicate function and then not dispatch if it returns false', () => {
    const dispatch = sinon.spy();
    const spyOnPredicate = sinon.spy(() => false);
    conditionalThunk(spyOnPredicate, 'myAction')(dispatch, () => {});
    expect(spyOnPredicate.called).to.be.true;
    expect(dispatch.called).to.be.false;
  });
});
