export const add = <T>(list: T[]) => (element: T) => [...list, element];
export const addAll = <T>(list: T[]) => (element: T[]) => [...list, ...element];

export const find = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (value: any): T =>
  list.find(curr => curr[propToCheck] === value);
export const findIndex = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (value: any): number =>
  list.findIndex(curr => curr[propToCheck] === value);
export const findAll = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (value: any): T[] =>
  list.filter(curr => curr[propToCheck] === value);
export const findByPredicate = <T>(predicate: Function) => (list: T[]) => (value: any): T =>
  list.find(curr => predicate(curr, value));
export const findIndexByPredicate = <T>(predicate: Function) => (list: T[]) => (element: T): number =>
  list.findIndex(curr => predicate(curr, element));
export const findAllByPredicate = <T>(predicate: Function) => (list: T[]) => (value: any): T[] =>
  list.filter(curr => predicate(curr, value));

export const sortList = <T>(list: T[]) => list.sort();
export const sortListByProp = <T, K extends keyof T>(propToCheck: K) => (list: T[]) =>
  list.sort((a, b) => {
    if (a[propToCheck] > b[propToCheck]) return 1;
    if (a[propToCheck] === b[propToCheck]) return 0;
    if (a[propToCheck] < b[propToCheck]) return -1;
  });

export const remove = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (value: any) => {
  const index = findIndex<T, K>(propToCheck)(list)(value);
  return [list.slice(0, index), list.slice(index)];
};
export const removeAll = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (value: any) =>
  list.filter(curr => curr[propToCheck] !== value);
export const removeAllByPredicate = <T>(predicate: Function) => (list: T[]) => (value: any) =>
  list.filter(curr => !predicate(curr, value));

export const update = <T, K extends keyof T>(propToCheck: K) => (list: T[]) => (newElement: T) => {
  const index = findIndex<T, K>(propToCheck)(list)(newElement[propToCheck]);
  return [list.slice(0, index), newElement, list.slice(index)];
};
export const updateByPredicate = <T>(predicate: Function) => (list: T[]) => (newElement: T) => {
  const index = findIndexByPredicate<T>(predicate)(list)(newElement);
  return [list.slice(0, index), newElement, list.slice(index)];
};
