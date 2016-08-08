'use strict';

angular.module('socialNetwork').controller('BlackListController', BlackListController);

BlackListController.$inject = ['$scope', '$http', '$state', '$mdToast'];

function BlackListController($scope, $http, $state, $mdToast) {
    if(Constant.AuthToken != "" && Constant.AuthToken != null && Constant.AuthToken != undefined) {
        $scope.users = [];

        $scope.code = "";

        $http.get('http://www.mocky.io/v2/57975147260000a51217fac5').success($scope.success);
        $scope.success = function (data, status, headers, config) {
            if (status == 200) {
                $scope.users = data.list;
                $scope.code = data.code;
            }
        };
    }
    else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/reg-toast.html'
        });
        Constant.LastPage = 'menu.profile';
        $state.go('home');
    }
};