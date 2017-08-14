'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:FondosEditCtrl
 * @description
 * # FondosEditCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('FondosEditCtrl', function ($scope, fondo, $uibModalInstance, InfosService) {
    
    function init() {
        $scope.fondo = $.extend(true, {}, fondo);
        $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'img' + '/' + 'bg' + '/';
        $scope.fondo_preview = fondo.value;
    }
    
    init();
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveFondo = function(fondo, boton, fondo_preview) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        if (fondo_preview) {
            fondo.value = fondo_preview;
        }
        InfosService.saveFondo(fondo, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(err) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.preview_fondo = function(fondo, errFiles) {
        $scope.tmp_path = angular.module('inexdeoAdminApp').path_location + 'tmp' + '/';
        $scope.loading_fondo = true;
        var fd = new FormData();
        fd.append('file', fondo);
        
        InfosService.previewFondo(fd, function(data) {
            $scope.fondo_preview = data.filename;
            $scope.loading_fondo = false;
        }, function(err) {
            $scope.fondo_preview = null;
            $scope.loading_fondo = false;
        });
    };
});