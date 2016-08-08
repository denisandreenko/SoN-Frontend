'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', 'Constant', '$state'];

function AuthController($scope, NetworkService, Constant, $state) {
    $scope.password = "";
    $scope.login = "";

    $scope.sendData = function () {
        $scope.data = "client_id=passwordClient&" + "grant_type=password&" + "password=" +$scope.password + "&username=" + $scope.login;
        var promise = NetworkService.authorisation($scope.data, "/oauth/token").promise;
        promise.then(function (response) {
            var data = response.getData();
            Constant.AuthToken = data.access_token;

            $state.go("menu.profile");
        });
    }
}