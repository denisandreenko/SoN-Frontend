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

    function _post(url, data, authType, params) {
        authType = authType || Constant.AuthType.NONE;
        var deferred = $q.defer();

        var cancel = function () {
            deferred.resolve();
        };

        params = params || {};
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
                    //'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
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

    function _createPoster(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            'Access_Token': Constant.AuthToken
        };
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
        var params = {
            access_token: authFact.getAccessToken()
        };
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getProfileById(additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {
            access_token: authFact.getAccessToken()
        };
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getAudiolist(urlIn, userId) {
        var url = urlIn;
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }

    function _getPost(userId, offset, limit) {

        var url = 'http://www.mocky.io/v2/579b2d941100003919cb7701';

        var params = {
            // "userId": userId,
            // "offset": offset,
            // "limit": limit
        };
        return _get(url, Constant.AuthType.NONE, params);
    }
    function _registration(data, additionalUrl) {
        var url = Constant.APIBaseUrl + additionalUrl;
        var params = {};
        return _post(url, data, Constant.AuthType.BASIC, params);
    }

    return {
        getPost: _getPost,
        post: _postingData,
        createPoster: _createPoster,
        getMyProfile: _getMyProfile,
        getProfileById: _getProfileById,
        getAudioList: _getAudiolist,
        authorisation: _authorisation,
        registration: _registration
    }
}
