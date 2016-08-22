'use strict'

angular.module('socialNetwork').controller('CreateGroupController', CreateGroupController);

CreateGroupController.$inject = ['$scope', 'NetworkService', 'Constant', '$state'];

function CreateGroupController($scope, NetworkService, Constant, $state) {
    $scope.name = '';
    $scope.description = '';
    Constant.AcceptFiles = 'image/*';


    $scope.sendDataGroup = function () {
        var data = {
            name: $scope.name,
            urlImage: Constant.UploadedFileUrl || null,
            description: $scope.description
        };

        var promise = NetworkService.createGroup(data, '/groups').promise;

        promise.then(function (response) {
            var data = response.getData();
            Constant.UploadedFileUrl = null;
            $state.go('menu.group', {groupIdentifier: data.entity});
        });
    }
}