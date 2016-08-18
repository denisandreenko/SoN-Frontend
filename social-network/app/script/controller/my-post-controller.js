'use strict';

angular.module('socialNetwork').controller('MyPostController', MyPostController);

MyPostController.$inject = ['$scope', 'NetworkService', 'authFact', '$state', 'Constant', 'NotifyService'];

function MyPostController($scope, NetworkService, authFact, $state, Constant, NotifyService) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        var promise = NetworkService.likePost('/users/posts/' + $scope.posts[index].id + '/likes').promise;

        promise.then(function(response){
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHPOSTS, 'refPosts');
        });
    };
    $scope.increaseDisLike = function (index) {
        var promise = NetworkService.dislikePost('/users/posts/' + $scope.posts[index].id + '/likes').promise;

        promise.then(function(response){
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHPOSTS, 'refPosts');
        });
    };

    $scope.gotoSender = function (index) {
        var userID = $scope.posts[index].owner.id;
        $state.go('menu.friend', {'userIdentifier': userID})
    };

    $scope.DeletePost = function (index) {
        var id = $scope.posts[index].id;
        var promise = NetworkService.deletePost(id, '/users/posts').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHPOSTS, 'refPosts');
        })
    };

    var hendler = NotifyService.subscribe(Constant.Events.REFRESHPOSTS, callback);

    function callback(event, data) {
        var id = authFact.getId();
        var promise = NetworkService.getPost('/users/posts', id, 0, 40).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.posts = data.entity;
        });
    }

    $scope.$on('destroy', function(){
       hendler();
    });
}


angular.module('socialNetwork').directive('postsAddition', postsAddition);

function postsAddition() {
    return {
        replace: true,
        scope: true,
        templateUrl: 'view/posts.html'
    };
}