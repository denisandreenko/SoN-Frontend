'use strict';

angular.module('socialNetwork').controller('RegController', RegController);

RegController.$inject = ['$scope', '$http'];

function RegController($scope, $http) {

    $scope.master = {};

    $scope.name = "";
    $scope.lastName = "";
    $scope.password = "";
    $scope.login = "";
    $scope.sex = "";
    $scope.dirthDay = "";
    $scope.email = "";


    $scope.update = function (user) {
        if (user.pass != undefined && user.pass == user.confirmPass) {
            $scope.name = angular.copy(user.name);
            $scope.lastName = angular.copy(user.lastName);
            $scope.password = angular.copy(user.pass);
            $scope.login = angular.copy(user.login);
            $scope.sex = angular.copy(user.sex);
            $scope.dirthDay = moment(angular.copy(user.birthDate)).format('DD/MM/YYYY');
            $scope.email = angular.copy(user.email);

            $scope.master= {
                "name": $scope.name,
                "lastName": $scope.lastName,
                "login": $scope.login,
                "password": $scope.password,
                "email": $scope.email,
                "sex": $scope.sex,
                "bday": $scope.dirthDay
            };
            var promise = NetworkService.postReg(master).promise;

            promise.then(function (responce) {
                var data = responce.getData();
                alert('' + data.statusType);
            })
        }
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