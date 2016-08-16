/*'use strict';

angular.module('socialNetwork').controller('AudioController', AudioController);

AudioController.$inject = ['$scope', 'NetworkService', '$sce'];

function AudioController($scope, NetworkService, $sce) {

    $scope.source = "";
    $scope.audios = [];
    $scope.code = "";
    $scope.playIconUrl = "";
    $scope.lastIdPlayed = -1;

    var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a321083b00004010903427', 123).promise;

    promise.then(function (responce) {
        var data = responce.getData();

        $scope.audios = data.audios;
        $scope.playIconUrl = data.playIcon;
        $scope.code = data.code;
    });

    $scope.setPlayingTrack = function (index) {
        if($scope.lastIdPlayed != -1){
            $scope.playIconUrl = $scope.audios.pauseIcon;
        }
        $scope.lastIdPlayed = index;
        $scope.source = $sce.trustAsResourceUrl($scope.audios[index].audioUrl);
    }
};
angular.module('socialNetwork').filter('trusted', AudioFilter);

AudioFilter.$inject = ['$sce'];

function AudioFilter($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
};*/

'use strict'; 

angular.module('socialNetwork').controller('AudioController', AudioController); 

AudioController.$inject = ['$scope', 'NetworkService', '$sce']; 

function AudioController($scope, NetworkService, $sce) { 

$scope.source = ""; 
$scope.playList = []; 
$scope.code = ""; 
$scope.playIconUrl = ""; 
$scope.lastIdPlayed = -1; 
$scope.currentSong = ""; 

var promise = NetworkService.getAudioList('http://www.mocky.io/v2/57a87eb61100006e171d453f', 123).promise; 

promise.then(function (responce) { 
var data = responce.getData(); 

$scope.playList = data.audio; 
$scope.code = data.code; 
}); 

$scope.onPlayEnd = function () { 
if($scope.playList.length > 0) { 
if ($scope.lastIdPlayed != $scope.playList.length - 1) 
$scope.setPlayingTrack($scope.lastIdPlayed + 1); 
else 
$scope.setPlayingTrack(0) 
} 
} 
$scope.setPlayingTrack = function (index) { 
$scope.lastIdPlayed = index; 
$scope.currentSong = $scope.playList[index].Name; 
$scope.source = $sce.trustAsResourceUrl($scope.playList[index].Url); 
} 
}; 
angular.module('socialNetwork').filter('trusted', AudioFilter); 

AudioFilter.$inject = ['$sce']; 

function AudioFilter($sce) { 
return function (url) { 
return $sce.trustAsResourceUrl(url); 
}; 
}; 

angular.module('socialNetwork').directive('playList', playList); 

function playList() { 
return{ 
replace: true, 
scope : { 
audio: '=', 
// url: '@', 
name: '@' 
// playIcon: '@' 
}, 
templateUrl: 'view/playlist.html' 
}; 
}