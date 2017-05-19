
/**
 * All application level constants will go here
 */
urlShortener.constant('CONSTANTS', {

	// define api url
	API_URL: {
		BASE_URL : '/api/shortenurl'
	},

    // define all page url fragments
    PAGE_URL: {
        BASE: '/', // This will be used as home page
        HOME: '/home',
        DASHBOARD: '/dashboard'
    },

    STATE: {
        HOME: 'home',
        DASHBOARD: 'dashboard'
    }

}).run(function ($rootScope, CONSTANTS) {
    $rootScope.CONSTANTS = CONSTANTS;
});