import { expect } from 'chai';
import Helicopter from '../../models/Helicopter';

describe('Helicopter', () => {
  it('should be valid if all required fields are present', done => {
    const helicopter = new Helicopter({
      name: 'Test',
      year: 2017,
      isAvailable: true
    });

    helicopter.validate(err => {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should be invalid if name is empty', done => {
    const helicopter = new Helicopter();
    helicopter.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if year is less than 1988', done => {
    const helicopter = new Helicopter({
      name: 'Test',
      year: 1977,
      isAvailable: true
    });

    helicopter.validate(err => {
      expect(err.errors.year).to.exist;
      done();
    });
  });
  it('should be invalid if year is after current year', done => {
    const helicopter = new Helicopter({
      name: 'Test',
      year: new Date().getFullYear() + 1,
      isAvailable: true
    });
    helicopter.validate(err => {
      expect(err.errors.year).to.exist;
      done();
    });
  });
  it('should be invalid if isAvailable flag is missing', done => {
    const helicopter = new Helicopter({
      name: 'Test',
      year: 2019
    });
    helicopter.validate(err => {
      expect(err.errors.isAvailable).to.exist;
      done();
    });
  });
});
