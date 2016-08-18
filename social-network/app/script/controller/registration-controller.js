'use strict';

angular.module('socialNetwork').controller('RegController', RegController);

RegController.$inject = ['$scope', 'NetworkService', '$state', '$mdToast', 'Constant', 'ValidationService'];

function RegController($scope, NetworkService, $state, $mdToast, Constant, ValidationService) {
    $scope.toastMsg = "";

    $scope.master = {};

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.password = "";
    $scope.login = "";
    $scope.sex = "";
    $scope.dirthDay = "";
    $scope.email = "";

    $scope.isName = true;

    $scope.validateField = function (event) {
        var check =  ValidationService.checkField($scope.firstName);
        if(check == 'NOT OK'){
            $scope.isName = false;
        }
        else {
            $scope.isName = true;
        }
    };

    $scope.update = function () {
        $scope.master = {
            "name": $scope.name,
            "lastName": $scope.lastName,
            "login": $scope.login,
            "password": $scope.password,
            "email": $scope.email,
            "sex": $scope.sex,
            "bday": $scope.dirthDay
        };

        var promise = NetworkService.registration($scope.master, '/users').promise;

        promise.then(function (responce) {
            var data = responce.getData();
            Constant.ToastMsg = "Registration successful, now you can authorise !";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            $state.go("home");
        });
    };
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear() - 80,
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());
    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());
};