import { DuxAction } from './types';

export const asyncThunk = (
  httpCall: () => Promise<any>,
  actions: {
    loading?: DuxAction | Function,
    loaded: DuxAction | Function,
    error?: DuxAction | Function,
    ready?: DuxAction | Function,
  },
  responseTransform: Function = (response: any) => response,
  errorTransform: Function = (error: any) => error,
  readinessTimeout: number = 500) => (dispatch: Function) => {
    if (actions.loading) dispatch(actions.loading);
    httpCall()
    .then((response: any) => {
      (response && typeof actions.loaded === 'function')
        ? dispatch(actions.loaded(responseTransform(response)))
        : dispatch({ type: actions.loaded, payload: responseTransform(response) });
    }).catch((error: any) => {
      (error && typeof actions.error === 'function')
        ? dispatch(actions.error(errorTransform(error)))
        : dispatch({ type: actions.error, payload: errorTransform(error) });
    }).finally(() => {
      if (actions.ready) setTimeout(() => dispatch(actions.ready), readinessTimeout);
    });
  };
