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
            //get sessionId from cookies
            $scope.userData.sessionId = $cookies.get('sessionId');
        }

        function logout(){
            //destroy session by button click
            videoPortalService.destroySession();
            $scope.userData.sessionId = null;
        }

    }
})();

