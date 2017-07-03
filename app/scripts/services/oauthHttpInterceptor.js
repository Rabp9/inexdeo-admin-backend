'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.oauthHttpInterceptor
 * @description
 * # oauthHttpInterceptor
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('oauthHttpInterceptor', function ($cookies) {
    return {
        request: function (config) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('inexdeo-token');
            return config;
        }
    };
});