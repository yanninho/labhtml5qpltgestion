'use strict';

/**
 * @ngdoc directive
 * @name quiprendlesticketsGestionApp.directive:uniqueUsername
 * @description
 * # uniqueUsername
 */
angular.module('quiprendlesticketsGestionApp')
  .directive('uniqueUsername', function ($http, ENV) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
			function validate(value) {
				if(!value) {
					ngModel.$setValidity('unique', true);
					return;
				}
				$http.get(ENV.urlBackend + '/auth/check_username/' + value).success(function(user) {
					if(!user.exists) {
						ngModel.$setValidity('unique', true);
					} else {
						ngModel.$setValidity('unique', false);
					}
				});
			}
			scope.$watch( function() {
				return ngModel.$viewValue;
			}, validate);
		}
	};
  });
