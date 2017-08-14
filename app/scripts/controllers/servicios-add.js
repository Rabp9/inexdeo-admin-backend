'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ServiciosAddCtrl
 * @description
 * # ServiciosAddCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('ServiciosAddCtrl', function ($scope, ServiciosService, $uibModalInstance, PagesService) {
    $scope.servcicio = {};
    $scope.methods = {};
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    var tmp_path = $scope.tmp_path;
    $scope.loading = false;
    $scope.title_images = [];
    $scope.servcicio.portada = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveServicio = function(servcicio, boton, urls_preview, brochure_preview, title_images, portada_preview) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        servcicio.servcicio_images = [];
        angular.forEach(urls_preview, function(value, key) {
            servcicio.servcicio_images.push({
                url: value,
                title: title_images[key]
            });
        });
        if (brochure_preview !== null) {
            servcicio.brochure = brochure_preview;
        }
        if (portada_preview !== null) {
            servcicio.img_portada = portada_preview;
        }
        ServiciosService.save(servcicio, function(data) {
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
        
        ServiciosService.preview(fd, function(data) {
            $scope.urls_preview = data.filenames;
            var title = 1;
            angular.forEach(data.filenames, function(value, key) {
                var image = {
                    url: tmp_path + value,
                    id: title,
                    deletable : true
                };
                
                $scope.images.push(image);
                title++;
            });
            $scope.loading = false;
            if (data.hasOwnProperty('message')) {
                if (data.message.type === 'error') {
                    alert(data.message.text);
                }
            }
        });
    };
    
    $scope.preview_brochure = function(brochure, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', brochure);
        
        ServiciosService.previewBrochure(fd, function(data) {
            if (data.message.type === 'success') {
                $scope.brochure_preview = data.filename;
            } else if (data.message.type === 'error') {
                $scope.brochure_preview = null;
            }
            $scope.loading = false;
        }, function(data) {
            $scope.brochure_preview = null;
            $scope.loading = false;
        });
    };
    
    $scope.preview_portada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        ServiciosService.previewPortada(fd, function(data) {
            $scope.portada_preview = data.filename;
            $scope.loading = false;
        }, function(err) {
            $scope.portada_preview = null;
            $scope.loading = false;
        });
    };
});