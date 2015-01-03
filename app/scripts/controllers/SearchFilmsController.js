(function (app) {

	app.controller('SearchFilms', ['$scope', 'personSearch', 'moviesWithCast',
		function($scope, personSearch, moviesWithCast) {

			var keyFireLength = 4;

			personSearch.getResults();

			$scope.searchTerm = 'Bill Murray';

			$scope.$watch("searchTerm", function (newValue) {

				if(newValue.length > keyFireLength) {

					loadPersonSearchData($scope.searchTerm);

				}

			});

			$scope.formatKnownForString = function (arr) {

				if(!arr || !arr.length) {
					return;
				}

				var str,
					arrLen = arr.length;

				str = arr[0].title;

				for(var i = 1; i < arrLen; i++) {

					if(arr[i].title) {
						str += ', ' + arr[i].title;
					}

				}

				return str ? 'Known for: ' + str : '';

			};

			$scope.chooseActor = function (personId) {

				console.log(personId);
				loadPersonMovies(personId);

			};

			function applyPersonSearchData(data) {

				console.log('here');

				$scope.personResults = data.results || [];

			};

			function loadPersonSearchData(term) {

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
					});*/

			};

			function applyMovieData (data) {

				$scope.movies = data.results || [];

			};

			function loadPersonMovies (personId) {

				moviesWithCast.getResults(personId)
					.then(function (response) {
						console.log(response);

						applyMovieData(response);
					});

			};

			loadPersonSearchData($scope.searchTerm);

		}]);

}(app));