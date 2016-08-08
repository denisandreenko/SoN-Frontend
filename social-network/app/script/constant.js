'use strict';

angular.module('socialNetwork')
    .constant('Constant', {
        LastPage: '',
        AuthToken: '',
        ToastMsg: '',
        APIBaseUrl: 'https://kkq-social.fwd.wf',//'https://social.fwd.wf',//'https://sjc2016vs4.fwd.wf', //http://www.mocky.io/v2/578e18f50f00006f19aebc38',// 'https://sjc2016vs3.fwd.wf/',
        Auth: {
            clientHash: "cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg=="
        },
        AuthType: {
            AUTH: 'Auth',
            NONE: 'None',
            BASIC: 'Basic',
            OAUTH: 'Oauth'
        }
    });
