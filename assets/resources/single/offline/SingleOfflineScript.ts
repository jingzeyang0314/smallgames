import MKUtils from "../../../Script/common/MKUtils";
import { SCSingleGameOffLine } from "../../../Script/network/gameProtocols/singleGameProtocol";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import Constant from "../../../Script/common/Constant";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";
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
export default class SingleOfflineScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null;

    @property(cc.Sprite)
    close: cc.Sprite = null;

    @property(cc.Node)
    rewardNode: cc.Node = null;

    @property(cc.Node)
    infoNode: cc.Node = null;

    @property(cc.Node)
    doubleInfoNode: cc.Node = null;

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    offlineData:SCSingleGameOffLine = null

    WX_ThreeKingFun_471ferfrtgtrewhyrnhh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {
        this.initUI()
        this.refreshView()
        this.bindEvent()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            let showHeight = MKUtils.getShowSize().height
            let adTopScale = (showHeight/2-320) / showHeight
            SDKManager.getInstance().createBannerAd(3, adTopScale)
        }, this.node)))
    }

    WX_ThreeKingFun_4fegy488474nhh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {}

    onDestroy() {
        cc.log("offline onDestroy")
        this.unbind()
    }

    WX_ThreeKingFun_471fgthgr46875487hh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    bindEvent() {
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    }

    unbind() {
        EventDispath.getInstance().removeEventListeners(this)
    }

    WX_ThreeKingFun_471fegt4728348375hh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())

        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.close.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.close.node)

        this.rewardNode.active = false
        this.infoNode.active = false
        this.doubleInfoNode.active = false

        //
        this.rewardNode.getChildByName("doubleBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("双倍领取")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().getReward(function(){
                SingleGameLogic.getInstance().offlineReward(1)
                SDKManager.getInstance().createBannerAd(0)
                this.node.removeFromParent()
            }.bind(this), function(){
            }.bind(this), 0)
        }.bind(this), this)
        MKUtils.btnEffect1(this.rewardNode.getChildByName("doubleBtn"))
        this.rewardNode.getChildByName("getBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("立即领取")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().offlineReward(0)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.rewardNode.getChildByName("getBtn"))

        //
        this.infoNode.getChildByName("doubleBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("点我翻倍")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().getReward(function(){
                SingleGameLogic.getInstance().offlineDouble()
                this.infoNode.active = false
                this.doubleInfoNode.active = true
            }.bind(this), function(){
            }.bind(this), 0)
        }.bind(this), this)
        MKUtils.btnEffect1(this.infoNode.getChildByName("doubleBtn"))

        this.refreshRewardType()
    }

    WX_ThreeKingFun_471ftreg48389374h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    refreshRewardType() {
        let rewardType = SingleGameLogic.getInstance().curGetRewardType
        this.rewardNode.getChildByName("doubleBtn").getChildByName("adIcon").active = rewardType != Constant.SingleRewardType.SHARE
        this.rewardNode.getChildByName("doubleBtn").getChildByName("shareIcon").active = rewardType == Constant.SingleRewardType.SHARE
        this.infoNode.getChildByName("doubleBtn").getChildByName("adIcon").active = rewardType != Constant.SingleRewardType.SHARE
        this.infoNode.getChildByName("doubleBtn").getChildByName("shareIcon").active = rewardType == Constant.SingleRewardType.SHARE
    }

    WX_ThreeKingFun_471ftdferwfreg48389374h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    setOfflineData(data) {
        this.offlineData = data
    }

    WX_ThreeKingFun_fr5gtegtr9374h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    refreshView() {
        let oneHourGem = this.offlineData.GemFiveMin * 12
        if (this.offlineData.Gem > 0) { //可以领取
            this.rewardNode.active = true
            this.rewardNode.getChildByName("numLabel").getComponent(cc.Label).string = "x" + this.offlineData.Gem
            this.rewardNode.getChildByName("doubleBtn").getChildByName("infoLabel").getComponent(cc.Label).string = "x" + this.offlineData.Gem*2
        } else {
            this.infoNode.getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem + "/小时"
            this.infoNode.getChildByName("doubleBtn").getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem*2 + "/小时"
            this.doubleInfoNode.getChildByName("infoLabel").getComponent(cc.Label).string = "" + oneHourGem*2 + "/小时"
            if (this.offlineData.Flag == 1) { //已经翻倍了
                this.doubleInfoNode.active = true
            } else {
                this.infoNode.active = true
            }
        }
    }

    WX_ThreeKingFun_getq486864h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
