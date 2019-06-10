import MKUtils from "../../../Script/common/MKUtils";
import { SCSingleGameCheckIn } from "../../../Script/network/gameProtocols/singleGameProtocol";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import SDKManager from "../../../Script/logic/SDKManager";

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
export default class SingleSignScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Node)
    day: Array<cc.Node> = []

    @property(cc.Sprite)
    getBtn: cc.Sprite = null

    @property(cc.Sprite)
    sureBtn: cc.Sprite = null

    @property(cc.SpriteFrame)
    dayNumFrame_0: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    dayNumFrame_1: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    dayNumFrame_2: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    boardFrame_0: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    boardFrame_1: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    getFrame: Array<cc.SpriteFrame> = []

    @property(cc.SpriteFrame)
    gemIconFrame: Array<cc.SpriteFrame> = []

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    @property(cc.Font)
    gemLabelFont:Array<cc.Font> = []

    signData:SCSingleGameCheckIn = null

    WX_ThreeKingFun_eifjr1ac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    onLoad () {
        this.initUI()
        this.refreshView()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            SDKManager.getInstance().createBannerAd(4)
        }, this.node)))
    }

    start () {

    }

    WX_ThreeKingFun_eifjr5941ac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    onDestroy() {
    }

    WX_ThreeKingFun_e2143rifjr1ac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())

        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.getBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().signReward()
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.getBtn.node)

        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.sureBtn.node)
    }

    WX_ThreeKingFun_eifjr1defdrewac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    setSignData(data:SCSingleGameCheckIn) {
        this.signData = data
        cc.log("setSignData---", this.signData)
    }

    WX_ThreeKingFun_489187edfc() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    refreshView() {
        if (this.signData) {
            let curDay = this.signData.CurDay + 1
            for (let i = 0; i < this.signData.Shows.length; i++) {
                let data = this.signData.Shows[i]
                let item = this.day[i]
                item.active = true
                item.getChildByName("numLabel").getComponent(cc.Label).string = "x" + data.Gem
                if (data.Day < curDay) { //前几天的
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[1]) : (this.boardFrame_1[1])
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_1[data.Day-1]
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[1]
                    item.getChildByName("get").getComponent(cc.Sprite).spriteFrame = this.getFrame[1]
                    item.getChildByName("get").active = true
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[1]
                    } else {
                        item.getChildByName("numLabel").color = cc.color(218, 156, 11, 256)
                    }
                } else if (data.Day == curDay) { //今天
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[2]) : (this.boardFrame_1[2])
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_2[data.Day-1]
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[2]
                    item.getChildByName("get").getComponent(cc.Sprite).spriteFrame = this.getFrame[2]
                    item.getChildByName("get").active = this.signData.HasGet == 1
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[2]
                    } else {
                        item.getChildByName("numLabel").color = cc.color(98, 161, 6, 256)
                    }
                } else {  //之后的
                    item.getChildByName("board").getComponent(cc.Sprite).spriteFrame = (i != 6) ? (this.boardFrame_0[0]) : (this.boardFrame_1[0])
                    item.getChildByName("day").getComponent(cc.Sprite).spriteFrame = this.dayNumFrame_0[data.Day-1]
                    item.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = this.gemIconFrame[0]
                    item.getChildByName("get").active = false
                    if (this.gemLabelFont.length >= 2) {
                        item.getChildByName("numLabel").getComponent(cc.Label).font = this.gemLabelFont[0]
                    } else {
                        item.getChildByName("numLabel").color = cc.color(177, 145, 95, 256)
                    }
                }
            }

            this.getBtn.node.active = this.signData.HasGet == 0
            this.sureBtn.node.active = this.signData.HasGet != 0
        }
    }

    WX_ThreeKingFun_e32r1de3rac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}
