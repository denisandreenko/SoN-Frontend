'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', 'Constant', '$state'];

function AuthController($scope, NetworkService, Constant, $state, $http) {
    $scope.password = "";
    $scope.login = "";

    $http.common['Authorization'] = 'Bearer ' + Constant.Auth.clientHash;//
    Constant.AuthToken = "";

    $scope.sendData = function () {
        $scope.data = "client_id=passwordClient&" + "grant_type=password&" + "password=" + $scope.password + "&username=" + $scope.login;
        var promise = NetworkService.authorisation($scope.data, "/oauth/token").promise;
        promise.then(function (response) {
            var data = response.getData();
            Constant.AuthToken = data.access_token;

            if (Constant.LastPage != '' && Constant.LastPage != null && Constant.LastPage != undefined) {
                $state.go(Constant.LastPage);
            }
            else {
                $state.go("menu.profile");
            }
        });
    }
}