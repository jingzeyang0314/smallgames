(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/MKSocket.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aae78PRm2lCR5S1pcu2EgAo', 'MKSocket', __filename);
// Script/network/MKSocket.ts

/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * socket 封装类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../Event/Event");
var EvenID_1 = require("../event/EvenID");
var configsFile_1 = require("../data/configsFile");
var DataManager_1 = require("../data/DataManager");
var PacketFiles_1 = require("./PacketFiles");
var MsgInfo = /** @class */ (function () {
    function MsgInfo() {
        this.msgID = 0;
    }
    return MsgInfo;
}());
exports.MsgInfo = MsgInfo;
;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MKSocket = /** @class */ (function (_super) {
    __extends(MKSocket, _super);
    function MKSocket() {
        var _this = _super.call(this) || this;
        _this.m_socket = null;
        _this.m_observers = null;
        _this.m_recvBuffer = null;
        _this.m_url = "";
        _this.m_reconnectNum = 0;
        _this.m_reconnectMax = 3;
        _this.m_schedule = null;
        _this.m_observers = [];
        _this.m_recvBuffer = new ArrayBuffer(0);
        return _this;
        //this.m_schedule = cc.director.getScheduler();
    }
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwww = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.connect = function (url) {
        cc.log("connet url = ", url);
        this.disconnect();
        this.m_url = url;
        if (this.m_socket == null) {
            this.m_socket = new WebSocket(url);
        }
        this.m_socket.binaryType = "arraybuffer";
        this.m_socket.onopen = this.onConnect.bind(this);
        this.m_socket.onmessage = this.onSocketDataReceived.bind(this);
        this.m_socket.onerror = this.onError.bind(this);
        this.m_socket.onclose = this.onClose.bind(this);
    };
    MKSocket.prototype.disconnect = function () {
        // cc.log("MKSocket disconnect");
        this.m_recvBuffer = new ArrayBuffer(0);
        if (this.m_socket !== null) {
            this.m_socket.onopen = null;
            this.m_socket.onmessage = null;
            this.m_socket.onerror = null;
            this.m_socket.onclose = null;
            this.m_socket.close();
            this.m_socket = null;
        }
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.isConnected = function () {
        if (this.m_socket !== null) {
            return this.m_socket.readyState == WebSocket.OPEN;
        }
        return false;
    };
    MKSocket.prototype.send = function (msg, msgID) {
        if (!this.isConnected()) {
            return;
        }
        this.m_socket.send(this.encodeMsgID(msg, msgID));
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.addMsgObserver = function (observer) {
        var find = false;
        for (var i = 0; i < this.m_observers.length; ++i) {
            if (observer === this.m_observers[i]) {
                find = true;
                break;
            }
        }
        if (!find) {
            this.m_observers.push(observer);
        }
    };
    MKSocket.prototype.getHexToInt = function (hex) {
        return parseInt(hex, 16);
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwff = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.removeObserver = function (observer) {
        for (var i = 0; i < this.m_observers.length; ++i) {
            if (observer === this.m_observers[i]) {
                this.m_observers.splice(i, 1);
                break;
            }
        }
    };
    MKSocket.prototype.onConnect = function (evt) {
        this.m_reconnectNum = 0;
        //this.stopReconnect();
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_TCP_CONNECT_SUCCESS);
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwqqq = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.onMessage = function (buffer) {
        this.decodeMsgID(buffer);
    };
    MKSocket.prototype.onError = function (evt) {
        cc.log("MKSocket onError , evt = ", evt);
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwqwwwwww = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.onClose = function (evt) {
        cc.log("MKSocket onClose");
        this.disconnect();
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_TCP_CLOSED);
    };
    MKSocket.prototype.encodeMsgID = function (msg, msgID) {
        var msgLength = 0;
        if (msg !== null) {
            msgLength = msg.byteLength;
        }
        var allLength = 20 + msgLength;
        var abAll = new ArrayBuffer(allLength);
        var view = new DataView(abAll);
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
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwfss = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.decodeMsgID = function (msg) {
        var abAll = msg;
        var dv = new DataView(abAll);
        var msgLen = dv.getInt32(0);
        var msgID = dv.getInt32(4);
        var UserID = dv.getInt32(8);
        var version = dv.getInt32(12);
        var extent = dv.getInt32(16);
        var msgData = new MsgInfo();
        msgData.msgID = msgID;
        msgData.msg = abAll.slice(20, 20 + msgLen);
        cc.log("MKSocket reciveMsg MsgID is", msgID.toString(16) + " msgID int is ", msgID + " MsgBodyLength is ", msgLen);
        var protocol = PacketFiles_1.default.getInstance().getPacketFile(msgID);
        if (protocol != null) {
            protocol.unPack(msgData.msg);
            Event_1.default.getInstance().send(msgID.toString(), protocol);
        }
        else {
            cc.log("ERROR!");
        }
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwgg = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket.prototype.onSocketDataReceived = function (evt) {
        // cc.log("MKSocket onSocketDataReceived");
        var bufferData = evt.data;
        var buffer = null;
        var lastLen = this.m_recvBuffer.byteLength;
        if (lastLen > 0) {
            var addLen = bufferData.byteLength;
            var bufferAll = new ArrayBuffer(lastLen + addLen);
            var abLastView = new Int8Array(this.m_recvBuffer);
            var abAllLastView = new Int8Array(bufferAll, 0, lastLen);
            abAllLastView.set(abLastView);
            var abAddView = new Int8Array(bufferData);
            var abAllAddView = new Int8Array(bufferAll, lastLen);
            abAllAddView.set(abAddView);
            buffer = bufferAll;
        }
        else {
            buffer = bufferData;
        }
        var allLength = buffer.byteLength;
        if (allLength < 20) {
            this.m_recvBuffer = buffer;
            return;
        }
        var bufferView = new DataView(buffer);
        var startIdx = 0;
        while (startIdx < allLength) {
            var msgLength = bufferView.getInt32(startIdx + 0);
            var subBufferLength = 20 + msgLength;
            if (startIdx + subBufferLength > allLength) {
                break;
            }
            this.onMessage(buffer.slice(startIdx, startIdx + subBufferLength));
            startIdx += subBufferLength;
            return;
        }
        if (startIdx < allLength) {
            this.m_recvBuffer = buffer.slice(startIdx);
        }
        else {
            this.m_recvBuffer = new ArrayBuffer(0);
        }
        this.onMessage(this.m_recvBuffer);
    };
    MKSocket.prototype.WX_ThreeKingFun_qin002wwwwwwhhh = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    MKSocket = __decorate([
        ccclass
    ], MKSocket);
    return MKSocket;
}(cc.Component));
exports.default = MKSocket;

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
        //# sourceMappingURL=MKSocket.js.map
        