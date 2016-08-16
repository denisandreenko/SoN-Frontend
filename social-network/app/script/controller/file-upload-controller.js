'use strict';

angular.module('socialNetwork').controller('FileUploadController', FileUploadController);

FileUploadController.inject = ['$scope', 'Upload', 'Constant', 'authFact', '$mdMedia', '$mdDialog', '$timeout'];

function FileUploadController($scope, Constant, Upload, authFact, $mdMedia, $mdDialog, $timeout) {
    $scope.picFile = '';

    $scope.upload = function (name) {
        $scope.fileName = name;

        var token = authFact.getAccessToken();
        $scope.params = {
            name: $scope.fileName,
            access_token: token
        };

        Upload.upload({
            url: Constant.APIBaseUrl + '/files',
            data: {
                file: $scope.picFile
            },
            params: $scope.params
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
                if ($scope.result.entity != null)
                    Constant.UploadedImgID = $scope.result.entity;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.showAdvanced = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: AvaDialogController,
            templateUrl: 'view/avatarDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function (answer) {
            }, function () {
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

}

angular.module('socialNetwork').controller('AvaDialogController', AvaDialogController);

AvaDialogController.$inject = ['$scope', '$mdDialog'];

function AvaDialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}