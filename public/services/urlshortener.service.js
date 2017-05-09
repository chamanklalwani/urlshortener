urlShortener.service('UrlShortenerService', ['$http','CONSTANTS',function($http, CONSTANTS) {
		return {
			get : function() {
				return $http.get(CONSTANTS.API_URL.BASE_URL);
			},
			getShortUrlByOriginalUrl : function(originalUrl) {
				 var id = encodeURI(''+originalUrl+'');
				return $http.get(CONSTANTS.API_URL.BASE_URL + '/' + id);
			},
			create : function(urlData) {
				return $http.post(CONSTANTS.API_URL.BASE_URL, urlData);
			},
			delete : function(id) {
				return $http.delete(CONSTANTS.API_URL.BASE_URL + '/' + id);
			}
		}
	}]);