'use strict';

angular.module('socialNetwork').controller('FaceGroupController', FaceGroupController);

FaceGroupController.$inject = ['$scope', 'NetworkService', 'authFact', 'Constant', 'PostCreationService', '$state'];

function FaceGroupController($scope, NetworkService, authFact, Constant, PostCreationService, $state) {
    $scope.groupName = "";
    $scope.groupFolowers = "";
    $scope.groupImg = "";
    $scope.groupAbout = "";
    $scope.groupId = 1;

    var promise = NetworkService.getGroup('/groups/' + $scope.groupId).promise;

    promise.then(function (response) {
        var data = response.getData();

        $scope.groupId = data.entity.id;
        $scope.groupName = data.entity.name;
        $scope.groupAbout = data.entity.description;
        $scope.groupFolowers = data.entity.folowers;
        $scope.groupImg = data.entity.image;
    });
    
    $scope.join = function () {
        var joinPromise = NetworkService.joinGroup('/groups', $scope.groupId).promise;

        joinPromise.then(function (response) {
            var data = response.getData();
        });
    };

    $scope.leave = function () {
        var leavePromise = NetworkService.leaveGroup('/groups', $scope.groupId).promise;

        leavePromise.then(function (response) {
            var data = response.getData();
        });
    };

    $scope.PostIt = function () {
        var id = $scope.groupId;
        var imgURL = Constant.UploadedImgID;
        PostCreationService.createPostToGroup(imgURL || null, $scope.postText, id);
        $scope.postText = "";
        $state.reload();
    }
}

angular.module('socialNetwork').controller('PostGroupController', PostGroupController);

PostGroupController.$inject = ['$scope', 'NetworkService', 'authFact', '$state'];

function PostGroupController($scope, NetworkService, authFact, $state) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        $scope.posts[index].like++; //TODO likes/dislikes with serverside work.
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislike++;
    };
    var id = $state.params.groupIdentifier;
    var promise = NetworkService.getGroupPost('/groups/posts', id, 0, 20).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.posts = data.entity;
       });

    $scope.gotoSender = function (index) {
        var userID = $scope.posts[index].owner.id;
        $state.go('menu.friend', {'userIdentifier': userID})
    };
    $scope.DeletePost = function (index) {
        var id = $scope.posts[index].id;
        var promise = NetworkService.deletePost(id, '/users/posts').promise;

        promise.then(function (response) {
            var data = response.getData();
            $state.reload();
        })
    };
}