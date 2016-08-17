'use strict';

angular.module('socialNetwork').controller('MyMenuController', MyMenuController);

MyMenuController.$inject = ['$state', '$scope', 'Constant', 'NotifyService'];

function MyMenuController($state, $scope, Constant, NotifyService) {
    $scope.searchText = '';

    $scope.KeyPress = function () {
        NotifyService.notify(Constant.Events.UPDATESEARCH, $scope.searchText);
    };
}