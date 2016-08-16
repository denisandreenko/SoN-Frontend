'use strict';

angular.module('socialNetwork').service('PostCreationService', PostCreationService);

PostCreationService.$inject = ['NetworkService', 'Constant'];

function PostCreationService(NetworkService, Constant) {

    function _createPostToUser(fileId, postText, userToID) {
        var master = {
            idTo: userToID,
            fkImage: fileId,
            text: postText
        };

        var promise = NetworkService.createPosterToUser("/users/posts", master).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            Constant.UploadedImgID = null;
        });
    }
    function _createPostToGroup(fileId, postText, groupToId) {
        var master = {
            idTo: groupToId,
            fkImage: fileId,
            text: postText
        };

        var promise = NetworkService.createPosterToGroup("/groups/posts", master).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            Constant.UploadedImgID = null;
        });
    }
    return{
        createPostToUser: _createPostToUser,
        createPostToGroup: _createPostToGroup
    }
}