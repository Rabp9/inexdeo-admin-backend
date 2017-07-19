'use strict';

angular.module('inexdeoAdminApp')
.factory('ServiciosService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'servicios/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'servicios/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'servicios/getAdmin/.json'
        },
        deleteImage: {
            method: 'POST',
            url: EnvService.getHost() + 'servicios/deleteImage/.json'
        },
        previewBrochure: {
            method: 'POST',
            url: EnvService.getHost() + 'servicios/previewBrochure/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        previewPortada: {
            method: 'POST',
            url: EnvService.getHost() + 'servicios/previewPortada/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: EnvService.getHost() + 'servicios/remove/.json'
        }
    });
});