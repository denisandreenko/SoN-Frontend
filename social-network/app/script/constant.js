/**
 * Copyright (c) 2016. Stock Tycoon LLC.  All rights reserved.  http://www.stocktycoon.io.
 */

'use strict';

angular.module('socialNetwork')
    .constant('Constant', {
        APIBaseUrl: 'http://www.mocky.io/v2/578e33a20f0000ce00e9a041', //http://www.mocky.io/v2/578e18f50f00006f19aebc38',// 'https://sjc2016vs3.fwd.wf/',
        TradeTypes: {
            Buy: 'BUY',
            Sell: 'SELL'
        },
        Events: {
            EVENT_UPDATE_ACCOUNT: 'stocktycoon.event.update.account',
            EVENT_UNAUTHORIZED: 'stocktycoon.event.unauthorized.exception',
            EVENT_UPDATE_TYCOON_LIST: 'stocktycoon.event.update.tycoon.list',
            EVENT_ACCOUNT_UPDATED: 'stocktycoon.event.account.updated',
            EVENT_UPDATE_NOTIFICATION: 'stocktycoon.event.update.notification',
            EVENT_UPDATE_NOT_READ_NOTIFICATION_COUNT: 'stocktycoon.event.update.not.read.notification.count',
            EVENT_LOTS_UPDATED: 'stocktycoon.event.update.lots',
            EVENT_LOAD_STOCK_INFORMATION: 'stocktycoon.event.load.stock.information'
        },
        Auth: {
            clientHash: "cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg==",
            clientId: 'passwordClient',
            authTokenLocalStorageKey: "auth_token",
            accountIdLocalStorageKey: "account_id"
        },
        AuthType: {
            NONE: 'None',
            BASIC: 'Basic',
            OAUTH: 'Oauth'
        }
    });
