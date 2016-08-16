'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', '$state', 'authFact'];

function AuthController($scope, NetworkService, $state, authFact) {
    $scope.password = "";
    $scope.login = "";

    authFact.clearAccessToken();
    authFact.clearId();

    $scope.sendData0 = function () {
        $scope.data = "client_id=passwordClient&" + "grant_type=password&" + "password=" + $scope.password + "&username=" + $scope.login;
        var promise = NetworkService.authorisation($scope.data, "/oauth/token").promise;
        promise.then(function (response) {
            var data = response.getData();
            authFact.setAccessToken(data.access_token);
            $state.go('menu.profile');
        });
    }
}