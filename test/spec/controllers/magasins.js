'use strict';

describe('Controller: MagasinsCtrl', function () {

  // load the controller's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  var MagasinsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MagasinsCtrl = $controller('MagasinsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
