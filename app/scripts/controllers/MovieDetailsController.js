(function (app) {

	app.controller('MovieDetails', [
		'$scope',
		'$routeParams',
		'$location',
		'basicMovieInformation',
		function ($scope, $routeParams, $location, basicMovieInformation) {

			console.log($routeParams.id);

			var movieId = parseInt($routeParams.id);

			if(movieId !== movieId) {

				$location.path('/404');
				return;

			}

			$scope.movie = {
				title : 'Wild Things',
				id : 617,
				tagline : "They're dying to play with you",
				overview : 'When teen-socialite Kelly Van Ryan (Richards) and troubled bad girl Suzie Toller (Campbell) accuse guidance counselor Sam Lombardo (Dillon) of rape, he is suspended by the school, rejected by the town, and fighting to get his life back. One cop (Bacon) suspects conspiracy, but nothing is what it seems...',
				vote_average : 6.2,
				backdrop_path : '/z4Ky75Wjt7to5xfk1mgc7DfQEgr.jpg',
				homepage : 'http://www.google.com',
				poster_path : '/dI9iYo1cL81yzJkBVyNGipjSvy0.jpg',
				popularity : 0.711861883496939,
				imdb_id : 'tt0120890',
				revenue : 67200000,
				runtime : 129
			};

			function applyMovieDetailsData (data) {

				$scope.movie = data;

			};

			function loadMovieDetailsData(id) {

				basicMovieInformation.getResults($routeParams.id)
					.then(function (response) {
						applyMovieDetailsData(response);
					})
					['catch'](function (err) {
						doError(err);
					});

			};

			//loadMovieDetailsData(movieId);

		}]);

}(app));