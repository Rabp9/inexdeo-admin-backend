'use strict';

/**
 * @ngdoc filter
 * @name inexdeo.filter:menuFilter
 * @function
 * @description
 * # menuFilter
 * Filter in the inexdeo.
 */
angular.module('inexdeoAdminApp')
.filter('menuFilter', function () {
    return function (menu) {
        switch (menu) {
            case 'IN':
                return 'Inicio';
            case 'NS':
                return 'Nosotros';
            case 'PD':
                return 'Productos';
            case 'CL':
                return 'Clientes';
            case 'PY':
                return 'Proyectos';
            case 'CN':
                return 'Contáctanos';
        }
    };
});