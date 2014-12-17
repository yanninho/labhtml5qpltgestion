'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:SignalementsCtrl
 * @description
 * # SignalementsCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('SignalementsCtrl', function ($scope, signalementService, marques, messageService) {
    $scope.signalements = signalementService.getSignalements();
	$scope.signalements.multiSelect = true;
    $scope.signalements.enableSorting = false;
    $scope.signalements.columnDefs = [
        {name: 'Date', field: 'date', type: 'date', cellFilter: 'date:"dd-MM-yyyy"'},
        {name: 'Raison', field: 'erreur', cellFilter: 'raisonSignalement'},
        {name: 'Explication', field: 'explication', cellClass: 'cellLongText'},
        {name: 'Adresse', field: 'magasin.adresse'},
        {name: 'carte', displayName: 'Carte', cellTemplate:  '<div class="ui-grid-cell-contents cell-adresse"><img ng-src="https://maps.googleapis.com/maps/api/staticmap?center=46.52863469527167,2.43896484375&zoom=4&size=200x200&markers=color:red%7Clabel:%7C{{row.entity.magasin.location[1]}},{{row.entity.magasin.location[0]}}" lazy-src></div>'},    
        {name: 'Marque', cellClass : 
            function(grid, row, col, rowRenderIndex, colRenderIndex) {                
            	return marques[row.entity.magasin.marque.nom]+' marque';
            }
        },    
        {name: 'Activé sur la carte', field: 'magasin.actif', cellFilter: 'ouinon'}    
    ];
    $scope.signalements.rowHeight = 200;

    var setSelected = function(entity) {
		if (angular.isUndefined(entity.selected)) {
			entity.selected = true;
		}
		else {
			entity.selected = !entity.selected;
		}    	
    };

	 $scope.signalements.onRegisterApi = function(gridApi){
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

	$scope.desactiverMagasins = function() {
		var promiseDesactiveMagasins = signalementService.desactiverMagasins();
			promiseDesactiveMagasins.then(
			function(data) {
				messageService.setMessage({
					texte : 'Les magasins ont été désactivés avec succès', 
					type: 'message-valid', 
					icon: null
				});
			},
			function(raison){
				messageService.setMessage({
					texte : 'Erreur lors de la tentative de désactivation des magasins : ' + raison, 
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
