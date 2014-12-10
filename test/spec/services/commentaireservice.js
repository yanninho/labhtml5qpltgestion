'use strict';

describe('Service: commentaireService', function () {

  // load the service's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  // instantiate service
  var commentaireService;
  beforeEach(inject(function (_commentaireService_) {
    commentaireService = _commentaireService_;
  }));

  it('should do something', function () {
    expect(!!commentaireService).toBe(true);
  });

});
