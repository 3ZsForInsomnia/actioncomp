export const conditionalThunk = (predicate: Function, ifTrue: string, payload: any = {}, ifFalse?: string) => {
  return (dispatch: Function, state: Function) => {
    if (predicate(payload, state())) {
      dispatch({ payload, type: ifTrue });
    } else if (ifFalse) {
      dispatch({ payload, type: ifFalse });
    }
  };
};
