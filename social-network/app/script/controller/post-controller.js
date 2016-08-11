'use strict';

angular.module('socialNetwork').controller('MyPostController', MyPostController);

MyPostController.$inject = ['$scope', 'NetworkService', 'authFact', 'Constant', '$mdToast'];

function MyPostController($scope, NetworkService, authFact, Constant, $mdToast) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        $scope.posts[index].like++; //TODO likes/dislikes with serverside work.
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislike++;
    };
    var id = authFact.getId();
    var promise = NetworkService.getPost('/users/posts', id, 0, 14).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.posts = data.entity;
    });
}

angular.module('socialNetwork').directive('postsAddition', postsAddition);

function postsAddition() {
    return {
        replace: true,
        scope: true,
        controller: MyPostController,
        templateUrl: 'view/posts.html'
    };
}