'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.asesoriasService
 * @description
 * # asesoriasService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('AsesoriasService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'asesorias/:id.json', {}, {
        upload: {
            method: 'POST',
            url: EnvService.getHost() + 'asesorias/upload/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'asesorias/getAdmin/.json'
        }
    });
});