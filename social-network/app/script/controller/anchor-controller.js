angular.module('socialNetwork').controller('ScrollController', ScrollController);

ScrollController.$inject = ['$scope', '$location', '$anchorScroll'];

function ScrollController($scope, $location, $anchorScroll) {


    $scope.gotoTop = function() {
      // call $anchorScroll()
      $anchorScroll();
    };
}
