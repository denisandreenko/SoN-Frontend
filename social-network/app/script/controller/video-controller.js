'use strict';

angular.module('socialNetwork').controller('VideoController', VideoController);

VideoController.$inject = ['$scope', 'NetworkService', '$sce'];

function VideoController($scope, NetworkService, $sce) {

    $scope.video = [];
    $scope.code = "";
    $scope.source = "";
//http://www.mocky.io/v2/5795f0dd2c000026157829e8 old (not working)
    var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a873c11100005b161d452d', 123).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.video = data.video;
        $scope.code = data.code;
        $scope.source = $sce.trustAsResourceUrl($scope.video[0].url);
    });

    $scope.setPlayingTrack = function (index) {
        $scope.source = $sce.trustAsResourceUrl($scope.video[index].url);
    }
};
