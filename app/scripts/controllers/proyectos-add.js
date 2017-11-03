'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ProyectosAddCtrl
 * @description
 * # ProyectosAddCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('ProyectosAddCtrl', function ($scope, ProyectosService, $uibModalInstance, PagesService) {
    $scope.proyecto = {};
    $scope.methods = {};
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    var tmp_path = $scope.tmp_path;
    $scope.loading = false;
    $scope.title_images = [];
    $scope.proyecto.portada = false;
    $scope.loading_portada = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveProyecto = function(proyecto, boton, urls_preview, brochure_preview, title_images, portada_preview) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        proyecto.proyecto_images = [];
        angular.forEach(urls_preview, function(value, key) {
            proyecto.proyecto_images.push({
                url: value,
                title: title_images[key]
            });
        });
        if (brochure_preview !== null) {
            proyecto.brochure = brochure_preview;
        }
        if (portada_preview !== null) {
            proyecto.img_portada = portada_preview;
        }
        ProyectosService.save(proyecto, function(data) {
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
        if (errFiles.length) {
            if (errFiles[0].$errorMessages.maxSize) {
                alert('Alguna de las imágenes sobrepasa los 10 MB');
                return;
            }
        }
        $scope.loading = true;
        var fd = new FormData();
        $scope.images = [];
        
        angular.forEach(images, function(value, key) {
            fd.append('files[]', value);
        });
        
        ProyectosService.preview(fd, function(data) {
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
        
        ProyectosService.previewBrochure(fd, function(data) {
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
        if (errFiles.length) {
            if (errFiles[0].$errorMessages.maxSize) {
                alert('La imagen sobrepasa los 10 MB');
                return;
            }
        }
        $scope.loading_portada = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        ProyectosService.previewPortada(fd, function(data) {
            $scope.portada_preview = data.filename;
            $scope.loading_portada = false;
        }, function(err) {
            $scope.portada_preview = null;
            $scope.loading_portada = false;
        });
    };
});