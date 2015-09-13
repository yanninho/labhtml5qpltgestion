'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('ToolbarCtrl', function ($scope,$mdSidenav,$mdUtil) {
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
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

  });
