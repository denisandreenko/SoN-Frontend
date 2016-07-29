'use strict';

angular.module('socialNetwork').controller('TestController', TestController);

TestController.inject = ['$scope', 'Upload', 'NetworkService', 'Constant'];

function TestController($scope, Upload, NetworkService, Constant) {
    $scope.upload = {};

    $scope.fileName = "";
    $scope.data = {};
    $scope.submit = function () {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.fileName += '.' + $scope.file.name.split('.')[1];
            $scope.upload($scope.file);
        }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        $scope.data = {file: file, 'name': $scope.fileName};
        Upload.upload({
            url: Constant.APIBaseUrl + '/files',
            data: $scope.data
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
};