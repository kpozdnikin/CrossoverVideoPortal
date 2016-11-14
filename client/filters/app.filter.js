(function () {
    'use strict';

    angular
        .module('videoPortal')
        .filter('videoNameFilter', videoNameFilter);

    // filter for removing number from video name
    function videoNameFilter() {
        return function (val) {
            var newName = '';
            var regExp = '[*]';
            if (val) {
                newName = val.replace(regExp, '');
                //newName = val;
            }

            return newName
        }
    }
})();