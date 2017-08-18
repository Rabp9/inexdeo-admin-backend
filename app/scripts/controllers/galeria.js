'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('GaleriaCtrl', function ($scope, AlbumesService, $uibModal) {
    $scope.loading = true;
    
    function getAlbumes() {
        AlbumesService.getAdmin(function(data) {
            $scope.albumes = data.albumes;
            $scope.loading = false;
        });
    }
    getAlbumes();
    
    $scope.showAlbumesAdd = function(event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/galeria-add.html',
            controller: 'GaleriaAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        modalInstanceAdd.result.then(function (data) {
            getAlbumes();
            $scope.message = data;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.showAlbumesEdit = function(album, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/galeria-edit.html',
            controller: 'GaleriaEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                album: function() {
                    return album;
                }
            }
        });
        
        modalInstanceEdit.result.then(function (data) {
            getAlbumes();
            $scope.message = data;
        });
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
    
    $scope.removeAlbum = function(album, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        if (confirm('¿Desea eliminar este álbum?')) {
            AlbumesService.remove({id: album.id}, function(data) {
                $scope.message = data; 
                $scope.loading = true;
                $scope.albumes = [];
                AlbumesService.getAdmin(function(data) {
                    $scope.albumes = data.albumes;
                    $scope.loading = false;
                });
            });
        }
        
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
    };
});