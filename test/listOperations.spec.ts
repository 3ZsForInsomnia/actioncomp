import { expect } from 'chai';
import * as listOps from './../src/listHelpers';

interface User {
  name: string;
  age: number;
  id: number;
}

describe('list operations', () => {
  let initialList: User[] = [];
  beforeEach(() => {
    initialList = [];
  });

  it('should add an item to the list', () => {
    const itemToAdd: User = {
      name: 'joe',
      age: 37,
      id: 3,
    };
    listOps.add<User>(initialList)(itemToAdd);
  });
});
