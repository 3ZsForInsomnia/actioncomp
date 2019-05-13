export const transform = (map: TransformMap, context: any) => {
  const result: any = {};
  const keys = Object.keys(map);
  Object.keys(map).forEach((prop: any, index: number) => {
    if (typeof prop === 'string') result[keys[index]] = prop;
    else if (prop instanceof Array) result[keys[index]] = getValueFromContext(prop, context);
    else if (typeof prop === 'object' && prop.forEach) result[keys[index]] = prop.map((element: any) => transform(element, context));
    else if (typeof prop === 'object' && prop.thunk) result[keys[index]] = handleTemplate(prop, context);
    else if (typeof prop === 'object') result[keys[index]] = transform(prop, context);
    else throw new Error('Transformer: Unknown transform map option provided.');
  });
  return result;
};

export interface TransformMap {
  [key: string]: string | string[] | TransformMap | ForEachTemplate | ThunkifiedTemplate;
}

export interface ForEachTemplate {
  forEach: string;
  element: any;
}

export interface ThunkifiedTemplate {
  thunk: Function;
  context: string[][];
}

const handleTemplate = (thunkTemplate: ThunkifiedTemplate, context: any): string =>
  thunkTemplate.thunk(...thunkTemplate.context.map(prop => getValueFromContext(prop, context)));

const getValueFromContext = (path: string[], context: any): any => {
  const currProp = path[0];
  if (context[currProp]) {
    if (path.length === 1) return context[path[0]];
    if (path.length > 1) return getValueFromContext(path.slice(1), context[currProp]);
  } else return '';
};
