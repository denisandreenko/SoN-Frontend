'use strict';

angular.module('socialNetwork').controller('VideoController', VideoController);

VideoController.$inject = ['$scope', '$http'];

function VideoController($scope, $http) {

    $scope.video = [];
    $scope.code = "";

    $http.get('http://www.mocky.io/v2/5795f0dd2c000026157829e8').success(success);

    function success(data, status, headers, config) {
        $scope.video = data.video;
        $scope.code = data.code;
    };
};
