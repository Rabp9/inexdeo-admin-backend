'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProductosAddCtrl
 * @description
 * # ProductosAddCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('GaleriaAddCtrl', function ($scope, AlbumesService, $uibModalInstance, PagesService) {
    $scope.album = {};
    $scope.methods = {};
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    var tmp_path = $scope.tmp_path;
    $scope.loading = false;
    $scope.title_images = [];
    
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveAlbum = function(album, boton, urls_preview, title_images) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        album.imagenes = [];
        angular.forEach(urls_preview, function(value, key) {
            album.imagenes.push({
                url: value,
                descripcion: title_images[key]
            });
        });
    
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
    
    $scope.delete = function(img, cb) {
        var index = $scope.images.indexOf(img);
        $scope.images.splice(index, 1);
        $scope.urls_preview.splice(index, 1);
        if ($scope.images.length > 0) {
            $scope.methods.open(0);
        } else {
            $scope.methods.close();
        }
    };
    
    $scope.preview = function(images, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        $scope.images = [];
        
        angular.forEach(images, function(value, key) {
            fd.append('files[]', value);
        });
        
        AlbumesService.preview(fd, function(data) {
            $scope.urls_preview = data.filenames;
            var descripcion = 1;
            angular.forEach(data.filenames, function(value, key) {
                var image = {
                    url: tmp_path + value,
                    id: descripcion,
                    deletable : true
                };
                
                $scope.images.push(image);
                descripcion++;
            });
            $scope.loading = false;
            if (data.hasOwnProperty('message')) {
                if (data.message.type === 'error') {
                    alert(data.message.text);
                }
            }
        });
    };
    
});