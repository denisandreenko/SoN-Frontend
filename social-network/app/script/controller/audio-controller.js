'use strict';

angular.module('socialNetwork').controller('AudioController', AudioController);

AudioController.$inject = ['$scope', 'NetworkService', '$sce'];

function AudioController($scope, NetworkService, $sce) {

    $scope.source = "";
    $scope.audios = [];
    $scope.code = "";
    $scope.playIconUrl = "";
    $scope.lastIdPlayed = -1;

    var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a321083b00004010903427', 123).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.audios = data.audios;
        $scope.playIconUrl = data.playIcon;
        $scope.code = data.code;
    });

    $scope.setPlayingTrack = function (index) {
        if($scope.lastIdPlayed != -1){
            $scope.playIconUrl = $scope.audios.pauseIcon;
        }
        $scope.lastIdPlayed = index;
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