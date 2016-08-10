'use strict';

angular.module('socialNetwork').controller('MyPostController', MyPostController);

MyPostController.$inject = ['$scope', 'NetworkService', 'authFact', 'Constant', '$mdToast'];

function MyPostController($scope, NetworkService, authFact, Constant, $mdToast) {
    /*if (authFact.getAccessToken()) {
        $scope.posts = [];
        $scope.likeImg = "";
        $scope.dislikeImg = "";

        $scope.increaseLike = function (index) {
            $scope.posts[index].like++; //TODO likes/dislikes with serverside work.
        };
        $scope.increaseDisLike = function (index) {
            $scope.posts[index].dislike++;
        };
        var id = Constant.MyId;
        var promise = NetworkService.getPost('/users/posts', id, 0, 2).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.posts = data.entity;
        });
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

angular.module('socialNetwork').directive('postsAddition', postsAddition);

function postsAddition() {
    return {
        replace: true,
        scope: true,
        templateUrl: 'view/posts.html'
    };*/
}