'use strict';

angular.module('socialNetwork').controller('GroupController', GroupController);

GroupController.$inject = ['$scope', '$http'];

function GroupController($scope, $http) {
    if (authFact.getAccessToken()) {
        $scope.groups = [];

        $scope.code = "";
        //TODO groupRequest throu networkService
        // $http.get('http://www.mocky.io/v2/5790be62260000a2177ee573').success(success);
        //
        // function success(data, status, headers, config) {
        //     if (status == 200) {
        //         $scope.groups = data.groups;
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