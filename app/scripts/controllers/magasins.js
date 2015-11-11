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
    $scope.rangeNumber = 25;
    $scope.ranges = [25, 50, 75, 100, 150, 200];
  	$scope.loading = true;
    $scope.magasinDirection = 'prev';
  	$scope.marques = null;
    $scope.selectedMarque = null;
    $scope.defilements = [
        {
          'text' : 'Pagination',
          'value' : 'page'
        },
        {
          'text' : 'Infinite-scroll',
          'value' : 'infinite'
        }
    ];
    $scope.selectedDefilement = $scope.defilements[0].value;

    var initConfMagasins = function() {
      $scope.easyConfigMagasins = happyRestService.getEasyConfig();   
      $scope.easyConfigMagasins.url = ENV.urlBackend + '/v2/magasins';
      initRange();
      initFields();
    };

    //range
    var initRange = function() {
      $scope.easyConfigMagasins.range = [];
      $scope.easyConfigMagasins.range.push(0);
      $scope.easyConfigMagasins.range.push($scope.rangeNumber - 1);      
    };
    
    //fields
    var initFields = function() {
      $scope.easyConfigMagasins.fields = [];
      $scope.easyConfigMagasins.fields.push('adresse');
      $scope.easyConfigMagasins.fields.push('marque');
      $scope.easyConfigMagasins.fields.push('location');       
    };

    var getMarques = function() {
      var easyConfigMarques = happyRestService.getEasyConfig();
      easyConfigMarques.url = ENV.urlBackend + '/v2/marques';
      //fields
      easyConfigMarques.fields.push('nom');   
      //sort
      easyConfigMarques.sorts.push('nom');  
      var promiseGet = happyRestService.easyCall(easyConfigMarques);
      promiseGet.then(function(result) {
        $scope.marques = result.data;
      });       
    };

    var getCallbackSuccess = function() {
      var callback = paginationGetMagasinsSuccess;
      if ($scope.selectedDefilement === $scope.defilements[1].value) {
        callback = infiniteGetMagasinsSuccess;
      }
      return callback;
    };

    var paginationGetMagasinsSuccess = function(result) {
          $scope.loading = false;
          $scope.result = result;
    };

    var infiniteGetMagasinsSuccess = function(result) {
          $scope.loading = false;
          var newMagasins = result.data;
          delete result.data;
          for (var attrname in result) { 
            $scope.result[attrname] = result[attrname]; 
          }
          for (var i = 0; i <newMagasins.length; i++) {
            $scope.result.data.push(newMagasins[i]);
          }
    };

    var getMagasins = function(successFunction) {
      $scope.loading = true;
      var promiseGet = happyRestService.easyCall($scope.easyConfigMagasins);
      promiseGet.then(successFunction, function(err) {
        console.log(err);
        $scope.loading = false;
      });      
    };

    $scope.setPage = function(type) {
      if (angular.isDefined($scope.result) && angular.isDefined($scope.result[type])) {
        $scope.easyConfigMagasins.range = $scope.result[type];
        getMagasins(paginationGetMagasinsSuccess);
      }
    };

    var getIndiceFilter = function(name) {
        var indName = -1;
        for (var i = 0; i < $scope.easyConfigMagasins.filters.length; i ++) {
          if ($scope.easyConfigMagasins.filters[i][0] === name) {
            indName = i;
          }
        }
        return indName;    
    };

    $scope.changedMarque = function(marque) {
      var goGet = false;      
      if (marque === null) {
        $scope.selectedMarque = null;
        var indMarque = getIndiceFilter('marque.nom');
        if (indMarque > -1) {
          goGet = true;
          $scope.easyConfigMagasins.filters.splice(indMarque, 1);
        }
      }
      else {
        goGet = true;
        $scope.easyConfigMagasins.filters.push(['marque.nom',[marque]]);
      }
      if (goGet) {
        initRange();      
        getMagasins(getCallbackSuccess());
      }
    };

    $scope.sendSearch = function(search) {
      var goGet = false;
      if (search.length > 2) {
        $scope.easyConfigMagasins.filters.push(['adresse',['*'+search+'*']]);
        goGet = true;
      }    
      else {
        var indAdresse = getIndiceFilter('adresse');
        if (indAdresse > -1) {
          $scope.easyConfigMagasins.filters.splice(indAdresse, 1);
          goGet = true;
        }
      }    
      if (goGet) {
        initRange();
        getMagasins(getCallbackSuccess());         
      }
    };

    $scope.infiniteNextPage = function() {
      if ($scope.selectedDefilement === 'infinite' && $scope.result!== undefined && $scope.result.nextPage !== undefined) {
        $scope.easyConfigMagasins.range = $scope.result.nextPage;
        getMagasins(infiniteGetMagasinsSuccess);
      }
    };

    $scope.changeDefilement = function(defil) {
      $scope.selectedDefilement = defil;
      initRange();
      $scope.result.data = [];
      getMagasins(getCallbackSuccess());
    }; 

    $scope.changeRange = function(range) {
      $scope.rangeNumber = range;
      initRange();
      getMagasins(getCallbackSuccess());
    }; 

    initConfMagasins();
    getMagasins(getCallbackSuccess());
    getMarques();
  });
