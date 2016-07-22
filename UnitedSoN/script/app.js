'use strict';

var testApp = angular.module('testApp', ["ui.router"]);


testApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "html/home.html"
        })
        .state('audio', {
            url: "/audio",
            templateUrl: "html/audio.html"
        })
}]);