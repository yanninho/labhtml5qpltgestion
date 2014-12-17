'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.error = {};
    $scope.user = {};

    $scope.login = function(form) {
      Auth.login('password', {
          'email': $scope.user.email,
          'password': $scope.user.password
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          } else {
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.type;
            });
            $scope.error.other = err.message;
          }
      });
    };

  });
