'use strict';

angular.module('socialNetwork').controller('VideoController', VideoController);

VideoController.$inject = ['$scope', 'NetworkService', '$sce', '$state', '$mdToast', 'Constant'];

function VideoController($scope, NetworkService, $sce, $state, $mdToast, Constant) {
    if(Constant.AuthToken != "" && Constant.AuthToken != null && Constant.AuthToken != undefined) {
        $scope.video = [];
        $scope.code = "";
        $scope.source = "";

        var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a873c11100005b161d452d', 123).promise;

        promise.then(function (responce) {
            var data = responce.getData();

            $scope.video = data.video;
            $scope.code = data.code;
            $scope.source = $sce.trustAsResourceUrl(data.video[0].url);
        });

        $scope.setPlayingTrack = function (index) {
            $scope.source = $sce.trustAsResourceUrl($scope.video[index].url);
        }
    }
    else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/reg-toast.html'
        });
        Constant.LastPage = 'menu.video';
        $state.go('home');
    }
};
