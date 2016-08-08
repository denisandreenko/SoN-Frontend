'use strict';

angular.module('socialNetwork').controller('FriendController', FriendController);

FriendController.$inject = ['$scope', '$http'];

function FriendController($scope, $http) {
    if (authFact.getAccessToken()) {
        $scope.friends = [];

        $scope.code = "";
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
};