'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.rolesService
 * @description
 * # rolesService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('RolesService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'roles/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'roles/getAdmin/.json',
        }
    });
});