'use strict';

var app = angular.module('filmActorSearch', ['ngRoute', 'services'])

	.constant("moviesDBAPIKey", "3b346f117a4f4fc787e8d7e4eeb73cd5")

	.config(["personSearchProvider", "moviesDBAPIKey", function (personSearchProvider, moviesDBAPIKey) {

		personSearchProvider.setKey(moviesDBAPIKey);

	}])

	.config(["moviesWithCastProvider", "moviesDBAPIKey", function (moviesWithCastProvider, moviesDBAPIKey) {

		moviesWithCastProvider.setKey(moviesDBAPIKey);

	}])

	.config(["basicMovieInformationProvider", "moviesDBAPIKey", function (basicMovieInformationProvider, moviesDBAPIKey) {

		basicMovieInformationProvider.setKey(moviesDBAPIKey);

	}])

	.config(["movieDBConfigProvider", "moviesDBAPIKey", function (movieDBConfigProvider, moviesDBAPIKey) {

		movieDBConfigProvider.setKey(moviesDBAPIKey);

	}]);


/**
 * Routes
 */
app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../views/SearchFilms.html',
				controller: 'SearchFilms'
			}).
			when('/movie/:id', {
				templateUrl: '../views/MovieDetails.html',
				controller: 'MovieDetails'
			}).
			when('/404', {
				templateUrl: '../views/404.html'//,
				//controller: 'MovieDetails'
			}).
			otherwise({
				redirectTo: '/404'
			});

		$locationProvider.html5Mode(true);
	}]);