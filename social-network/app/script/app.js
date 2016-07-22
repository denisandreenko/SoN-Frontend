'use strict';

var app = angular.module('socialNetwork', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise('/id/profile');

    $stateProvider
        .state('menu', {
            url: '/id',
            templateUrl: 'view/menu.html'
        })
        .state('menu.groups',{
            url: '/groups',
            templateUrl: 'view/groups.html'
        })
        .state('menu.profile',{
            url: '/profile',
            templateUrl: 'view/profile.html'
        })
});