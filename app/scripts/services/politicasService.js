'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.politicas
 * @description
 * # politicas
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('PoliticasService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'politicas/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'politicas/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'politicas/getAdmin/.json'
        }
    });
});