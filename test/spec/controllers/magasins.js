'use strict';

describe('Controller: MagasinsCtrl', function () {

  // load the controller's module
  beforeEach(module('qpltgestion'));

  var MagasinsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MagasinsCtrl = $controller('MagasinsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MagasinsCtrl.awesomeThings.length).toBe(3);
  });
});
