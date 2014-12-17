'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.Session
 * @description
 * # Session
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('Session', function ($resource, ENV) {
    return $resource(ENV.urlBackend + '/auth/session/', {});
  });
