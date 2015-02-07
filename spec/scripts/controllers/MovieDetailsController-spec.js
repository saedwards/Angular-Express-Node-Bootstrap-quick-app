describe('MovieDetailsController', function () {

	var $scope,
		$rootScope,
		controller;

	beforeEach(function () {

		module('filmActorSearch');

		inject(function ($controller) {

			$scope = {};

			controller = $controller('MovieDetails', {
				$scope : $scope
			});

		});

	});

	it('$scope variables should be set up correctly.', function () {

		expect($scope.movie).toBeDefined();
		expect($scope.videos).toBeDefined();
		expect($scope.genres).toBeDefined();
		expect($scope.posterImage).toBeDefined();
		expect($scope.homepage).toBeDefined();

	});

	/*it('applyMovieVideos populates $scope.videos with correct data.', function () {



	});

	it('applyMovieDetailsData populates $scope.movie with correct data.', function () {



	});

	it('loadMovieDetailsData retrieves correct response data', function () {



	});

	it('loadMovieVideos retrieves correct response data', function () {



	});*/

});