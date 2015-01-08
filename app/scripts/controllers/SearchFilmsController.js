(function (app, angular) {

	app.controller('SearchFilms', ['$scope', 'personSearch', 'moviesWithCast', 'movieDBConfig', '$timeout',
		function($scope, personSearch, moviesWithCast, movieDBConfig, $timeout) {

			var keyFireLength = 4,
				movieConfig,
				chosenName,
				doError = function (err) {

					$scope.error = {};

					if(err.data) {

						$scope.error.message = 'Error: ' + err.data.status_message;

					} else {

						$scope.error.message = 'Sorry, an error occurred.';

					}
				};

			movieDBConfig.getConfig()
				.then(function (res) {
					movieConfig = res;
				})
				['catch'](function (err) {
					doError(err);
				});

			$scope.actorSearchTerm = '';
			$scope.movieSearchTerm = '';

			$scope.$watch("actorSearchTerm", function (newValue) {

				if(newValue.length > keyFireLength && $scope.actorSearchTerm !== chosenName) {

					loadPersonSearchData($scope.actorSearchTerm);

				}

			});

			$scope.closeError = function () {

				delete $scope.error;

			};

			$scope.formatKnownForString = function (arr) {

				if(!arr || !arr.length) {
					return;
				}

				var str = '',
					arrLen = arr.length;

				for(var i = 0; i < arrLen; i++) {

					if(arr[i].title) {
						str += str ? ', ' + arr[i].title : arr[i].title;
					}

				}

				return str ? 'Known for: ' + str : '';

			};

			$scope.chooseActor = function (personId, profilePath, name) {

				$scope.personResults = [];
				loadPersonMovies(personId);

				chosenName = name;
				$scope.actorSearchTerm = name;

				$scope.profileImage = profilePath ? movieConfig.images.base_url + movieConfig.images.profile_sizes[1] + profilePath : null;

			};

			$scope.cancelPerson = function () {

				$scope.movies = [];
				$scope.actorSearchTerm = '';
				$scope.profileImage = null;
				$scope.backdropImage = null;

				$('.searchPersonControl').focus();

			};

			$scope.cancelMovie = function () {

				$scope.movieSearchTerm = '';

			};

			function applyPersonSearchData(data) {

				$scope.personResults = data.results || [];

			};

			function loadPersonSearchData(term, cb) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				applyPersonSearchData({

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

				});

				/*personSearch.getResults(term)
					.then(function (response) {
						applyPersonSearchData(response);
					})
					['catch'](function (err) {
						doError(err);
					});*/

			};

			function applyMovieData (data) {

				var backdropPath;

				$scope.movies = data.results || [];

				if(data.results.length && typeof data.results[0].backdrop_path !== 'undefined') {
					backdropPath = data.results[0].backdrop_path;
				}

				$scope.backdropImage = backdropPath ? movieConfig.images.base_url + movieConfig.images.backdrop_sizes[2] + backdropPath : null;

			};

			function loadPersonMovies (personId) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				applyMovieData({
					results: [
						{
							'title': 'Dumb and Dumber To',
							'release_date': '2014-11-14'
						},
						{
							'title': 'Groundhog Day',
							'release_date': '1993-02-11'
						},
						{
							'title': 'Another',
							'release_date': '1993-02-11'
						}
					]
				});

				/*moviesWithCast.getResults(personId)
					.then(function (response) {
						applyMovieData(response);
					})
					['catch'](function (err) {
						doError(err);
					});*/

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