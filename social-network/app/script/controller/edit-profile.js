RegController.$inject = ['$scope', '$http'];

function RegController($scope, $http) {

    $scope.master = {};

    $scope.name = "";
    $scope.lastName = "";
    $scope.sex = "";
    $scope.birthDay = "";
    $scope.city = "";
    $scope.mobile = "";
    $scope.skype = "";
    $scope.email = "";
    $scope.about = "";


    $scope.update = function (user) {
        
            $scope.name = angular.copy(user.name);
            $scope.lastName = angular.copy(user.lastName);
            $scope.sex = angular.copy(user.sex);
            $scope.birthDay = "02/02/1990"; //angular.copy(user.Day) + '/' + angular.copy(user.Month) + '/' + angular.copy(user.Year);
            $scope.city = angular.copy(user.city);
            $scope.mobile = angular.copy(user.mobile);
            $scope.skype = angular.copy(user.skype);
            $scope.email = angular.copy(user.email);
            $scope.about = angular.copy(user.about);

            $scope.master = {
                "name": $scope.name,
                "lastName": $scope.lastName,
                "sex": $scope.sex,
                "birthDay": $scope.birthDay,
                "mobile": $scope.mobile,
                "skype": $scope.skype,
                "email": $scope.email,
                "about": $scope.about
            };

            var req = {
                method: 'POST',
                url: 'https://sjc2016vs3.fwd.wf/users',
                headers: {
                    'Content-Type': undefined
                },
                data: $scope.master
            };


            $http(req).success(success).error(error);

        function success(data) {
            alert('' + data);
        };
        function error(data) {
            alert('' + data)
        }
    };
};