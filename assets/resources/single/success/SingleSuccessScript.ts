import MKUtils from "../../../Script/common/MKUtils";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import DataManager from "../../../Script/data/DataManager";
import GamesCommonLogic from "../../../Script/logic/GamesCommonLogic";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";
import Constant from "../../../Script/common/Constant";
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
export default class SingleSuccessScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Label)
    numLebel: cc.Label = null

    @property(cc.Sprite)
    rewardBtn: cc.Sprite = null

    @property(cc.Label)
    nextBtn: cc.Label = null

    @property(cc.Label)
    backBtn: cc.Label = null

    @property(cc.Node)
    rankNode: cc.Node = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    onLoad () {
        this.initUI()
        this.bindEvent()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            SDKManager.getInstance().createBannerAd(5)
        }, this.node)))
    }

    start () {

    }

    onDestroy() {
        this.unbind()
    }

    bindEvent() {
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    }

    unbind() {
        EventDispath.getInstance().removeEventListeners(this)
    }

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())

        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.numLebel.string = "x" + SingleGameLogic.getInstance().getLevelRewardNum()
        
        this.rewardBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("领取成功奖励")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().getReward(function(){
                SingleGameLogic.getInstance().getLevelReward(SingleGameLogic.getInstance().getLevelRewardNum())
                SDKManager.getInstance().createBannerAd(0)
                this.node.removeFromParent()
            }.bind(this), function(){
            }.bind(this), 3)
        }.bind(this), this)
        MKUtils.btnEffect1(this.rewardBtn.node)
        MKUtils.btnScaleAct(this.rewardBtn.node)

        this.nextBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("下一关")
            cc.audioEngine.play(this.allSound[0], false, 1)
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.nextBtn.node)

        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("回到主界面")
            cc.audioEngine.play(this.allSound[0], false, 1)
            cc.director.loadScene(DataManager.getInstance().curGameType + "Start")
            SDKManager.getInstance().createBannerAd(0)
        }.bind(this), this)
        MKUtils.btnEffect1(this.backBtn.node)

        this.rankNode.getChildByName("normalRank").active = !MKUtils.isWXGameFun()
        this.rankNode.getChildByName("wxRank").active = MKUtils.isWXGameFun()
        if (MKUtils.isWXGameFun()) {
            let wxRankNode = this.rankNode.getChildByName("wxRank")
            let wxDisplay = wxRankNode.getChildByName("wxDisplay")
            if (wxDisplay) {
                wxDisplay.removeFromParent()
            }

            let display = new cc.Node()
            display.setContentSize(720, 1280)
            display.setPosition(0, 0)
            display.addComponent(cc.WXSubContextView)
            wxRankNode.addChild(display, 10, "wxDisplay")
            SDKManager.getInstance().showResultRank(SDKManager.getInstance().getWXGameItemName(DataManager.getInstance().curGameID))
        } else {
            let orderNode:Array<any> = []
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order1"))
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order2"))
            orderNode.push(this.rankNode.getChildByName("normalRank").getChildByName("order3"))

            let singleGameOrder = SingleGameLogic.getInstance().getOrderData()
            cc.log("refreshOrder1------", singleGameOrder)
    
            for (let i = 0; i < orderNode.length; i++) {
                if (singleGameOrder != null && singleGameOrder.PlayerOrderList.length > i) {
                    orderNode[i].active = true
                    let node = orderNode[i]
                    let data = singleGameOrder.PlayerOrderList[i]
                    GamesCommonLogic.getInstance().createHead(node.getChildByName("head"), 90, data.Photo)
                    node.getChildByName("nameLabel").getComponent(cc.Label).string = data.NickName
                    node.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + Math.floor(data.Chapter) + "关"
                } else {
                    orderNode[i].active = false
                }
            }
        }

        this.refreshRewardType()
    }

    refreshRewardType() {
        let rewardType = SingleGameLogic.getInstance().curGetRewardType
        this.rewardBtn.node.getChildByName("adIcon").active = rewardType != Constant.SingleRewardType.SHARE
        this.rewardBtn.node.getChildByName("shareIcon").active = rewardType == Constant.SingleRewardType.SHARE
    }

    // update (dt) {}
}
