(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('AppController', AppController);

    AppController.$inject = ['$cookies', '$state'];

    function AppController($cookies, $state) {

        var vm = this;

        vm.activate = activate;

        activate();

        function activate(){

        }

    }
})();

