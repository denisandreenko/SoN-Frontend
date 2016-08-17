'use strict';

angular.module('socialNetwork').service('NotifyService', NotifyService);

NotifyService.$inject = ['$rootScope'];

function NotifyService($rootScope) {

    function _subscribe(key, callback) {
        return $rootScope.$on(key, function(event, data) {
            callback(event, data);
        });
    }

    function _notify(key, data) {
        $rootScope.$emit(key, data);
    }

    return {
        subscribe: _subscribe,
        notify: _notify
    };

    // subscribe: function(scope, callback) {
    //     var handler = $rootScope.$on('notifying-service-event', callback);
    //     scope.$on('$destroy', handler);
    // },
    //
    // notify: function() {
    //     $rootScope.$emit('notifying-service-event');
    // }
}