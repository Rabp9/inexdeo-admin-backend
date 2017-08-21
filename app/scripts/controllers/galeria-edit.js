'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProductosEditCtrl
 * @description
 * # ProductosEditCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('GaleriaEditCtrl', function ($scope, album, $uibModalInstance, 
    AlbumesService, $q) {
        
    $scope.loading = false;
    $scope.album = {};
    var start = 0;
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'img' + '/galeria'; 
        
    function init() {
        AlbumesService.get({id: album.id}, function(data) {
            $scope.album = data.album;
           
            start = $scope.album.imagenes.length;    
            angular.forEach($scope.album.imagenes, function(value, key) {
                $scope.images.push({
                    url: angular.module('inexdeoAdminApp').path_location + 'img' + '/' + 'galeria' + '/' + value.url,
                    id: value.id,
                    deletable : true,
                    descripcion: value.descripcion
                });
                $scope.title_images.push(value.descripcion);
            });
        });
    }
    
    init();
    
    $scope.images = [];
    $scope.methods = {};
    $scope.title_images = [];
    var tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveAlbum = function(album, boton, urls_preview, title_images) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        angular.forEach(urls_preview, function(value, key) {
            album.imagenes.push({
                url: value,
                descripcion: title_images[start + key]
            });
        });
        
        AlbumesService.save(album, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(err) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.delete = function(img, cb) {
        if (confirm('¿Està seguro de eliminar esta imagen?')) {
            var index = $scope.images.indexOf(img);
            AlbumesService.deleteImage({id: img.id}, function(data) {
                $scope.images.splice(index, 1);
                $scope.title_images.splice(index, 1);
                angular.forEach($scope.album.imagenes, function(value, key) {
                    if (value.id === img.id) {
                        $scope.album.imagenes.splice(key, 1);
                    }
                });
                // $scope.urls_preview.splice(index, 1);
                if ($scope.images.length > 0) {
                    $scope.methods.open(0);
                } else {
                    $scope.methods.close();
                }
            });
        }
    };
    
    $scope.preview = function(images, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        
        $scope.images = $scope.images.slice(0, start);
        
        angular.forEach(images, function(value, key) {
            fd.append('files[]', value);
        });
        
        AlbumesService.preview(fd, function(data) {
            $scope.loading = true;
            $scope.urls_preview = data.filenames;
            var title = 'a';
            angular.forEach(data.filenames, function(value, key) {
                var image = {
                    url: tmp_path + value,
                    id: title,
                    deletable : true
                };
                
                $scope.images.push(image);
                title = nextChar(title);
            });
            $scope.loading = false;
            if (data.hasOwnProperty('message')) {
                if (data.message.type === 'error') {
                    alert(data.message.text);
                }
            }
        });
    };
    
    function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    
});