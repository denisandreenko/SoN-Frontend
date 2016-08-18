'use strict';

angular.module('socialNetwork').controller('MyGroupController', MyGroupController);

MyGroupController.$inject = ['$scope', 'NetworkService', 'authFact', '$state'];

function MyGroupController($scope, NetworkService, authFact, $state) {
    $scope.groups = [];
    $scope.code = "";
    var userId = authFact.getId();

    var promise = NetworkService.getGroups('/groups', 20, 0, userId).promise;

    promise.then(function (response) {
        var data = response.getData();
        $scope.groups = data.entity;
    });
    
    $scope.gotoGroup = function (index) {
        var groupId = $scope.groups[index].id;
        $state.go('menu.group', {'groupIdentifier': groupId});
    }
}