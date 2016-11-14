'use strict';

angular
    .module('videoPortal')
    .config(config);

function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    /*$mdThemingProvider
        .theme('default')
        .primaryPalette('lime');*/

    $urlRouterProvider.when('', '/').when('/home', '/home/all').when('/', '/home/all');

    $stateProvider.state('main', {
        url: '',
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
        title: 'videoPortal/home'
    });

    $stateProvider.state('home.all', {
        url: '/all',
        controller: 'HomeAllController',
        controllerAs: 'vm',
        templateUrl: '/homePage/all.html',
        resolve: {
            videos: resolveVideos
        },
        title: 'videoPortal/home/allVideos'
    });

    $stateProvider.state('home.item', {
        url: '/:itemId',
        controller: 'ItemController',
        controllerAs: 'vm',
        templateUrl: '/itemPage/item.html',
        resolve: {
            videos  : resolveVideos,
            video   : resolveVideo
        },
        title: 'videoPortal/video'
    });

    resolveVideos.$inject = ['$cookies', 'videoPortalService'];
    function resolveVideos($cookies, videoPortalService) {
        return videoPortalService.getVideos($cookies.get('sessionId'), 10, 0).then(function (resp) {
            return resp.data || null;
        });
    }
    resolveVideo.$inject = ['$cookies', '$stateParams', 'videoPortalService'];
    function resolveVideo($cookies, $stateParams, videoPortalService) {
        return videoPortalService.getVideo($cookies.get('sessionId'), $stateParams.itemId).then(function (resp) {
            return resp.data || null;
        });
    }
}