urlShortener.controller('mainController', ['$scope','$http','UrlShortenerService', '$timeout', '$state', 'CONSTANTS' , function($scope, $http, UrlShortenerService, $timeout, $state, CONSTANTS) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.myDomainName = "http://localhost:3000/sh/";
	var table = null;
	$scope.captchaResponse = null;
	// google captcha public key
	$scope.publicKey = "6LdfbyAUAAAAALYtVpdPl2uUNR0Sl1wt0j-tvAO3";
	$scope.showGeneratedShortUrl = false;
    //$scope.options = {legend: {display: true}};

    // GET =====================================================================
    var loadUrls = function () {
		// use the service to get all the shorturls
		UrlShortenerService.get().success(function(response) {
			$scope.shortUrls = response;
			$scope.getDifferenceInHours();

			$scope.loading = false;
			//$timeout(loadUrls, 5000);

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
			$scope.formData.createDateTime = moment(new Date());
			$scope.formData.clicksCount = 0;

			UrlShortenerService.getShortUrlByOriginalUrl($scope.formData.originalUrl).then(function(response) {

				if(response.data && response.data.length > 0 ) { // if found, return the existing one
					$scope.showGeneratedShortUrl = true;
					$scope.formData.shortUrl = response.data.shortUrl;
					$scope.captchaResponse = "";
				} else {
					// create new short url
					// call the create function from our service (returns a promise object)
					UrlShortenerService.create($scope.formData)
					// if successful creation, call our get function to get all the new shorturls
					.success(function(response) {
						$scope.showGeneratedShortUrl = true;
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						table.destroy();

						$scope.shortUrls = response; // assign our new list of shorturls
						$scope.formData.shortUrl = response[response.length-1].shortUrl;

						$scope.getDifferenceInHours();

						$timeout(function () {
							table = $('#urlsDataTable').DataTable();
						}, 100);
					});
				}

			}, function(failure) {

			});
		}

		$scope.reset();
	};

	// DELETE ==================================================================
	// delete a todo after checking it
	$scope.deleteUrl = function(id) {
		$scope.loading = true;

		UrlShortenerService.delete(id)
			// if successful creation, call our get function to get all the new shorturls
			.success(function(response) {
				$scope.loading = false;
				$scope.shortUrls = response; // assign our new list of shorturls
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

	$scope.reset = function() {
		$scope.captchaResponse = null;
		$scope.myForm.$setPristine();
	};

	$scope.getDifferenceInHours = function() {
		for (var i = 0; i < $scope.shortUrls.length; i++) {
			var currentDate = moment(new Date());
			var createDateTime = moment($scope.shortUrls[i].createDateTime);
			var duration = moment.duration(currentDate.diff(createDateTime));
			$scope.shortUrls[i].differenceInHours = duration.get("hours");
		}
	};

	$scope.getBrowserName = function(userAgent) {
		if (navigator.userAgent.indexOf('Trident') != -1 || navigator.userAgent.indexOf('MSIE') != -1) {
			return "Internet Explorer";
		} else if (navigator.userAgent.indexOf('OPR/') != -1) {
			return "Opera";
		} else if (navigator.userAgent.indexOf('Chrome/') != -1) {
			return "Chrome";
		}
	};

	$scope.redirectToDashboard = function(id) {
        $state.go(CONSTANTS.STATE.DASHBOARD, { id: id });
	}

}]);