import MKUtils from "../../../Script/common/MKUtils";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankDialog extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Sprite)
    bg: cc.Sprite = null
    
    @property(cc.Sprite)
    close: cc.Sprite = null

    @property(cc.Sprite)
    myItem:cc.Sprite = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    WX_ThreeKingFun_471ferghrtynhh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {
        cc.log("RankDialog --- onLoad")

        this.blackBg.node.setContentSize(MKUtils.getShowSize())
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("rank touchBg --- touch")
        }.bind(this), this)

        this.close.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("rank --- close")
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.closeCallback()
        }.bind(this), this)
        MKUtils.btnEffect1(this.close.node)

        this.bg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        MKUtils.playBlackBgAct(this.blackBg.node)
        // MKUtils.playScaleAni(this.node.getChildByName("baseNode"))
    }

    WX_ThreeKingFun_trhyukjihh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    closeCallback() {
        this.node.removeFromParent()
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_SHOW_SIDE_RANK)
    }

    WX_ThreeKingFun_gthrwhaerthh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {

    }

    WX_ThreeKingFun_ghy7jnutrehh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

}
