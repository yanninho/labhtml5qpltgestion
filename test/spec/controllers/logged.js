'use strict';

describe('Controller: LoggedCtrl', function () {

  // load the controller's module
  beforeEach(module('qpltgestion'));

  var LoggedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoggedCtrl = $controller('LoggedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoggedCtrl.awesomeThings.length).toBe(3);
  });
});
