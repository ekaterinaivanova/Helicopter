import sinon from 'sinon';
import { expect } from 'chai';
import Helicopter from '../../models/Helicopter';
import {
  listItems,
  selectItems,
  filterItems,
  populateItems,
  readItem,
  createItem,
  validateFields,
  updateItem,
  paginateList
} from '../../controllers/crud.controller';

describe('core', () => {
  beforeEach(() => {
    sinon.stub(Helicopter, 'find');
  });

  afterEach(() => {
    // Helicopter.find.restore();
  });

  it('List items should call Model find method', () => {
    const Model = {
      find: sinon.stub()
    };
    listItems(Model);
    expect();
  });
});
