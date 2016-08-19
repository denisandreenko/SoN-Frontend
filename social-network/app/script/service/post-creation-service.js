'use strict';

angular.module('socialNetwork').service('PostCreationService', PostCreationService);

PostCreationService.$inject = ['NetworkService', 'Constant', 'NotifyService'];

function PostCreationService(NetworkService, Constant, NotifyService) {

    function _createPostToUser(fileId, postText, userToID, whatToUpdate) {
        var master = {
            idTo: userToID,
            fkImage: fileId,
            text: postText
        };

        var promise = NetworkService.createPosterToUser("/users/posts", master).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            NotifyService.notify(whatToUpdate, 'refPosts');
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
            NotifyService.notify(Constant.Events.REFRESHGPOSTS, 'refPosts');
            Constant.UploadedImgID = null;
        });
    }
    return{
        createPostToUser: _createPostToUser,
        createPostToGroup: _createPostToGroup
    }
}