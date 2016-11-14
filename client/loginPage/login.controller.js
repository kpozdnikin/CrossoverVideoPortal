(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$cookies', '$state', 'videoPortalService'];

    function LoginController($scope, $cookies, $state, videoPortalService) {

        var vm = this;

        //functions
        vm.activate = activate;
        vm.getCredentials = getCredentials;

        //variables
        vm.user = {
            name:'',
            password:''
        };
        $scope.showHints = false;


        activate();

        function activate(){
            if($cookies.get('sessionId')) $state.go('home');
        }

        //authirize user if credentials are valid
        function getCredentials(){
            videoPortalService.getCredentials($scope.user).then(function(resp){
                if(resp){
                    $state.go('home');
                }
                else{
                    $scope.showHints = true;
                }
            }, function(err){

            });
        }
    }
})();

