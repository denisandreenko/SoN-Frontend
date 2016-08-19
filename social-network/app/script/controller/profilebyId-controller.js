'use strict';

angular.module('socialNetwork').controller('ProfileByIdController', ProfileByIdController);

ProfileByIdController.$inject = ['$scope', 'NetworkService', 'Constant', '$state', 'PostCreationService', 'authFact', 'NotifyService', '$timeout'];

function ProfileByIdController($scope, NetworkService, Constant, $state, PostCreationService, authFact, NotifyService, $timeout) {
    var userId = $state.params.userIdentifier;
    $scope.postText = '';

    var promise = NetworkService.getProfileById('/users/' + userId).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.userName = data.entity.name || 'Not set';
        $scope.userSubname = data.entity.lastName || 'Not set';
        $scope.userBirthday = data.entity.birthday || 'Not set';
        $scope.userAvatar = data.entity.avatar || null;
        $scope.userContacts = data.entity.contactUser || 'Not set';
        $scope.userCity = data.entity.city || 'Not set';
        $scope.userAbout = data.entity.about || 'Not set';
        $scope.userSex = data.entity.sex;
        $scope.isFriend = data.entity.isFriend;

        $scope.refreshPosts();
    });

    $scope.deleteFromFriends = function () {
        var promise = NetworkService.deleteFromFriendsns(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
            //TODO add notify service for page
        });
    };

    $scope.addToFriends = function () {
        var promise = NetworkService.addToFriends(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
            $state.reload();
        });
    };

    $scope.PostIt = function () {
        var imgURL = Constant.UploadedImgID;
        PostCreationService.createPostToUser(imgURL || null, $scope.postText, userId, Constant.Events.REFRESHIDPOSTS);
        $scope.postText = "";
    };

    $scope.refreshPosts = function () {
        NotifyService.notify(Constant.Events.REFRESHIDPOSTS, 'refPosts');
    };
}
angular.module('socialNetwork').controller('PostsByIdController', PostsByIdController);

PostsByIdController.$inject = ['$scope', 'NetworkService', 'authFact', '$state', 'NotifyService', 'Constant'];

function PostsByIdController($scope, NetworkService, authFact, $state, NotifyService, Constant) {
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
            NotifyService.notify(Constant.Events.REFRESHIDPOSTS, 'refPosts');
        })
    };

    var hendler = NotifyService.subscribe(Constant.Events.REFRESHIDPOSTS, callback);

    function callback(event, data) {
        var id = $state.params.userIdentifier;
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