(function () {
    'use strict';

    angular
        .module('app.utils')
        .constant('APP_CONSTANTS', {
            API_URL: 'http://localhost/frogasia/tech_test_blank_2/src/api/public',
            HTTP_STATUS: {
                SUCCESS: 200,
                SERVER_ERROR: 500
            }
        });
})();
