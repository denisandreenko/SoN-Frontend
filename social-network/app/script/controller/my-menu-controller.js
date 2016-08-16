'use strict';

angular.module('socialNetwork').controller('MyMenuController', MyMenuController);

MyMenuController.$inject = ['$state', '$scope', 'Constant'];

function MyMenuController($state, $scope, Constant) {
    $scope.searchText = '';
    $scope.gotoSearch = function () {
        Constant.SearchReqText = $scope.searchText;
        $scope.searchText = '';
        $state.current = ('menu.search');
        //$state.go('menu.search');
    };
}