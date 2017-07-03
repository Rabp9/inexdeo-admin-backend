'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.usersService
 * @description
 * # usersService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('UsersService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'users/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'users/getAdmin/.json',
        },
        login: {
            method: 'POST',
            url: EnvService.getHost() + 'users/token/.json',
        }
    });
});