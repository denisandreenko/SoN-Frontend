'use strict';

angular.module('socialNetwork').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', 'NetworkService', 'Constant', '$state', '$mdToast'];

function ProfileController($scope, NetworkService, Constant, $state, $mdToast) {
    if (Constant.AuthToken != "" && Constant.AuthToken != null && Constant.AuthToken != undefined) {
        $scope.userName = "";
        $scope.userSubname = "";
        $scope.userBirthday = "";
        $scope.userAvatar = "";
        $scope.userContacts = [];
        $scope.userCity = "";
        $scope.userAbout = "";

        var promise = NetworkService.getMyProfile('/users/profile').promise;

        promise.then(function (responce) {
            var data = responce.getData();
            $scope.userName = data.entity.name;
            $scope.userSubname = data.entity.lastName;
            $scope.userBirthday = data.entity.birthday;
            $scope.userAvatar = data.entity.avatar;
            $scope.userContacts = data.entity.contactUser;
            $scope.userCity = data.entity.city;
            $scope.userAbout = data.entity.about;
        });
    }
    else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/reg-toast.html'
        });
        Constant.LastPage = 'menu.profile';
        $state.go('home');
    }
};