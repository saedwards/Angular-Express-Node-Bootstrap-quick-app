app.directive('imageonload', function() {
	return {
		restrict: 'A',
		scope: {
			imageonload: '&'
		},
		link: function($scope, element, attrs) {
			element.bind('load', function() {

				$scope.imageonload();
				/*$scope.fadeOutBackdropImage = false;
				$scope.fadeIn = true;*/
			});
		}
	};
});