'use strict';

angular.module('inexdeoAdminApp')
.factory('ProyectosService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'proyectos/:id.json', {}, {
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'proyectos/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'proyectos/getAdmin/.json'
        },
        deleteImage: {
            method: 'POST',
            url: EnvService.getHost() + 'proyectos/deleteImage/.json'
        },
        previewBrochure: {
            method: 'POST',
            url: EnvService.getHost() + 'proyectos/previewBrochure/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        previewPortada: {
            method: 'POST',
            url: EnvService.getHost() + 'proyectos/previewPortada/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: EnvService.getHost() + 'proyectos/remove/.json'
        }
    });
});