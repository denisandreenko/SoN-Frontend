'use strict';

angular.module("socialNetwork").service("ChatService", ChatService);

ChatService.$inject = ['$q', '$timeout'];

function ChatService($q, $timeout) {

    var service = {};

    var socket = new WebSocket('ws://192.168.7.121:8080/chat');

    var onopen = socket.onopen = function () {
        alert("Соединение установлено.");
    };

    var onclose = socket.onclose = function (event) {
        if (event.wasClean) {
            alert('Соединение закрыто чисто');
        } else {
            alert('Обрыв соединения'); // например, "убит" процесс сервера
        }
        alert('Код: ' + event.code + ' причина: ' + event.reason);
    };

    var onmessage = socket.onmessage = function (event) {
        alert("Получены данные " + event.data);
    };

    var onerror = socket.onerror = function (error) {
        alert("Ошибка " + error.message);
    };


    // listener = $q.defer(), socket = {
    //     client: null,
    //     stomp: null
    // }, messageIds = [];
    //
    // service.RECONNECT_TIMEOUT = 3000;
    // service.SOCKET_URL = "http://192.168.7.121:8080/chat";//"https://damp-meadow-52783.herokuapp.com/chat"; // // connect to local IP
    // service.CHAT_TOPIC = "/queue/message";
    // service.CHAT_BROKER = "/app/chat";
    //
    // service.receive = function() {
    //     return listener.promise;
    // };
    //
    // service.send = function(message) {
    //     var id = Math.floor(Math.random() * 1000000);
    //     socket.stomp.send(service.CHAT_BROKER, {
    //         priority: 9
    //     }, JSON.stringify({
    //         message: message,
    //         id: id
    //     }));
    //     messageIds.push(id);
    // };
    //
    // var reconnect = function() {
    //     $timeout(function() {
    //         initialize();
    //     }, this.RECONNECT_TIMEOUT);
    // };
    //
    // var getMessage = function(data) {
    //     var message = JSON.parse(data), out = {};
    //     out.message = message.message;
    //     out.time = new Date(message.time);
    //     if (_.contains(messageIds, message.id)) {
    //         out.self = true;
    //         messageIds = _.remove(messageIds, message.id);
    //     }
    //     return out;
    // };
    //
    // var startListener = function() {
    //     socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
    //         listener.notify(getMessage(data.body));
    //     });
    // };
    //
    // var initialize = function() {
    //     socket.client = new SockJS(service.SOCKET_URL);
    //     socket.stomp = Stomp.over(socket.client);
    //     socket.stomp.connect({}, startListener);
    //     socket.stomp.onclose = reconnect;
    // };
    //
    // initialize();
    return service;
}