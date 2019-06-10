import MKUtils from "../../../Script/common/MKUtils";
import { Sina_Config } from "../../../Script/data/configsFile";
import Constant from "../../../Script/common/Constant";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import DataManager from "../../../Script/data/DataManager";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";
import { SCSingleGameInviteInfo } from "../../../Script/network/gameProtocols/singleGameProtocol";
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
export default class SingleStartScript extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null

    @property(cc.Sprite)
    title: cc.Sprite = null

    @property(cc.Sprite)
    startBtn: cc.Sprite = null

    @property(cc.Node)
    rank: cc.Node = null

    @property(cc.Sprite)
    rankBg: cc.Sprite = null

    @property(cc.Sprite)
    signBtn: cc.Sprite = null

    @property(cc.Sprite)
    getGemBtn: cc.Sprite = null

    @property(cc.Sprite)
    armsBtn: cc.Sprite = null

    @property(cc.Sprite)
    juiceBtn: cc.Sprite = null

    @property(cc.Label)
    levelLabel: cc.Label = null

    @property(cc.Sprite)
    curArms: cc.Sprite = null

    @property(cc.Node)
    gemNode:cc.Node = null

    @property(cc.Node)
    backNode:cc.Node = null

    @property(cc.Sprite)
    miniProgress:cc.Sprite = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    @property(cc.SpriteFrame)
    cacheSpriteFrame:Array<cc.SpriteFrame> = []

    @property(cc.Prefab)
    cachePrefab:Array<cc.Prefab> = []

    startCallback:any = null

    clickNum:number = 0 //点击5次显示版本号

    downGameProgress:number = 0  //下载游戏界面进度
    downFinishEnterGame:boolean = false    //下载完是否直接进入游戏

    onLoad () {
    }

    onDestroy() {
        this.unbind()
    }

    bindEvent() {
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_REFRESH_GEM, this.refreshGemNum, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE, this.refreshCurArms, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_SHOW_SIDE_RANK, this.showSideRank, this)
    }

    unbind() {
        EventDispath.getInstance().removeEventListeners(this)
    }

    start () {
        let showScale = MKUtils.getShowScale()
        let maxScale = showScale.x > showScale.y ? showScale.x : showScale.y
        this.bg.node.setScale(maxScale)
        this.rank.setPosition(-1*MKUtils.getShowSize().width/2, this.rank.getPosition().y)

        this.bg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("wx start game")
            cc.audioEngine.play(this.allSound[0], false, 1)
            if (this.downGameProgress >= 1) {
                cc.director.loadScene(DataManager.getInstance().curGameType)
            } else {
                MKUtils.errorTips("加载中...", 5, true)
                this.downFinishEnterGame = true
            }
        }.bind(this), this)
        MKUtils.btnEffect1(this.startBtn.node)

        this.rank.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("open rank")
            cc.audioEngine.play(this.allSound[0], false, 1)
            let wxDisplay = this.rank.getChildByName("wxDisplay")
            if (wxDisplay) {
                wxDisplay.removeFromParent()
            }
            this.rank.active = false
            SingleGameLogic.getInstance().showAllRank(SDKManager.getInstance().getWXGameItemName(Sina_Config.SmallGameId))
        }.bind(this), this)

        this.showSideRank()

        this.signBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("签到奖励")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().checkSign(true)
        }.bind(this), this)
        MKUtils.btnEffect1(this.signBtn.node)

        this.getGemBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("领钻石")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().openInvite()
            this.getGemBtn.node.getChildByName("tip").active = false
        }.bind(this), this)
        MKUtils.btnEffect1(this.getGemBtn.node)
        this.getGemBtn.node.active = MKUtils.isWXGameFun()
        MKUtils.btnScaleAct(this.getGemBtn.node)

        this.armsBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("换武器")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().openArmsDialog()
        }.bind(this), this)
        MKUtils.btnEffect1(this.armsBtn.node)
        MKUtils.btnScaleAct(this.armsBtn.node)

        this.juiceBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("果汁店")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().checkOffline(true)
        }.bind(this), this)
        MKUtils.btnEffect1(this.juiceBtn.node)

        this.gemNode.getChildByName("gemBg").on(cc.Node.EventType.TOUCH_END, function(e){
            cc.log("添加宝石")
            cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().openInvite()
        }.bind(this), this)
        if (!MKUtils.isWXGameFun()) {
            this.gemNode.setPosition(-1*this.gemNode.getPosition().x, this.gemNode.getPosition().y)
        }

        if (this.backNode) {
            this.backNode.on(cc.Node.EventType.TOUCH_END, function(e){
                cc.log("back")
                cc.audioEngine.play(this.allSound[0], false, 1)
                cc.director.loadScene("Home")
            }.bind(this), this)
            MKUtils.btnEffect1(this.backNode)
            this.backNode.active = !MKUtils.isWXGameFun()
        }

        this.curArms.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=>{
            this.curArms.node.runAction(cc.repeatForever(cc.sequence(
                cc.moveBy(0.3, cc.v2(0, 30)), 
                cc.moveBy(0.6, cc.v2(0, -30))
            )))
        }, this.curArms.node)))
        this.refreshAll()

        SingleGameLogic.getInstance().checkActive()

        this.bindEvent()
        this.setVersion()

        SDKManager.getInstance().authSettingUserInfo()

        cc.director.preloadScene(DataManager.getInstance().curGameType,  function(completedCount, totalCount, item){
            if (totalCount > 0) {
                this.downGameProgress = (completedCount / totalCount)
                // cc.log("down game progress --- ", this.downGameProgress)
            }
        }.bind(this), function(){
            this.downGameProgress = 1
            if (this.downFinishEnterGame) {
                cc.director.loadScene(DataManager.getInstance().curGameType)
            }
        }.bind(this));

        if (this.miniProgress) {
            this.miniProgress.node.on(cc.Node.EventType.TOUCH_END, function(e){
                cc.log("跳转小游戏")
                cc.audioEngine.play(this.allSound[0], false, 1)
                SDKManager.getInstance().toMiniProgram(0)
            }.bind(this), this)
            MKUtils.btnEffect1(this.miniProgress.node)
            MKUtils.btnScaleAct(this.miniProgress.node)
            this.miniProgress.node.active = MKUtils.isWXGameFun()
        }

        SDKManager.getInstance().createBannerAd(0)

        if (MKUtils.isWxReview()) {
            this.juiceBtn.node.active = false
            this.getGemBtn.node.active = false
            this.armsBtn.node.active = false
        }
    }

    setVersion() {
        this.title.node.on(cc.Node.EventType.TOUCH_END, function(e){
            this.clickNum = this.clickNum + 1 
            if (this.clickNum % 10 == 0) {
                MKUtils.errorTips("" + DataManager.getInstance().getuserData().PlayerID + ", " + Sina_Config.VERSION_NAME)
            }
        }.bind(this), this)
    }

    showSideRank() {
        if (!MKUtils.isWXGameFun()) {
            this.rank.active = false
            return
        }
        this.rank.active = true
        let wxDisplay = this.rank.getChildByName("rankNode").getChildByName("wxDisplay")
        if (wxDisplay) {
            wxDisplay.removeFromParent()
        }

        let display = new cc.Node()
        display.setContentSize(720, 1280)
        display.addComponent(cc.WXSubContextView)
        this.rank.getChildByName("rankNode").addChild(display, 1, "wxDisplay")
        SDKManager.getInstance().showSideRank(SDKManager.getInstance().getWXGameItemName(Sina_Config.SmallGameId))
    }

    setStartCallback(callback) {
        this.startCallback = callback
    }

    refreshLevel() {
        let gameId = DataManager.getInstance().curGameID
        if (gameId == 42) {
            this.levelLabel.string = "第" + SingleGameLogic.getInstance().level + "关"
        } else if (gameId == 45) {
            this.levelLabel.string = "" + MKUtils.formatHeightNumber(SingleGameLogic.getInstance().curGameMaxLevel) + "m"
        }
    }

    refreshCurArms() {
        let armsConfig = SingleGameLogic.getInstance().getArmsJsonConfig(SingleGameLogic.getInstance().curArmsId)
        if (armsConfig) {
            MKUtils.loadSpriteFrame(armsConfig["img"], function(spriteFrame){
                this.curArms.spriteFrame = spriteFrame
            }.bind(this))
        }
    }

    refreshGemNum() {
        this.gemNode.getChildByName("numLabel").getComponent(cc.Label).string = MKUtils.tranNumE(SingleGameLogic.getInstance().gemNum)
    }

    refreshAll() {
        this.showSideRank()
        this.refreshGemNum()
        this.refreshLevel()
        this.refreshCurArms()
        this.refreshInviteBtnTip()
    }

    refreshInviteBtnTip() {
        SingleGameLogic.getInstance().getInviteInfo(function(data:SCSingleGameInviteInfo){
            let show = false
            if (data) {
                for (let i = 0; i < data.TaskList.length; i++) {
                    if (data.TaskList[i].Flag == 1) {
                        show = true
                    }
                }
            }
            this.getGemBtn.node.getChildByName("tip").active = show
        }.bind(this))
    }

    // update (dt) {}
}
