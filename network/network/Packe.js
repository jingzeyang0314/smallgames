(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/Packe.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '908bd+cYh5PK6yVfDXruVPA', 'Packe', __filename);
// Script/network/Packe.ts

/**
 * Author: Ma yuan
 * Date: 2018.10.18
 * CopyRight:
 * 通用游戏数据
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var Packe = /** @class */ (function () {
    function Packe() {
    }
    Packe.prototype.getByteLength = function () {
        return Parser_1.Parse.getSelfBufLenth(this, 0);
    };
    Packe.prototype.pack = function () {
        return Parser_1.Parse.packageToArrayBuf(this, null, null);
    };
    Packe.prototype.WX_ThreeKingFun_qin003fffff = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    Packe.prototype.unPack = function (arrayBuf, dv, pos) {
        if (dv === void 0) { dv = null; }
        if (pos === void 0) { pos = null; }
        Parser_1.Parse.unPackSelf(this, arrayBuf);
        for (var obj in this) {
            //cc.log("PackeParent:unPack obj is", this[obj]);                
        }
    };
    Packe.prototype.WX_ThreeKingFun_qin003rrrrr = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    return Packe;
}());
exports.default = Packe;
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
        //# sourceMappingURL=Packe.js.map
        