angular.module("socialNetwork").controller("ChatCtrl", ChatCtrl);

ChatCtrl.$inject = ['$scope', 'Ctrl'];

function ChatCtrl($scope, Ctrl) {

}

angular.module('socialNetwork').controller('Ctrl', Ctrl);

Ctrl.$inject = ['$stomp', '$log', 'authFact', '$scope'];

function Ctrl($stomp, $log, authFact, $scope) {
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;

    $stomp.setDebug(function (args) {
        $log.debug(args)
    });

    // Send message
    $scope.sendM = function () {
        $stomp.send('/app/hello', {
            name: $scope.message// name is Message (true nameconvention on serverside!)
        }, {
            user: authFact.getAccessToken()
        });
    };

    $stomp
        .connect('http://192.168.7.121:8080/hello', {access_token: authFact.getAccessToken()})
        // frame = CONNECTED headers
        .then(function (frame) {
            var subscription = $stomp.subscribe('/topic/message', function (payload, headers, res) {
                $scope.payload = payload;
                var o = payload.content;
                $scope.messages.push(o);
            });

            // Unsubscribe
            // subscription.unsubscribe();
            //
            // // Disconnect
            // $stomp.disconnect(function () {
            //     $log.info('disconnected')
            // });
        });
}