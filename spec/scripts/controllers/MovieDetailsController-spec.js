describe('MovieDetailsController', function () {

	var $scope,
		routeParams,
		$location,
		$sce,
		$controller,
		$httpBackend,
		videoData = function () {
			return {
				"id": 954,
				"results": [
					{
						"id":"54639b4fc3a36812430027c5",
						"iso_639_1":"en",
						"key":"0XAlutSwY0I",
						"name":"Trailer 1",
						"site":"YouTube",
						"size":480,
						"type":"Trailer"
					}
				]
			}
		},
		movieData = function () {
			return {"adult":false,"backdrop_path":"/7CiZuIPCLvhhMICT2PONuwr2BMG.jpg","belongs_to_collection":{"id":87359,"name":"Mission: Impossible Collection","poster_path":"/gwyJPIhCK4Xz2WogeBnhCSQfUek.jpg","backdrop_path":"/bEOri3OCJ7EKaruUSQhD8W6CPjn.jpg"},"budget":80000000,"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":53,"name":"Thriller"}],"homepage":"http://www.missionimpossible.com/","id":954,"imdb_id":"tt0117060","original_language":"en","original_title":"Mission: Impossible","overview":"When Ethan Hunt, the leader of a crack espionage team whose perilous operation has gone awry with no explanation, discovers that a mole has penetrated the CIA, he's surprised to learn that he's the No. 1 suspect. To clear his name, Hunt now must ferret out the real double agent and, in the process, even the score.","popularity":2.30905521843139,"poster_path":"/1PVKS17pIBFsIhgFws2uagPDNLW.jpg","production_companies":[{"name":"Paramount Pictures","id":4},{"name":"Cruise/Wagner Productions","id":44}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"1996-05-21","revenue":456494803,"runtime":110,"spoken_languages":[{"iso_639_1":"en","name":"English"},{"iso_639_1":"fr","name":"Français"},{"iso_639_1":"cs","name":"Český"}],"status":"Released","tagline":"Expect the Impossible.","title":"Mission: Impossible","video":false,"vote_average":6.3,"vote_count":977}
		},
		configData = function () {
			return {"images":{"base_url":"http://image.tmdb.org/t/p/","secure_base_url":"https://image.tmdb.org/t/p/","backdrop_sizes":["w300","w780","w1280","original"],"logo_sizes":["w45","w92","w154","w185","w300","w500","original"],"poster_sizes":["w92","w154","w185","w342","w500","w780","original"],"profile_sizes":["w45","w185","h632","original"],"still_sizes":["w92","w185","w300","original"]},"change_keys":["adult","air_date","also_known_as","alternative_titles","biography","birthday","budget","cast","certifications","character_names","created_by","crew","deathday","episode","episode_number","episode_run_time","freebase_id","freebase_mid","general","genres","guest_stars","homepage","images","imdb_id","languages","name","network","origin_country","original_name","original_title","overview","parts","place_of_birth","plot_keywords","production_code","production_companies","production_countries","releases","revenue","runtime","season","season_number","season_regular","spoken_languages","status","tagline","title","translations","tvdb_id","tvrage_id","type","video","videos"]};
		};

	beforeEach(function () {

		module('filmActorSearch');

		inject(function ($injector) {

			$scope = {};
			routeParams = {
				id: 954
			};
			$controller = $injector.get('$controller');
			$httpBackend = $injector.get('$httpBackend');
			$location = $injector.get('$location');
			$sce = $injector.get('$sce');

			var movieDBConfig = {
					getConfig: function (cb) {
						cb(configData());
					}
				},
				authRequestVideoHandler = $httpBackend
					.when('GET', 'http://api.themoviedb.org/3/movie/954/videos?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5')
					.respond(videoData()),
				authRequestMovieHandler = $httpBackend
					.when('GET', 'http://api.themoviedb.org/3/movie/954?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5')
					.respond(movieData()),
				authRequestConfigHandler = $httpBackend
					.when('GET', 'http://api.themoviedb.org/3/configuration?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5')
					.respond(configData());

			/**
			 * Match default GET requests in controller.
			 */
			$httpBackend.expectGET('http://api.themoviedb.org/3/movie/954/videos?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5');
			$httpBackend.expectGET('http://api.themoviedb.org/3/movie/954?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5');
			$httpBackend.expectGET('http://api.themoviedb.org/3/configuration?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5');

			//$scope, $routeParams, $location, $sce, movieDBConfig, utils, changeBackdrop, windowNotifications, basicMovieInformation, movieVideos) {

			createController = function() {
				return $controller('MovieDetails', {
					'$scope' : $scope,
					'$routeParams' : routeParams,
					'$location' : $location,
					'$sce' : $sce,
					'movieDBConfig' : movieDBConfig
				});
			};

		});

	});

	afterEach(function () {

		$httpBackend.verifyNoOutstandingExpectation();
		//$httpBackend.verifyNoOutstandingRequest();

	});

	it('$scope variables should be set up correctly.', function () {

		createController();
		$httpBackend.flush();

		expect($scope.movie).toBeDefined();
		expect($scope.videos).toBeDefined();
		expect($scope.genres).toBeDefined();
		expect($scope.posterImage).toBeDefined();
		expect($scope.homepage).toBeDefined();

	});

	it('applyMovieVideos populates $scope.videos with correct data.', function () {

		var controller = createController();
		$httpBackend.flush();

		expect(controller.applyMovieVideos).toBeDefined();

		controller.applyMovieVideos(videoData());

		expect($scope.videos).toEqual([
			{
				name : 'Trailer 1',
				path : 'http://www.youtube.com/embed/0XAlutSwY0I'
			}
		]);

	});

	it('applyMovieDetailsData populates $scope properties with correct data.', function () {

		var controller = createController();
		$httpBackend.flush();

		expect(controller.applyMovieDetailsData).toBeDefined();

		controller.applyMovieDetailsData(movieData());

		expect($scope.movie).toEqual(movieData());
		expect($scope.genres).toEqual('Action, Adventure, Thriller');
		expect($scope.posterImage).toEqual('http://image.tmdb.org/t/p/w342/1PVKS17pIBFsIhgFws2uagPDNLW.jpg');
		expect($scope.homepage).toEqual('http://www.missionimpossible.com/');

	});

	it('loadMovieDetailsData makes a call for movie details data', function () {

		var controller = createController();
		$httpBackend.flush();

		controller.applyMovieDetailsData = jasmine.createSpy();

		expect(controller.loadMovieDetailsData).toBeDefined();

		$httpBackend.expectGET('http://api.themoviedb.org/3/movie/954?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5');

		controller.loadMovieDetailsData(954);

		$httpBackend.flush();

		expect(controller.applyMovieDetailsData).toHaveBeenCalled();

	});

	it('loadMovieVideos retrieves correct response data', function () {

		var controller = createController();
		$httpBackend.flush();

		controller.applyMovieVideos = jasmine.createSpy();

		expect(controller.loadMovieVideos).toBeDefined();

		$httpBackend.expectGET('http://api.themoviedb.org/3/movie/954/videos?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5');

		controller.loadMovieVideos(954);

		$httpBackend.flush();

		expect(controller.applyMovieVideos).toHaveBeenCalled();

	});

});