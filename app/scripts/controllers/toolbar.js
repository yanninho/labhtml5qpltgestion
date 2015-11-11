'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('ToolbarCtrl', function ($scope,$mdSidenav,$mdUtil, $location, session) {
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
     function closeNav() {
      $mdSidenav('right').close()
        .then(function () {
          
      });      
     }

    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                
              });
          },300);

      return debounceFn;
    }

    $scope.toggleRight = buildToggler('right');

    $scope.session = session;

    $scope.login = function() {
      //closeNav();
      $location.path('/login');
    };

    $scope.logout = function() {
      //closeNav();
      session.clear();
      $location.path('/');
    };

    $scope.signup = function() {
      //closeNav();
      $location.path('/signup');
    };

    $scope.closeNav = function() {
      //closeNav();
    }

    $scope.go = function(path) {
      $location.search('token', null);
      $location.path(path);
    }

  });
