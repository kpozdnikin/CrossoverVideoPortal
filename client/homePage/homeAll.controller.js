(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('HomeAllController', HomeAllController);

    HomeAllController.$inject = ['$scope', '$timeout', '$cookies', '$state', '$window', '$document', 'videoPortalService', 'videos'];

    function HomeAllController($scope, $timeout, $cookies, $state, $window, $document, videoPortalService, videos) {

        var vm = this;
        //functions
        vm.activate = activate;
        vm.onRating = onRating;
        vm.showMore = showMore;

        //variables
        vm.sessionId = $cookies.get('sessionId') || null;
        vm.videos = videos;
        vm.documentHeight = document.documentElement.clientHeight;

        activate();

        //if session destroyed - go login
        function activate() {
            if (!vm.sessionId) {
                $state.go('login');
            }
            //checking videos rating
            vm.videos = videoPortalService.checkAllVideosRating(vm.videos);
        }

        //rate video. to rate only once we can add ratings to localstorage in next
        function onRating(item){
            videoPortalService.rateVideo(item._id, item.rating, vm.sessionId);
            item.rated = true;
        }

        //lazy loading videos
        function showMore(){
            var videoLenght = vm.videos.length;
            videoPortalService.getVideos(vm.sessionId, 10, videoLenght).then(function (resp) {
                var moreVideos = resp.data || [];
                vm.videos = vm.videos.concat(moreVideos);
            });
        }
    }
})();
