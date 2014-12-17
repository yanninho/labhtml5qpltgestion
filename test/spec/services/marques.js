'use strict';

describe('Service: marques', function () {

  // load the service's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  // instantiate service
  var marques;
  beforeEach(inject(function (_marques_) {
    marques = _marques_;
  }));

  it('should do something', function () {
    expect(!!marques).toBe(true);
  });

});
