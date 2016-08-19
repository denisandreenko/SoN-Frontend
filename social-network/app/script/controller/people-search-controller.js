'use strict';
angular.module('socialNetwork').controller('PeopleSearch', PeopleSearch);

PeopleSearch.$inject = ['$scope', 'NetworkService', '$state', 'Constant', 'NotifyService'];

function PeopleSearch($scope, NetworkService, $state, Constant, NotifyService) {
    $scope.people = [];
    // $scope.searchText = '';

    var text = $state.params.searchReq;
    var promise = NetworkService.searchTA(text, '/users/find', 20, 0).promise;

    promise.then(function (response) {
        var data = response.getData();
        $scope.people = data.entity;
    });

    $scope.addToFriends = function(index){
        var userId = $scope.people[index].id;
        var promise = NetworkService.addToFriends(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.UPDATESEARCH, '');
        });
    };

    $scope.deleteFromFriends = function (index) {
        var userId = $scope.people[index].id;
        var promise = NetworkService.deleteFromFriendsns(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.UPDATESEARCH, '');
        });
    };

    $scope.gotoUser = function (index) {
        var id = $scope.people[index].id;
        $state.go('menu.friend', {'userIdentifier': id});
    };

    var hendler = NotifyService.subscribe(Constant.Events.UPDATESEARCH, callback);

    function callback(event, data) {
        text = data;
        var promise = NetworkService.searchTA(text, '/users/find', 20, 0).promise;

        promise.then(function (response) {
            var data = response.getData();
            $scope.people = data.entity;
        });
    }

    $scope.$on('destroy', function () {
        hendler();
    });
}
