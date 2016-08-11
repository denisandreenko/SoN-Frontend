'use strict';

angular.module('socialNetwork')
    .constant('Constant', {
        MyId: '',
        LastPage: '',
        ToastMsg: '',
        APIBaseUrl: 'https://sjc2016vs5.fwd.wf',//'http://192.168.7.121:8080', // 'https://kkq-social.fwd.wf',//'https://social.fwd.wf', //http://www.mocky.io/v2/578e18f50f00006f19aebc38',// 'https://sjc2016vs3.fwd.wf/',
        Auth: {
            clientHash: "cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg=="
        },
        UploadedImgID: null,
        AuthType: {
            AUTH: 'Auth',
            REG: 'Reg',
            NONE: 'None',
            BASIC: 'Basic',
            OAUTH: 'Oauth'
        }
    });
