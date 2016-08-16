angular.module('socialNetwork').controller('ScrollController', ScrollController);

ScrollController.$inject = ['$scope', '$location', '$anchorScroll'];

function ScrollController($scope, $location, $anchorScroll) {


    $scope.gotoTop = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('top');

      // call $anchorScroll()
      $anchorScroll();
    };
}