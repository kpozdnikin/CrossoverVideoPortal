(function () {
    'use strict';

    angular
        .module('videoPortal')
        .service('videoPortalService', videoPortalService);

    videoPortalService.$inject = ['$http', '$cookies', '$state', 'md5'];

    function videoPortalService($http, $cookies, $state, md5) {

        var service = {
            getCredentials       : getCredentials,
            deleteCredentials    : deleteCredentials,
            destroySession       : destroySession,
            getVideos            : getVideos,
            getVideo             : getVideo,
            rateVideo            : rateVideo,
            checkAllVideosRating : checkAllVideosRating
        };
        return service;

        //login user
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

        //logout user
        function deleteCredentials(){
            return $http.get('/user/logout?sessionId=' + sessionId)
                .then(function (resp) {
                    if(resp.status == "success"){
                        $state.go('login');
                        return resp.data;
                    }
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        //getting all videos
        function getVideos(sessionId, lim, skp){
            var limit = lim || 10,
                skip = skp || 0;
            return $http.get('/videos?sessionId=' + sessionId + '&limit=' + limit + '&skip=' + skp)
                .then(function (resp) {
                    if(resp.data.status == "success")
                        return resp.data;
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        //getting one video by id
        function getVideo(sessionId, videoId){
            return $http.get('/video?sessionId=' + sessionId + '&videoId=' + videoId)
                .then(function (resp) {
                    if(resp.data.status == "success")
                        return resp.data;
                    else return false;
                }, function (err) {
                    return destroySession(err);
                });
        }

        //set video rating
        function rateVideo(videoId, rating, sessionId){
            return $http.post('/video/ratings?sessionId=' + sessionId, {
                videoId : videoId,
                rating  : rating
            })
                .then(function (resp) {
                    if(resp.data.status == "success")
                        return resp.data;
                    else return destroySession(resp.status);
                }, function (err) {
                    return destroySession(err);
                });
        }

        //put the sessionId to cookies to have access from every place
        function cteateSession(userData){
            $cookies.put('sessionId', userData.sessionId);
            $cookies.put('userName', userData.username);
            return true;
        }

        //remove session data from cookies
        function destroySession(err){
            $cookies.remove('sessionId');
            $cookies.remove('userName');
            $state.go('login');
            return err;
        }

        //check all videos rating
        function checkAllVideosRating(videos) {
            if(!videos.length){
                var sum = 0;
                videos.ratings.forEach(function(rating){
                    sum += rating;
                });
                videos.rating = parseInt(sum/videos.ratings.length);
            }
            else{
                videos.forEach(function(video){
                    var sum = 0;
                    video.ratings.forEach(function(rating){
                        sum += rating;
                    });
                    video.rating = parseInt(sum/video.ratings.length);
                });
            }
            return videos;
        }
    }
})();
