export const transformer = (map: TransformMap, context: any) => {
  const result: any = {};
  const keys = Object.keys(map);
  Object.keys(map).forEach((prop: any, index: number) => {
    if (typeof prop === 'string') result[keys[index]] = prop;
    else if (prop instanceof Array) result[keys[index]] = getValueFromContext(prop, context);
    else if (typeof prop === 'object') {
      if (prop.forEach) result[keys[index]] = transformList(prop, context)();
      else if (prop.thunkTemplate) result[keys[index]] = transformTemplate(prop, context);
      else result[keys[index]] = transformer(prop, context);
    }
    else throw new Error('Transformer: Unknown transform map option provided.');
  });
  return result;
};

export interface TransformMap {
  [key: string]: string | string[] | TransformMap | ForEachTemplate | ThunkifiedStringTemplate;
}

export interface ForEachTemplate {
  forEach: string;
  element: any;
}

export interface ThunkifiedStringTemplate {
  thunkTemplate(...args: any[]): string;
  paths: string[][];
}

export const transformTemplate = (thunkTemplate: ThunkifiedStringTemplate, context: any): string =>
  thunkTemplate.thunkTemplate(...thunkTemplate.paths.map(prop => getValueFromContext(prop, context)));

export const getValueFromContext = (path: string[], context: any): any => {
  const currProp = path[0];
  if (context[currProp]) {
    if (path.length === 1) return context[path[0]];
    if (path.length > 1) return getValueFromContext(path.slice(1), context[currProp]);
  } else return '';
};

export const transformList = (list: any[], context: any): any => list.map((element: any): any => transformer(element, context));
