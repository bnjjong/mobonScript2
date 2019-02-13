/*
* landing.js
* desc : 인라이플 광고주 랜딩처리를 담당하는 javascript library, 쿠키 복사 및 2뎁스 처리를 여기서 한다.
* version : 1.0.1
* author : bnjjong
* license : 모든 소유권은 (주)Enliple이 가집니다. 무단 배포, 수정을 금지합니다.
*/
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.mbLanding = factory();
    }
}(this, function () {
    var mbLanding ,
        VERSION = '1.0.0',
        defaults = {
            isCopyCookie : true
            , isTwoDepthLanding : false
            , isDebugMode : false
            , isSendingErrMsg : false
            , twoDepthUrl : ""

        },
        options = {
            isCopyCookie : defaults.isCopyCookie
            , isTwoDepthLanding : defaults.isTwoDepthLanding
            , isDebugMode : defaults.isDebugMode
            , isSendingErrMsg : defaults.isSendingErrMsg
            , twoDepthUrl : defaults.twoDepthUrl

        };

    /************************************
     private
     ************************************/
    var doCookieCopy = function(callbackFn){
        if(options.isDebugMode && console.log) {
            console.log("cookie copy start!!!");
        }
        var iframe = document.createElement("iframe");
        iframe.src = "//"+document.location.host + "/cookies/sendChargeCookie.html";
        iframe.width = "0";
        iframe.height = "0";
        iframe.onload = function() {
            callbackFn();
        }
        if(document.body) {
            document.body.appendChild(iframe);
        } else {
            var html = document.getElementsByTagName("html")[0];
            var body = document.createElement("body");
            html.appendChild(body);
            body.appendChild(iframe);
        }
        console.log("cookie copy end!!!");
    };

    var setTwoDepthLanding = function(){
        if(options.isDebugMode && console.log) {
            console.log("twodepth start!!!");
        }
        var url ="//"+ document.location.host + "/twoDepth/passThroughPage.html?twoDepthUrl=" + options.twoDepthUrl;
        if(history.replaceState) {
            history.replaceState(null, document.title, url);
        }
        if(history.pushState) {
            history.pushState(null, document.title, url);
        }


        if(options.isDebugMode && console.log) {
            console.log("twodepth end!!!");
            console.log("title>>>>" + document.title);
            console.log("twodepth url>>>>" + url);
            if(history.replaceState){
                console.log("history.replaceState support!");
            } else {
                console.log("history.replaceState not support!");
            }
            if(history.pushState) {
                console.log("history.pushState support!");
            } else {
                console.log("history.pushState not support!");
            }
        }
    };

    var getBrowserType = function() {
        var agt = navigator.userAgent.toLowerCase();
        if (agt.indexOf("chrome") != -1) return 'Chrome';
        if (agt.indexOf("opera") != -1) return 'Opera';
        if (agt.indexOf("staroffice") != -1) return 'Star Office';
        if (agt.indexOf("webtv") != -1) return 'WebTV';
        if (agt.indexOf("beonex") != -1) return 'Beonex';
        if (agt.indexOf("chimera") != -1) return 'Chimera';
        if (agt.indexOf("netpositive") != -1) return 'NetPositive';
        if (agt.indexOf("phoenix") != -1) return 'Phoenix';
        if (agt.indexOf("firefox") != -1) return 'Firefox';
        if (agt.indexOf("safari") != -1) return 'Safari';
        if (agt.indexOf("skipstone") != -1) return 'SkipStone';
        if (agt.indexOf("msie") != -1) return 'Internet Explorer';
        if (agt.indexOf("rv:11.0") != -1) return 'Internet Explorer';
        if (agt.indexOf("netscape") != -1) return 'Netscape';
        if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    };

    var landing = function(url){

        if(options.isDebugMode && console.log) {
            console.log("browser is>>>>"+ navigator.userAgent);
            console.log("landing url is>>>>>" + url);
        } else {
            var browser = getBrowserType();
            if ( browser === 'Internet Explorer' || browser === 'Safari' ) {
                setTimeout(function(){location.href = url}, 500);
            } else {
                location.href = url;
            }
        }
    };
    /************************************
     Constructors
     ************************************/
    mbLanding = function(url){
        this._url = decodeURIComponent(url);
        if(options.isDebugMode && console.log) {
            console.log("url>>>>>" + url);
            console.log("decoded url>>>>>" + this._url);
        }
    };

    /************************************
     options
     ************************************/
    mbLanding.options = options;
    mbLanding.setDebugMode = function(isDebugMode) {
        options.isDebugMode = isDebugMode;
    };
    mbLanding.setCookieCopy = function(isCookieCopy) {
        options.isCopyCookie = isCookieCopy;
    };
    mbLanding.setTwoDepthLanding = function(isTwoDepthLanding) {
        options.isTwoDepthLanding = isTwoDepthLanding;
    };
    mbLanding.setTwoDepthUrl = function(twoDepthUrl) {
        options.twoDepthUrl = twoDepthUrl;
    };

    mbLanding.setSendingErrMsg = function(isSendingErrMsg) {
        options.isSendingErrMsg = isSendingErrMsg;
    };

    mbLanding.goLanding = function() {
        if(options.isDebugMode && console.log) {
            console.log("start landing>>>>");
        }
        try {
            // twodepth
            if(options.isTwoDepthLanding) {
                setTwoDepthLanding();
            }

            if(options.isCopyCookie) {
                doCookieCopy(function(){
                    landing(this._url);
                });
            } else {
                landing(this._url);
            }

        } catch ( e ) {
            if(options.isDebugMode && console.log) {
                console.log("error occur>>>>>" +  e.message);
                console.log("when error occur, go url anyway!!");
            }
            if(options.isSendingErrMsg) {
                // 서버 에러 메세지 전송
            }
            landing(this._url);
        }
    } ;

    mbLanding.version = VERSION;
    return mbLanding;
}));