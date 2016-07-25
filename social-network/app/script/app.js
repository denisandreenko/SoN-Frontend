'use strict';

var app = angular.module('socialNetwork', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/id/profile');

    $stateProvider
        .state('menu', {
            url: '/id',
            templateUrl: 'view/menu.html'
        })
        .state('menu.profile',{
            url: '/profile',
            templateUrl: 'view/profile.html'
        })
        .state('menu.friends',{
            url: '/friends',
            templateUrl: 'view/friends.html'
        })
        .state('menu.groups',{
            url: '/groups',
            templateUrl: 'view/groups.html'
        })
        .state('menu.face-group',{
            url: '/face-group',
            templateUrl: 'view/face-group.html'
        })
        .state('menu.edit-profile',{
            url: '/edit-profile',
            templateUrl: 'view/edit-profile.html'
        })
        .state('menu.create-group',{
            url: '/create-group',
            templateUrl: 'view/create-group.html'
        })
        .state('menu.audio',{
            url: '/audio',
            templateUrl: 'view/audio.html'
        })
        .state('menu.video',{
            url: '/video',
            templateUrl: 'view/video.html'
        })
});