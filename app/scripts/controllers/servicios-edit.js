'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:ServiciosEditCtrl
 * @description
 * # ServiciosEditCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('ServiciosEditCtrl', function ($scope, servicio, $uibModalInstance, 
    ServiciosService, $q, PagesService) {
        
    $scope.loading = false;
    $scope.servicio = {};
    var start = 0;
    var changed = false;
    $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'img' + '/Servicios'; 
    
    $scope.tinymceServiciosOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code image',
        language_url : '/scripts/langs_tinymce/es.js',
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
            $scope.input = field_name;
            $('#flImagen').click();
        }
    };
    
    init();
    
    function init() {
        ServiciosService.get({id: servicio.id}, function(data) {
            $scope.servicio = data.servicio;
            $scope.portada_preview = $scope.servicio.img_portada;
            $scope.servicio.img_portada = null;
            
            start = $scope.servicio.servicio_images.length;    
            angular.forEach($scope.servicio.servicio_images, function(value, key) {
                $scope.images.push({
                    url: angular.module('inexdeoAdminApp').path_location + 'img' + '/' + 'Servicios' + '/' + value.url,
                    id: value.id,
                    deletable : true,
                    title: value.title
                });
                $scope.title_images.push(value.title);
            });
        });
    }
    $scope.images = [];
    $scope.methods = {};
    $scope.title_images = [];
    var tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveServicio = function(servicio, boton, urls_preview, brochure_preview, title_images, portada_preview) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        angular.forEach(urls_preview, function(value, key) {
            servicio.servicio_images.push({
                url: value,
                title: title_images[start + key]
            });
        });
        if (brochure_preview !== null) {
            servicio.brochure = brochure_preview;
        }
        if (changed) {
            if (portada_preview !== null) {
                servicio.img_portada = portada_preview;
            }
        }
        ServiciosService.save(servicio, function(data) {
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
            ServiciosService.deleteImage({id: img.id}, function(data) {
                $scope.images.splice(index, 1);
                $scope.title_images.splice(index, 1);
                angular.forEach($scope.servicio.servicio_images, function(value, key) {
                    if (value.id === img.id) {
                        $scope.servicio.servicio_images.splice(key, 1);
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
        
        angular.forEach(images, function(value, key) {
            fd.append('files[]', value);
        });
        
        ServiciosService.preview(fd, function(data) {
            $scope.loading = true;
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
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.portada_preview = null;
            $scope.loading = false;
        });
    };
});