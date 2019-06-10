/**
 * Author: Ma yuan
 * Date: 2018.10.18
 * CopyRight:
 * 通用游戏数据
 */

import { TypeByte,  Parse, BufStartOffset} from "./Parser"

export default class Packe {    
    getByteLength() {
        return Parse.getSelfBufLenth(this, 0);
    }

    pack() {
        return Parse.packageToArrayBuf(this, null, null);
    }

    WX_ThreeKingFun_qin003fffff() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    unPack(arrayBuf:ArrayBuffer, dv:DataView = null, pos:BufStartOffset = null) {
        Parse.unPackSelf(this, arrayBuf)

        for(var obj in this) {
            //cc.log("PackeParent:unPack obj is", this[obj]);                
        }
    }

    WX_ThreeKingFun_qin003rrrrr() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
};    

