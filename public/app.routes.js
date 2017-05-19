/**
 * Application routing will be handled from here
 */
urlShortener.config(function config($locationProvider, $stateProvider, $urlRouterProvider, CONSTANTS) {

        /*$locationProvider.hashPrefix('!');*/
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state(CONSTANTS.STATE.HOME, {
            url: CONSTANTS.PAGE_URL.HOME,
            templateUrl: "home.html",
            controller: 'mainController'
        })
        .state(CONSTANTS.STATE.DASHBOARD, {
            url: CONSTANTS.PAGE_URL.DASHBOARD,
            templateUrl: "./dashboard.html",
            params : {id : null} ,
            controller: 'dashboardController'
        });
    }
);