'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.User
 * @description
 * # User
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('User', function ($resource, ENV) {
    return $resource(ENV.urlBackend + '/auth/users/:id/', {},
    {
      'update': {
        method:'PUT'
      }
    });
  });
