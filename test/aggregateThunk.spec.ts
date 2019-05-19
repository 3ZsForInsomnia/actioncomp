import { expect } from 'chai';
import * as sinon from 'sinon';
import { aggregateThunk } from './../src/aggregateThunk';

describe('aggregated thunk', () => {
  let callCount = 0;
  const dispatch = () => this.callCount += 1;
  const isTrue = () => true;
  const isFalse = () => false;
  let list: any[]: [];
  beforeEach(() => {
    this.callCount = 0;
    this.list = [
      { type: 'action1' },
      { type: 'action2' },
      { type: 'action3' },
      { type: 'action4' },
    ];
  });
});
