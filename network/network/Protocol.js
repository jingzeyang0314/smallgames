(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/Protocol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7c58dFc2xJL3aGDP95fcLi0', 'Protocol', __filename);
// Script/network/Protocol.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author: Ma yuan
 * Date: 2018.10.17
 * CopyRight:
 * 大厅数据定义
 */
var Parser_1 = require("./Parser");
var Packe_1 = require("./Packe");
/**
 * 用户登录请求
 */
var CSLogin = /** @class */ (function (_super) {
    __extends(CSLogin, _super);
    function CSLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSLogin;
}(Packe_1.default));
exports.CSLogin = CSLogin;
;
//登录成功
var SCLoginRet = /** @class */ (function (_super) {
    __extends(SCLoginRet, _super);
    function SCLoginRet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCLoginRet;
}(Packe_1.default));
exports.SCLoginRet = SCLoginRet;
;
//-- 进入游戏 
var CSEnterGame = /** @class */ (function (_super) {
    __extends(CSEnterGame, _super);
    function CSEnterGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSEnterGame;
}(Packe_1.default));
exports.CSEnterGame = CSEnterGame;
;
var SCEnterGame = /** @class */ (function (_super) {
    __extends(SCEnterGame, _super);
    function SCEnterGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCEnterGame;
}(Packe_1.default));
exports.SCEnterGame = SCEnterGame;
;
//游戏列表
var CSGameList = /** @class */ (function (_super) {
    __extends(CSGameList, _super);
    function CSGameList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //    {"Code",Type.Short,},   --验证码      
        _this.Code = 0;
        _this.Code_Type = Parser_1.Type.Short;
        return _this;
    }
    return CSGameList;
}(Packe_1.default));
exports.CSGameList = CSGameList;
;
var GameListV = /** @class */ (function (_super) {
    __extends(GameListV, _super);
    function GameListV() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
        // gameList        : Array<GameListV1>;
        // gameList_Type   : Type = Type.objClass;
        // gameList_TypeItem: GameListV1 = new GameListV1();    
    }
    return GameListV;
}(Packe_1.default));
exports.GameListV = GameListV;
;
// 服务器游戏列表返回
var SCGameListRet = /** @class */ (function (_super) {
    __extends(SCGameListRet, _super);
    function SCGameListRet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCGameListRet;
}(Packe_1.default));
exports.SCGameListRet = SCGameListRet;
;
//心跳
var CSHeartBeat = /** @class */ (function (_super) {
    __extends(CSHeartBeat, _super);
    function CSHeartBeat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CSHeartBeat;
}(Packe_1.default));
exports.CSHeartBeat = CSHeartBeat;
;
var SCHeartBeat = /** @class */ (function (_super) {
    __extends(SCHeartBeat, _super);
    function SCHeartBeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCHeartBeat;
}(Packe_1.default));
exports.SCHeartBeat = SCHeartBeat;
;
//匹配用户
var CSFindPlayer = /** @class */ (function (_super) {
    __extends(CSFindPlayer, _super);
    function CSFindPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CSFindPlayer;
}(Packe_1.default));
exports.CSFindPlayer = CSFindPlayer;
//服务器踢人维护
var SCCutLine = /** @class */ (function (_super) {
    __extends(SCCutLine, _super);
    function SCCutLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCCutLine;
}(Packe_1.default));
exports.SCCutLine = SCCutLine;
//判断游戏用户是否在线通知
var SCNoticePlayersOnline = /** @class */ (function (_super) {
    __extends(SCNoticePlayersOnline, _super);
    function SCNoticePlayersOnline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCNoticePlayersOnline;
}(Packe_1.default));
exports.SCNoticePlayersOnline = SCNoticePlayersOnline;
//每日签到
var CSDailySign = /** @class */ (function (_super) {
    __extends(CSDailySign, _super);
    function CSDailySign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSDailySign;
}(Packe_1.default));
exports.CSDailySign = CSDailySign;
//签到返回
var SCDailySign = /** @class */ (function (_super) {
    __extends(SCDailySign, _super);
    function SCDailySign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCDailySign;
}(Packe_1.default));
exports.SCDailySign = SCDailySign;
//每日签到
var ItemReturn = /** @class */ (function (_super) {
    __extends(ItemReturn, _super);
    function ItemReturn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return ItemReturn;
}(Packe_1.default));
exports.ItemReturn = ItemReturn;
var CSSignInfo = /** @class */ (function (_super) {
    __extends(CSSignInfo, _super);
    function CSSignInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSSignInfo;
}(Packe_1.default));
exports.CSSignInfo = CSSignInfo;
//获取签到信息
var SCSignInfo = /** @class */ (function (_super) {
    __extends(SCSignInfo, _super);
    function SCSignInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCSignInfo;
}(Packe_1.default));
exports.SCSignInfo = SCSignInfo;
var ShowSign = /** @class */ (function (_super) {
    __extends(ShowSign, _super);
    function ShowSign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return ShowSign;
}(Packe_1.default));
exports.ShowSign = ShowSign;
var ShowReward = /** @class */ (function (_super) {
    __extends(ShowReward, _super);
    function ShowReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return ShowReward;
}(Packe_1.default));
exports.ShowReward = ShowReward;
// 转盘
//获取大转盘信息
var CSBigWheelInfo = /** @class */ (function (_super) {
    __extends(CSBigWheelInfo, _super);
    function CSBigWheelInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSBigWheelInfo;
}(Packe_1.default));
exports.CSBigWheelInfo = CSBigWheelInfo;
//获取大转盘信息
var SCBigWheelInfo = /** @class */ (function (_super) {
    __extends(SCBigWheelInfo, _super);
    function SCBigWheelInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCBigWheelInfo;
}(Packe_1.default));
exports.SCBigWheelInfo = SCBigWheelInfo;
//摇中转盘
var CSBigWheelGain = /** @class */ (function (_super) {
    __extends(CSBigWheelGain, _super);
    function CSBigWheelGain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSBigWheelGain;
}(Packe_1.default));
exports.CSBigWheelGain = CSBigWheelGain;
//转到的概率值
var SCBigWheelGain = /** @class */ (function (_super) {
    __extends(SCBigWheelGain, _super);
    function SCBigWheelGain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCBigWheelGain;
}(Packe_1.default));
exports.SCBigWheelGain = SCBigWheelGain;
var BigWheelVo = /** @class */ (function (_super) {
    __extends(BigWheelVo, _super);
    function BigWheelVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return BigWheelVo;
}(Packe_1.default));
exports.BigWheelVo = BigWheelVo;
//救济金
var CSRescuesInfo = /** @class */ (function (_super) {
    __extends(CSRescuesInfo, _super);
    function CSRescuesInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSRescuesInfo;
}(Packe_1.default));
exports.CSRescuesInfo = CSRescuesInfo;
var SCRescuesInfo = /** @class */ (function (_super) {
    __extends(SCRescuesInfo, _super);
    function SCRescuesInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCRescuesInfo;
}(Packe_1.default));
exports.SCRescuesInfo = SCRescuesInfo;
var CSRescuesGoin = /** @class */ (function (_super) {
    __extends(CSRescuesGoin, _super);
    function CSRescuesGoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSRescuesGoin;
}(Packe_1.default));
exports.CSRescuesGoin = CSRescuesGoin;
var SCRescuesGoin = /** @class */ (function (_super) {
    __extends(SCRescuesGoin, _super);
    function SCRescuesGoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCRescuesGoin;
}(Packe_1.default));
exports.SCRescuesGoin = SCRescuesGoin;
var SCRotateNotice = /** @class */ (function (_super) {
    __extends(SCRotateNotice, _super);
    function SCRotateNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCRotateNotice;
}(Packe_1.default));
exports.SCRotateNotice = SCRotateNotice;
//广告看视频
var CSEnterGameAdvert = /** @class */ (function (_super) {
    __extends(CSEnterGameAdvert, _super);
    function CSEnterGameAdvert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSEnterGameAdvert;
}(Packe_1.default));
exports.CSEnterGameAdvert = CSEnterGameAdvert;
var SCEnterGameAdvert = /** @class */ (function (_super) {
    __extends(SCEnterGameAdvert, _super);
    function SCEnterGameAdvert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCEnterGameAdvert;
}(Packe_1.default));
exports.SCEnterGameAdvert = SCEnterGameAdvert;
;
//猜你喜欢的游戏
var CSMiniGameLove = /** @class */ (function (_super) {
    __extends(CSMiniGameLove, _super);
    function CSMiniGameLove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return CSMiniGameLove;
}(Packe_1.default));
exports.CSMiniGameLove = CSMiniGameLove;
var SCMiniGameLove = /** @class */ (function (_super) {
    __extends(SCMiniGameLove, _super);
    function SCMiniGameLove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCMiniGameLove;
}(Packe_1.default));
exports.SCMiniGameLove = SCMiniGameLove;
;
//积分同步
var CSCredit = /** @class */ (function (_super) {
    __extends(CSCredit, _super);
    function CSCredit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }
    return CSCredit;
}(Packe_1.default));
exports.CSCredit = CSCredit;
var SCCredit = /** @class */ (function (_super) {
    __extends(SCCredit, _super);
    function SCCredit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        return _this;
    }
    return SCCredit;
}(Packe_1.default));
exports.SCCredit = SCCredit;
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
        //# sourceMappingURL=Protocol.js.map
        