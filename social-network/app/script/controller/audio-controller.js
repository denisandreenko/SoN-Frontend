'use strict';

angular.module('socialNetwork').controller('AudioController', AudioController);

AudioController.$inject = ['$scope', 'NetworkService', '$sce'];

function AudioController($scope, NetworkService, $sce) {

    $scope.source = "";
    $scope.audios = [];
    $scope.code = "";
    $scope.playIconUrl = "";

    var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a07a130f0000be160f65af', 123).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.audios = data.audios;
        $scope.playIconUrl = data.playIcon;
        $scope.code = data.code;
    });

    $scope.setPlayingTrack = function (index) {
        $scope.source = $sce.trustAsResourceUrl($scope.audios[index].audioUrl);
    }
};
angular.module('socialNetwork').filter('trusted', AudioFilter);

AudioFilter.$inject = ['$sce'];

function AudioFilter($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
};