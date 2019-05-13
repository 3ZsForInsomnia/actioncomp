import { DuxAction } from './types';

export const callbackThunk = (func: Function, action: DuxAction) => (dispatch: Function) => {
  func();
  dispatch(action);
};
