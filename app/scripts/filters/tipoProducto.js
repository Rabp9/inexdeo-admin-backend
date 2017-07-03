'use strict';

/**
 * @ngdoc filter
 * @name inexdeo.filter:tipoProducto
 * @function
 * @description
 * # tipoProducto
 * Filter in the inexdeo.
 */
angular.module('inexdeoAdminApp')
.filter('tipoProducto', function () {
    return function (tipo) {
        switch(tipo) {
            case 'P':
                return 'Página';
            case 'A':
                return 'Area';
            case 'L':
                return 'Línea de Producto';
        }
    };
});