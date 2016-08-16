'use strict';

angular.module('socialNetwork').controller('FriendListController', FriendListController);

FriendListController.$inject = ['$scope', 'NetworkService', 'authFact', '$state'];

function FriendListController($scope, NetworkService, authFact, $state) {
    $scope.friends = [];

    $scope.code = "";

    var params = {
        userId: authFact.getId(),
        offset: 0,
        limit: 20
    };

    var promise = NetworkService.getFriends('/friends', params).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.friends = data.entity;
    });

    $scope.gotoUserId = function (index) {
        var userID = $scope.friends[index].id;
        $state.go('menu.friend', {'userIdentifier': userID});
    };
}