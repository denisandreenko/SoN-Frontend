/**
 * Copyright (c) 2016. Stock Tycoon LLC.  All rights reserved.  http://www.stocktycoon.io.
 */
'use strict';

angular.module('socialNetwork').service('NetworkService', NetworkService);

NetworkService.$inject = ['$http', '$q', '$log', 'Constant', 'ResponseFactory'];

function NetworkService($http, $q, $log, Constant, ResponseFactory) {

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
            case Constant.AuthType.BASIC:
                return {
                    'Authorization': 'Basic ' + Constant.Auth.clientHash,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                };
            // case Constant.AuthType.OAUTH:
            //     return {
            //         'Authorization': 'Bearer ' + AuthFactory.getAccessToken()
            //     };
        }
    }

    function _postRegister(data){

        var url = "https://sjc2016vs3.fwd.wf/users";//Constant.APIBaseUrl;
        var params = {};
        return _post(url, data,Constant.AuthType.NONE, params);
    }
    function _getProfile(userId) {
        var url = 'http://www.mocky.io/v2/578e33a20f0000ce00e9a041';
        var params = {};
        return _get(url, Constant.AuthType.NONE, params);
    }
    function _getPost(userId, offset, limit) {

        var url = 'http://www.mocky.io/v2/579b2d941100003919cb7701';//'http://www.mocky.io/v2/579b2b6d110000fb18cb76fc'; //+ "/posts";

        var params = {
            // "userId": userId,
            // "offset": offset,
            // "limit": limit
        };
        return _get(url, Constant.AuthType.NONE, params);
    }

    return {
        getPost: _getPost,
        postReg : _postRegister,
        getProfileInfo : _getProfile
    }
}
