'use strict';

angular.module('audioApp').controller('AudioController', AudioController);

AudioController.$inject = ['$scope', '$http'];

function AudioController($scope, $http) {

    $scope.audios = [];
    $scope.code = "";
    $scope.playIconUrl = "";

    $http.get('http://www.mocky.io/v2/578f6a2b0f00002018e9a1d7').success(success);

    function success(data) {
        $scope.audios = data.audios;
        $scope.playIconUrl = data.playIcon;
        $scope.code = data.code;
    };
    function doPlay() {
        alert('PlayButton clicked');
    };
};
angular.module('audioApp').filter('trusted', AudioFilter);

AudioFilter.$inject = ['$sce'];

function AudioFilter($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
};