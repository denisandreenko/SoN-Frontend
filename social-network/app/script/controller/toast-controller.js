'use strict';

angular.module('socialNetwork').controller('ToastController', ToastController);

ToastController.inject = ['$scope', 'Constant'];

function ToastController($scope, Constant) {
    $scope.toastMsg = Constant.ToastMsg;
};