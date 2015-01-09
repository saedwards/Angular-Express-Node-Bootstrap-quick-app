'use strict';

var app = angular.module('filmActorSearch', ['ngRoute', 'services'])
	.constant("moviesDBAPIKey", "3b346f117a4f4fc787e8d7e4eeb73cd5")
	.config(["personSearchProvider", "moviesDBAPIKey", function (personSearchProvider, moviesDBAPIKey) {

		personSearchProvider.setKey(moviesDBAPIKey);

	}])
	.config(["moviesWithCastProvider", "moviesDBAPIKey", function (moviesWithCastProvider, moviesDBAPIKey) {

		moviesWithCastProvider.setKey(moviesDBAPIKey);

	}])
	.config(["movieDBConfigProvider", "moviesDBAPIKey", function (movieDBConfigProvider, moviesDBAPIKey) {

		movieDBConfigProvider.setKey(moviesDBAPIKey);

	}]);


/**
 * Routes
 */
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../views/SearchFilms.html',
				controller: 'SearchFilms'
			}).
			/*when('/showOrders', {
				templateUrl: 'templates/show-orders.html',
				controller: 'ShowOrdersController'
			}).*/
			otherwise({
				redirectTo: '/'
			});
	}]);