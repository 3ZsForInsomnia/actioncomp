import { expect } from 'chai';
import * as actions from './../src/propOperations';

describe('property actions', () => {
  it('should update the existing property', () => {
    const initialState = {
      a: 'initialValue',
    };
    const postOpState = actions.updateProp('a')(initialState, { type: 'myAction', payload: 'myPayload' });
    expect(postOpState).to.eql({ a: 'myPayload' });
  });

  it('should add the property if not already present', () => {
    const initialState = {};
    const postOpState = actions.updateProp('a')(initialState, { type: 'myAction', payload: 'myPayload' });
    expect(postOpState).to.eql({ a: 'myPayload' });
  });

  it('should remove the property if present and no payload is present', () => {
    const initialState = {
      a: 'initialValue',
      b: 'another value',
    };
    const postOpState = actions.updateProp('a')(initialState, { type: 'myAction' });
    expect(postOpState).to.eql({ b: 'another value' });
  });

  it('should toggle a boolean value property', () => {
    const initialState = {
      a: true,
    };

    const firstToggleState = actions.toggleProp('a')(initialState, { type: 'myAction' });
    expect(firstToggleState).to.eql({ a: false });
    const secondToggleState = actions.toggleProp('a')(firstToggleState, { type: 'myAction' });
    expect(secondToggleState).to.eql({ a: true });
  });
});
