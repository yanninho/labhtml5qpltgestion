'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('LoginCtrl', function ($scope, ENV, $routeParams, session) {
  	$scope.env = ENV;
  });
