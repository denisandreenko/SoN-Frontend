'use strict';

angular.module('socialNetwork')
    .constant('Constant', {
        MyId: '',
        SearchReqText: '',
        ToastMsg: '',
        UploadedImgID: null,
        APIBaseUrl: 'https://sjc2016vs6.fwd.wf',//'http://192.168.7.121:8080',//'https://mighty-inlet-90070.herokuapp.com',//'https://damp-meadow-52783.herokuapp.com',////'https://sjc2016vs6.fwd.wf',////////// //http://localhost:8080/SocialNetwork',// // 'https://kkq-social.fwd.wf',//'https://social.fwd.wf', //http://www.mocky.io/v2/578e18f50f00006f19aebc38',// 'https://sjc2016vs3.fwd.wf/',
        Auth: {
            clientHash: "cGFzc3dvcmRDbGllbnQ6MG00NWJ4cDRyMg=="
        },
        AuthType: {
            AUTH: 'Auth',
            REG: 'Reg',
            NONE: 'None',
            BASIC: 'Basic',
            OAUTH: 'Oauth'
        },
        Events: {
            REFRESHBLIST: 'RefreshBList',
            REFRESHPOSTS: 'RefreshPosts',
            REFRESHIDPOSTS: 'RefresiIdPosts',
            REFRESHGPOSTS: 'RefreshGPosts',
            UPDATESEARCH: 'UpdateSearch',
            UPDATEGROUP: 'UpdateGroup'
        }
    });
