'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.restService
 * @description
 * # restService
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('restService', function ($q, $http) {

      var promiseStart = $q.when('start');

      return {
        getAppel: function(config) {
          var promiseAppel = promiseStart.then(function () {
            return $http(config).
              success(function(data, status, headers, config) {
                return data;
              }).
              error(function(data, status, headers, config) {
                // TODO ici, il est possible de rediriger les erreurs vers
                // un service de gestion des messages par exemple
                // et dans tous les cas, on renvoie quand meme l'erreur a l'appelant
                return $q.reject();
              });
          });
          return promiseAppel;
        }     
      }

  });
