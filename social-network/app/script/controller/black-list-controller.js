'use strict';

angular.module('socialNetwork').controller('BlackListController', BlackListController);

BlackListController.$inject = ['$scope', 'authFact', 'NetworkService', 'Constant', 'NotifyService'];

function BlackListController($scope, authFact, NetworkService, Constant, NotifyService) {
    $scope.users = [];
    $scope.code = "";
    $scope.bUserId = '';

    var userId = authFact.getId();
    var promise = NetworkService.getBlackList('/blacklist', userId, 0, 40).promise;

    promise.then(function (response) {
        var data = response.getData();
        $scope.users = data.entity;
    });

    $scope.addTBL = function () {
        if ($scope.bUserId != null && $scope.bUserId != undefined && $scope.bUserId != '')
            var params = {
                ownerId: authFact.getId(),
                bUserId: $scope.bUserId
            };
        var promise = NetworkService.addToBlackList(params, '/blacklist').promise;

        promise.then(function (response) {
            var data = response.getData();
            $scope.bUserId = '';
            $scope.refreshbList();
        });
    };
    $scope.deleteFBL = function (index) {
        var params = {
            ownerId: authFact.getId(),
            bUserId: $scope.users[index].id
        };
        var promise = NetworkService.deleteFromBlackList(params, '/blacklist').promise;

        promise.then(function (response) {
            var data = response.getData();
            $scope.refreshbList();
        });
    };

    $scope.refreshbList = function () {
        NotifyService.notify(Constant.Events.REFRESHBLIST, '');
    };

    var hendler = NotifyService.subscribe(Constant.Events.REFRESHBLIST, callback);

    $scope.$on('destroy', function () {
        hendler();
    });

    function callback() {
        var userId = authFact.getId();
        var promise = NetworkService.getBlackList('/blacklist', userId, 0, 40).promise;

        promise.then(function (response) {
            var data = response.getData();
            $scope.users = data.entity;
        });
    }
}