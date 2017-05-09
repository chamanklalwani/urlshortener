urlShortener.controller('mainController', ['$scope','$http','UrlShortenerService', '$timeout', function($scope, $http, UrlShortenerService, $timeout) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.myDomainName = "http://localhost:8081/sh/";
		var table = null;
		$scope.captchaResponse = null;
		// google captcha public key
		$scope.publicKey = "6LdfbyAUAAAAALYtVpdPl2uUNR0Sl1wt0j-tvAO3";
		$scope.showGeneratedShortUrl = false;

        // GET =====================================================================
		var loadUrls = function () {
			// use the service to get all the shorturls
			UrlShortenerService.get().success(function(data) {
				$scope.shortUrls = data;
				$scope.loading = false;
				$timeout(loadUrls, 5000);

				if(table != undefined ){
					table.destroy();
				}
				$timeout(function () {
					 table = $('#urlsDataTable').DataTable();
				}, 100);
			});
		};

		// when landing on the page, get all shorturls and show them
		loadUrls();

		// CREATE ==================================================================
		// when submitting the add form, send the originalUrl text to the node API
		$scope.shortenUrl = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen

			if ($scope.formData.originalUrl != undefined && $scope.captchaResponse) {
				$scope.loading = true;
				$scope.formData.uuid = $scope.getIdToShortUrl();
				$scope.formData.shortUrl = $scope.myDomainName + $scope.formData.uuid;
				$scope.formData.createDateTime = new Date();
				$scope.formData.clicksCount = 0;

				UrlShortenerService.getShortUrlByOriginalUrl($scope.formData.originalUrl).then(function(data) {

					if(data != null) {
						$scope.showGeneratedShortUrl = true;
						$scope.formData.shortUrl = data.shortUrl;
						$scope.captchaResponse = null;
					} else {
						// call the create function from our service (returns a promise object)
						UrlShortenerService.create($scope.formData)

						// if successful creation, call our get function to get all the new shorturls
						.success(function(data) {
							$scope.showGeneratedShortUrl = true;
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
							table.destroy();
							$scope.shortUrls = data; // assign our new list of shorturls
							$scope.formData.shortUrl = data[0].shortUrl;
							$scope.captchaResponse = null;
							$timeout(function () {
							 table = $('#urlsDataTable').DataTable();
							}, 100);
						});
					}

				}, function(failure) {

				});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteUrl = function(id) {
			$scope.loading = true;

			UrlShortenerService.delete(id)
				// if successful creation, call our get function to get all the new shorturls
				.success(function(data) {
					$scope.loading = false;
					$scope.shortUrls = data; // assign our new list of shorturls
				});
		};

		$scope.getIdToShortUrl = function() {
			// Map to store 62 possible characters
			var map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			var id = Date.now();
			var shorturl = "";

			// Convert given integer id to a base 62 number
			while (id > 1) {
				// use above map to store actual character in short url
				shorturl = shorturl + map.charAt(id % 62);
				id = id / 62;
			}

			return shorturl.split("").reverse().join("");
		};

	}]);