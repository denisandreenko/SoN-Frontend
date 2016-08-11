'use strict';

angular.module('socialNetwork').service('PostCreationService', PostCreationService);

PostCreationService.$inject = ['$mdToast', 'NetworkService', 'Constant', 'authFact'];

function PostCreationService($mdToast, NetworkService, Constant, authFact) {

    function _createPostToUser(fileId, postText, userToID) {
        var master = {
            idTo: userToID,
            fkImage: fileId,
            text: postText
        };

        var promise = NetworkService.createPoster("/users/posts", master).promise;

        promise.then(function (responce) {
            var data = responce.getData();
            Constant.UploadedImgID = null;
        });
    }
    return{
        createPostToUser: _createPostToUser
    }
}