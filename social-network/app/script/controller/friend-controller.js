'use strict';

angular.module('testApp').controller('FriendController', FriendController);

FriendController.$inject = ['$scope', '$http'];

function FriendController($scope, $http) {

	$scope.friends = [];

	$scope.code = "";

	$http.get('http://www.mocky.io/v2/578f8e0326000017017ee3c4').success(success);

	function success(data, status, headers, config){
		if(status == 200)
		{
			$scope.friends = data.friends;
			$scope.code = data.code;
		}
	};
};