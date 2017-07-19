'use strict';

angular.module('inexdeoAdminApp')
.controller('ProyectosCtrl', function ($scope, ProyectosService, $uibModal) {
    $scope.loading = true;
    
    ProyectosService.getAdmin(function(data) {
        $scope.proyectos = data.proyectos;
        $scope.loading = false;
    });
    
    $scope.showProyectosAdd = function(event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/proyectos-add.html',
            controller: 'ProyectosAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        modalInstanceAdd.result.then(function (data) {
            $scope.proyectos.push(data.proyecto);
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.showProyectosEdit = function(proyecto, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/proyectos-edit.html',
            controller: 'ProyectosEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                proyecto: function() {
                    return proyecto;
                }
            }
        });
        
        modalInstanceEdit.result.then(function (data) {
            ProyectosService.getAdmin(function(data) {
                $scope.proyectos = data.proyectos;
            });
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.removeProducto = function(cliente, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        if (confirm('¿Desea eliminar ese proyecto?')) {
            ProyectosService.remove({id: cliente.id}, function(data) {
                $scope.message = data.message; 
                $scope.loading = true;
                $scope.proyectos = [];
                ProyectosService.getAdmin(function(data) {
                    $scope.proyectos = data.proyectos;
                    $scope.loading = false;
                });
            });
        }
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
});