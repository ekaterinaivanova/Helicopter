import { expect } from 'chai';
import Helicopter from '../models/Helicopter';
describe('Helicopter', () => {
  it('should be invalid if name is empty', function(done) {
    var m = new Helicopter();

    m.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
