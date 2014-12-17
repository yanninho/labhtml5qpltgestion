'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.signalementService
 * @description
 * # signalementService
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('signalementService', function (restService, ENV) {

      var signalements = {
        data: []                  
      }    
    
    var getSignalements = function() {
      if (signalements.data.length == 0) {
              var promiseGetSignalements = restService.getAppel({
                method: 'GET',
                url: ENV.urlBackend + '/signalements' //TODO url avec variables environnements
              });

              promiseGetSignalements.then(function (value) {
                  signalements.data = value.data;                 
              });         
        }   
    }

    return {
        getSignalements: function() {
            getSignalements();
            return signalements;
        },
        desactiverMagasins: function() {
            var promiseDesactiveMagasins = null;
            var selectedMagasins = [];
            signalements.data.forEach(function(signalement){
              var selected = signalement.selected;
              if (selected) {
                selectedMagasins.push(signalement);              
              }
            });

            if (selectedMagasins.length > 0) {
              var promiseUpdateMagasins = restService.getAppel({
                    method: 'POST',
                    url: ENV.urlBackend + '/magasins/activer/non', 
                    data: {signalements : selectedMagasins}
              });

              promiseDesactiveMagasins = promiseUpdateMagasins.then(function (value) {
                signalements.data = [];
                getSignalements();
              });             
            }
            else {
              var deferred = $q.defer();
              deferred.reject('Veuillez sélectionner au moins un magasin à désactiver');
              promiseDesactiveMagasins = deferred.promise;
            }
            return promiseDesactiveMagasins;        
        }
    };
  });
