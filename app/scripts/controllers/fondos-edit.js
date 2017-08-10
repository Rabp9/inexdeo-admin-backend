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
    $scope.fondo = $.extend(true, {}, fondo);

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveFondo = function(fondo, boton) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        InfosService.save(fondo, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(err) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(err.data);
        });
    };
});