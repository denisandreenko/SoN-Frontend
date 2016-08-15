'use strict';

angular.module('socialNetwork').controller('MyMenuController', MyMenuController);

MyMenuController.$inject = ['$state', '$scope'];

function MyMenuController($state, $scope) {
    $scope.searchText = '';
    $scope.gotoSearch = function () {
        var text = $scope.searchText;
        $scope.searchText = '';
        $state.go('menu.search', {'searchReq': text});
    };
}