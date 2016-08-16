'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', 'Constant'];

function AuthController($scope, NetworkService, Constant) {
    $scope.password = "";
    $scope.login = "";

    $scope.sendData = function () {
        $scope.data = "client_id=passwordClient&" + "grant_type=password&" + "password=" +$scope.password + "&username=" + $scope.login;
        var promise = NetworkService.post($scope.data, "/oauth/token") .promise;
        promise.then(function (response) {
            var data = response.getData();

            Constant.AuthToken = data.access_token;
        });
    }
}