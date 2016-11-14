(function() {

    //checking logout function
    describe('HomeAllController', function() {

        beforeEach(module('videoPortal'));

        var $controller;

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        describe('$scope.onRating', function () {
            it('set videos rating', function () {
                var $scope = {};
                var controller = $controller('HomeAllController', {
                    $scope: $scope,
                    videos: {
                        _id : '5826e8ae41abe135a71859db',
                        description:"React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
                        name: "[0] Getting Started With ReactJs",
                        ratings:[1, 5, 5, 4, 3, 4, 2, 5],
                        url : "videos/Getting_Started_With_React.js.mp4"
                    }
                });
                var vm = controller;
                var item = {};
                vm.onRating(item);
                expect(item.rated).toEqual(true);
            });
        });
    });


}).call(this);