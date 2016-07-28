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
                "name": "nam1eha",
                "lastName": "lname1a",
                "login": "login1faka",
                "password": "password1a",
                "email": "email@email.com",
                "sex": "1",
                "bday": "20/02/1994"
            };

            // $scope.master = {
            //     "name": $scope.name,
            //     "lastName": $scope.lastName,
            //     "password": $scope.password,
            //     "login": $scope.login,
            //     "sex": $scope.sex,
            //     "birthDay": $scope.dirthDay,
            //     "email": $scope.email
            // };

            var req = {
                method: 'POST',
                url: 'https://sjc2016vs3.fwd.wf/users',
                data: $scope.master
            };


            $http(req).success(success);
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