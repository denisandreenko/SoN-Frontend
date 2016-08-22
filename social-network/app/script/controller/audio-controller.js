'use strict';

angular.module('socialNetwork').controller('MyAudioController', MyAudioController);

MyAudioController.$inject = ['$scope', 'NetworkService', '$sce', 'authFact', 'Constant', 'NotifyService'];

function MyAudioController($scope, NetworkService, $sce, authFact, Constant, NotifyService) {
    $scope.source = "";
    $scope.playList = [];
    $scope.code = "";
    $scope.lastIdPlayed = -1;
    $scope.currentSong = "";
    Constant.AcceptFiles = 'audio/*';

    var hendler = NotifyService.subscribe(Constant.Events.AUDIOUPDATE, callback);

    function callback(event, data) {
        var promise = NetworkService.getAudioList('/musics', authFact.getId(), 0, 40).promise;

        promise.then(function (responce) {
            var data = responce.getData();

            $scope.playList = data.entity;
            $scope.code = data.code;
        });
    }
    $scope.$on('destroy', function () {
        hendler();
    });
    NotifyService.notify(Constant.Events.AUDIOUPDATE, '');

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
    };

    $scope.delete = function (index) {
        var id = $scope.playList[index].id;
        var promise = NetworkService.deleteSong('/musics/' + id).promise;

        promise.then(function(response){
            var data = response.getData();
            NotifyService.notify(Constant.Events.AUDIOUPDATE, '');
        });
    }
}