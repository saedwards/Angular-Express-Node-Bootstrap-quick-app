(function (angular) {

	angular.module("services", [])
		.provider("movieDBConfig", [function () {

			var key = '',
				configCache = null;

			this.setKey = function (string) {

				key = string;

			};

			this.$get = ['$http', function ($http) {

				function getConfig(cb) {

					if(configCache) {

						cb(configCache);

					}

					$http({
						method: "get",
						url: window.location.protocol + "//api.themoviedb.org/3/configuration?api_key=" + key
					}).then(function (response) {

							configCache = response.data;
							cb(configCache);

						}, function (response) {

							console.log('error');

						});

				};

				return {
					getConfig: getConfig
				};

			}];

		}])
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

		}])
		.provider("basicMovieInformation", function () {

			var key = '';

			this.setKey = function (string) {

				key = string;

			};

			this.$get = ['$http', function ($http) {

				function getResults(movieId) {

					//http://api.themoviedb.org/3/movie/id

					var request = $http({
						method: "get",
						url: window.location.protocol + "//api.themoviedb.org/3/movie/" + movieId + "?api_key=" + key
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

		})
		.factory("windowNotifications", ['$rootScope', function ($rootScope) {

			var messages = [];

			function showMessages () {

				$rootScope.error = {};
				$rootScope.error.message = messages[0];

			};

			function clearMessages () {

				$rootScope.error = null;

			};

			$rootScope.$on('clearMessages', function () {

				clearMessages();

			});

			return {

				addMessage : function (messageString) {

					messages.push(messageString);

					showMessages();

				},

				clearMessages : clearMessages

			};

		}])
		.factory("changeBackdrop", ['$rootScope', 'movieDBConfig', function ($rootScope, movieDBConfig) {

			var setBackDrop = function (path, movieConfig) {

					$rootScope.backdropImage = path ? movieConfig.images.base_url + movieConfig.images.backdrop_sizes[2] + path : null;

				};

			return function (path) {

				//movieDBConfig = {"images":{"base_url":"http://image.tmdb.org/t/p/","secure_base_url":"https://image.tmdb.org/t/p/","backdrop_sizes":["w300","w780","w1280","original"],"logo_sizes":["w45","w92","w154","w185","w300","w500","original"],"poster_sizes":["w92","w154","w185","w342","w500","w780","original"],"profile_sizes":["w45","w185","h632","original"],"still_sizes":["w92","w185","w300","original"]},"change_keys":["adult","air_date","also_known_as","alternative_titles","biography","birthday","budget","cast","certifications","character_names","created_by","crew","deathday","episode","episode_number","episode_run_time","freebase_id","freebase_mid","general","genres","guest_stars","homepage","images","imdb_id","languages","name","network","origin_country","original_name","original_title","overview","parts","place_of_birth","plot_keywords","production_code","production_companies","production_countries","releases","revenue","runtime","season","season_number","season_regular","spoken_languages","status","tagline","title","translations","tvdb_id","tvrage_id","type","video","videos"]};

				movieDBConfig.getConfig(function (data) {

					setBackDrop(path, data);

				});

			};

		}]);

}(angular));