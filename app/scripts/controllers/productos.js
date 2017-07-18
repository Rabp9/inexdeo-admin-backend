'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('ProductosCtrl', function ($scope, ProductosService, $uibModal) {
    $scope.loading = true;
    
    function getProductos() {
        ProductosService.getAdmin(function(data) {
            $scope.productos = data.productos;
            $scope.loading = false;
        });
    }
    getProductos();
    
    $scope.showProductosAdd = function(event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/productos-add.html',
            controller: 'ProductosAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        modalInstanceAdd.result.then(function (data) {
            getProductos();
            $scope.message = data;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.showProductosEdit = function(producto, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/productos-edit.html',
            controller: 'ProductosEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                producto: function() {
                    return producto;
                }
            }
        });
        
        modalInstanceEdit.result.then(function (data) {
            ProductosService.getAdmin(function(data) {
                $scope.productos = data.productos;
            });
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.removeProducto = function(cliente, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        if (confirm('¿Desea eliminar ese producto?')) {
            ProductosService.remove({id: cliente.id}, function(data) {
                $scope.message = data.message; 
                $scope.loading = true;
                $scope.productos = [];
                ProductosService.getAdmin(function(data) {
                    $scope.productos = data.productos;
                    $scope.loading = false;
                });
            });
        }
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
});