'use strict';

angular.module('socialNetwork').controller('MyMenuController', MyMenuController);

MyMenuController.$inject = ['$state', '$scope', 'Constant', 'NotifyService', '$interval', 'authFact', 'NetworkService'];

function MyMenuController($state, $scope, Constant, NotifyService, $interval, authFact, NetworkService) {
    $scope.searchText = '';

    $scope.KeyPress = function () {
        var p = $state.current;
        if ($state.current.name == 'menu.search')
            NotifyService.notify(Constant.Events.UPDATEPSEARCH, $scope.searchText);
        else if ($state.current.name == 'menu.search-group')
            NotifyService.notify(Constant.Events.UPDATEGSEARCH, $scope.searchText);
    };


    $interval(function () {
        var data = 'client_id=passwordClient&grant_type=refresh_token&refresh_token=' + authFact.getRefreshToken();
        var promise = NetworkService.refreshAuth('/oauth/token', data).promise;

        promise.then(function (response) {
            var data = response.getData();

            authFact.setAccessToken(data.access_token);
            authFact.setRefreshToken(data.refresh_token);
        });
    }, 290000);

}