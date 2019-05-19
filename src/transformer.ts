export const transform = (map: TransformMap, context: any) => {
  const result: any = {};
  const keys = Object.keys(map);
  keys.forEach((prop: any, index: number) => {
    if (typeof map[prop] === 'string') result[keys[index]] = map[prop];
    else if (typeof map[prop] === 'object' && (map[prop] as (string|number)[]).length) {
      result[keys[index]] = getValueFromContext(map[prop] as (string|number)[], context);
    } else if (typeof map[prop] === 'object') {
      if ((map[prop] as ForEachTemplate).forEach) {
        result[keys[index]] = transformList(
          (map[prop] as ForEachTemplate).forEach,
          getValueFromContext((map[prop] as ForEachTemplate).listInContext, context),
          context,
        );
      } else if ((map[prop] as ThunkifiedStringTemplate).thunkTemplate) {
        result[keys[index]] = transformTemplate((map[prop] as ThunkifiedStringTemplate), context);
      } else result[keys[index]] = transform(map[prop] as TransformMap, context);
    } else if (typeof map[prop] === 'function') result[keys[index]] = (map[prop] as Function)(context);
    else throw new Error('Transformer: Unknown transform map option provided.');
  });
  return result;
};

export interface TransformMap {
  [key: string]: string | (string|number)[] | Function | TransformMap | ForEachTemplate | ThunkifiedStringTemplate;
}

export interface ForEachTemplate {
  forEach: TransformMap;
  listInContext: (string|number)[];
}

export interface ThunkifiedStringTemplate {
  paths: string[][];
  thunkTemplate(...args: any[]): string;
}

export const transformTemplate = (thunkTemplate: ThunkifiedStringTemplate, context: any): string =>
  thunkTemplate.thunkTemplate(...thunkTemplate.paths.map(prop => getValueFromContext(prop, context)));

export const getValueFromContext = (path: (string|number)[], context: any): any => {
  const currProp = path[0];
  if (context[currProp] || context[currProp] === false) {
    if (path.length === 1) return context[currProp];
    if (path.length > 1) return getValueFromContext(path.slice(1), context[currProp]);
  } else return '';
};

export const transformList = (map: TransformMap, list: any[], context: any): any =>
  list.map((element: any): any => transform(map, { element, ...context }));
