'use strict';

angular.module('socialNetwork').controller('PostCreationController', PostCreationController);

PostCreationController.$inject = ['$scope', '$mdToast', 'NetworkService', 'Constant'];

function PostCreationController($scope, $mdToast, NetworkService, Constant) {
    if (authFact.getAccessToken()) {
        $scope.fileId = 11;
        $scope.token = Constant.AuthToken;
        $scope.postText = "SomePostText, SomePostText, SomePostText, SomePostText, SomePostText, SomePostText, SomePostText.";

        $scope.master = {
            fkImage: $scope.fileId,
            text: $scope.postText
        };

        var promise = NetworkService._createPoster("/posts", $scope.master).promise;

        promise.then(function (responce) {
            var data = responce.getData();


            Constant.ToastMsg = "Post creation seccess.";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
        })
    } else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/toast.html'
        });
        $state.go('home');
    }

}