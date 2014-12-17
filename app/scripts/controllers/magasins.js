'use strict';

/**
 * @ngdoc function
 * @name quiprendlesticketsGestionApp.controller:MagasinsCtrl
 * @description
 * # MagasinsCtrl
 * Controller of the quiprendlesticketsGestionApp
 */
angular.module('quiprendlesticketsGestionApp')
  .controller('MagasinsCtrl', function ($scope, magasinService, marques) {
    
  	$scope.magasins = magasinService.getMagasins();
  	$scope.magasins.infiniteScrollPercentage = 15;
    $scope.magasins.multiSelect = true;
    $scope.magasins.enableFiltering = true;
    $scope.magasins.useExternalFiltering = true;
    $scope.magasins.columnDefs = [
		{name: 'adresse', displayName: 'Adresse', field: 'properties.adresse'},		
        {name: 'carte', displayName: 'Carte', enableFiltering: false , enableSorting: false, cellTemplate:  '<div class="ui-grid-cell-contents cell-adresse"><img ng-src="https://maps.googleapis.com/maps/api/staticmap?center=46.52863469527167,2.43896484375&zoom=4&size=200x200&markers=color:red%7Clabel:%7C{{row.entity.geometry.coordinates[1]}},{{row.entity.geometry.coordinates[0]}}" lazy-src></div>'},    
        {name: 'Marque', enableSorting: false,
            cellClass : 
            function(grid, row, col, rowRenderIndex, colRenderIndex) {                
            	return marques[row.entity.properties.marque.nom]+' marque';
            }
        },
        {name: 'Localisation (latitude, longitude)',enableFiltering: false, enableSorting: false, field: 'geometry.coordinates'},
        {name: 'Activé sur la carte', field: 'properties.actif', cellFilter: 'ouinon',enableFiltering: false, enableSorting: false},
        {name: 'Nombre de commentaires', field: 'properties.commentaires.length',enableFiltering: false, enableSorting: false} 

    ];
    $scope.magasins.rowHeight = 200;	    	

  	$scope.magasins.onRegisterApi = function(gridApi){
  		$scope.gridApi = gridApi;
		// infinte load
		$scope.gridApi.infiniteScroll.on.needLoadMoreData($scope,function(){
			var promiseGetMoreMagasins = magasinService.getMoreMagasins();
			promiseGetMoreMagasins.then(
				function(data) {
					gridApi.infiniteScroll.dataLoaded();
				},
				function(raison){
					gridApi.infiniteScroll.dataLoaded();
				}
			);
		});

		// server filter
		$scope.gridApi.core.on.filterChanged( $scope, function() {
			var grid = this.grid;
			var filterAdresse = grid.columns[1].filters[0].term;
			if (angular.isUndefined(filterAdresse) || filterAdresse == null) {
				filterAdresse = '';
			}
			var filterMarque = grid.columns[3].filters[0].term;
			if (angular.isUndefined(filterMarque) || filterMarque == null) {
				filterMarque = '';
			}			
			var filter = {
				adresse : filterAdresse,
				marque : filterMarque 
			};
		
			magasinService.setFilter(filter);
			magasinService.getMoreMagasins();
		});

	};
});
