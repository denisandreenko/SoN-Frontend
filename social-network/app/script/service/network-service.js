'use strict';

angular.module('socialNetwork').service('NetworkService', NetworkService);

NetworkService.$inject = ['$http', '$q', '$log', 'Constant', 'ResponseFactory', '$mdToast', 'authFact'];

function NetworkService($http, $q, $log, Constant, ResponseFactory, $mdToast, authFact) {

    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = false;
    delete $http.defaults.headers.common['X-Requested-With'];

    function _get(url, authType, params) {

        var deferred = $q.defer();

        var cancel = function () {
            deferred.resolve();
        };

        params = params || {};
        params.access_token = authFact.getAccessToken();

        $http.get(url, {
            params: params,
            headers: _getHeadersByAuthType(authType)
        }).success(function (data) {
            deferred.resolve(ResponseFactory.buildResponse(data));
        }).error(function (xhr, status) {
            Constant.ToastMsg = "Server error, " + xhr;
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            $log.error('[NetworkService] ' + url + ': Error request');
            deferred.reject(status);
        });

        return {
            promise: deferred.promise,
            cancel: cancel
        };
    }

    function _put(url, data, authType, params) {
        authType = authType || Constant.AuthType.NONE;
        var deferred = $q.defer();

        var cancel = function () {
            deferred.resolve();
        };

        params = params || {};

        if (authType != Constant.AuthType.REG)
            params.access_token = authFact.getAccessToken();

        var req = {
            method: 'PUT',
            url: url,
            params: params,
            headers: _getHeadersByAuthType(authType),
            data: data
        };

        $http(req).success(function (data) {
            deferred.resolve(ResponseFactory.buildResponse(data));
        }).error(function (xhr, status) {
            Constant.ToastMsg = "Server error...";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            $log.error('[NetworkService] ' + url + ': Error request');
            deferred.reject(status);
        });

        return {
            promise: deferred.promise,
            cancel: cancel
        };
    }

    function _post(url, data, authType, params) {
        authType = authType || Constant.AuthType.NONE;
        var deferred = $q.defer();

        var cancel = function () {
            deferred.resolve();
        };

        params = params || {};

        if (authType != Constant.AuthType.REG) {
            params.access_token = authFact.getAccessToken();
        }

        var req = {
            method: 'POST',
            url: url,
            params: params,
            headers: _getHeadersByAuthType(authType),
            data: data
        };


        $http(req).success(function (data) {
            deferred.resolve(ResponseFactory.buildResponse(data));
        }).error(function (xhr, status) {
            Constant.ToastMsg = "Server error...";
            $mdToast.show({
                hideDelay: 3000,
                position: 'top right',
                controller: 'ToastController',
                templateUrl: 'view/toast.html'
            });
            $log.error('[NetworkService] ' + url + ': Error request');
            deferred.reject(status);
        });

        return {
            promise: deferred.promise,
            cancel: cancel
        };
    }

    function _getHeadersByAuthType(authType) {

        switch (authType) {
            case Constant.AuthType.NONE:
                return {
                    'Content-Type': 'application/json'
                };
            case Constant.AuthType.AUTH:
                return {
                    'Authorization': 'Basic cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg==',
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            case Constant.AuthType.REG:
                return {
                    'Content-Type': 'application/json'
                };
            case Constant.AuthType.BASIC:
                return {
                    'Authorization': 'Basic cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg==',
                    'Content-Type': 'application/json'
                };
            // case Constant.AuthType.OAUTH:
            //     return {
            //         'Authorization': 'Bearer ' + AuthFactory.getAccessToken()
            //     };
        }
    }

    function _editProfile(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _put(url, data, Constant.AuthType.NONE, params);
    }

    function _createPoster(additionalUrl, data) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.BASIC, params);
    }

    function _authorisation(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.AUTH, params);
    }

    function _postingData(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;//Constant.APIBaseUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.BASIC, params);
    }

    function _getMyProfile(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getProfileById(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getAudiolist(additionalUrl, userId) {
        var url = additionalUrl;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _postImage(data, additionalUrl, name) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            name: name
        };
        return _post(url, data, Constant.AuthType.NONE, params);
    }

    function _getPost(additionalUrl, userId, offset, limit) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            userId: userId,
            offset: offset,
            limit: limit
        };
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _registration(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.REG, params);
    }

    function _getFriends(additionalUrl, params) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var authType = Constant.AuthType.BASIC;
        var params = params;
        return _get(url, authType, params);
    }

    return {
        editProfile: _editProfile,
        postImage: _postImage,
        getPost: _getPost,
        getFriends: _getFriends,
        post: _postingData,
        createPoster: _createPoster,
        getMyProfile: _getMyProfile,
        getProfileById: _getProfileById,
        getAudioList: _getAudiolist,
        authorisation: _authorisation,
        registration: _registration
    }
}
