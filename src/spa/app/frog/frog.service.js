(function () {
    'use strict';

    angular
        .module('app.frog')
        .service('FrogService', FrogService);

    function FrogService($q, $http, APP_CONSTANTS) {
        var url = '/frog';
        var self = this;
        self.getAllFrogs = getAllFrogs;
        self.getFrogById = getFrogById;
        self.createFrog = createFrog;
        self.updateFrog = updateFrog;
        self.deleteFrog = deleteFrog;

        function getAllFrogs() {
            var deferred = $q.defer();

            $http.get(APP_CONSTANTS.API_URL + url).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function getFrogById(id) {
            var deferred = $q.defer();

            $http.get(APP_CONSTANTS.API_URL + url + '/' + id).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function createFrog(data) {
            var deferred = $q.defer();

            $http.post(APP_CONSTANTS.API_URL + url, data).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function updateFrog(id, data) {
            var deferred = $q.defer();

            $http.put(APP_CONSTANTS.API_URL + url + '/' + id, data).then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                deferred.reject(data.data);
            });

            return deferred.promise;
        }

        function deleteFrog(id) {
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