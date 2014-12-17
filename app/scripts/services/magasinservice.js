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

 	var page = 1;
	
	var getData = function(data, page) {
		var res = [];
		for (var i = 0; i < page * 100 && i < data.features.length; ++i) {
			res.push(data.features[i]);
		}
		magasins.data = res;
	};

	var getMagasins = function() {
        var promiseGetCommentaires = restService.getAppel({
            method: 'GET',
            url: ENV.urlBackend + '/magasins',
            params: {filter : filter}
        });

        promiseGetCommentaires.then(function (value) {
            getData(value.data, page);  
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
        }
    };	


  });
