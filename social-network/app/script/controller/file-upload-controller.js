'use strict';

angular.module('socialNetwork').controller('FileUploadController', FileUploadController);

FileUploadController.inject = ['$scope', 'Upload', 'Constant', 'authFact', '$mdMedia', '$mdDialog', '$timeout', 'NotifyService'];

function FileUploadController($scope, Constant, Upload, authFact, $mdMedia, $mdDialog, $timeout, NotifyService) {
    $scope.picFile = '';
    $scope.acceptFiles = 'image/*';

    var hendler = NotifyService.subscribe(Constant.Events.FILEUPLOAD, callback);

    function callback(event, data){
        $scope.acceptFiles = data;
    }

    $scope.$on('destroy', function () {
       hendler();
    });

    $scope.upload = function (name) {
        if ($scope.picFile == '' || $scope.picFile == null || $scope.picFile == undefined) {
            Constant.ToastMsg = 'Please choose a file before submit upload !';

        }
        else {
            $scope.fileName = name;

            var token = authFact.getAccessToken();
            $scope.params = {
                access_token: token
            };

            Upload.upload({
                url: Constant.APIBaseUrl + '/files',
                data: {
                    name: $scope.fileName,
                    file: $scope.picFile
                },
                params: $scope.params
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    Constant.UploadedFileUrl = $scope.result.entity;
                    $scope.isLoading = false;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                $scope.isLoading = true;
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    };

    $scope.showAdvanced = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            templateUrl: 'view/fileDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function (answer) {
        }, function () {
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

}