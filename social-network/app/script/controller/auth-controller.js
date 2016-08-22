'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', '$state', 'authFact', '$mdMedia', '$mdDialog'];

function AuthController($scope, NetworkService, $state, authFact, $mdMedia, $mdDialog) {
    $scope.password = "";
    $scope.login = "";

    authFact.clearRefreshToken();
    authFact.clearAccessToken();
    authFact.clearId();

    $scope.sendData0 = function () {
        $scope.data = "client_id=passwordClient&" + "grant_type=password&" + "password=" + $scope.password + "&username=" + $scope.login;
        var promise = NetworkService.authorisation($scope.data, "/oauth/token").promise;
        promise.then(function (response) {
            var data = response.getData();
            authFact.setRefreshToken(data.refresh_token);
            authFact.setAccessToken(data.access_token);
            $state.go('menu.profile');
        });
    };

    $scope.showAdvanced = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: AvaDialogController,
            templateUrl: 'view/forgot_pass.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function (answer) {
            }, function () {
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
}