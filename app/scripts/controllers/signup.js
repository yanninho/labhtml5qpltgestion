'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('SignupCtrl', function ($scope, $http, $location, ENV, session) {
  	
  	$scope.signup = function() {
  		delete $scope.user.confirmPassword;
  		$http({
  			method : 'PUT',
  			url : ENV.urlBackend + '/v2/user',
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
