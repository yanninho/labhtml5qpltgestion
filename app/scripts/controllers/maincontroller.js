'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:MaincontrollerCtrl
 * @description
 * # MaincontrollerCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('MaincontrollerCtrl', function ($scope, ENV, messageService) {
    $scope.ENV = ENV;
    $scope.message = messageService.getMessage();
  });
