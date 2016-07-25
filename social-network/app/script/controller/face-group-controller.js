'use strict';

angular.module('socialNetwork').controller('FaceGroupController', FaceGroupController);

FaceGroupController.$inject = ['$scope', '$http'];

function FaceGroupController($scope, $http) {

	$scope.groupName = "";
	$scope.groupFolowers = "";
	$scope.groupImg = "";
	$scope.groupAbout = "";

	$http.get('http://www.mocky.io/v2/5795df682c00000f157829d0').success(success);

	function success(data, status, headers, config){
		if(status == 200)
		{
			$scope.groupName = data.data.name;
			$scope.groupFolowers = data.data.folowers;
			$scope.groupImg = data.data.imgUrl;
			$scope.groupAbout = data.data.description;
		}
	};
};