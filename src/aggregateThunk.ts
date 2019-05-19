import { transform, TransformMap } from './transformer';
import { DuxAction } from './types';

export const aggregateThunk =
  (actions: {payload?: TransformMap, type: string}[], context: any) =>
    (dispatch: Function) => actions.forEach(handleAction(context)(dispatch));

const handleAction = (context: any) => (dispatch: Function) => (action: DuxAction) => {
  dispatch({
    type: action.type,
    payload: action.payload ? transform(action.payload, context) : {},
  });
};
