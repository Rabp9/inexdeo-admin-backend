'use strict';

/**
 * @ngdoc function
 * @name inexdeoAdminApp.controller:InfoGeneralCtrl
 * @description
 * # InfoGeneralCtrl
 * Controller of the inexdeoAdminApp
 */
angular.module('inexdeoAdminApp')
.controller('InfoGeneralCtrl', function ($scope, InfosService, $uibModal) {
    var search = ['mision', 'vision', 'historia', 'promo_inexdeo', 'quienes_somos', 
        'facebook_link', 'email', 'telf', 'direccion', 'productos_mensaje', 'servicios_mensaje', 
        'proyectos_mensaje', 'video', 'brochure'];
    
    $scope.loading = true;
    
    InfosService.getDataByData(search, function(data) {
        $scope.infos = data.infos;
        $scope.loading = false;
    });
    
    $scope.showInfosEdit = function(info, event) {
        $(event.currentTarget).addClass('disabled');
        $(event.currentTarget).prop('disabled', true);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/info-general-edit.html',
            controller: 'InfoGeneralEditCtrl',
            backdrop: false,
            resolve: {
                info: function() {
                    return info;
                }
            }
        });
        $(event.currentTarget).removeClass('disabled');
        $(event.currentTarget).prop('disabled', false);
        
        modalInstanceEdit.result.then(function (data) {
            InfosService.getDataByData(search, function(data) {
                $scope.infos = data.infos;
            });
            $scope.message = data.message;
        });
    };
});