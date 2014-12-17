'use strict';

/**
 * @ngdoc service
 * @name quiprendlesticketsGestionApp.modalites
 * @description
 * # modalites
 * Value in the quiprendlesticketsGestionApp.
 */
var modalites = [];
modalites['Tickets restaurants'] = 'ticketRestaurant';
modalites['Cheques de table'] = 'chequeDeTable';
modalites['Cheques dejeuner'] = 'chequesDejeuner';
modalites['Cheques restaurants'] = 'chequeRestaurant';


angular.module('quiprendlesticketsGestionApp')
  .constant('modalites', modalites);
