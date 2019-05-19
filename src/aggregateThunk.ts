import { transformer, TransformMap } from './transformer';
import { DuxAction } from './types';

export const aggregateThunk =
  actions: {payload?: TransformMap, type: string}[], context: any) =>
    (dispatch: Function) => actions.forEach(handleAction(dispatch)(context));

const handleAction = (dispatch: Function) => (context: any) => (action: DuxAction) => {
  dispatch({
    type: action.type,
    payload: action.payload ? transformer(action.payload, context) : {},
  });
};
