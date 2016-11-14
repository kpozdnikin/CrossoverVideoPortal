(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$state', '$cookies', 'videoPortalService'];

    function AppController($scope, $state, $cookies, videoPortalService) {

        var vm = this;

        //functions
        $scope.activate = activate;
        $scope.logout = logout;
        $scope.userData = {
            sessionId : null
        };

        //variables

        activate();

        function activate(){

        }

        function logout(){
            videoPortalService.destroySession();
        }

    }
})();

