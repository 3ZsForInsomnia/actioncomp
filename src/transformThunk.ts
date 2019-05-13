import { transform, TransformMap } from './transform';

export const transformThunk =
  (type: string, transformMap: TransformMap) => (context: any) => (dispatch: Function) =>
    dispatch({ type, payload: transform(transformMap, context) });
