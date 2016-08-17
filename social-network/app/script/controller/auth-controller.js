'use strict';

angular.module('socialNetwork').controller('AuthController', AuthController);

AuthController.$inject = ['$scope', 'NetworkService', '$state', 'authFact', '$mdMedia', '$mdDialog'];

function AuthController($scope, NetworkService, $state, authFact, $mdMedia, $mdDialog) {
    // $scope.email = 'Ola@mail.ru';
    //
    // var promise = NetworkService.forgotPass('/users/changePassword', $scope.email).promise;
    //
    // promise.then(function (response) {
    //     var data = response.getData();
    // });



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