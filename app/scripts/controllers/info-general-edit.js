'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:InfoGeneralEditCtrl
 * @description
 * # InfoGeneralEditCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('InfoGeneralEditCtrl', function ($scope, info, $uibModalInstance, InfosService) {
    $scope.info = $.extend(true, {}, info);

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveInfoGeneral = function(info, boton) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        InfosService.save(info, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close({
                message: {
                    type: 'error',
                    text: 'Hubo un error. Código: ' + data.status + ' Mensaje: ' + data.statusText
                }
            });
        });
    };
    
    
    $scope.preview_file = function(file, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', file);
        
        InfosService.previewFile(fd, function(data) {
            if (data.message.type === 'success') {
                $scope.file_preview = data.filename;
            } else if (data.message.type === 'error') {
                $scope.file_preview = null;
            }
            $scope.loading = false;
        }, function(data) {
            $scope.file_preview = null;
            $scope.loading = false;
        });
    };
});