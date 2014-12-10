'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:NouveauxcommentairesCtrl
 * @description
 * # NouveauxcommentairesCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('NouveauxcommentairesCtrl', function ($scope,commentaireService) {
    $scope.commentaires = commentaireService.getCommentaires();

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
		commentaireService.activeCommentaires();
	}

  });
