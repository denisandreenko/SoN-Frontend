'use strict';

angular.module('socialNetwork').factory('authFact', authFact);

authFact.$inject = ['$cookies'];

function authFact($cookies) {
    var authFact = {};

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
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        clearAccessToken: _clearAccessToken
    };
}