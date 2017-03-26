(function () {
    'use strict';

    angular
        .module('app.pond')
        .controller('PondController', PondController);

    function PondController($scope, $stateParams, $state, PondListResource, PondResource, PondService, NotificationService, APP_CONSTANTS) {
        // By CRUD Operation
        switch ($stateParams.operationMode) {
            case 'CREATE':
                $scope.data = {};
                break;
            case 'RETRIEVE':
                $scope.pondList = PondListResource.data;
                break;
            case 'UPDATE':
                $scope.data = {
                    pond_id: PondResource.data[0].pond_id,
                    name: PondResource.data[0].name,
                    description: PondResource.data[0].description
                };
                break;
            default :
                break;
        }

        // EVENTS
        $scope.events = {
            createBtnOnClick: function() {
                $state.go('app.pondCreate');
            },
            updateBtnOnClick: function(id) {
                $state.go('app.pondUpdate', { pondId: id });
            },
            deleteBtnOnClick: function(id) {
                var confirm = window.confirm('Are you sure you want to delete this Pond? ID=' + id);
                if (confirm===true) {
                    PondService.deletePond(id).then(function(data) {
                        var notificationMsg = '';
                        var notificationType = 'success';

                        // if Success, redirects to list page
                        if (angular.isDefined(data)) {
                            if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                notificationMsg = 'This Pond has been successfully deleted: ID=' + id;

                                // refresh list
                                PondService.getAllPonds().then(function(data) {
                                    $scope.pondList = data.data;
                                });
                            } else {
                                notificationMsg = data.message;
                                notificationType = 'error';
                            }
                        }

                        // display notification,
                        NotificationService.notify(notificationMsg, notificationType);

                        $state.go('app.pond');
                    }, function(data) {
                        // display notification,
                        NotificationService.notify(data.message);
                    });
                }
            },
            submitBtnOnClick: function() {
                if ($scope.data.name && $scope.data.description) {
                    var notificationMsg = '';
                    var notificationType = 'success';

                    // perform submit
                    if ($stateParams.operationMode=='CREATE') {
                        PondService.createPond($scope.data).then(function(data) {
                            // if Success, redirects to list page
                            if (angular.isDefined(data)) {
                                if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                    notificationMsg = 'New Pond has been successfully created: ID=' + data.data[0].pond_id;
                                    $state.go('app.pond');
                                } else {
                                    notificationMsg = data.message;
                                    notificationType = 'error';
                                }
                                // display notification,
                                NotificationService.notify(notificationMsg, notificationType);
                            }
                        }, function(data) {
                            // display notification,
                            NotificationService.notify(data.message);
                        });
                    } else if ($stateParams.operationMode=='UPDATE') {
                        PondService.updatePond($scope.data.pond_id, $scope.data).then(function(data) {
                            // if Success, redirects to list page
                            if (angular.isDefined(data)) {
                                if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                    notificationMsg = 'This Pond has been successfully updated: ID=' + data.data[0].pond_id;
                                    $state.go('app.pond');
                                } else {
                                    notificationMsg = data.message;
                                    notificationType = 'error';
                                }
                            }
                            // display notification,
                            NotificationService.notify(notificationMsg, notificationType);
                        }, function(data) {
                            // display notification,
                            NotificationService.notify(data.message);
                        });
                    }
                } else {
                    // display notification,
                    NotificationService.notify('Please fill in all the required fields', 'warning');
                }
            },
            cancelBtnOnClick: function() {
                $state.go('app.pond');
            }
        };
    }
})();