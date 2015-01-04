(function (angular) {

	angular.module("services", [])
		.provider("movieDBConfig", (function () {

			var key = '';

			this.setKey = function (string) {

				key = string;

			};

			this.$get = ['$http', function ($http) {

				function getConfig() {

					var request = $http({
						method: "get",
						url: window.location.protocol + "//api.themoviedb.org/3/configuration?api_key=" + key
					});

					return request.then(handleSuccess);

				};

				function handleSuccess(response) {
					return ( response.data );
				};

				return {
					getConfig: getConfig
				};

			}];

		}))
		.provider("personSearch", [function () {

			var key = '',
				currentPerson = '';

			this.setKey = function (string) {

				key = string;

			};

			this.$get = ['$http', function ($http) {

				function getResults(term) {

					currentPerson = term;

					//http://api.themoviedb.org/3/search/person?api_key=3b346f117a4f4fc787e8d7e4eeb73cd5&query=bill%20murray

					var request = $http({
						method: "get",
						url: window.location.protocol + "//api.themoviedb.org/3/search/person?api_key=" + key + "&query=" + term
					});

					return ( request.then(handleSuccess) );

				};

				function handleSuccess(response) {
					return ( response.data );
				};

				return {
					getResults: getResults
				};

			}];

		}])
		.provider("moviesWithCast", [function () {

			var key = '';

			this.setKey = function (string) {

				key = string;

			};

			this.$get = ['$http', function ($http) {

				function getResults(personId) {

					//http://api.themoviedb.org/3/discover/movie

					var request = $http({
						method: "get",
						url: window.location.protocol + "//api.themoviedb.org/3/discover/movie?api_key=" + key + "&with_cast=" + personId
					});

					return ( request.then(handleSuccess) );

				};

				function handleSuccess(response) {
					return ( response.data );
				};

				return {
					getResults: getResults
				};

			}];

		}]);

}(angular));