'use strict';

angular.module('socialNetwork').controller('AudioController', AudioController);

AudioController.$inject = ['$scope', 'NetworkService', '$sce', '$state', '$mdToast', 'Constant'];

function AudioController($scope, NetworkService, $sce, $state, $mdToast, Constant) {
    if (authFact.getAccessToken()) {
        $scope.source = "";
        $scope.playList = [];
        $scope.code = "";
        $scope.playIconUrl = "";
        $scope.lastIdPlayed = -1;
        $scope.currentSong = "";

        var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a85936110000d6121d4504', 123).promise;

        promise.then(function (responce) {
            var data = responce.getData();

            $scope.playList = data.audio;
            $scope.code = data.code;
        });

        $scope.onPlayEnd = function () {
            if ($scope.playList.length > 0) {
                if ($scope.lastIdPlayed != $scope.playList.length - 1)
                    $scope.setPlayingTrack($scope.lastIdPlayed + 1);
                else
                    $scope.setPlayingTrack(0)
            }
        }
        $scope.setPlayingTrack = function (index) {
            $scope.lastIdPlayed = index;
            $scope.currentSong = $scope.playList[index].Name;
            $scope.source = $sce.trustAsResourceUrl($scope.playList[index].Url);
        }
    }
    else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/toast.html'
        });
        $state.go('home');
    }
};
angular.module('socialNetwork').filter('trusted', AudioFilter);

AudioFilter.$inject = ['$sce'];

function AudioFilter($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
};

angular.module('socialNetwork').directive('playList', playList);

function playList() {
    return{
        replace: true,
        scope : {
            audio: '=',
            // url: '@',
            name: '@'
            // playIcon: '@'
        },
        templateUrl: 'view/playlist.html'
    };
}