'use strict';

angular.module('socialNetwork').controller('ProfileEditController', ProfileEditController);

ProfileEditController.$inject = ['$scope', 'NetworkService', 'Constant'];

function ProfileEditController($scope, NetworkService, Constant) {
    $scope.name = '';
    $scope.email = '';
    $scope.skype = '';
    $scope.mobile = '';
    $scope.lastName = '';
    $scope.sex = 0;
    Constant.UploadedImgID = '';
    $scope.birthdate = '';
    $scope.city = '';
    $scope.about = '';


    var promise = NetworkService.getMyProfile('/users/profile').promise;

    promise.then(function (responce) {
        var data = responce.getData();
        $scope.userName = data.entity.name || 'Not set';
        $scope.userSubname = data.entity.lastName || 'Not set';
        $scope.userBirthday = data.entity.birthday || 'Not set';
        $scope.userAvatar = null;
        $scope.userContacts = data.entity.contactUser || 'Not set';
        $scope.userCity = data.entity.city || 'Not set';
        $scope.userAbout = data.entity.about || 'Not set';
        $scope.userSex = data.entity.sex || '0';

        opo();

    });

    function opo() {
        $scope.name = $scope.userName;
        $scope.email = $scope.userContacts.email;
        $scope.skype = $scope.userContacts.skype;
        $scope.mobile = $scope.userContacts.mobile;
        $scope.lastName = $scope.userSubname;
        $scope.sex = $scope.userSex;
        //Constant.UploadedImgID = $scope.userAvatar;
        $scope.birthdate = $scope.userBirthday;
        $scope.city = $scope.userCity;
        $scope.about = $scope.userAbout;
    }

    $scope.sendData = function () {
        $scope.data = {
            name: $scope.name,
            email: $scope.email,
            skype: $scope.skype,
            mobile: $scope.mobile,
            lastName: $scope.lastName,
            sex: $scope.sex,
            avatarId: Constant.UploadedImgID || null,
            birthdate: $scope.birthdate,
            city: $scope.city,
            about: $scope.about
        };

        var promise = NetworkService.editProfile($scope.data, '/users').promise;

        promise.then(function (response) {
            var data = response.getData();
            Constant.UploadedImgID = null;
        });
    }

}