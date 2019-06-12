(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/HeartBeat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5bf89NEP+RIPY6oCsdwjRWQ', 'HeartBeat', __filename);
// Script/logic/HeartBeat.ts

/**
 * Author: Ma yuan
 * Date: 2018.11.1
 * CopyRight:
 * 心跳类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ScoketManager_1 = require("./ScoketManager");
var Protocol_1 = require("../network/Protocol");
var Event_1 = require("../Event/Event");
var EvenID_1 = require("../event/EvenID");
var PacketID_1 = require("../network/PacketID");
var configsFile_1 = require("../data/configsFile");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeartBeat = /** @class */ (function (_super) {
    __extends(HeartBeat, _super);
    function HeartBeat() {
        var _this = _super.call(this) || this;
        _this.m_socket = null;
        _this.m_curMissCount = 0;
        _this.m_maxMissCount = 3;
        _this.m_interVale = 15;
        _this.m_schedule = null;
        _this.m_socket = ScoketManager_1.default.getInstance();
        _this.m_schedule = cc.director.getScheduler();
        if (configsFile_1.Sina_Config.SINA_HEARTBEAT_INTERVAL > 0) {
            _this.m_interVale = configsFile_1.Sina_Config.SINA_HEARTBEAT_INTERVAL;
        }
        Event_1.default.getInstance().addEventListener((PacketID_1.PacketID._SINA_PACKET_SC_HeartBeatID).toString(), _this.onReciveHeartBeatAck, _this);
        return _this;
    }
    HeartBeat.prototype.WX_ThreeKingFun_we3ws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HeartBeat.prototype.startHeartBeat = function () {
        // cc.log("HeartBeat :StartHeartBeat");
        this.m_curMissCount = 0;
        this.m_schedule.unschedule(this.onIdleTimer, this);
        if (configsFile_1.Sina_Config.SINA_HEARTBEAT_INTERVAL > 0) {
            this.m_schedule.schedule(this.onIdleTimer, this, this.m_interVale, cc.macro.REPEAT_FOREVER, 0, false);
        }
    };
    HeartBeat.prototype.stopHeartBeat = function () {
        // cc.log("HeartBeat :stopHeartBeat");
        this.m_curMissCount = 0;
        this.m_schedule.unschedule(this.onIdleTimer, this);
    };
    HeartBeat.prototype.WX_ThreeKingFun_wrwwqws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HeartBeat.prototype.onIdleTimer = function (dt) {
        // cc.log("HeartBeat :onIdleTimer");        
        if (dt > this.m_interVale * this.m_maxMissCount) {
            this.heartTimeOut();
        }
        else {
            this.sendHearBeat();
        }
    };
    HeartBeat.prototype.sendHearBeat = function () {
        // cc.log("HeartBeat :sendHearBeat");
        this.m_curMissCount++;
        if (this.m_curMissCount > this.m_maxMissCount) {
            this.heartTimeOut();
        }
        else {
            var texting = new Protocol_1.CSHeartBeat();
            this.m_socket.send(texting.pack(), PacketID_1.PacketID._SINA_PACKET_CS_HeartBeatID);
        }
    };
    HeartBeat.prototype.WX_ThreeKingFun_wemffws = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HeartBeat.prototype.heartTimeOut = function () {
        // cc.log("HeartBeat HeartTimeOut");
        Event_1.default.getInstance().send(EvenID_1.EventIDS.CMD_HEART_BEAT_TIMEOUT);
    };
    HeartBeat.prototype.onReciveHeartBeatAck = function (data) {
        // cc.log("HeartBeat :onReciveHeartBeatAck");
        this.m_curMissCount = 0;
    };
    HeartBeat.prototype.WX_ThreeKingFun_wemgggs = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    HeartBeat = __decorate([
        ccclass
    ], HeartBeat);
    return HeartBeat;
}(cc.Component));
exports.default = HeartBeat;

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
        //# sourceMappingURL=HeartBeat.js.map
        