'use strict';

angular.module('testApp').controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$http'];

function ProfileController($scope, $http) {

	$scope.userName = "";
	$scope.userSubname = "";
	$scope.userBirthday = "";
	$scope.userAvatar = "";
	$scope.userContacts = [];
	$scope.userCity = "";
	$scope.userAbout = "";

	$http.get('http://www.mocky.io/v2/578e33a20f0000ce00e9a041').success(success);

	function success(data, status, headers, config){
		if(status == 200)
		{
			$scope.userName = data.userName;
			$scope.userSubname = data.userSubname;
			$scope.userBirthday = data.userBirthday;
			$scope.userAvatar = data.userAvatar;
			$scope.userContacts = data.userContacts;
			$scope.userCity = data.userCity;
			$scope.userAbout = data.userAbout;
		}
	};
};