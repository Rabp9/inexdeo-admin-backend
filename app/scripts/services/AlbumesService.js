'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.productosService
 * @description
 * # productosService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('AlbumesService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'albumes/:id.json', {}, {
    	preview: {
            method: 'POST',
            url: EnvService.getHost() + 'albumes/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'albumes/getAdmin/.json'
        },
        deleteImage: {
            method: 'POST',
            url: EnvService.getHost() + 'albumes/deleteImage/.json'
        },
        remove: {
            method: 'POST',
            url: EnvService.getHost() + 'albumes/remove/.json'
        }
    });
});