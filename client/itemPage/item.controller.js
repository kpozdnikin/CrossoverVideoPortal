(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['videoPortalService', 'videos', 'video'];

    function ItemController(videoPortalService, videos, video) {

        var vm = this;
        //functions
        vm.activate = activate;

        //variables
        vm.videos = videos;
        vm.video = video;

        activate();

        function activate() {
            vm.videos = videoPortalService.checkAllVideosRating(vm.videos);
            vm.video = videoPortalService.checkAllVideosRating(vm.video);
        }

    }
})();
