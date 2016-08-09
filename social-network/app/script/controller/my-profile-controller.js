'use strict';

angular.module('socialNetwork').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', 'NetworkService', 'Constant', '$state', '$mdToast', 'authFact'];

function ProfileController($scope, NetworkService, Constant, $state, $mdToast, authFact) {
    if (authFact.getAccessToken()) {
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
            $scope.userName = data.entity.name || 'Not set';
            $scope.userSubname = data.entity.lastName || 'Not set';
            $scope.userBirthday = data.entity.birthday || 'Not set';
            $scope.userAvatar = data.entity.avatar;
            $scope.userContacts = data.entity.contactUser || 'Not set';
            $scope.userCity = data.entity.city || 'Not set';
            $scope.userAbout = data.entity.about || 'Not set';
            Constant.MyId = data.entity.id;
        });
    } else {
        Constant.ToastMsg = "Not allowed, please authorise.";
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            controller: 'ToastController',
            templateUrl: 'view/toast.html'
        });
        $state.go('home');
    }
};