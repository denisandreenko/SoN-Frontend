'use strict';

angular.module('socialNetwork').controller('ForgotPassController', ForgotPassController);

ForgotPassController.$inject = ['$scope', 'NetworkService'];

function ForgotPassController($scope, NetworkService) {
    $scope.email = '';

    $scope.sendReq = function () {
        var promise = NetworkService.forgotPass('/password/forgotten', $scope.email).promise;

        promise.then(function (response) {
            var data = response.getData();
            alert(data.entity.password);
        });
    };
}