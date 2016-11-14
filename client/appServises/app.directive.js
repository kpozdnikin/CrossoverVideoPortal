(function () {
    'use strict';

    angular.module('videoPortalScroll', []);
})();

(function () {
    'use strict';

    angular
        .module('videoPortalScroll')
        .directive('scrolly', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var raw = element[0];
                    element.bind('scroll', function () {
                        //if we scroll to bottom of page
                        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                            scope.$apply(attrs.scrolly);
                        }
                    });
                }
            };
        });
})();