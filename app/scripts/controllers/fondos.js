'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:FondosCtrl
 * @description
 * # FondosCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('FondosCtrl', function ($scope, InfosService, $uibModal) {
    var search = ['bg_contactanos', 'bg_hero', 'bg_quienes_somos', 'bg_historia'];
    
    $scope.loading = true;
    
    InfosService.getDataByData(search, function(data) {
        $scope.fondos = data.infos;
        $scope.loading = false;
    });
    
    $scope.showFondosEdit = function(fondo, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/fondos-edit.html',
            controller: 'FondosEditCtrl',
            backdrop: false,
            resolve: {
                fondo: function() {
                    return fondo;
                }
            }
        });
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
        
        modalInstanceEdit.result.then(function (data) {
            InfosService.getDataByData(search, function(data) {
                $scope.fondos = data.infos;
            });
            $scope.message = data;
        });
    };
});