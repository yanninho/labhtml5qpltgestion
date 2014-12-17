'use strict';

/**
 * @ngdoc directive
 * @name quiprendlesticketsGestionApp.directive:mongooseError
 * @description
 * # mongooseError
 */
angular.module('quiprendlesticketsGestionApp')
  .directive('mongooseError', function () {
	   return {
	      restrict: 'A',
	      require: 'ngModel',
	      link: function(scope, element, attrs, ngModel) {
	        element.on('keydown', function() {
	          return ngModel.$setValidity('mongoose', true);
	        });
	      }
	    };
  });
