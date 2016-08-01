'use strict';

angular.module('socialNetwork').controller('PostController', PostController);

PostController.$inject = ['$scope', 'NetworkService'];

function PostController($scope, NetworkService) {

    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        $scope.posts[index].like++;
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislike++;
    };

    var promise = NetworkService.getPost(1, 0, 2).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.likeImg = data.likeImg;
        $scope.dislikeImg = data.dislikeImg;
        $scope.posts = data.data;
    })
}