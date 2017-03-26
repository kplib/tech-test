(function () {
    'use strict';

    angular
        .module('app.pond')
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('app.pond', {
            url: 'app/pond',
            templateUrl: 'app/pond/pond.html',
            controller: 'PondController',
            params: {
                operationMode: 'RETRIEVE'
            },
            resolve: {
                PondListResource: function (PondService) {
                    return PondService.getAllPonds().then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                },
                PondResource: function() {
                    return null;
                }
            }
        });

        $stateProvider.state('app.pondCreate', {
            url: 'app/pond/create',
            templateUrl: 'app/pond/pond.create.html',
            controller: 'PondController',
            params: {
                operationMode: 'CREATE'
            },
            resolve: {
                PondListResource: function() {
                    return null;
                },
                PondResource: function() {
                    return null;
                }
            }
        });

        $stateProvider.state('app.pondUpdate', {
            url: 'app/pond/update',
            templateUrl: 'app/pond/pond.create.html',
            controller: 'PondController',
            params: {
                operationMode: 'UPDATE',
                pondId: null
            },
            resolve: {
                PondListResource: function() {
                    return null;
                },
                PondResource: function(PondService, $stateParams) {
                    return PondService.getPondById($stateParams.pondId).then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                }
            }
        });
    }
})();