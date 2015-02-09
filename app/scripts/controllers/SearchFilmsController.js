(function (app, angular) {

	app.controller('SearchFilms', [
		'$scope',
		'$rootScope',
		'$timeout',
		'personSearch',
		'moviesWithCast',
		'movieDBConfig',
		'$location',
		'windowNotifications',
		'changeBackdrop',
		'utils',
		function($scope, $rootScope, $timeout, personSearch, moviesWithCast, movieDBConfig, $location, windowNotifications, changeBackdrop, utils) {

			var keyFireLength = 4,
				chosenName,
				doError = function (err) {

					windowNotifications.addMessage(err.data ? 'Error: ' + err.data.status_message : 'Sorry, an error occurred.');

				};

			$scope.actorSearchTerm = '';
			$scope.movieSearchTerm = '';
			$scope.personResults = [];

			$scope.$watch("actorSearchTerm", function (newValue) {

				if(newValue.length > keyFireLength && $scope.actorSearchTerm !== chosenName) {

					loadPersonSearchData($scope.actorSearchTerm);

				}

			});

			$scope.actorSearchTermKeypress = function (e) {

				console.log(e);

				var el;

				if(e.keyCode === 13) {

					loadPersonSearchData($scope.actorSearchTerm);

				}

				if(e.keyCode === 40 && $scope.personResults.length) {

					el = $('#personResults li:first-child button');

					//loadPersonSearchData($scope.actorSearchTerm);

					//el.addClass('active');

					el.focus();

				}

			};

			$scope.closeError = function () {

				delete $scope.error;

			};

			$scope.formatKnownForString = function (arr) {

				var str = utils.formatListLabel(arr.map(function (item) {
					return item.title;
				}));

				return str ? 'Known for: ' + str : '';

			};

			$scope.chooseActor = function (personId, profilePath, name) {

				$scope.personResults = [];

				loadPersonMovies(personId);

				chosenName = name;
				$scope.actorSearchTerm = name;

				movieDBConfig.getConfig(function (movieConfig) {

					$scope.profileImage = profilePath ? movieConfig.images.base_url + movieConfig.images.profile_sizes[1] + profilePath : null;

				});

			};

			$scope.chooseMovie = function (movie) {

				$location.path('/movie/' + movie.id);

			};

			$scope.cancelPerson = function () {

				$scope.movies = [];
				$scope.actorSearchTerm = '';
				$scope.profileImage = null;
				changeBackdrop(null);

				$('.searchPersonControl').focus();

			};

			$scope.cancelMovieSearch = function () {

				$scope.movieSearchTerm = '';

			};

			function applyPersonSearchData(data) {

				$scope.personResults = data.results || [];

				$timeout(function () {
					$('.personBtn').keydown(function (e) {

						if(e.keyCode === 38) {

							$(e.target).parent().prev().children('.personBtn').focus();

						}

						if(e.keyCode === 40 && $scope.personResults.length) {

							$(e.target).parent().next().children('.personBtn').focus();

						}

					});
				});

				/*$timeout(function () {
					$('#personResults li:first-child').addClass('active');
				});*/

			};

			function loadPersonSearchData(term, cb) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				/*applyPersonSearchData({

					results: [
						{
							'name': 'Bill Murray',
							'id': 1532,
							'known_for': [
								{
									title: 'Ghost Busters'
								},
								{
									title: 'Groundhog Day'
								}
							]
						},
						{
							'name': 'Billy Murray',
							'id': 63073,
							'known_for': [
								{
									title: 'Rise of the Footsoldier'
								},
								{
									title: 'One in the chamber'
								}
							]
						}
					]

				});*/

				personSearch.getResults(term)
					.then(function (response) {
						applyPersonSearchData(response);
					})
					['catch'](function (err) {
						doError(err);
					});

			};

			function applyMovieData (data) {

				var backdropPath;

				$scope.movies = data.results || [];

				if(data.results.length && typeof data.results[0].backdrop_path !== 'undefined') {
					backdropPath = data.results[0].backdrop_path;
				}

				changeBackdrop(backdropPath);

			};

			function loadPersonMovies (personId) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				/*applyMovieData({
					results: [
						{
							'id': 123,
							'title': 'Dumb and Dumber To',
							'release_date': '2014-11-14'
						},
						{
							'id': 512,
							'title': 'Groundhog Day',
							'release_date': '1993-02-11'
						},
						{
							'id': 789,
							'title': 'Another',
							'release_date': '1993-02-11'
						}
					]
				});*/

				moviesWithCast.getResults(personId)
					.then(function (response) {
						applyMovieData(response);
					})
					['catch'](function (err) {
						doError(err);
					});

			};

			/**
			 * Choose default profile.
			 */
			/*$scope.load = function () {

				$scope.actorSearchTerm = 'Bill Murray';

				loadPersonSearchData($scope.actorSearchTerm);

			};*/

		}]);

}(app, angular));