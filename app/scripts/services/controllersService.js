'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.controllersService
 * @description
 * # controllersService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('ControllersService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'controllers/:id.json', {});
});