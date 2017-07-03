'use strict';

/**
 * @ngdoc service
 * @name inexdeoAdminApp.TipoSugerenciasService
 * @description
 * # TipoSugerenciasService
 * Factory in the inexdeoAdminApp.
 */
angular.module('inexdeoAdminApp')
.factory('TipoSugerenciasService', function($resource, EnvService) {
    return $resource(EnvService.getHost() + 'tipo_sugerencias/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: EnvService.getHost() + 'tipo_sugerencias/getAdmin/.json',
        },
        removeDetalle: {
            method: 'POST',
            url: EnvService.getHost() + 'tipo_sugerencias/removeDetalle/.json',
        }
    });
});