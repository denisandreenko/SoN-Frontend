'use strict';

angular.module('socialNetwork').factory('authFact', authFact);

authFact.$inject = ['$cookies'];

function authFact($cookies) {
    var authFact = {};

    function _setUserId(accessToken) {
        $cookies.put('userId', id);
    }

    function _getUserId () {
        return $cookies.get('userId');
    }

    function _clearId() {
        $cookies.remove('userId');
    }

    function _setAccessToken(accessToken) {
        $cookies.put('accessToken', accessToken);
    }

    function _getAccessToken () {
        return $cookies.get('accessToken');
    }

    function _clearAccessToken() {
        $cookies.remove('accessToken');
    }

    return {
        authFact: authFact,
        getId: _getUserId,
        setId: _setUserId,
        clearId: _clearId,
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        clearAccessToken: _clearAccessToken
    };
}