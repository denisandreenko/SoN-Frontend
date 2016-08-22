'use strict';

angular.module('socialNetwork').controller('FaceGroupController', FaceGroupController);

FaceGroupController.$inject = ['$scope', 'NetworkService', 'NotifyService', 'Constant', 'PostCreationService', '$state', '$timeout'];

function FaceGroupController($scope, NetworkService, NotifyService, Constant, PostCreationService, $state, $timeout) {
    $scope.groupName = "";
    $scope.groupFolowers = "";
    $scope.groupImg = "";
    $scope.groupAbout = "";
    $scope.isOwner = 0;
    $scope.groupId = $state.params.groupIdentifier;

    var hendler = NotifyService.subscribe(Constant.Events.UPDATEGROUP, callback);

    function callback() {
        var promise = NetworkService.getGroup('/groups/' + $scope.groupId).promise;
        promise.then(function (response) {
            var data = response.getData();
            $scope.groupId = data.entity.id;
            $scope.groupName = data.entity.name;
            $scope.groupAbout = data.entity.description;
            $scope.groupFolowers = data.entity.folowers;
            $scope.groupImg = data.entity.image;
            $scope.isMember = data.entity.isMember;
            $scope.isOwner = data.entity.isOwner;

            NotifyService.notify(Constant.Events.REFRESHGPOSTS, '');
        });
    }

    $scope.deleteCommun = function () {
        if ($scope.isOwner == true || $scope.isOwner == 1) {
            var promise = NetworkService.deleteGroup('/groups', $scope.groupId).promise;

            promise.then(function (response) {
                var data = response.getData();
                $state.go('menu.groups');
               // NotifyService.notify(Constant.Events.UPDATEGROUP, '');
            });
        }
    };

    $scope.join = function () {
        var joinPromise = NetworkService.joinGroup('/groups/' + $scope.groupId).promise;

        joinPromise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.UPDATEGROUP, '');
        });
    };

    $scope.leave = function () {
        var leavePromise = NetworkService.leaveGroup('/groups/' + $scope.groupId).promise;

        leavePromise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.UPDATEGROUP, '');
        });
    };

    $scope.PostIt = function () {
        var id = $scope.groupId;
        var imgURL = Constant.UploadedFileUrl;
        PostCreationService.createPostToGroup(imgURL || null, $scope.postText, id);
        $scope.postText = "";
    };

    NotifyService.notify(Constant.Events.UPDATEGROUP, '');

    $scope.$on('destroy', function () {
        hendler();
    });
}

angular.module('socialNetwork').controller('PostGroupController', PostGroupController);

PostGroupController.$inject = ['$scope', 'NetworkService', 'Constant', '$state', 'NotifyService'];

function PostGroupController($scope, NetworkService, Constant, $state, NotifyService) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    var hendler = NotifyService.subscribe(Constant.Events.REFRESHGPOSTS, callback);

    function callback(event, data) {
        var id = $state.params.groupIdentifier;
        var promise = NetworkService.getGroupPost('/groups/posts', id, 0, 20).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.posts = data.entity;
        });
    }


    $scope.increaseLike = function (index) {
        var promise = NetworkService.likePost('/groups/posts/' + $scope.posts[index].id + '/likes').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHGPOSTS, 'refPosts');
        });
    };
    $scope.increaseDisLike = function (index) {
        var promise = NetworkService.dislikePost('/groups/posts/' + $scope.posts[index].id + '/likes').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHGPOSTS, 'refPosts');
        });
    };

    $scope.gotoSender = function (index) {
        var userID = $scope.posts[index].owner.id;
        $state.go('menu.friend', {'userIdentifier': userID})
    };
    $scope.DeletePost = function (index) {
        var id = $scope.posts[index].id;
        var promise = NetworkService.deletePost(id, '/groups/posts').promise;

        promise.then(function (response) {
            var data = response.getData();
            NotifyService.notify(Constant.Events.REFRESHGPOSTS, '');
        })
    };

    $scope.$on('destroy', function () {
        hendler();
    });
}