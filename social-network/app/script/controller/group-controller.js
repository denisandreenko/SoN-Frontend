'use strict';

angular.module('testApp').controller('GroupController', GroupController);

GroupController.$inject = ['$scope', '$http'];

function GroupController($scope, $http) {

	$scope.groups = [];

	$scope.code = "";

	$http.get('http://www.mocky.io/v2/5790be62260000a2177ee573').success(success);

	function success(data, status, headers, config){
		if(status == 200)
		{
			$scope.groups = data.groups;
			$scope.code = data.code;
		}
	};
};