'use strict';

/**
 * @ngdoc filter
 * @name quiprendlesticketsGestionApp.filter:raisonSignalement
 * @function
 * @description
 * # raisonSignalement
 * Filter in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .filter('raisonSignalement', function () {
    return function (input) {

      var raisons = [];
      raisons["EXISTE_PAS"] = "Ce magasin n'existe peut-être plus.";	
      raisons["FERME"] = "Ce magasin a fermé ses portes";	
      raisons["ADRESSE_INCORRECTE"] = "L'adresse est incorrecte";	

      var raisonTxt = raisons[input];

      if (angular.isUndefined(raisonTxt)) {
      	raisonTxt = "";
      }

      return raisonTxt;
    };
  });
