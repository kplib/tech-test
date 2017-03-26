(function () {
    'use strict';

    angular
        .module('app.frog')
        .controller('FrogController', FrogController);

    function FrogController($scope, $stateParams, $state, FrogListResource, FrogResource, FrogService, PondListResource, NotificationService, APP_CONSTANTS) {
        // By CRUD Operation
        switch ($stateParams.operationMode) {
            case 'CREATE':
                $scope.data = {};
                break;
            case 'RETRIEVE':
                $scope.frogList = FrogListResource.data;
                break;
            case 'UPDATE':
                $scope.data = {
                    frog_id: FrogResource.data[0].frog_id,
                    name: FrogResource.data[0].name,
                    gender: FrogResource.data[0].gender,
                    birth_date: FrogResource.data[0].birth_date,
                    death_date: FrogResource.data[0].death_date,
                    pond_id: FrogResource.data[0].pond_id
                };
                break;
            case 'ASSIGN':
                $scope.data = {
                    frog_id: FrogResource.data[0].frog_id,
                    name: FrogResource.data[0].name,
                    gender: FrogResource.data[0].gender,
                    birth_date: FrogResource.data[0].birth_date,
                    death_date: FrogResource.data[0].death_date,
                    pond_id: FrogResource.data[0].pond_id
                };
                $scope.pondList = PondListResource.data;
                break;
            default :
                break;
        }

        // EVENTS
        $scope.events = {
            createBtnOnClick: function() {
                $state.go('app.frogCreate');
            },
            updateBtnOnClick: function(id) {
                $state.go('app.frogUpdate', { frogId: id });
            },
            deleteBtnOnClick: function(id) {
                var confirm = window.confirm('Are you sure you want to delete this Frog? ID=' + id);
                if (confirm===true) {
                    FrogService.deleteFrog(id).then(function(data) {
                        var notificationMsg = '';
                        var notificationType = 'success';

                        // if Success, redirects to list page
                        if (angular.isDefined(data)) {
                            if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                notificationMsg = 'This Frog has been successfully deleted: ID=' + id;

                                // refresh list
                                FrogService.getAllFrogs().then(function(data) {
                                    $scope.frogList = data.data;
                                });
                            } else {
                                notificationMsg = data.message;
                                notificationType = 'error';
                            }
                        }

                        // display notification,
                        NotificationService.notify(notificationMsg, notificationType);

                        $state.go('app.frog');
                    }, function(data) {
                        // display notification,
                        NotificationService.notify(data.message);
                    });
                }
            },
            submitBtnOnClick: function() {
                if (validateFieldsByOperation($stateParams.operationMode, $scope.data)) {
                    var notificationMsg = '';
                    var notificationType = 'success';

                    // perform submit
                    if ($stateParams.operationMode=='CREATE') {
                        FrogService.createFrog($scope.data).then(function(data) {
                            // if Success, redirects to list page
                            if (angular.isDefined(data)) {
                                if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                    notificationMsg = 'New Frog has been successfully created: ID=' + data.data[0].frog_id;
                                    $state.go('app.frog');
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
                        FrogService.updateFrog($scope.data.frog_id, $scope.data).then(function(data) {
                            // if Success, redirects to list page
                            if (angular.isDefined(data)) {
                                if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                    notificationMsg = 'This Frog has been successfully updated: ID=' + data.data[0].frog_id;
                                    $state.go('app.frog');
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
                    } else if ($stateParams.operationMode=='ASSIGN') {
                        FrogService.updateFrog($scope.data.frog_id, $scope.data).then(function(data) {
                            // if Success, redirects to list page
                            if (angular.isDefined(data)) {
                                if (data.status==APP_CONSTANTS.HTTP_STATUS.SUCCESS) {
                                    notificationMsg = 'This Frog has been successfully assigned to a Pond: Frog ID=' + data.data[0].frog_id + ', Pond ID=' + data.data[0].pond_id;
                                    $state.go('app.frog');
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
                $state.go('app.frog');
            },
            assignBtnOnClick: function(id) {
                $state.go('app.frogAssign', { frogId: id });
            }
        };

        function validateFieldsByOperation(operation, submitData) {
            var result = false;

            switch (operation) {
                case 'CREATE':
                    if (submitData.name && submitData.gender && submitData.birth_date) {
                        result = true;
                    }
                    break;
                case 'UPDATE':
                    if (submitData.frog_id && submitData.name && submitData.gender && submitData.birth_date) {
                        result = true;
                    }
                    break;
                case 'ASSIGN':
                    if (submitData.frog_id && submitData.name && submitData.gender && submitData.birth_date && submitData.pond_id) {
                        result = true;
                    }
                    break;
            }

            return result;
        }
    }
})();