'use strict';

describe('Directive: mongooseError', function () {

  // load the directive's module
  beforeEach(module('quiprendlesticketsGestionApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mongoose-error></mongoose-error>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mongooseError directive');
  }));
});
