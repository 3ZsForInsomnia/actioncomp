import { expect } from 'chai';
import * as listOps from './../src/listHelpers';

interface User {
  name: string;
  age: number;
  id: number;
}

describe('list operations', () => {
  let initialList: User[];
  beforeEach(() => {
    initialList = [
      {
        name: 'barb',
        age: 35,
        id: 100,
      },
      {
        name: 'gav',
        age: 34,
        id: 101,
      },
      {
        name: 'burnie',
        age: 33,
        id: 102,
      },
      {
        name: 'michael',
        age: 32,
        id: 103,
      },
      {
        name: 'geoff',
        age: 31,
        id: 104,
      },
    ];
  });

  describe('adding', () => {
    describe('add', () => {
      it('should add an item to the list', () => {
        const itemToAdd: User = {
          name: 'joe',
          age: 37,
          id: 3,
        };
        const actual = listOps.add<User>(initialList)(itemToAdd);
        expect(actual).to.contain(itemToAdd);
        expect(actual.length).to.equal(initialList.length + 1);
        expect(actual.find(elem => elem.name === 'geoff')).to.exist;
      });
    });

    describe('addAll', () => {
      it('should add all provided items to the list', () => {
        const itemsToAdd: User[] = [
          {
            name: 'joe',
            age: 37,
            id: 3,
          },
          {
            name: 'sephina',
            age: 33,
            id: 4,
          },
        ];
        const actual = listOps.addAll<User>(initialList)(itemsToAdd);
        expect(actual).to.contain(itemsToAdd[1]);
        expect(actual.length).to.equal(initialList.length + itemsToAdd.length);
        expect(actual.find(elem => elem.name === 'geoff')).to.exist;
      });
    });
  });

  describe('finding', () => {
    describe('find', () => {
      it('should find an existing element whose property matches the given value', () => {
        expect(listOps.find<User, keyof User>('name')(initialList)('geoff')).to.exist;
      });

      it('should return null when the searched element is not in the list', () => {
        expect(listOps.find<User, keyof User>('name')(initialList)('ray')).to.not.exist;
      });
    });

    describe('findIndex', () => {
      it('should return the index of an existing element when present in the list', () => {
        expect(listOps.findIndex<User, keyof User>('name')(initialList)('geoff')).to.equal(4);
      });

      it('should return -1 when the searched element is not in the list', () => {
        expect(listOps.findIndex<User, keyof User>('name')(initialList)('ray')).to.equal(-1);
      });
    });

    describe('findAll', () => {
      it('should return an array of all the elements whose checked prop matches the value', () => {
        expect(listOps.findAll<User, keyof User>('name')(initialList)('geoff')).to.eql([{ name: 'geoff', age: 31, id: 104 }]);
      });
    });

    describe('findAllByPredicate', () => {
      it('should return all items that return true for a predicate', () => {
        expect(
          listOps.findAllByPredicate<User>((element: User, targetValue: number) => element.age === targetValue)(initialList)(31),
        ).to.eql([{ name: 'geoff', age: 31, id: 104 }]);
      });
    });

    describe('findByPredicate', () => {
      it('should return the first item that returns true for a predicate', () => {
        expect(
          listOps.findByPredicate<User>((element: User, targetValue: number) => element.age === targetValue)(initialList)(31),
        ).to.eql({ name: 'geoff', age: 31, id: 104 });
      });
    });

    describe('findByPredicate', () => {
      it('should return the first item that returns true for a predicate', () => {
        expect(
          listOps.findIndexByPredicate<User>((element: User, targetValue: number) => element.age === targetValue)(initialList)(31),
        ).to.equal(4);
      });
    });
  });

  describe('sorting', () => {
    describe('sortByProp', () => {
      it('should return the natural sort of the list according to the selected property', () => {
        const expected = [
          {
            name: 'geoff',
            age: 31,
            id: 104,
          },
          {
            name: 'michael',
            age: 32,
            id: 103,
          },
          {
            name: 'burnie',
            age: 33,
            id: 102,
          },
          {
            name: 'gav',
            age: 34,
            id: 101,
          },
          {
            name: 'barb',
            age: 35,
            id: 100,
          },
        ];
        expect(listOps.sortListByProp<User, keyof User>('age')(initialList)).to.eql(expected);
      });
    });
  });

  describe('removing', () => {
    describe('remove', () => {
      it('should remove an item from the list whose selected prop has the given value', () => {
        const actual = listOps.remove<User, keyof User>('name')(initialList)('geoff');
        const expected = [
          {
            name: 'barb',
            age: 35,
            id: 100,
          },
          {
            name: 'gav',
            age: 34,
            id: 101,
          },
          {
            name: 'burnie',
            age: 33,
            id: 102,
          },
          {
            name: 'michael',
            age: 32,
            id: 103,
          },
        ];
        expect(actual.length).to.equal(expected.length);
        expect(actual).to.not.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
        expect(initialList.length).to.equal(5);
        expect(initialList).to.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
      });
    });

    describe('removeAll', () => {
      it('should remove all items from the list whose selected prop has the given value', () => {
        const actual = listOps.removeAll<User, keyof User>('name')(initialList)('geoff');
        const expected = [
          {
            name: 'barb',
            age: 35,
            id: 100,
          },
          {
            name: 'gav',
            age: 34,
            id: 101,
          },
          {
            name: 'burnie',
            age: 33,
            id: 102,
          },
          {
            name: 'michael',
            age: 32,
            id: 103,
          },
        ];
        expect(actual.length).to.equal(expected.length);
        expect(actual).to.not.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
        expect(initialList.length).to.equal(5);
        expect(initialList).to.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
      });
    });

    describe('removeAllByPredicate', () => {
      it('should remove all items from the list with the given predicate', () => {
        const actual = listOps.removeAllByPredicate<User>((element: User, value: string) => element.name !== value)(initialList)('geoff');
        const expected = [
          {
            name: 'barb',
            age: 35,
            id: 100,
          },
          {
            name: 'gav',
            age: 34,
            id: 101,
          },
          {
            name: 'burnie',
            age: 33,
            id: 102,
          },
          {
            name: 'michael',
            age: 32,
            id: 103,
          },
        ];
        expect(actual.length).to.equal(expected.length);
        expect(actual).to.not.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
        expect(initialList.length).to.equal(5);
        expect(initialList).to.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
      });
    });
  });

  describe('updating', () => {
    describe('update', () => {
      it('should update the first element whose selected property matches the given value', () => {
        const actual = listOps.update<User, keyof User>('name')(initialList)({
          name: 'geoff',
          age: 41,
          id: 104,
        });
        expect(actual).to.deep.include({
          name: 'geoff',
          age: 41,
          id: 104,
        });
        expect(initialList).to.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
        expect(actual.length).to.equal(initialList.length);
      });
    });

    describe('updateByPredicate', () => {
      it('should update the first element that the predicate returns true for', () => {
        const actual = listOps.updateByPredicate<User>((element: User, newUser: User) => element.id === newUser.id)(initialList)({
          name: 'geoff',
          age: 41,
          id: 104,
        });
        expect(actual).to.deep.include({
          name: 'geoff',
          age: 41,
          id: 104,
        });
        expect(initialList).to.deep.include({
          name: 'geoff',
          age: 31,
          id: 104,
        });
        expect(actual.length).to.equal(initialList.length);
      });
    });
  });
});
