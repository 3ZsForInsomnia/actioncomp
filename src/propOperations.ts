import { DuxAction } from './types';

export const updateProp = (propToUpdate: string) => (state: any, action: DuxAction) => {
  return action.payload
    ? { ...state, [propToUpdate]: action.payload }
    : removeProp(propToUpdate)(state, action);
};

export const addProp = updateProp;

export const removeProp = (propToRemove: string) => (state: any, action: DuxAction) => {
  const newState: any = {};
  Object.keys(state).forEach(key => {
    if (key !== propToRemove) {
      newState[key] = state[key];
    }
  });
  return newState;
};

export const toggleProp = (propToToggle: string) => (state: any, action: DuxAction) => {
  if (typeof state.propToToggle === 'boolean') {
    return {
      ...state,
      [propToToggle]: !state[propToToggle],
    };
  }
  throw new Error(`Ramdux: Attempted to toggle a non-boolean prop: ${propToToggle}`);
};
