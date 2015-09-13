'use strict';

/**
 * @ngdoc service
 * @name qpltgestion.loginInterceptor
 * @description
 * # loginInterceptor
 * Factory in the qpltgestion.
 */
angular.module('qpltgestion')
  .factory('loginInterceptor', function ($q, $rootScope, session, $injector) {
  return {  
      // optional method
      'request': function(config) {
        // do something on success
        if (session.getToken() !== null) {
          config.headers.Authorization = 'Bearer ' + session.getToken();
        }        
        return config;
      },

      // optional method
     'requestError': function(rejection) {
        // do something on error
        
        return $q.reject(rejection);
      },

      // optional method
      'response': function(response) {
        console.log('====================')
        var route = $injector.get('$route')
        console.log(route.current.params);
        console.log('====================')
        // do something on success
        if (angular.isDefined(route.current.params.token)) {
          $rootScope.$emit('loggedSuccess');
        }
        return response;
      },

      // optional method
     'responseError': function(response) {
        console.log('intercept responseError')
        // do something on error
        if (response.status === 401) {
          $rootScope.$emit('loginRequired');
        }        
        return $q.reject(response);
      }
    };
  });
