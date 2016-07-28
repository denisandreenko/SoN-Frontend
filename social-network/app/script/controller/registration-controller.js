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
            $scope.dirthDay = "02/02/1990"; //angular.copy(user.Day) + '/' + angular.copy(user.Month) + '/' + angular.copy(user.Year);
            $scope.email = angular.copy(user.email);

            $scope.master = {
                "name": $scope.name,
                "lastName": $scope.lastName,
                "pass": $scope.password,
                "login": $scope.login,
                "sex": $scope.sex,
                "birthDay": $scope.dirthDay,
                "email": $scope.email
            };

            var req = {
                method: 'POST',
                url: 'https://sjc2016vs3.fwd.wf/users',
                headers: {
                    'Content-Type': undefined
                },
                data: $scope.master
            };


            $http(req).success(success).error(error);
            alert('Confirm password is correct.')
        }
        else alert('Confirm password is not correct.');
        function success(data) {
            alert('' + data);
        };
        function error(data) {
            alert('' + data)
        }
    };
};