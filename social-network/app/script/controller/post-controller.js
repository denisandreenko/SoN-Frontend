'use strict';

angular.module('socialNetwork').controller('PostController', PostController);

PostController.$inject = ['$scope', '$http'];

function PostController($scope, $http) {

	$scope.posts = [];

	$http.get('http://www.mocky.io/v2/578e18f50f00006f19aebc38').success(success);

	function success(data, status, headers, config){
		if(status == 200)
		{
			$scope.posts = data;
		}
	};
};