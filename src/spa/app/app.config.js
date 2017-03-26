(function () {
    'use strict';

    angular
        .module('app')
		.config(httpConfig)
        .config(stateConfig);

	// reset the headers to prevent preflight issue
	function httpConfig($httpProvider) {
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	}	
	
    function stateConfig($stateProvider, $urlRouterProvider) {
        // For any unmatched url, send to /app/pond
        $urlRouterProvider.otherwise('/app/pond');

        $stateProvider
            .state("app", {
                url: "/",
                abstract: true,
                templateUrl: 'app/layout/layout.html'
            });
    }
})();