'use strict';

angular.module('socialNetwork').controller('ChangePassController', ChangePassController);

ChangePassController.$inject = ['$scope', 'NetworkService', '$mdToast', 'Constant'];

function ChangePassController($scope, NetworkService, $mdToast, Constant) {
    $scope.newPassword = '';
    $scope.newPasswordConf = '';
    $scope.oldPassword = '';

    $scope.sendData = function () {
        if ($scope.oldPassword != null || $scope.oldPassword != undefined || $scope.oldPassword != '' || $scope.newPassword != null || $scope.newPassword != undefined || $scope.newPassword != '' || $scope.newPasswordConf != null || $scope.newPasswordConf != undefined || $scope.newPasswordConf != '') {
            if ($scope.newPassword == $scope.newPasswordConf) {
                var promise = NetworkService.changePass('/password', $scope.newPassword, $scope.oldPassword).promise;

                promise.then(function (response) {
                    var data = response.getData();
                    if (data.entity == true) {
                        $scope.newPassword = '';
                        $scope.oldPassword = '';
                        $scope.newPasswordConf = '';
                        Constant.ToastMsg = "Password changed.";
                        $mdToast.show({
                            hideDelay: 3000,
                            position: 'top right',
                            controller: 'ToastController',
                            templateUrl: 'view/toast.html'
                        });
                    }
                })
            }
            else {
                Constant.ToastMsg = "Passwords do not match.";
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'ToastController',
                    templateUrl: 'view/toast.html'
                });
            }
        }
        else {
            Constant.ToastMsg = "Please fill all fields.";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
        }
    }
}