(function () {
    'use strict';

    angular
        .module('videoPortal')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {

        var vm = this;
        //functions
        vm.activate = activate;

        //variables

        activate();

        function activate() {

        }


    }
})();
