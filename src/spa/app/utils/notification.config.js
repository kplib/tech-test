(function () {
    'use strict';

    angular
        .module('app.utils')
        .config(growlConfig);

    function growlConfig(growlProvider) {
        growlProvider.globalTimeToLive(3000);
        growlProvider.onlyUniqueMessages(false);
    }
})();