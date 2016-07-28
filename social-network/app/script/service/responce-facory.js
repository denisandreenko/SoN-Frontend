/**
 * Copyright (c) 2016. Stock Tycoon LLC.  All rights reserved.  http://www.stocktycoon.io.
 */
'use strict';

angular.module('socialNetwork')
    .factory('ResponseFactory', ResponseFactory);

function ResponseFactory() {
    function _buildResponse(data) {
        var response = {
            data: angular.isDefined(data) ? data : null,
            message: data.message || null,
            status: data.status || null,
            statusCode: data.statusCode || null,
            hasError: function () {
                // return this.status !== 'success';
                return angular.isDefined(data.errorCode);

            },
            getMessage: function () {
                return this.message;
            },
            getData: function () {
                return this.data;
            },
            getStatus: function () {
                return this.status;
            },
            isNotFoundError: function () {
                return this.statusCode === 404;
            },
            isUnauthorizedError: function () {
                return this.statusCode === 401;
            }
        };

        return response;
    }

    return {
        buildResponse: _buildResponse
    };
}
