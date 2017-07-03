'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.productosService
 * @description
 * # productosService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('ProductosService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'productos/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'productos/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'productos/getAdmin/.json'
        },
        deleteImage: {
            method: 'POST',
            url: EnvService.getHost() + 'productos/deleteImage/.json'
        },
        previewBrochure: {
            method: 'POST',
            url: EnvService.getHost() + 'productos/previewBrochure/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        previewPortada: {
            method: 'POST',
            url: EnvService.getHost() + 'productos/previewPortada/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: EnvService.getHost() + 'productos/remove/.json'
        }
    });
});