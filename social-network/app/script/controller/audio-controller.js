'use strict';

angular.module('socialNetwork').controller('MyAudioController', MyAudioController);

MyAudioController.$inject = ['$scope', 'NetworkService', '$sce', 'authFact', '$mdToast', 'Constant'];

function MyAudioController($scope, NetworkService, $sce, authFact, $mdToast, Constant) {
    $scope.source = "";
    $scope.playList = [];
    $scope.code = "";
    $scope.playIconUrl = "";
    $scope.lastIdPlayed = -1;
    $scope.currentSong = "";

    var promise = NetworkService.getAudioList('/musics', authFact.getId(), 0, 40).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.playList = data.entity;
        $scope.code = data.code;
    });

    $scope.onPlayEnd = function () {
        if ($scope.playList.length > 0) {
            if ($scope.lastIdPlayed != $scope.playList.length - 1)
                $scope.setPlayingTrack($scope.lastIdPlayed + 1);
            else
                $scope.setPlayingTrack(0)
        }
    };
    $scope.setPlayingTrack = function (index) {
        $scope.lastIdPlayed = index;
        $scope.currentSong = $scope.playList[index].name;
        $scope.source = $sce.trustAsResourceUrl($scope.playList[index].url);
    }
}

angular.module('socialNetwork').filter('trusted', AudioFilter);

AudioFilter.$inject = ['$sce'];

function AudioFilter($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}

// angular.module('socialNetwork').directive('playList', playList);
//
// function playList() {
//     return {
//         replace: true,
//         scope: {
//             audio: '=',
//             // url: '@',
//             name: '@'
//             // playIcon: '@'
//         },
//         templateUrl: 'view/playlist.html'
//     };
// }