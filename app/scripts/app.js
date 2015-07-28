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
    'ui.grid.resizeColumns',
    'ui.grid.infiniteScroll',
    'config',
    'http-auth-interceptor',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $routeProvider
      .when('/magasins', {
        templateUrl: 'views/magasins.html',
        controller: 'MagasinsCtrl'
      })    
      .when('/nouveauxCommentaires', {
        templateUrl: 'views/nouveauxcommentaires.html',
        controller: 'NouveauxcommentairesCtrl'
      })
      .when('/signalements', {
        templateUrl: 'views/signalements.html',
        controller: 'SignalementsCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  })
  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )
      if (!currentUser && (['/login', '/logout', '/signup'].indexOf($location.path()) === -1)) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });  
