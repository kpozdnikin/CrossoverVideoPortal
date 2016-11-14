(function () {
    'use strict';

    angular.module('videoPortalScroll', []);
})();

//this is for scrolling to bottom event, for lazy loading videos
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

(function () {
    'use strict';

    angular.module('videoPortalPlay', []);
})();

// this is for stopping other videos when playing one
(function () {
    'use strict';

    angular
        .module('videoPortalPlay')
        .directive('playListener', function () {
            return {
                restrict: 'A',
                link: function (scope, elements, attrs) {
                    //if playing one video
                    elements[0].addEventListener("playing", function () {
                        var elems = document.getElementsByClassName("panel-video");
                        var wrappedQueryResult = angular.element(elems);
                        //other videos will stop
                        for(var i = 0; i < wrappedQueryResult.length; i++){
                            if(wrappedQueryResult[i] != elements[0])
                            wrappedQueryResult[i].pause();
                        }
                    });
                }
            };
        });
})();