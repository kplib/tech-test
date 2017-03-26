(function () {
    'use strict';

    // Define the 'app' module
    angular.module('app', [
        'ngAnimate',
        'ui.router',
        'angular-growl',                // notifications
        'angularjs-datetime-picker',    // for date picker
        'app.layout',
        'app.pond',
        'app.frog',
        'app.utils'
    ]);
})();