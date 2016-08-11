'use strict';

angular.module('socialNetwork').controller('FaceGroupController', FaceGroupController);

FaceGroupController.$inject = ['$scope', 'NetworkService'];

function FaceGroupController($scope, NetworkService) {
    $scope.groupName = "";
    $scope.groupFolowers = "";
    $scope.groupImg = "";
    $scope.groupAbout = "";

    var groupId = 1;

    var promise = NetworkService.getGroup('/groups/' + groupId).promise;

    promise.then(function (response) {
        var data = response.getData();

        $scope.groupName = data.entity.name;
        $scope.groupAbout = data.entity.description;
        $scope.groupFolowers = data.entity.folowers;
        $scope.groupImg = data.entity.image;
    });
};