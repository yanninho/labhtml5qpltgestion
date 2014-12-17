'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.commentaireService
 * @description
 * # commentaireService
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('commentaireService', function ($q, restService, ENV) {
  
      var commentaires = {
        data: []               
      }    
    
    var getCommentaires = function() {
      if (commentaires.data.length == 0) {
              var promiseGetCommentaires = restService.getAppel({
                method: 'GET',
                url: ENV.urlBackend + '/commentaires'
              });

              promiseGetCommentaires.then(function (value) {
                  commentaires.data = value.data;                 
              });         
        }   
    }

    return {
        getCommentaires: function() {
            getCommentaires();
            return commentaires;
        },
        activeCommentaires: function() {
          var promiseActiveCommentaires = null;
          var selectedCommentaires = [];
          commentaires.data.forEach(function(commentaire){
            var selected = commentaire.selected;
            if (selected) {
              selectedCommentaires.push(commentaire);              
            }
          });

          if (selectedCommentaires.length > 0) {
            var promiseUpdateCommentaires = restService.getAppel({
                  method: 'POST',
                  url: ENV.urlBackend + '/magasins/commentaires', 
                  data: {commentaires : selectedCommentaires}
            });

            promiseActiveCommentaires = promiseUpdateCommentaires.then(function (value) {
              commentaires.data = [];
              getCommentaires();
            });             
          }
          else {
            var deferred = $q.defer();
            deferred.reject('Veuillez sélectionner au moins un commentaire à valider');
            promiseActiveCommentaires = deferred.promise;
          }
          return promiseActiveCommentaires;
        }
    };
  });
