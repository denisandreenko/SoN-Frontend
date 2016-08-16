'use strict';

angular.module('socialNetwork').controller('FaceGroupController', FaceGroupController);

FaceGroupController.$inject = ['$scope', 'NetworkService'];

function FaceGroupController($scope, NetworkService) {
    $scope.groupName = "";
    $scope.groupFolowers = "";
    $scope.groupImg = "";
    $scope.groupAbout = "";
    $scope.groupId = 1;

    var promise = NetworkService.getGroup('/groups/' + $scope.groupId).promise;

    promise.then(function (response) {
        var data = response.getData();

        $scope.groupId = data.entity.id;
        $scope.groupName = data.entity.name;
        $scope.groupAbout = data.entity.description;
        $scope.groupFolowers = data.entity.folowers;
        $scope.groupImg = data.entity.image;
    });
    
    $scope.join = function () {
        var joinPromise = NetworkService.joinGroup('/groups', $scope.groupId).promise;

        joinPromise.then(function (response) {
            var data = response.getData();
        });
    };

    $scope.leave = function () {
        var leavePromise = NetworkService.leaveGroup('/groups', $scope.groupId).promise;

        leavePromise.then(function (response) {
            var data = response.getData();
        });
    };
}
