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
    'config',
    'ngMaterial',
    'LocalStorageModule',
    'infinite-scroll'
  ])
  .config(function ($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('qpltgestion')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('loginInterceptor');
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logged', {
        templateUrl: 'views/logged.html',
        controller: 'LoggedCtrl',
        controllerAs: 'logged'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location) {
    $rootScope.$on('loginRequired', function() {
        $location.path('/login');
    });
    $rootScope.$on('loggedSuccess', function() {
        $location.path('/logged');
    });
  });
