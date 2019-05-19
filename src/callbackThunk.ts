import { DuxAction } from './types';

export const callbackThunk = (func: Function, action: DuxAction) => (dispatch: Function) => {
  if (typeof dispatch === 'function' && typeof func === 'function' && action.type) {
    if (typeof func === 'function') {
      func();
      if (action.type) {
        dispatch(action);
      } else throw new Error('Ramdux: Argument provided to callback thunk was not an action!');
    } else throw new Error('Ramdux: Callback was not a function!');
  } else throw new Error('Ramdux: dispatch was not provided as a function!');
};
