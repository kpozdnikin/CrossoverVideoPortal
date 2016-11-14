(function() {

    //checking logout function
    describe('AppController', function() {

        beforeEach(module('videoPortal'));

        var $controller;

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        describe('$scope.logout', function() {
            it('removes the userData.sessionId', function() {
                var $scope = {};
                var controller = $controller('AppController', { $scope: $scope });
                $scope.userData = {
                    sessionId: 'adawdawdwad'
                };
                $scope.logout();
                expect($scope.userData.sessionId).toEqual(null);
            });
        });
    });

}).call(this);