'use strict';

describe('Service: magasins', function () {

  // load the service's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  // instantiate service
  var magasins;
  beforeEach(inject(function (_magasins_) {
    magasins = _magasins_;
  }));

  it('should do something', function () {
    expect(!!magasins).toBe(true);
  });

});
