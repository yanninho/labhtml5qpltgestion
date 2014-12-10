'use strict';

/**
 * @ngdoc overview
 * @name quiprendlesticketsGestionApp
 * @description
 * # quiprendlesticketsGestionApp
 *
 * Main module of the application.
 */
angular
  .module('quiprendlesticketsGestionApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.resizeColumns'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/nouveauxCommentaires', {
        templateUrl: 'views/nouveauxcommentaires.html',
        controller: 'NouveauxcommentairesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
