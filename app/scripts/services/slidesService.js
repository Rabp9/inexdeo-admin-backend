'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.slides
 * @description
 * # slides
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('SlidesService', function ($resource, EnvService) {
    return $resource(EnvService.getHost() + 'slides/:id.json', {}, {
        update: {
            method: 'PUT'
        },
        preview: {
            method: 'POST',
            url: EnvService.getHost() + 'slides/preview/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'slides/getAdmin/.json'
        },
        saveMany: {
            method: 'POST',
            url: EnvService.getHost() + 'slides/saveMany/.json'
        }
    });
});