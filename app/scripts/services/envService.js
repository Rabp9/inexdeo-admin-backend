'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.envService
 * @description
 * # envService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('EnvService', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost/inexdeo-backend/';
                case 'admin.inexdeo.robertobocanegra.com':
                    return 'http://inexdeo.robertobocanegra.com/api/';
            }
        }
    };
});