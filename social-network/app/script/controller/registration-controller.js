'use strict';

angular.module('socialNetwork').controller('RegController', RegController);

RegController.$inject = ['$scope', 'NetworkService', '$state', '$mdToast', 'Constant'];

function RegController($scope, NetworkService, $state, $mdToast, Constant) {
    $scope.toastMsg = "";

    $scope.master = {};

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.password = "";
    $scope.login = "";
    $scope.sex = "";
    $scope.birthDate = "";
    $scope.email = "";

    $scope.isName = true;

    $scope.update = function () {
        $scope.birthDate = moment($scope.birthDate).format('DD/MM/YYYY');
        if (checkFields()) {
            $scope.master = {
                "name": $scope.name,
                "lastName": $scope.lastName,
                "login": $scope.login,
                "password": $scope.password,
                "email": $scope.email,
                "sex": $scope.sex,
                "bday": $scope.birthDate
            };

            var promise = NetworkService.registration($scope.master, '/users').promise;

            promise.then(function (responce) {
                var data = responce.getData();
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.password = "";
                $scope.login = "";
                $scope.sex = "";
                $scope.birthDate = $scope.DD = $scope.MM = $scope.YYYY = "";
                $scope.email = "";
                $scope.confirmPass = '';
                Constant.ToastMsg = "Registration successful, now you can authorise !";
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'ToastController',
                    templateUrl: 'view/toast.html'
                });
                $state.go("home");
            });
        }
    };

    function checkFields() {
        if ($scope.firstName == null || $scope.firstName == undefined || $scope.firstName == '' || $scope.lastName == null || $scope.lastName == undefined || $scope.lastName == '' || $scope.password == null || $scope.password == undefined || $scope.password == '' || $scope.login == null || $scope.login == undefined || $scope.login == '' || $scope.sex == null || $scope.sex == undefined || $scope.sex == '' || $scope.birthDate == null || $scope.birthDate == undefined || $scope.birthDate == '' || $scope.email == null || $scope.email == undefined || $scope.email == '')
        {
            Constant.ToastMsg = "Wrong input, check fields !";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            return false;
        }
        else if ($scope.password != $scope.confirmPass) {
            Constant.ToastMsg = "Passwords do not match !";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            return false;
        }
        else return true;
    }

    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear() - 80,
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());
}