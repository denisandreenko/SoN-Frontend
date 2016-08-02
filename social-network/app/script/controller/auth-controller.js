'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService'];

function AuthController($scope, NetworkService) {
    $scope.password = "";
    $scope.login = "";

    $scope.data = {
        client_id: "passwordClient",
        grant_type: "password",
        password: $scope.password,
        username: $scope.login
    }

    $scope.sendData = function () {
        var promise = NetworkService.post($scope.data, "/oauth/token").promise;
        promise.then(function (response) {
            var data = response.getData();
        });
    }
}