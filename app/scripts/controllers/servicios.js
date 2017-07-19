'use strict';

angular.module('inexdeoAdminApp')
.controller('ServiciosCtrl', function ($scope, ServiciosService, $uibModal) {
    $scope.loading = true;
    
    ServiciosService.getAdmin(function(data) {
        $scope.servicios = data.servicios;
        $scope.loading = false;
    });
    
    $scope.showServiciosAdd = function(event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/servicios-add.html',
            controller: 'ServiciosAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        modalInstanceAdd.result.then(function (data) {
            $scope.servicios.push(data.servicio);
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.showServiciosEdit = function(servicio, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/servicios-edit.html',
            controller: 'ServiciosEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                servicio: function() {
                    return servicio;
                }
            }
        });
        
        modalInstanceEdit.result.then(function (data) {
            ServiciosService.getAdmin(function(data) {
                $scope.servicios = data.servicios;
            });
            $scope.message = data.message;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.removeServicio = function(cliente, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        if (confirm('¿Desea eliminar ese servicio?')) {
            ServiciosService.remove({id: cliente.id}, function(data) {
                $scope.message = data.message; 
                $scope.loading = true;
                $scope.servicios = [];
                ServiciosService.getAdmin(function(data) {
                    $scope.servicios = data.servicios;
                    $scope.loading = false;
                });
            });
        }
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
});