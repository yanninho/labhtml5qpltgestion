'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('LoginCtrl', function ($scope, $http, $location, ENV, session) {
  	$scope.env = ENV;
  	$scope.login = function() {
  		$http({
  			method : 'POST',
  			url : ENV.urlBackend + '/v2/auth/local/login',
  			data : $scope.user
  		}).then(
  		   function(responseSuccess) {
  		   	var user = responseSuccess.data;
  		   	session.setToken(user.token);
  		   	session.setUser(user);
  		   	$location.path('/logged');
  		}, function(responseError) {

  		});
  	};
  });
