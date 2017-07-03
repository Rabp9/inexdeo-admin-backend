'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.clientesService
 * @description
 * # clientesService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('ClientesService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'clientes/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'clientes/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'clientes/getAdmin/.json',
        }
    });
});