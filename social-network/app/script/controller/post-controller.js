'use strict';

angular.module('socialNetwork').controller('PostController', PostController);

PostController.$inject = ['$scope', 'NetworkService'];

function PostController($scope, NetworkService) {

    $scope.posts = [];

    $scope.increaseLike = function (index) {
        $scope.posts[index].likes++;
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislikes++;
    };

    var promise = NetworkService.getPost(1, 0, 2).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.posts = data;
    })
}