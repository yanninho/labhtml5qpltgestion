'use strict';

/**
 * @ngdoc filter
 * @name quiprendlesticketsGestionApp.filter:ouinon
 * @function
 * @description
 * # ouinon
 * Filter in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .filter('ouinon', function () {
    return function (input, uppercase) {
      var txt = 'non';
      if (input) {
      	txt = 'oui';
      }
      if (uppercase) {
      	txt = txt.toUpperCase();
      }
      return txt;
    };
  });
