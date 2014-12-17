'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:NouveauxcommentairesCtrl
 * @description
 * # NouveauxcommentairesCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('NouveauxcommentairesCtrl', function ($scope,commentaireService, modalites, messageService) {
    $scope.commentaires = commentaireService.getCommentaires();
    $scope.commentaires.multiSelect = true;
    $scope.commentaires.enableSorting = false;
    $scope.commentaires.columnDefs = [
		{name: 'Date', field: 'date', type: 'date', cellFilter: 'date:"dd-MM-yyyy"'},
        {name: 'Modalité', cellClass:
            function(grid, row, col, rowRenderIndex, colRenderIndex) {                
         	   return modalites[row.entity.modalite.nom];
            }
        },
        {name: 'Texte', field: 'texte'}    
    ];
    $scope.commentaires.rowHeight = 60;   

    var setSelected = function(entity) {
		if (angular.isUndefined(entity.selected)) {
			entity.selected = true;
		}
		else {
			entity.selected = !entity.selected;
		}    	
    };

	 $scope.commentaires.onRegisterApi = function(gridApi){
		//set gridApi on scope
		$scope.gridApi = gridApi;
		gridApi.selection.on.rowSelectionChanged($scope,function(row){
			setSelected(row.entity);		
		});
	 
		gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		  rows.forEach(function(row){
		    setSelected(row.entity);
		  });			
			
		});
	};

	$scope.activeCommentaires = function() {
		var promiseActiveCommentaires = commentaireService.activeCommentaires();
			promiseActiveCommentaires.then(
			function(data) {
				messageService.setMessage({
					texte : 'Les commentaires ont été activés avec succès', 
					type: 'message-valid', 
					icon: null
				});
			},
			function(raison){
				messageService.setMessage({
					texte : 'Erreur lors de la tentative pour l\'activation des commentaires : ' + raison, 
					type: 'message-error', 
					icon: null
				});	
			},
			function(text){
				messageService.setMessage({
					texte: text , 
					type: null, 
					icon: null
				});	
			});
	}

  });
