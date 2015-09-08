'use strict';

/**
 * @ngdoc function
 * @name qpltgestion.controller:MagasinsCtrl
 * @description
 * # MagasinsCtrl
 * Controller of the qpltgestion
 */
angular.module('qpltgestion')
  .controller('MagasinsCtrl', function ($scope, happyRestService, ENV) {
    $scope.env = ENV;
    $scope.rangeNumber = 50;
  	$scope.loading = true;
  	var easyConfig = happyRestService.getEasyConfig();
    easyConfig.url = ENV.urlBackend + '/v2/magasins';
    //range
    easyConfig.range.push(0);
    easyConfig.range.push($scope.rangeNumber - 1);
    //fields
    easyConfig.fields.push('adresse');
    easyConfig.fields.push('marque');
  	
    var getMagasins = function() {
      var promiseGet = happyRestService.easyCall(easyConfig);
      promiseGet.then(function(result) {
          $scope.loading = false;
          $scope.result = result;
      });      
    };

    getMagasins();

    $scope.setPage = function(type) {
      if (angular.isDefined($scope.result) && angular.isDefined($scope.result[type])) {
        easyConfig.range = $scope.result[type];
        getMagasins();
      }
    };

  });
