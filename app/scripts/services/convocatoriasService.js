'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.convocatoriasService
 * @description
 * # convocatoriasService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('ConvocatoriasService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'convocatorias/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'convocatorias/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'convocatorias/getAdmin/.json',        
        }
    });
});