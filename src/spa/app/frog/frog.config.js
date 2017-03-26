(function () {
    'use strict';

    angular
        .module('app.frog')
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('app.frog', {
            url: 'app/frog',
            templateUrl: 'app/frog/frog.html',
            controller: 'FrogController',
            params: {
                operationMode: 'RETRIEVE'
            },
            resolve: {
                FrogListResource: function (FrogService) {
                    return FrogService.getAllFrogs().then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                },
                FrogResource: function() {
                    return null;
                },
                PondListResource: function() {
                    return null;
                }
            }
        });

        $stateProvider.state('app.frogCreate', {
            url: 'app/frog/create',
            templateUrl: 'app/frog/frog.create.html',
            controller: 'FrogController',
            params: {
                operationMode: 'CREATE'
            },
            resolve: {
                FrogListResource: function() {
                    return null;
                },
                FrogResource: function() {
                    return null;
                },
                PondListResource: function() {
                    return null;
                }
            }
        });

        $stateProvider.state('app.frogUpdate', {
            url: 'app/frog/update',
            templateUrl: 'app/frog/frog.create.html',
            controller: 'FrogController',
            params: {
                operationMode: 'UPDATE',
                frogId: null
            },
            resolve: {
                FrogListResource: function() {
                    return null;
                },
                FrogResource: function(FrogService, $stateParams) {
                    return FrogService.getFrogById($stateParams.frogId).then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                },
                PondListResource: function() {
                    return null;
                }
            }
        });

        $stateProvider.state('app.frogAssign', {
            url: 'app/frog/assign',
            templateUrl: 'app/frog/frog.assign.html',
            controller: 'FrogController',
            params: {
                operationMode: 'ASSIGN',
                frogId: null
            },
            resolve: {
                FrogListResource: function() {
                    return null;
                },
                FrogResource: function(FrogService, $stateParams) {
                    return FrogService.getFrogById($stateParams.frogId).then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                },
                PondListResource: function (PondService) {
                    return PondService.getAllPonds().then(function (data) {
                        return data;
                    }, function (data) {
                        return data;
                    });
                }
            }
        });
    }
})();