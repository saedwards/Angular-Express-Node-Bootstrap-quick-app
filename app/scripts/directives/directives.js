(function (app) {

	"use strict";

	app.directive('imageonload', function () {
		return {
			restrict: 'A',
			scope: {
				imageonload: '&'
			},
			link: function ($scope, element) {
				element.bind('load', function () {
					$scope.imageonload();
				});
			}
		};
	});

	app.directive('onFocus', ['$parse', function ($parse) {
		return {
			link: function ($scope, element, attr) {
				var fn = $parse(attr.onFocus);
				element.bind('focus', function (event) {
					if (!$scope.$$phase) {
						$scope.$apply(function () {
							fn($scope, {$event: event});
						});
					}
					else {
						fn($scope, {$event: event});
					}
				});
			}
		};
	}]);

}(app));