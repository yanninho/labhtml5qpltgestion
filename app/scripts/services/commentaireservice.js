'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.commentaireService
 * @description
 * # commentaireService
 * Factory in the quiprendlesticketsGestionApp.
 */
angular.module('quiprendlesticketsGestionApp')
  .factory('commentaireService', function (restService) {
  
      var commentaires = {
        data: [],
          multiSelect: true,
          enableSorting: false,
          columnDefs: [
            {name: 'Date', field: 'date', type: 'date', cellFilter: 'date:"dd-MM-yyyy"'},
            {name: 'Modalité', field: 'modalite.nom'},
            {name: 'Texte', field: 'texte'}    
          ]                  
      }    
    
    var getCommentaires = function() {
      if (commentaires.data.length == 0) {
              var promiseGetCommentaires = restService.getAppel({
                method: 'GET',
                url: 'http://172.17.0.12:9000/commentaires' //TODO url avec variables environnements
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
          var selectedCommentaires = [];
          commentaires.data.forEach(function(commentaire){
            var selected = commentaire.selected;
            if (selected) {
              selectedCommentaires.push(commentaire);
              console.log(commentaire.modalite.nom + ' pour le magasin ' + commentaire._id + ', texte: ' + commentaire.texte);
            }
          });

          if (selectedCommentaires.length > 0) {
            var promiseUpdateCommentaires = restService.getAppel({
                  method: 'POST',
                  url: 'http://172.17.0.12:9000/magasins/commentaires', //TODO url avec variables environnements
                  data: {commentaires : selectedCommentaires}
            });

            promiseUpdateCommentaires.then(function (value) {
              commentaires.data = [];
              getCommentaires();
            });             
          }
        }
    };
  });
