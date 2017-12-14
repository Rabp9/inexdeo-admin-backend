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
        
        if ($scope.file_preview !== null) {
            info.value = $scope.file_preview;
        }
        InfosService.save(info, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(err) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.preview_file = function(file, errFiles) {
        if (errFiles.length) {
            if (errFiles[0].$errorMessages.maxSize) {
                alert('El archivo supera los 10 MB');
                return;
            }
        }
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', file);
        
        InfosService.previewFile(fd, function(data) {
            $scope.file_preview = data.filename;
            $scope.loading = false;
        }, function(err) {
            $scope.file_preview = null;
            $scope.loading = false;
        });
    };
});