urlShortener.controller('dashboardController', ['$scope', '$stateParams', 'UrlShortenerService', '$timeout' , function($scope, $stateParams, UrlShortenerService, $timeout) {
	$scope.data = {};
	$scope.colors = ['#D61535', '#424141'];

	$scope.init = function() {
		$scope.id = $stateParams.id;
	};

	$scope.loadBarChart = function() {
		$scope.labels = ["2012", "2013", "2014", "2015", "2016", "2017"];
		$scope.series = ['Series A'];
		$scope.chartData = [0,0,0,0,0,6];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
	};

	var getUrlDetails = function() {
		if($scope.id) {
			UrlShortenerService.getShortUrlByOriginalUrl($scope.id).then(function(response) {
				$scope.data  = response.data;
			}, function(failure) {

			});

			$timeout(getUrlDetails, 10000);
		}
	}

	$scope.init();
	getUrlDetails();
	$scope.loadBarChart();
}]);