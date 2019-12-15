import sinon from 'sinon';
import { expect } from 'chai';
import Helicopter from '../../models/Helicopter';
import { core } from '../../controllers/crud.controller';

const { fetchItem, list, read, create, deleteItem, update } = core(
  'Helicopter'
);
describe('core', () => {
  beforeEach(() => {
    sinon.stub(Helicopter, 'find');
  });

  afterEach(() => {
    // Helicopter.find.restore();
  });

  it('Should return all helicopters', () => {
    const req = {
      query: {}
    };
    const status = sinon.stub();
    const json = sinon.spy();
    const res = {
      json,
      status
    };
    status.returns(res);
    const hA = {
      name: 'Test a',
      year: 1988,
      isAvailable: true
    };
    const hB = {
      name: 'Test b',
      year: 1988,
      isAvailable: false
    };
    const expectedHelicopters = [hA, hB];
    // const mockFindOne = {
    //   find() {
    //     return this
    //   },
    //   where() {
    //     return this;
    //   },
    //   populate() {
    //     return this;
    //   },
    //   select() {
    //     return this;
    //   },
    //   exec(callback) {
    //     callback(null, expectedHelicopters);
    //   }
    // };
    // sinon.stub(mongoose.Model, "findOne").returns(mockFindOne);

    Helicopter.find = sinon.stub().returns(expectedHelicopters);
    Helicopter.populate = sinon.stub().returns(expectedHelicopters);
    Helicopter.select = sinon.stub().returns(expectedHelicopters);
    list(req, res);
    expect(Helicopter.find.called).to.be.true;
    res.json.calledWith();
    console.log('res.json.calledWith(expectedHelicopters)', res.json);
    // expect(res.json.calledWith(expectedHelicopters)).to.be.true;
    // sinon.assert.calledWith(res.json, expectedHelicopters);
  });
});
