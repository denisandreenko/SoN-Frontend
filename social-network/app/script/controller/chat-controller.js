'use strict';

angular.module('socialNetwork').controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'ChatService', '$mdToast', '$state', 'Constant', '$websocket'];

function ChatController($scope, ChatService, $mdToast, $state, Constant, $websocket) {
    if (authFact.getAccessToken()) {
        var ws = $websocket.$new("wss://kkq-social.fwd.wf");

        ws.$on('$open', function () {
            console.log('it"s opened now !');
            ws.$emit('hello', 'world'); // it sends the event 'hello' with data 'world'
        })
            .$on('incoming event', function (message) { // it listents for 'incoming event'
                console.log('something incoming from the server: ' + message);
            });
    } else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/toast.html'
        });
        $state.go('home');
    }
}