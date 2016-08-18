'use strict'

angular.module('socialNetwork').controller('CreateGroupController', CreateGroupController);

CreateGroupController.$inject = ['$scope', 'NetworkService', 'Constant', '$state'];

function CreateGroupController($scope, NetworkService, Constant, $state) {
    $scope.name = '';
    $scope.description = '';

    $scope.sendData = function () {
        var data = {
            name: $scope.name,
            fkImage: 26,//Constant.UploadedImgID || null,
            description: $scope.description
        };

        var promise = NetworkService.createGroup(data, '/groups/add').promise;

        promise.then(function (response) {
            var data = response.getData();
            Constant.UploadedImgID = null;
            $state.go('menu.group', {groupIdentifier: data.entity.id});
        });
    }
}