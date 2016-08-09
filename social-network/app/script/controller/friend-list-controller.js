'use strict';

angular.module('socialNetwork').controller('FriendListController', FriendListController);

FriendListController.$inject = ['$scope', 'NetworkService', 'authFact', 'Constant', '$state'];

function FriendListController($scope, NetworkService, authFact, Constant, $state) {
    if (authFact.getAccessToken()) {
        $scope.friends = [];

        $scope.code = "";

        var params = {
            userId: Constant.MyId,
            offset: 0,
            limit: 5
        };

        var promise = NetworkService.getFriends('/friends', params).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.friends = data.entity;
        });

        //TODO friendRequest throu networkService
        // $http.get('http://www.mocky.io/v2/578f8e0326000017017ee3c4').success(success);
        //
        // function success(data, status, headers, config) {
        //     if (status == 200) {
        //         $scope.friends = data.friends;
        //         $scope.code = data.code;
        //     }
        // };
    } else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/toast.html'
        });
        $state.go('home');
    }

    $scope.gotoUserId = function (index) {
        var userID = $scope.friends[index].idUser;
        $state.go('menu.friend', {'userIdentifier': userID});
    }
}