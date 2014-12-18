'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.magasins
 * @description
 * # magasins
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('magasinService', function (ENV, restService) {
    
    var magasins = {
    	data: []               
    }    

    var filter = {
        adresse : '',
        marque : ''
    }

    var sorts = {};

 	var page = 1;
    var limit = 100;
	
	var getMagasins = function() {
        var promiseGetCommentaires = restService.getAppel({
            method: 'GET',
            url: ENV.urlBackend + '/magasins',
            params: {filter : filter, limit : page*100, sorts : sorts}
        });

        promiseGetCommentaires.then(function (value) {
            magasins.data = value.data.features;
            ++page;               
        });  
        return promiseGetCommentaires;		
	}


    return {
        getMagasins: function() {
            getMagasins();
            return magasins;
        },
        getMoreMagasins: function() {
        	return getMagasins();
        },
        setFilter: function(filterParams) {
            filter = filterParams;
            page=1;
        },
        setSort: function(sortParams) {
          sorts = sortParams;
          page=1;  
        }
    };	

  });
