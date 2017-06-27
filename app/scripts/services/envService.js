'use strict';

/**
 * @ngdoc service
 * @name tuplastAdminApp.envService
 * @description
 * # envService
 * Factory in the tuplastAdminApp.
 */
angular.module('tuplastAdminApp')
.factory('EnvService', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8000/inexdeo-backend/';
                case 'admin.inexdeo.robertobocanegra.com':
                    return 'http://inexdeo.robertobocanegra.com/api/';
            }
        }
    };
});