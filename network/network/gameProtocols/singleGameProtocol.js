(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/gameProtocols/singleGameProtocol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fec00lTrpJJAaE8AJI8rxFY', 'singleGameProtocol', __filename);
// Script/network/gameProtocols/singleGameProtocol.ts

//单机小游戏协议
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("../Parser");
var Packe_1 = require("../Packe");
//道具
var StagePropVo = /** @class */ (function (_super) {
    __extends(StagePropVo, _super);
    function StagePropVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return StagePropVo;
}(Packe_1.default));
exports.StagePropVo = StagePropVo;
;
//游戏开始
var CSSingleGameStart = /** @class */ (function (_super) {
    __extends(CSSingleGameStart, _super);
    function CSSingleGameStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameStart;
}(Packe_1.default));
exports.CSSingleGameStart = CSSingleGameStart;
;
var SCSingleGameStart = /** @class */ (function (_super) {
    __extends(SCSingleGameStart, _super);
    function SCSingleGameStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameStart;
}(Packe_1.default));
exports.SCSingleGameStart = SCSingleGameStart;
;
//购买复活
var CSSingleGameLife = /** @class */ (function (_super) {
    __extends(CSSingleGameLife, _super);
    function CSSingleGameLife() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameLife;
}(Packe_1.default));
exports.CSSingleGameLife = CSSingleGameLife;
;
var SCSingleGameLife = /** @class */ (function (_super) {
    __extends(SCSingleGameLife, _super);
    function SCSingleGameLife() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameLife;
}(Packe_1.default));
exports.SCSingleGameLife = SCSingleGameLife;
;
//信息同步
var CSSingleGameSyn = /** @class */ (function (_super) {
    __extends(CSSingleGameSyn, _super);
    function CSSingleGameSyn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameSyn;
}(Packe_1.default));
exports.CSSingleGameSyn = CSSingleGameSyn;
;
var SCSingleGameSyn = /** @class */ (function (_super) {
    __extends(SCSingleGameSyn, _super);
    function SCSingleGameSyn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameSyn;
}(Packe_1.default));
exports.SCSingleGameSyn = SCSingleGameSyn;
;
//排行榜
var CSSingleGameOrder = /** @class */ (function (_super) {
    __extends(CSSingleGameOrder, _super);
    function CSSingleGameOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameOrder;
}(Packe_1.default));
exports.CSSingleGameOrder = CSSingleGameOrder;
;
var PlayerOrderVo = /** @class */ (function (_super) {
    __extends(PlayerOrderVo, _super);
    function PlayerOrderVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return PlayerOrderVo;
}(Packe_1.default));
exports.PlayerOrderVo = PlayerOrderVo;
;
var SCSingleGameOrder = /** @class */ (function (_super) {
    __extends(SCSingleGameOrder, _super);
    function SCSingleGameOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameOrder;
}(Packe_1.default));
exports.SCSingleGameOrder = SCSingleGameOrder;
;
//微信次数
var CSSingleGameSend = /** @class */ (function (_super) {
    __extends(CSSingleGameSend, _super);
    function CSSingleGameSend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameSend;
}(Packe_1.default));
exports.CSSingleGameSend = CSSingleGameSend;
;
var SCSingleGameSend = /** @class */ (function (_super) {
    __extends(SCSingleGameSend, _super);
    function SCSingleGameSend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameSend;
}(Packe_1.default));
exports.SCSingleGameSend = SCSingleGameSend;
;
//武器库
//进入武器库界面初始化数据
var CSSingleGameSkin = /** @class */ (function (_super) {
    __extends(CSSingleGameSkin, _super);
    function CSSingleGameSkin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameSkin;
}(Packe_1.default));
exports.CSSingleGameSkin = CSSingleGameSkin;
;
var SCSingleGameSkin = /** @class */ (function (_super) {
    __extends(SCSingleGameSkin, _super);
    function SCSingleGameSkin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameSkin;
}(Packe_1.default));
exports.SCSingleGameSkin = SCSingleGameSkin;
;
//获得武器同步
var CSSingleGameLottery = /** @class */ (function (_super) {
    __extends(CSSingleGameLottery, _super);
    function CSSingleGameLottery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameLottery;
}(Packe_1.default));
exports.CSSingleGameLottery = CSSingleGameLottery;
;
var SCSingleGameLottery = /** @class */ (function (_super) {
    __extends(SCSingleGameLottery, _super);
    function SCSingleGameLottery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameLottery;
}(Packe_1.default));
exports.SCSingleGameLottery = SCSingleGameLottery;
;
//更换武器
var CSSingleGameExchange = /** @class */ (function (_super) {
    __extends(CSSingleGameExchange, _super);
    function CSSingleGameExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameExchange;
}(Packe_1.default));
exports.CSSingleGameExchange = CSSingleGameExchange;
;
var SCSingleGameExchange = /** @class */ (function (_super) {
    __extends(SCSingleGameExchange, _super);
    function SCSingleGameExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameExchange;
}(Packe_1.default));
exports.SCSingleGameExchange = SCSingleGameExchange;
;
//单机游戏签到信息获取
var SingleGameShowCheck = /** @class */ (function (_super) {
    __extends(SingleGameShowCheck, _super);
    function SingleGameShowCheck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SingleGameShowCheck;
}(Packe_1.default));
exports.SingleGameShowCheck = SingleGameShowCheck;
;
var CSSingleGameCheckIn = /** @class */ (function (_super) {
    __extends(CSSingleGameCheckIn, _super);
    function CSSingleGameCheckIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameCheckIn;
}(Packe_1.default));
exports.CSSingleGameCheckIn = CSSingleGameCheckIn;
;
var SCSingleGameCheckIn = /** @class */ (function (_super) {
    __extends(SCSingleGameCheckIn, _super);
    function SCSingleGameCheckIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.Shows_TypeItem = new SingleGameShowCheck();
        return _this;
    }
    return SCSingleGameCheckIn;
}(Packe_1.default));
exports.SCSingleGameCheckIn = SCSingleGameCheckIn;
;
//签到
var CSSingleGameCheckDay = /** @class */ (function (_super) {
    __extends(CSSingleGameCheckDay, _super);
    function CSSingleGameCheckDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameCheckDay;
}(Packe_1.default));
exports.CSSingleGameCheckDay = CSSingleGameCheckDay;
;
var SCSingleGameCheckDay = /** @class */ (function (_super) {
    __extends(SCSingleGameCheckDay, _super);
    function SCSingleGameCheckDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameCheckDay;
}(Packe_1.default));
exports.SCSingleGameCheckDay = SCSingleGameCheckDay;
;
//离线奖励
//领取离线奖励
var CSSingleGameOffLine = /** @class */ (function (_super) {
    __extends(CSSingleGameOffLine, _super);
    function CSSingleGameOffLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameOffLine;
}(Packe_1.default));
exports.CSSingleGameOffLine = CSSingleGameOffLine;
;
var SCSingleGameOffLine = /** @class */ (function (_super) {
    __extends(SCSingleGameOffLine, _super);
    function SCSingleGameOffLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameOffLine;
}(Packe_1.default));
exports.SCSingleGameOffLine = SCSingleGameOffLine;
;
//领取离线奖励
var CSSingleGameClick = /** @class */ (function (_super) {
    __extends(CSSingleGameClick, _super);
    function CSSingleGameClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameClick;
}(Packe_1.default));
exports.CSSingleGameClick = CSSingleGameClick;
;
var SCSingleGameClick = /** @class */ (function (_super) {
    __extends(SCSingleGameClick, _super);
    function SCSingleGameClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameClick;
}(Packe_1.default));
exports.SCSingleGameClick = SCSingleGameClick;
;
//离线翻倍
var CSSingleGameDouble = /** @class */ (function (_super) {
    __extends(CSSingleGameDouble, _super);
    function CSSingleGameDouble() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameDouble;
}(Packe_1.default));
exports.CSSingleGameDouble = CSSingleGameDouble;
;
var SCSingleGameDouble = /** @class */ (function (_super) {
    __extends(SCSingleGameDouble, _super);
    function SCSingleGameDouble() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameDouble;
}(Packe_1.default));
exports.SCSingleGameDouble = SCSingleGameDouble;
;
//关卡奖励
var CSSingleGameRes = /** @class */ (function (_super) {
    __extends(CSSingleGameRes, _super);
    function CSSingleGameRes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameRes;
}(Packe_1.default));
exports.CSSingleGameRes = CSSingleGameRes;
;
var SCSingleGameRes = /** @class */ (function (_super) {
    __extends(SCSingleGameRes, _super);
    function SCSingleGameRes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameRes;
}(Packe_1.default));
exports.SCSingleGameRes = SCSingleGameRes;
;
//邀请绑定
var CSSingleGameInviteBind = /** @class */ (function (_super) {
    __extends(CSSingleGameInviteBind, _super);
    function CSSingleGameInviteBind() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameInviteBind;
}(Packe_1.default));
exports.CSSingleGameInviteBind = CSSingleGameInviteBind;
;
var SCSingleGameInviteBind = /** @class */ (function (_super) {
    __extends(SCSingleGameInviteBind, _super);
    function SCSingleGameInviteBind() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameInviteBind;
}(Packe_1.default));
exports.SCSingleGameInviteBind = SCSingleGameInviteBind;
;
//邀请好友领取界面
var InvitePlayerVo = /** @class */ (function (_super) {
    __extends(InvitePlayerVo, _super);
    function InvitePlayerVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return InvitePlayerVo;
}(Packe_1.default));
exports.InvitePlayerVo = InvitePlayerVo;
;
var InviteTaskVo = /** @class */ (function (_super) {
    __extends(InviteTaskVo, _super);
    function InviteTaskVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return InviteTaskVo;
}(Packe_1.default));
exports.InviteTaskVo = InviteTaskVo;
;
var CSSingleGameInviteInfo = /** @class */ (function (_super) {
    __extends(CSSingleGameInviteInfo, _super);
    function CSSingleGameInviteInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameInviteInfo;
}(Packe_1.default));
exports.CSSingleGameInviteInfo = CSSingleGameInviteInfo;
;
var SCSingleGameInviteInfo = /** @class */ (function (_super) {
    __extends(SCSingleGameInviteInfo, _super);
    function SCSingleGameInviteInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameInviteInfo;
}(Packe_1.default));
exports.SCSingleGameInviteInfo = SCSingleGameInviteInfo;
;
//领取
var CSSingleGameInviteDraw = /** @class */ (function (_super) {
    __extends(CSSingleGameInviteDraw, _super);
    function CSSingleGameInviteDraw() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleGameInviteDraw;
}(Packe_1.default));
exports.CSSingleGameInviteDraw = CSSingleGameInviteDraw;
;
var SCSingleGameInviteDraw = /** @class */ (function (_super) {
    __extends(SCSingleGameInviteDraw, _super);
    function SCSingleGameInviteDraw() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleGameInviteDraw;
}(Packe_1.default));
exports.SCSingleGameInviteDraw = SCSingleGameInviteDraw;
;
//微信存储玩家信息
var CSWXUserInfo = /** @class */ (function (_super) {
    __extends(CSWXUserInfo, _super);
    function CSWXUserInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSWXUserInfo;
}(Packe_1.default));
exports.CSWXUserInfo = CSWXUserInfo;
;
var SCWXUserInfo = /** @class */ (function (_super) {
    __extends(SCWXUserInfo, _super);
    function SCWXUserInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCWXUserInfo;
}(Packe_1.default));
exports.SCWXUserInfo = SCWXUserInfo;
;
//用微博积分/看视频广告赚钻石
var CSSingleExchangeInfo = /** @class */ (function (_super) {
    __extends(CSSingleExchangeInfo, _super);
    function CSSingleExchangeInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleExchangeInfo;
}(Packe_1.default));
exports.CSSingleExchangeInfo = CSSingleExchangeInfo;
;
var SCSingleExchangeInfo = /** @class */ (function (_super) {
    __extends(SCSingleExchangeInfo, _super);
    function SCSingleExchangeInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSingleExchangeInfo;
}(Packe_1.default));
exports.SCSingleExchangeInfo = SCSingleExchangeInfo;
;
var CSSingleExchange = /** @class */ (function (_super) {
    __extends(CSSingleExchange, _super);
    function CSSingleExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSingleExchange;
}(Packe_1.default));
exports.CSSingleExchange = CSSingleExchange;
;
var SCSingleExchange = /** @class */ (function (_super) {
    __extends(SCSingleExchange, _super);
    function SCSingleExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }
    return SCSingleExchange;
}(Packe_1.default));
exports.SCSingleExchange = SCSingleExchange;
;

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
        //# sourceMappingURL=singleGameProtocol.js.map
        