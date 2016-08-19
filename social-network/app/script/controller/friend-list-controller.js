'use strict';

angular.module('socialNetwork').controller('FriendListController', FriendListController);

FriendListController.$inject = ['$scope', 'NetworkService', 'authFact', '$state', 'Constant', 'NotifyService'];

function FriendListController($scope, NetworkService, authFact, $state, Constant, NotifyService) {
    $scope.friends = [];

    $scope.code = "";

    var params = {
        userId: authFact.getId(),
        offset: 0,
        limit: 20
    };

    var hendler = NotifyService.subscribe(Constant.Events.UPDATEFRIENDS, callback);

    function callback(event, data) {
        var promise = NetworkService.getFriends('/friends', params).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.friends = data.entity;
        });
    }

    $scope.deleteFromFriends = function (index) {
        var userId = $scope.friends[index].id;
        var promise = NetworkService.deleteFromFriendsns(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.UPDATEFRIENDS, '');
        });
    };

    $scope.gotoUserId = function (index) {
        var userID = $scope.friends[index].id;
        $state.go('menu.friend', {'userIdentifier': userID});
    };

    NotifyService.notify(Constant.Events.UPDATEFRIENDS, '');

    $scope.$on('destroy', function () {
        hendler();
    })
}