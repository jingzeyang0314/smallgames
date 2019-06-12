(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/HttpHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a7a3TY5k5E8LVl34qv5vM6', 'HttpHelper', __filename);
// Script/network/HttpHelper.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * HTTP 封装类
 */
var configsFile_1 = require("../data/configsFile");
var DataManager_1 = require("../data/DataManager");
var HttpHelper = /** @class */ (function () {
    function HttpHelper() {
    }
    HttpHelper.getPathHttpPost = function () {
        if (cc.sys.isNative) {
            return "";
        }
        else {
            return "jspost/";
        }
    };
    HttpHelper.prototype.WX_ThreeKingFun_qin001wqqweqwe = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HttpHelper.sendHttpData = function (data, msgID, successCallback, failedCallback) {
        var xhr = cc.loader.getXMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // cc.log("sendHttpData dataLen = ", xhr.response.byteLength);
                    successCallback(xhr.status, self.DecodeBuffer(xhr.response));
                }
                else {
                    if (failedCallback) {
                        failedCallback(xhr.status);
                    }
                }
            }
        };
        var dataArray = this.EndcodeToBuffer(data.pack(), msgID);
        var url = this.getPathHttpPost() + configsFile_1.Sina_Config.ServerURL;
        xhr.open("POST", configsFile_1.Sina_Config.ServerURL, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "arraybuffer";
        var strLen = dataArray.byteLength.toString();
        //xhr.setRequestHeader("content-length", strLen);
        xhr.timeout = 5000; // 5 seconds for timeout
        xhr.send(dataArray);
    };
    HttpHelper.prototype.WX_ThreeKingFun_qin001wwwwwwrrr = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HttpHelper.EndcodeToBuffer = function (msg, msgID) {
        var msgLength = 0;
        if (msg !== null) {
            msgLength = msg.byteLength;
        }
        var allLength = 20 + msgLength;
        var abAll = new ArrayBuffer(allLength);
        var view = new DataView(abAll);
        // cc.log("allLength = ", allLength);
        var playerID = DataManager_1.default.getInstance().getuserData().PlayerID;
        view.setInt32(0, msgLength);
        view.setInt32(4, msgID);
        view.setInt32(8, playerID); //userID
        view.setInt32(12, configsFile_1.Sina_Config.GameMsgVersion);
        view.setInt32(16, 0);
        if (msgLength != 0) {
            var abBodyView = new Uint8Array(abAll, 20);
            var abMsgView = new Uint8Array(msg);
            abBodyView.set(abMsgView);
        }
        // cc.log("abAll length = ", abAll.byteLength);
        return abAll;
    };
    HttpHelper.prototype.WX_ThreeKingFun_qin001wwwwww = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HttpHelper.DecodeBuffer = function (data) {
        // cc.log("data length is ", data.byteLength);
        var abAll = data;
        var dv = new DataView(abAll);
        var msgLen = dv.getInt32(0);
        var msgID = dv.getInt32(4);
        var UserID = dv.getInt32(8);
        var version = dv.getInt32(12);
        var extent = dv.getInt32(16);
        cc.log("UserID = ", UserID);
        if (UserID != 0) {
            DataManager_1.default.getInstance().getuserData().PlayerID = UserID;
        }
        //let msgData = new MsgInfo();
        //msgData.msgID = msgID;
        var msg = new ArrayBuffer(msgLen);
        msg = abAll.slice(20, 20 + msgLen);
        // cc.log("msg Length is", msgLen);
        return msg;
        //EventDispath.getInstance().send(msgID.toString(), msgData.msg);
    };
    HttpHelper.prototype.WX_ThreeKingFun_qin001wwwwwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    return HttpHelper;
}());
exports.HttpHelper = HttpHelper;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HttpHelper.js.map
        