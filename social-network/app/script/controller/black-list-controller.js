'use strict';

angular.module('socialNetwork').controller('BlackListController', BlackListController);

BlackListController.$inject = ['$scope', '$http'];

function BlackListController($scope, $http) {

    $scope.users = [];

    $scope.code = "";

    $http.get('http://www.mocky.io/v2/57975147260000a51217fac5').success(success);

    function success(data, status, headers, config){
        if(status == 200)
        {
            $scope.users = data.list;
            $scope.code = data.code;
        }
    };
};