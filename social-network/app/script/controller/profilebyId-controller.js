'use strict';

angular.module('socialNetwork').controller('ProfileByIdController', ProfileByIdController);

ProfileByIdController.$inject = ['$scope', 'NetworkService', 'Constant', '$state', 'PostCreationService', 'authFact'];

function ProfileByIdController($scope, NetworkService, Constant, $state, PostCreationService, authFact) {
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
    });

    $scope.deleteFromFriends = function () {
        var promise = NetworkService.deleteFromFriends(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
        });
    };

    $scope.addToFriends = function () {
        var promise = NetworkService.addToFriends(userId, '/friends').promise;

        promise.then(function (response) {
            var data = response.getData();
        });
    };

    $scope.PostIt = function () {
        var imgURL = Constant.UploadedImgID;
        PostCreationService.createPostToUser(imgURL || null, $scope.postText, userId);
        $scope.postText = "";
    }
}
angular.module('socialNetwork').controller('PostsByIdController', PostsByIdController);

PostsByIdController.$inject = ['$scope', 'NetworkService', 'authFact', '$state'];

function PostsByIdController($scope, NetworkService, authFact, $state) {
    $scope.posts = [];
    $scope.likeImg = "";
    $scope.dislikeImg = "";

    $scope.increaseLike = function (index) {
        $scope.posts[index].like++; //TODO likes/dislikes with serverside work.
    };
    $scope.increaseDisLike = function (index) {
        $scope.posts[index].dislike++;
    };
    var id = $state.params.userIdentifier;
    var promise = NetworkService.getPost('/users/posts', id, 0, 20).promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.posts = data.entity;
    });

    $scope.gotoSender = function (index) {
        var userID = $scope.posts[index].owner.id;
        $state.go('menu.friend', {'userIdentifier': userID})
    }
}