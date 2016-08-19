'use strict';

angular.module('socialNetwork').controller('MyMenuController', MyMenuController);

MyMenuController.$inject = ['$state', '$scope', 'Constant', 'NotifyService'];

function MyMenuController($state, $scope, Constant, NotifyService) {
    $scope.searchText = '';

    $scope.KeyPress = function () {
        var p = $state.current;
        if ($state.current.name == 'menu.search')
            NotifyService.notify(Constant.Events.UPDATEPSEARCH, $scope.searchText);
        else if($state.current.name == 'menu.search-group')
            NotifyService.notify(Constant.Events.UPDATEGSEARCH, $scope.searchText);
    };
}