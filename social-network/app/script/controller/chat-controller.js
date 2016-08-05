'use strict';

angular.module('socialNetwork').controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'ChatService'];

function ChatController($scope, ChatService) {
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;

    $scope.addMessage = function() {
        ChatService.send($scope.message);
        $scope.message = "";
    };

    ChatService.receive().then(null, null, function(message) {
        $scope.messages.push(message);
    });
}