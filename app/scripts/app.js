'use strict';

/**
 * @ngdoc overview
 * @name qpltgestion
 * @description
 * # qpltgestion
 *
 * Main module of the application.
 */
angular
  .module('qpltgestion', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'happyRestClient',
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/magasins', {
        templateUrl: 'views/magasins.html',
        controller: 'MagasinsCtrl',
        controllerAs: 'magasins'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
