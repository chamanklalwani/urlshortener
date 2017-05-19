urlShortener.controller('dashboardController', ['$scope', '$stateParams', 'UrlShortenerService' , function($scope, $stateParams, UrlShortenerService) {
	$scope.data = {};
	$scope.colors = ['#D61535', '#424141'];

	$scope.init = function() {
		$scope.id = $stateParams.id;

		if($scope.id)	{
			UrlShortenerService.getShortUrlByOriginalUrl($scope.id).then(function(response) {
				$scope.data  = response.data;
			}, function(failure) {

			});
		}
	};

	$scope.loadBarChart = function() {
		$scope.labels = ["2012", "2013", "2014", "2015", "2016", "2017"];
		$scope.series = ['Series A'];
		$scope.chartData = [0,0,0,0,0,6];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};
	};

	$scope.init();

	$scope.loadBarChart();
}]);