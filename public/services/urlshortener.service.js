urlShortener.service('UrlShortenerService', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/shortenurl');
			},
			getShortUrlByOriginalUrl : function(originalUrl) {
				 var id = encodeURI(''+originalUrl+'');
				return $http.get('/api/shortenurl/' + id);
			},
			create : function(urlData) {
				return $http.post('/api/shortenurl', urlData);
			},
			delete : function(id) {
				return $http.delete('/api/shortenurl/' + id);
			}
		}
	}]);