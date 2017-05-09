
/**
 * All application level constants will go here
 */
urlShortener.constant('CONSTANTS', {

	// define api url
	API_URL: {
		BASE_URL : '/api/shortenurl'
	}

}).run(function ($rootScope, CONSTANTS) {
    $rootScope.CONSTANTS = CONSTANTS;
});