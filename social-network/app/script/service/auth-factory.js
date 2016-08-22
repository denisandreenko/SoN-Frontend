'use strict';

angular.module('socialNetwork').factory('authFact', authFact);

authFact.$inject = ['$cookies'];

function authFact($cookies) {
    var authFact = {};

    function _setUserId(id) {
        $cookies.put('userId', id);
    }

    function _getUserId () {
        var i = $cookies.get('userId');
        return $cookies.get('userId');
    }

    function _clearId() {
        $cookies.remove('userId');
    }

    function _setAccessToken(accessToken) {
        $cookies.put('accessToken', accessToken);
    }

    function _getAccessToken () {
        var accessToken = $cookies.get('accessToken');
        return accessToken;
    }

    function _clearAccessToken() {
        $cookies.remove('accessToken');
    }

    function _setResreshToken(refreshToken) {
        $cookies.put('refreshToken', refreshToken);
    }

    function _getRefreshToken() {
        var refreshToken = $cookies.get('refreshToken');
        return refreshToken;
    }

    function _clearRefreshToken() {
        $cookies.remove('refreshToken');
    }

    return {
        authFact: authFact,
        getId: _getUserId,
        setId: _setUserId,
        clearId: _clearId,
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        clearAccessToken: _clearAccessToken,
        setRefreshToken: _setResreshToken,
        getRefreshToken: _getRefreshToken,
        clearRefreshToken: _clearRefreshToken
    };
}