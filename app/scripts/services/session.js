'use strict';

/**
 * @ngdoc service
 * @name qpltgestion.session
 * @description
 * # session
 * Factory in the qpltgestion.
 */
angular.module('qpltgestion')
  .factory('session', function (localStorageService) {

    return {
      getToken: function() {
        return localStorageService.get('token');
      },
      setToken: function (newToken) {
        localStorageService.set('token',newToken);
      },
      getUser: function() {
        return localStorageService.get('user');
      },
      setUser: function(newUser) {
        localStorageService.set('user',newUser);
      }
    };
  });
