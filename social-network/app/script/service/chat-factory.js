angular.module('socialNetwork').factory('ChatFact', ChatFact);

ChatFact.$inject = ['$websocket'];

function ChatFact($websocket) {

    var dataStream = $websocket('ws://192.168.7.121:8080/chat');

    var collection = [];

    dataStream.onMessage(function (message) {
        collection.push(JSON.parse(message.data));
    });

    var methods = {
        collection: collection,
        get: function () {
            dataStream.send(JSON.stringify({action: 'get'}));
        }
    };

    return methods;
}
angular.module('socialNetwork').controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$scope', 'ChatFact'];

function ChatCtrl($scope, ChatFact) {
    $scope.MyData = ChatFact;
}