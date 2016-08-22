'use strict';

angular.module('socialNetwork').controller('VideoController', VideoController);

VideoController.$inject = ['$scope', 'NetworkService', '$sce', 'NotifyService', 'Constant', 'authFact'];

function VideoController($scope, NetworkService, $sce, NotifyService, Constant, authFact) {
    $scope.video = [];
    $scope.currentVideo = "";
    $scope.source = "";
    Constant.AcceptFiles = 'video/*';

    var hendler = NotifyService.subscribe(Constant.Events.VIDEOUPDATE, callback);

    function callback(event, data) {
        var promise = NetworkService.getVideoList('/videos', authFact.getId(), 0, 40).promise;

        promise.then(function (responce) {
            var data = responce.getData().entity;

            $scope.video = data;
            // $scope.source = $sce.trustAsResourceUrl(data.video[0].url);
        });
    }

    $scope.$on('destroy', function () {
        hendler();
    });

    NotifyService.notify(Constant.Events.VIDEOUPDATE, '');


    $scope.setPlayingTrack = function (index) {
        $scope.currentVideo = $scope.video[index].name;
        $scope.source = $sce.trustAsResourceUrl($scope.video[index].url);
    }
}
