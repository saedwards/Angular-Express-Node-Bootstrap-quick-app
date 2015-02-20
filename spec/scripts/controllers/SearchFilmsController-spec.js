describe('SearchFilmsController', function () {

	"use strict";

	var $scope,
		$rootScope,
		$timeout,
		personSearch,
		moviesWithCast,
		movieDBConfig,
		$location,
		windowNotifications,
		changeBackdrop,
		utils,

		createController,
		$controller,
		$httpBackend,
		configData = function () {
			return {"images":{"base_url":"http://image.tmdb.org/t/p/","secure_base_url":"https://image.tmdb.org/t/p/","backdrop_sizes":["w300","w780","w1280","original"],"logo_sizes":["w45","w92","w154","w185","w300","w500","original"],"poster_sizes":["w92","w154","w185","w342","w500","w780","original"],"profile_sizes":["w45","w185","h632","original"],"still_sizes":["w92","w185","w300","original"]},"change_keys":["adult","air_date","also_known_as","alternative_titles","biography","birthday","budget","cast","certifications","character_names","created_by","crew","deathday","episode","episode_number","episode_run_time","freebase_id","freebase_mid","general","genres","guest_stars","homepage","images","imdb_id","languages","name","network","origin_country","original_name","original_title","overview","parts","place_of_birth","plot_keywords","production_code","production_companies","production_countries","releases","revenue","runtime","season","season_number","season_regular","spoken_languages","status","tagline","title","translations","tvdb_id","tvrage_id","type","video","videos"]};
		};

	//function(, , $location, windowNotifications, changeBackdrop, utils) {


	beforeEach(function () {

		module('filmActorSearch');

		inject(function ($injector) {

			var movieDBConfig = {
				getConfig: function (cb) {
					cb(configData());
				}
			};

			$scope = {};
			$rootScope = $injector.get('$rootScope');
			$timeout = $injector.get('$timeout');
			personSearch = $injector.get('personSearch');
			moviesWithCast = $injector.get('moviesWithCast');
			movieDBConfig = $injector.get('movieDBConfig');
			$location = $injector.get('$location');
			windowNotifications = $injector.get('windowNotifications');
			changeBackdrop = $injector.get('changeBackdrop');
			utils = $injector.get('utils');

			$controller = $injector.get('$controller');
			$httpBackend = $injector.get('$httpBackend');

			createController = function() {
				return $controller('MovieDetails', {
					'$scope' : $scope,
					'$rootScope' : $rootScope,
					'$timeout' : $timeout,
					'personSearch' : personSearch,
					'moviesWithCast' : moviesWithCast,
					'movieDBConfig' : movieDBConfig,
					'$location' : $location,
					'windowNotifications' : windowNotifications,
					'changeBackdrop' : changeBackdrop,
					'utils' : utils
				});
			};

		});

	});

	it('$scope variables should be set up correctly.', function () {

		createController();

		expect($scope.actorSearchTerm).toBeDefined();
		expect($scope.movieSearchTerm).toBeDefined();
		expect($scope.personResults).toBeDefined();
		expect($scope.profileImage).toBeDefined();
		expect($scope.setActorSearchTerm).toBeDefined();
		expect($scope.actorSearchTermKeypress).toBeDefined();
		expect($scope.closeError).toBeDefined();
		expect($scope.formatKnownForString).toBeDefined();
		expect($scope.chooseActor).toBeDefined();
		expect($scope.chooseMovie).toBeDefined();
		expect($scope.cancelPerson).toBeDefined();
		expect($scope.cancelMovieSearch).toBeDefined();

	});

	it('$scope.setActorSearchTerm() sets actorSearchTerm.', function () {

		createController();
		$scope.setActorSearchTerm('Tom Cruise');
		expect($scope.actorSearchTerm).toEqual('Tom Cruise');

	});

	it('$scope.formatKnownForString() returns correct formatted string.', function () {

		createController();

		expect($scope.formatKnownForString([
			{ title: 'Rise of the Footsoldier' },
			{ title: 'One in the chamber' }
		]));

	});

	it('$scope.chooseActor() sets new actor information.', function () {

		createController();

		expect($scope.chooseActor(1532, '/eb58HuFIrxS0zUmbmW4d8YXTbje.jpg', 'Bill Murray'));
		expect($scope.actorSearchTerm).toEqual('Bill Murray');
		expect($scope.profileImage).toEqual('http://image.tmdb.org/t/p/w185/eb58HuFIrxS0zUmbmW4d8YXTbje.jpg');

	});

	it('$scope.cancelPerson() resets correct values', function () {

		createController();

		$scope.cancelPerson();

		expect($scope.movies).toEqual([]);
		expect($scope.actorSearchTerm).toEqual('');
		expect($scope.profileImage).toEqual(null);
		expect($rootScope.backdropImage).toEqual(null);

	});

	it('$scope.cancelMovieSearch() to clear movie search', function () {

		createController();

		$scope.cancelMovieSearch();

		expect($scope.movieSearchTerm).toEqual('');

	});

});