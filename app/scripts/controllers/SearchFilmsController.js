(function (app) {

	"use strict";

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

			var self = this,
				keyFireLength = 4,
				chosenName,
				doError = function (err) {

					windowNotifications.addMessage(err.data ? 'Error: ' + err.data.status_message : 'Sorry, an error occurred.');

				};

			$scope.actorSearchTerm = '';
			$scope.movieSearchTerm = '';
			$scope.personResults = [];
			$scope.profileImage = '';

			$scope.$watch("actorSearchTerm", function (newValue) {

				if(newValue.length > keyFireLength && $scope.actorSearchTerm !== chosenName) {

					self.loadPersonSearchData($scope.actorSearchTerm);

				}

			});

			$scope.setActorSearchTerm = function (name) {

				chosenName = name;
				$scope.actorSearchTerm = name;

			};

			$scope.actorSearchTermKeypress = function (e) {

				var el;

				if(e.keyCode === 13) {

					self.loadPersonSearchData($scope.actorSearchTerm);

				}

				if(e.keyCode === 40 && $scope.personResults.length) {

					el = $('#personResults li:first-child button');
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

				self.loadPersonMovies(personId);

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

			self.applyPersonSearchData = function (data) {

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

			};

			self.loadPersonSearchData = function (term) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				/*self.applyPersonSearchData({

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
							],
							'profile_path': '/eb58HuFIrxS0zUmbmW4d8YXTbje.jpg'
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
							],
							'profile_path': '/eb58HuFIrxS0zUmbmW4d8YXTbje.jpg'
						}
					]

				});*/

				personSearch.getResults(term)
					.then(function (response) {
						self.applyPersonSearchData(response);
					})
					['catch'](function (err) {
						doError(err);
					});

			};

			self.applyMovieData = function (data) {

				var backdropPath;

				$scope.movies = data.results || [];

				if(data.results.length && typeof data.results[0].backdrop_path !== 'undefined') {
					backdropPath = data.results[0].backdrop_path;
				}

				changeBackdrop(backdropPath);

			};

			self.loadPersonMovies = function (personId) {

				/**
				 * Stubbing (would usually be in Jasmine unit test)
				 */
				/*self.applyMovieData({
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
						self.applyMovieData(response);
					})
					['catch'](function (err) {
						doError(err);
					});

			};

		}]);

}(app));