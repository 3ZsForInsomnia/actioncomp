import { transformer, TransformMap } from './transformer';

export const transformThunk =
  (type: string, transformMap: TransformMap) => (context: any) => (dispatch: Function) =>
    dispatch({ type, payload: transformer(transformMap, context) });
