(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('NotificationService', NotificationService);

    function NotificationService(growl) {
        var self = this;
        self.notify = notify;

        function notify(message, type) {
            var config = {};
            switch (type) {
                case "success":
                    growl.success(message, config);
                    break;
                case "info":
                    growl.info(message, config);
                    break;
                case "warning":
                    growl.warning(message, config);
                    break;
                default:
                    growl.error(message, config);
            }
        }
    }
})();