import * as listOps from './listHelpers';
import { DuxAction } from './types';

export const addToList = (listPropLocation: string) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.add(state[listPropLocation])(action.payload),
  };
};

export const addAllToList = (listPropLocation: string) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.addAll(state[listPropLocation])(action.payload),
  };
};

export const removeFromList = (listPropLocation: string, propToCheck: string) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.remove<any, any>(propToCheck)(state[listPropLocation])(action.payload),
  };
};

export const removeAllFromList = (listPropLocation: string, propToCheck: string) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.removeAll<any, any>(propToCheck)(state[listPropLocation])(action.payload),
  };
};

export const removeAllFromListByPredicate = (listPropLocation: string, predicate: Function) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.removeAllByPredicate<any>(predicate)(state[listPropLocation])(action.payload),
  };
};

export const updateListItem = (listPropLocation: string, propToCheck: string) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.update<any, any>(propToCheck)(state[listPropLocation])(action.payload),
  };
};

export const updateListItemByPredicate = (listPropLocation: string, predicate: Function) => (state: any, action: DuxAction) => {
  return {
    ...state,
    [listPropLocation]: listOps.updateByPredicate<any>(predicate)(state[listPropLocation])(action.payload),
  };
};
