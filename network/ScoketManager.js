(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/logic/ScoketManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c5800Nq9uRI6qS8EtUhoeK1', 'ScoketManager', __filename);
// Script/logic/ScoketManager.ts

/**
 * Author: Ma yuan
 * Date: 2018.11.5
 * CopyRight:
 * 网络
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MKSocket_1 = require("../network/MKSocket");
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        this.m_Commsocket = null;
        this.m_Commsocket = new MKSocket_1.default();
    }
    SocketManager.prototype.WX_ThreeKingFun_sjee = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SocketManager.prototype.Connect = function (url) {
        this.m_Commsocket.connect("ws://" + url);
    };
    SocketManager.prototype.send = function (data, msgID) {
        this.m_Commsocket.send(data, msgID);
    };
    SocketManager.prototype.WX_ThreeKingFun_sje22e = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    SocketManager.getInstance = function () {
        if (!this.singleton) {
            this.singleton = new SocketManager();
        }
        return this.singleton;
    };
    return SocketManager;
}());
exports.default = SocketManager;

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
        //# sourceMappingURL=ScoketManager.js.map
        