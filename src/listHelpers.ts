/**
 * Adds an item to the list
 * @param list to be added to
 * @param item to be added
 */
export function addToList<T>(list: T[], item: T) {
  return [...list, item];
}

/**
 * Returns the list with the item added at the specified location
 * @param list to be added to
 * @param item to be added
 * @param index in the list where `item` will be added
 */
export function addToListAtIndex<T>(list: T[], item: T, index: number) {
  if (index >= 0 && index < list.length) {
    const tempArray = list;
    tempArray.splice(index, 0, item);
    return tempArray;
  }
}

/**
 * Adds the given item to the front of the list
 * @param list to be added to
 * @param item to add
 */
export function addToStartOfList<T>(list: T[], item: T) {
  return addToListAtIndex(list, item, 0);
}

/**
 * Removes the element at the specified index from the list
 * @param list to remove the element from
 * @param index of the element to remove
 */
export function removeFromListAtIndex<T>(list: T[], index: number) {
  if (index >= 0 && index < list.length) {
    const tempArray = list;
    tempArray.splice(index, 1);
    return tempArray;
  }
}

/**
 * Removes items from the list for which the predicate returns true
 * @param list to be updated
 * @param predicate to run on all elements of the list
 * @param item optional item to compare elements to, passed to the predicate as a second argument
 */
export function removeFromListByPredicate<T>(list: T[], predicate: Function, item?: T) {
  return list.filter(element => {
    return !predicate(element, item);
  });
}

/**
 * Adds all items to the end of the list
 * @param list to be added to
 * @param items to add to the list
 */
export function addAllToList<T>(list: T[], items: T[]) {
  return [...list, ...items];
}

/**
 * Returns a new list with items that satisfy the predicate overwriting properties of the element they matched
 * @param list to be updated
 * @param predicate that takes an element in the list and the item, and returns true if they match
 * @param item to update in the list
 *
 * Note that this works best with typed Arrays. Array<any> with multiple types for elements could have
 * unpredictable results, so be cautious using for such arrays.
 */
export function updateObjectInList<T extends Object>(list: T[], predicate: Function | number, item: T) {
  return item instanceof Object ? list.map((element, index) => {
    return typeof predicate === 'function'
      ? predicate(element, item) ? Object.assign({}, element, item) : element
      : index === predicate ? Object.assign({}, element, item) : element;
  }) : list.map((element, index) => {
    return typeof predicate === 'function'
      ? predicate(element, item) ? item : element
      : index === predicate ? item : element;
  });
}

/**
 * Returns the first item in the list for which the checked property matches the given value
 * @param list to search
 * @param propToCheck for each element
 * @param propValue to compare with at the given prop
 *
 * Should be updated to use the existing equality checker
 */
export function findItemByProperty<T>(list: T[], propToCheck: string, propValue: any) {
  return list.find((element: any) => {
    return element[propToCheck] === propValue;
  });
}

/**
 * Returns all elements for which the checked prop matches the given value
 * @param list to search
 * @param propToCheck for each element
 * @param propValue to compare with at the given prop
 *
 * Should be updated to use the existing equality checker
 */
export function findAllItemsByProperty<T>(list: T[], propToCheck: string, propValue: any) {
  return list.filter((element: any) => {
    return element[propToCheck] === propValue;
  });
}

/**
 * Returns the index for the first element for which the checked prop matches the given value
 * @param list to search
 * @param propToCheck for each element
 * @param propValue to compare with at the given prop
 */
export function getIndexOfItem<T>(list: T[], propToCheck: string, propValue: any) {
  return list.findIndex((element: any) => {
    return element[propToCheck] === propValue;
  });
}

/**
 * Collection of immutable list operations. All methods here return a *new* list.
 */
