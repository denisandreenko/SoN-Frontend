'use strict';

angular.module('socialNetwork').controller('MyGroupController', MyGroupController);

MyGroupController.$inject = ['$scope', 'NetworkService', 'authFact'];

function MyGroupController($scope, NetworkService, authFact) {
    $scope.groups = [];

    $scope.code = "";

    var userId = authFact.getId();

    var promise = NetworkService.getGroups('/groups', 20, 0, userId).promise;

    promise.then(function (response) {
        var data = response.getData();
        $scope.groups = data.entity;
    });
}