export const transform = (map: TransformMap, context: any) => {
  const result: any = {};
  const keys = Object.keys(map);
  Object.keys(map).forEach((prop: any, index: number) => {
    if (typeof prop === 'string') result[keys[index]] = prop;
    else if (prop instanceof Array) result[keys[index]] = getValueFromContext(prop, context);
    else if (typeof prop === 'object') {
      if (prop.forEach) result[keys[index]] = transformList(prop.forEach, getValueFromContext(prop.listInContext, context), context);
      else if (prop.thunkTemplate) result[keys[index]] = transformTemplate(prop, context);
      else result[keys[index]] = transform(prop, context);
    } else if (typeof prop === 'function') result[keys[index]] = prop(context);
    throw new Error('Transformer: Unknown transform map option provided.');
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
