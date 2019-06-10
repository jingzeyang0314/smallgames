import MKUtils from "../../../Script/common/MKUtils";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";
import { Sina_Config } from "../../../Script/data/configsFile";
import DataManager from "../../../Script/data/DataManager";
import GamesCommonLogic from "../../../Script/logic/GamesCommonLogic";
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
export default class SingleFailScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Node)
    buyLifeNode: cc.Node = null

    @property(cc.Node)
    backNode: cc.Node = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    countdownTime:number = 0 //复活倒计时
    isInCountdown:boolean = false   //是否在倒计时中
    countdownAllTime:number = 10    //倒计时总时长

    data:any = null

    onLoad () {
        this.initUI()
        this.bindEvent()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            let showHeight = MKUtils.getShowSize().height
            let adTopScale = (showHeight/2-330) / showHeight
            SDKManager.getInstance().createBannerAd(6, adTopScale)
        }, this.node)))
    }

    start () {
        if (this.data && this.data.showBack) {
            this.isInCountdown = false
            this.countdownTime = 0
            this.buyLifeNode.active = false
            this.backNode.active = true
        } else {
            this.countdownTime = this.countdownAllTime
            this.isInCountdown = true
            this.buyLifeNode.active = true
            this.backNode.active = false
        }
        this.initRank()
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

        //复活
        this.buyLifeNode.getChildByName("buyLifeBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("复活")
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.isInCountdown = false
            SingleGameLogic.getInstance().getReward(function(){
                EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BUY_LIEF_SUCCESS)
                SDKManager.getInstance().createBannerAd(0)
                this.node.removeFromParent()
            }.bind(this), function(){
                this.isInCountdown = true
            }.bind(this), 4)
        }.bind(this), this)
        MKUtils.btnEffect1(this.buyLifeNode.getChildByName("buyLifeBtn"))
        if (MKUtils.isWxReview()) {
            this.buyLifeNode.getChildByName("buyLifeBtn").active = false
        }

        this.buyLifeNode.getChildByName("skipLabel").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("跳过")
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.isInCountdown = false
            this.buyLifeNode.active = false
            this.backNode.active = true
        }.bind(this), this)
        MKUtils.btnEffect1(this.buyLifeNode.getChildByName("skipLabel"))

        this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string = "" + this.countdownAllTime
        
        //回退
        this.backNode.getChildByName("continueBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("再来一次，回退一关")
            cc.audioEngine.play(this.allSound[0], false, 1)
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BACK_LEVEL)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.backNode.getChildByName("continueBtn"))

        this.backNode.getChildByName("backStartBtn").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("返回首页")
            cc.audioEngine.play(this.allSound[0], false, 1)
            cc.director.loadScene(DataManager.getInstance().curGameType + "Start")
            SDKManager.getInstance().createBannerAd(0)
        }.bind(this), this)
        MKUtils.btnEffect1(this.backNode.getChildByName("backStartBtn"))

        this.refreshRewardType()
    }

    initRank() {
        this.backNode.getChildByName("rankNode").getChildByName("normalRank").active = !MKUtils.isWXGameFun()
        this.backNode.getChildByName("rankNode").getChildByName("wxRank").active = MKUtils.isWXGameFun()
        if (MKUtils.isWXGameFun()) {
            let wxRankNode = this.backNode.getChildByName("rankNode").getChildByName("wxRank")
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
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order1"))
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order2"))
            orderNode.push(this.backNode.getChildByName("rankNode").getChildByName("normalRank").getChildByName("order3"))

            let singleGameOrder = SingleGameLogic.getInstance().getOrderData()
            cc.log("refreshOrder1------", singleGameOrder)
    
            for (let i = 0; i < orderNode.length; i++) {
                if (singleGameOrder != null && singleGameOrder.PlayerOrderList.length > i) {
                    orderNode[i].active = true
                    let node = orderNode[i]
                    let data = singleGameOrder.PlayerOrderList[i]
                    GamesCommonLogic.getInstance().createHead(node.getChildByName("head"), 90, data.Photo)
                    node.getChildByName("nameLabel").getComponent(cc.Label).string = data.NickName
                    if (this.data && this.data.type == 1) {
                        node.getChildByName("levelLabel").getComponent(cc.Label).string = "" + Math.floor(data.Chapter) + "m"
                    } else {
                        node.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + Math.floor(data.Chapter) + "关"
                    }
                } else {
                    orderNode[i].active = false
                }
            }
        }
    }

    refreshRewardType() {
        let rewardType = SingleGameLogic.getInstance().curGetRewardType
        this.buyLifeNode.getChildByName("buyLifeBtn").getChildByName("adIcon").active = rewardType != Constant.SingleRewardType.SHARE
        this.buyLifeNode.getChildByName("buyLifeBtn").getChildByName("shareIcon").active = rewardType == Constant.SingleRewardType.SHARE
    }

    update (dt) {
        if (this.isInCountdown) {
            this.countdownTime = this.countdownTime - dt
            if (this.countdownTime > 0) {
                this.changeTimeLabel("" + Math.ceil(this.countdownTime))
            } else {
                this.isInCountdown = false
                this.countdownTime = 0
                this.buyLifeNode.active = false
                this.backNode.active = true
            }
        }
    }

    changeTimeLabel(time:string) {
        if (this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string != time) {
            this.buyLifeNode.getChildByName("timeLabel").getComponent(cc.Label).string = time
            cc.audioEngine.play(this.allSound[1], false, 1)
        }
    }

    setThrowScore(data) {
        let maxHeight = data.curHeight > data.maxHeight ? data.curHeight : data.maxHeight
        this.backNode.getChildByName("scoreNode").getChildByName("curLabel").getComponent(cc.Label).string = MKUtils.formatHeightNumber(data.curHeight) + "m"
        this.backNode.getChildByName("scoreNode").getChildByName("maxLabel").getComponent(cc.Label).string = MKUtils.formatHeightNumber(maxHeight) + "m"
        this.backNode.getChildByName("scoreNode").getChildByName("gemLabel").getComponent(cc.Label).string = "+" + MKUtils.tranNumE(data.gem)
    }

    setData(data) {
        cc.log("SingleFail setData:", data)
        if (data) {
            this.data = data
            if (data.type == 1) { //抛出银河系米数
                this.setThrowScore(data)
            }
            if (data.showBack) {
                this.isInCountdown = false
                this.countdownTime = 0
                this.buyLifeNode.active = false
                this.backNode.active = true
            }
        }
    }
}
