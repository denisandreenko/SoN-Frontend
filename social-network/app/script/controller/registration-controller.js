'use strict';

angular.module('socialNetwork').controller('RegController', RegController);

RegController.$inject = ['$scope', '$http'];

function RegController($scope, $http) {

    $scope.master = {};

    $scope.update = function (user) {
        $scope.master = angular.copy(user);

        var req = {
            method: 'POST',
            url: 'http://private-bc396-authorisation.apiary-mock.com/oauth/token',
            headers: {
                'Content-Type': undefined
            },
            data: $scope.master
        };


        $http(req).success(success);
        function success(data) {
            alert('' + data.message);
        };

    };


};