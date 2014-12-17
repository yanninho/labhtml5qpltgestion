'use strict';

describe('Service: modalites', function () {

  // load the service's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  // instantiate service
  var modalites;
  beforeEach(inject(function (_modalites_) {
    modalites = _modalites_;
  }));

  it('should do something', function () {
    expect(!!modalites).toBe(true);
  });

});
