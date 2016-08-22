'use strict'

angular.module('socialNetwork').controller('CreateGroupController', CreateGroupController);

CreateGroupController.$inject = ['$scope', 'NetworkService', 'Constant', '$state'];

function CreateGroupController($scope, NetworkService, Constant, $state) {
    $scope.name = '';
    $scope.description = '';

    $scope.sendDataGroup = function () {
        var data = {
            name: $scope.name,
            urlImage: 'https://www.dropbox.com/s/148w1p25rmvs9lx/2He215sph3g.png?dl=1' || null,
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