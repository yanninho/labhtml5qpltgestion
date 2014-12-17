'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.messageService
 * @description
 * # messageService
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('messageService', function ($timeout) {
      var data = {
        message : {}
      }

      return {
        
        getMessage: function() {
          return data;
        },
        setMessage: function(nouveauMessage) {
          data.message = nouveauMessage;
            $timeout(function() {              
              data.message = {};
            }, 5000);
        }
      }    
  });
