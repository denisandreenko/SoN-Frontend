'use strict';

angular.module('socialNetwork').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', 'NetworkService'];

function ProfileController($scope, NetworkService) {

    $scope.userName = "";
    $scope.userSubname = "";
    $scope.userBirthday = "";
    $scope.userAvatar = "";
    $scope.userContacts = [];
    $scope.userCity = "";
    $scope.userAbout = "";

    var promise = NetworkService.getProfileInfo(1).promise;

    promise.then(function (responce) {
        $scope.userName = responce.data.userName;
        $scope.userSubname = responce.data.userSubname;
        $scope.userBirthday = responce.data.userBirthday;
        $scope.userAvatar = responce.data.userAvatar;
        $scope.userContacts = responce.data.userContacts;
        $scope.userCity = responce.data.userCity;
        $scope.userAbout = responce.data.userAbout;
    });
};