'use strict';

angular
    .module('videoPortal')
    .config(config);

function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    $mdThemingProvider
        .theme('default')
        .primaryPalette('lime');

    $urlRouterProvider.when('', '/').when('/', '/home');

    $stateProvider.state('main', {
        url: '/',
        controllerAs: 'vm',
        title: 'videoPortal'
    });

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'vm',
        templateUrl: '/loginPage/login.html',
        title: 'videoPortal/login'
    });

    $stateProvider.state('home', {
        url: '/home',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: '/homePage/home.html',
        resolve: {
            videos: resolveVideos
        },
        title: 'videoPortal/home'
    });

    $stateProvider.state('main.item', {
        url: '/item/:itemId',
        controller: 'ItemController',
        controllerAs: 'vm',
        templateUrl: '/itemPage/item.html',
        title: 'videoPortal/item'
    });

    resolveVideos.$inject = ['$cookies', 'videoPortalService'];
    function resolveVideos($cookies, videoPortalService) {
        return videoPortalService.getVideos($cookies.get('sessionId')).then(function (resp) {
            return resp.data || null;
        });
    }
}