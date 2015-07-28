'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('NavCtrl', function ($scope, $location, Auth) {
  	

    $scope.logout = function() {
      $scope.menuactif = false;	
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
