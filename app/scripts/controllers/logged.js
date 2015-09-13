'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:LoggedCtrl
 * @description
 * # LoggedCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('LoggedCtrl', function ($scope, $route, $location, ENV, $http, session) {
  		var token = $route.current.params.token;
  		if (angular.isUndefined(token) && session.getToken() === null) {
  			$location.path('/login');
  		}
  		else {
  			if (session.getToken() === null || session.getToken() !== token) {
	  			session.setToken(token);
				$http.get(ENV.urlBackend + '/v2/user/' + token).
				then(
					function(response) {
						if (response.status === 404) {
							$location.path('/login');
						}
						session.setUser(response.data);
				    	$scope.session = session;
				}, function(response) {
						console.log(response);
				});
	  		} 
	  		else {
	  			$scope.session = session;
	  		}
  		}
  });
