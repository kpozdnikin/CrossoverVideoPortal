(function () {
    'use strict';

    angular.module('videoPortal', [
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngMaterial',
        'angular-md5',
        'videoPortalScroll',
        'videoPortalPlay',
        'angular-loading-bar',
        'jkAngularRatingStars',
        'videoPortal.home',
        'videoPortal.item'
    ]);

})();