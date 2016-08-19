'use strict';

angular.module('socialNetwork').controller('GroupSearchController', GroupSearchController);

GroupSearchController.$inject = ['$scope', '$state', 'NotifyService', 'NetworkService', 'Constant'];

function GroupSearchController($scope, $state, NotifyService, NetworkService, Constant) {
    $scope.groups = [];

    var hendler = NotifyService.subscribe(Constant.Events.UPDATEGSEARCH, callback);

    function callback(event, data) {
        text = data;
        var promise = NetworkService.searchG(text, '/groups/find', 20, 0).promise;

        promise.then(function (response) {
            var data = response.getData();
            $scope.groups = data.entity;
        });
    }

    $scope.gotoGroup = function (index) {
        var groupId = $scope.groups[index].id;
        $state.go('menu.group', {"groupIdentifier": groupId});
    };

    var text = $state.params.searchReq;
    NotifyService.notify(Constant.Events.UPDATEGSEARCH, text);

    $scope.$on('destroy', function () {
        hendler();
    });
}