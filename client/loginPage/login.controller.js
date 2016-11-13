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
            console.log('LoginController');
            console.log($cookies.get('sessionId'));
        }

        //authirize user if credentials are valid
        function getCredentials(){
            videoPortalService.getCredentials($scope.user).then(function(resp){
                console.log(resp);
                if(resp){
                    $scope.showHints = false;
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

