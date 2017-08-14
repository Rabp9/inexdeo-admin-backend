'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProductosAddCtrl
 * @description
 * # ProductosAddCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('GaleriaEditCtrl', function ($scope, AlbumesService, $uibModalInstance, PagesService) {
    $scope.album = {};
    $scope.methods = {};
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    var tmp_path = $scope.tmp_path;
    $scope.loading = false;
    $scope.title_images = [];
    $scope.album.portada = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveAlbum = function(album, boton) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        AlbumesService.save(album, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function (err) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(err.data);
        });
    };

});