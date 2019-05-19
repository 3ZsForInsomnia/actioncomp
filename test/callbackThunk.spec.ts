import { expect } from 'chai';
import * as sinon from 'sinon';
import { callbackThunk } from './../src/callbackThunk';

describe('callback thunk', () => {
  it('should run the function param and then dispatch', () => {
    const aSpy = sinon.spy();
    const dispatch = sinon.spy();
    callbackThunk(aSpy, { type: 'myAction' })(dispatch);
    expect(aSpy.called).to.be.true;
    expect(dispatch.called).to.be.true;
  });
});
