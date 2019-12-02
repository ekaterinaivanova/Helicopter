import { expect } from 'chai';
import HelicopterClass from '../models/HelicopterClass';

describe('Helicopter', () => {
  it('should be valid if all required fields are present', done => {
    const helicopterClass = new HelicopterClass({
      name: 'Test',
      level: 'A'
    });
    helicopterClass.validate(err => {
      expect(err).to.not.exist;
      done();
    });
  });
  it('should be invalid if name is empty', done => {
    const helicopterClass = new HelicopterClass();
    helicopterClass.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if level is empty', done => {
    const helicopterClass = new HelicopterClass();
    helicopterClass.validate(err => {
      expect(err.errors.level).to.exist;
      done();
    });
  });
  it('should be invalid if level value is not valid value', done => {
    const helicopterClass = new HelicopterClass({
      name: 'Test',
      level: 45
    });
    helicopterClass.validate(err => {
      expect(err.errors.level).to.exist;
      done();
    });
  });
});
