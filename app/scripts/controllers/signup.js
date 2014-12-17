'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.register = function(form) {
      Auth.createUser({
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
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
          }
        }
      );
    };

  });
