'use strict';

var app = angular.module('socialNetwork', ['ui.router']); /*, 'ngMessages', 'ngMaterial', 'material.svgAssetsCache'*/

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
        .state('home',{
            url: '/SoN',
            templateUrl: 'view/home.html'
        })
        .state('registration',{
            url: '/SoN/registration',
            templateUrl: 'view/registration.html'
        })
        .state('forgot_pass',{
            url: '/SoN/forgot_pass',
            templateUrl: 'view/forgot_pass.html'
        })
        .state('menu.settings',{
            url: '/settings',
            templateUrl: 'view/settings.html'
        })
        .state('menu.settings.black-list',{
        url: '/black-list',
        templateUrl: 'view/black-list.html'
         })
        .state('menu.settings.change_pass',{
            url: '/change_pass',
            templateUrl: 'view/change_pass.html'
        })
        .state('menu.friend', {
            url: '/users/:userIdentifier',
            templateUrl: "view/profile.html",
        })  
        .state('menu.group', {
            url: '/groups/:groupIdentifier',
            templateUrl: "view/face-group.html",
        })  
});