'use strict';

angular.module('socialNetwork').controller('MyPostController', MyPostController);

MyPostController.$inject = ['$scope', 'NetworkService', 'authFact', '$state'];

function MyPostController($scope, NetworkService, authFact, $state) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        $scope.posts[index].like++; //TODO likes/dislikes with serverside work.
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislike++;
    };
    var onlyOnce = 0;
    if(onlyOnce == 0) {
        onlyOnce = 1;
        var id = authFact.getId();
        var promise = NetworkService.getPost('/users/posts', id, 0, 20).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.posts = data.entity;
        });
    }

    $scope.gotoSender = function (index) {
        var userID = $scope.posts[index].owner.id;
        $state.go('menu.friend',{'userIdentifier': userID})
    }
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