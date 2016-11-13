(function () {
    'use strict';

    angular
        .module('videoPortal')
        .service('videoPortalService', videoPortalService);

    videoPortalService.$inject = ['$http', '$cookies', 'md5'];

    function videoPortalService($http, $cookies, md5) {

        var service = {
            getCredentials      : getCredentials,
            deleteCredentials   : deleteCredentials,
            getVideos           : getVideos,
            getVideo            : getVideo,
            rateVideo           : rateVideo
        };
        return service;

        function getCredentials(user) {
            //ali, tom, harry with password 'password'
            return $http.post('/user/auth', {
                username:user.name,
                password:md5.createHash(user.password || '')
            })
                .then(function (resp) {
                    console.log(resp);
                    if(resp.data.status == "success")
                        return cteateSession(resp.data);
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        function deleteCredentials(){
            return $http.get('/user/logout?sessionId=' + sessionId)
                .then(function (resp) {
                    if(resp.status == "success")
                        return resp.data;
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        function getVideos(sessionId){
            return $http.get('/videos?sessionId=' + sessionId)
                .then(function (resp) {
                    if(resp.data.status == "success")
                        return resp.data;
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        function getVideo(sessionId, videoId){
            return $http.get('/user/logout?sessionId=' + sessionId + '&videoId=' + videoId)
                .then(function (resp) {
                    if(resp.status == "success")
                        return resp.data;
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        function rateVideo(videoId, rating){
            return $http.post('/video/ratings?sessionId=' + sessionId, {
                videoId : videoId,
                rating  : rating
            })
                .then(function (resp) {
                    if(resp.status == "success")
                        return resp.data;
                    else return destroySession(resp.status);
                }, function (err) {
                    return destroySession(err);
                });
        }

        function cteateSession(userData){
            console.log('creatingSession');
            $cookies.put('sessionId', userData.sessionId);
            $cookies.put('userName', userData.username);
            return true;
        }

        function destroySession(err){
            console.log('destroingSession');
            $cookies.remove('sessionId');
            $cookies.remove('userName');
            return err;
        }
    }
})();
