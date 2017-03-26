(function () {
    'use strict';

    angular
        .module('app.pond')
        .service('PondService', PondService);

    function PondService($q, $http, APP_CONSTANTS) {
        var url = '/pond';
        var self = this;
        self.getAllPonds = getAllPonds;
        self.getPondById = getPondById;
        self.createPond = createPond;
        self.updatePond = updatePond;
        self.deletePond = deletePond;

        function getAllPonds() {
            var deferred = $q.defer();

            $http.get(APP_CONSTANTS.API_URL + url).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function getPondById(id) {
            var deferred = $q.defer();

            $http.get(APP_CONSTANTS.API_URL + url + '/' + id).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function createPond(data) {
            var deferred = $q.defer();

            $http.post(APP_CONSTANTS.API_URL + url, data).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function updatePond(id, data) {
            var deferred = $q.defer();

            $http.put(APP_CONSTANTS.API_URL + url + '/' + id, data).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function deletePond(id) {
            var deferred = $q.defer();

            $http.delete(APP_CONSTANTS.API_URL + url + '/' + id).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }
    }
})();