'use strict';

angular.module('socialNetwork').service('ValidationService', ValidationService);

ValidationService.$inject = [];

function ValidationService() {
    function _checkField(word) {
        word.trim();
        if(word.length >= 0 && word.length <= 20){
            return 'OK';
        }
        else return 'NOT OK';
    }

    function _checkEmail(email) {
        var leftPart = email.split('@');
    }



    return{
        checkField: _checkField,
        checkEmail: _checkEmail
    }
}