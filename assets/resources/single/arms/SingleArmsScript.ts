import MKUtils from "../../../Script/common/MKUtils";
import Constant from "../../../Script/common/Constant";
import DataManager from "../../../Script/data/DataManager";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import { CSSingleGameSkin, SCSingleGameSkin, CSSingleGameLottery, SCSingleGameLottery, CSSingleGameExchange, SCSingleGameExchange } from "../../../Script/network/gameProtocols/singleGameProtocol";
import { PacketID } from "../../../Script/network/PacketID";
import { HttpHelper } from "../../../Script/network/HttpHelper";
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
export default class SingleArmsScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Sprite)
    bgLeft: cc.Sprite = null

    @property(cc.Sprite)
    bgRight: cc.Sprite = null

    @property(cc.Sprite)
    closeBtn: cc.Sprite = null

    @property(cc.Sprite)
    curTools: cc.Sprite = null

    @property(cc.Sprite)
    curToolsIcon: cc.Sprite = null

    @property(cc.Sprite)
    useGemBtn: cc.Sprite = null

    @property(cc.Sprite)
    adBtn: cc.Sprite = null

    @property(cc.PageView)
    armsPageView: cc.PageView = null

    @property(cc.Sprite)
    finishLevelImg: cc.Sprite = null

    @property(cc.SpriteFrame)
    gridBgSpriteFrame:cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    gridHaveSpriteFrame:cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    gridLockSpriteFrame:cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    gridSelectSpriteFrame:cc.SpriteFrame = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    @property
    iconScale:number = 1
    @property
    iconRotation:number = 0
    @property
    colNum:number = 4
    @property
    spaceX:number = 150
    @property
    spaceY:number = 150
    @property
    firstPosX:number = -255
    @property
    firstPosY:number = 255
    @property
    selectOffsetPos:cc.Vec2 = cc.v2(3, 3)

    armsJson = null
    armsNodes:any = {}
    haveArmsIds:Array<number> = []
    isInUnlockNewArms:boolean = false //在解锁新武器的过程中
    adUseCount:number = 0 //广告获取道具已经使用的次数
    adUseMaxCount:number = 3
    curPageIndex = -1//当前页面

    onLoad () {
        this.initData()
        this.initUI()
        this.getArmsData()
        this.bindEvent()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            SDKManager.getInstance().createBannerAd(1)
        }, this.node)))
    }

    start () {}

    onDestroy() {
        this.unbind()
    }

    bindEvent() {
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE, this.refreshCurArms, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE, this.refreshRewardType, this);
    }

    unbind() {
        EventDispath.getInstance().removeEventListeners(this)
    }

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())

        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            SDKManager.getInstance().createBannerAd(0)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.closeBtn.node)

        this.armsPageView.node.on("scroll-ended", function(){
            this.pageChange(this.armsPageView.getCurrentPageIndex())
        }.bind(this), this)

        this.useGemBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.useGemUnlockArms()
        }.bind(this), this)
        MKUtils.btnEffect1(this.useGemBtn.node)
        this.useGemBtn.node.active = false

        this.adBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.adUnlockArms()
        }.bind(this), this)
        MKUtils.btnEffect1(this.adBtn.node)
        this.adBtn.node.active = false

        this.curToolsIcon.node.active = false
        this.refreshCurArms()
        this.refreshRewardType()
    }

    refreshRewardType() {
        let rewardType = SingleGameLogic.getInstance().curGetRewardType
        this.adBtn.node.getChildByName("adIcon").active = rewardType != Constant.SingleRewardType.SHARE
        this.adBtn.node.getChildByName("shareIcon").active = rewardType == Constant.SingleRewardType.SHARE
    }

    initData() {
        this.armsJson = this.getArmsJson()
        this.addFinishLevelArms()
        this.haveArmsIds.push(SingleGameLogic.getInstance().curArmsId)
        cc.log("this.armsJson = ", this.armsJson)
    }

    addFinishLevelArms() {
        if (this.armsJson && this.armsJson["armsType"]) {
            let maxLevel = SingleGameLogic.getInstance().curGameMaxLevel
            for (let i = 0; i < this.armsJson["armsType"].length; i++) {
                let jsonData = this.armsJson["armsType"][i]
                if (jsonData["type"] == 2) {
                    for (let j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] < maxLevel) {
                            this.haveArmsIds.push(jsonData["ids"][j]["id"])
                        }
                    }
                }
            }
        }
    }

    getArmsJson() {
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson) {
            return gameJson["arms"]
        } else {
            return null
        }
    }

    createArmsPage() {
        if (this.armsJson && this.armsJson["armsType"]) {
            let lastPageIdsConfig = this.armsJson["armsType"][this.armsJson["armsType"].length-1]["ids"]
            let lastArmsId = lastPageIdsConfig[lastPageIdsConfig.length-1]["id"]
            let lastArmsConfig = this.armsJson["allArms"][lastArmsId]
            let lastArmsSpriteFrame = cc.loader.getRes(lastArmsConfig["img"], cc.SpriteFrame)
            let lastArmsIsLoad =(lastArmsSpriteFrame && lastArmsSpriteFrame != null)

            for (let i = 0; i < this.armsJson["armsType"].length; i++) {
                let jsonData = this.armsJson["armsType"][i]
                let page = new cc.Node()

                for (let j = 0; j < jsonData["ids"].length; j++) {
                    let armsId = jsonData["ids"][j]["id"]
                    let armsConfig = this.armsJson["allArms"][armsId]

                    let grid = new cc.Node()
                    let gridSprite = grid.addComponent(cc.Sprite)

                    gridSprite.spriteFrame = this.gridBgSpriteFrame
                    page.addChild(grid)
                    grid.setPosition(this.getPosByIndex(j))

                    let armsIcon = new cc.Node()
                    armsIcon.rotation = this.iconRotation
                    armsIcon.scale = this.iconScale
                    let armsIconSprite = armsIcon.addComponent(cc.Sprite)
                    grid.addChild(armsIcon, 3, "armsIcon")
                    let delay = lastArmsIsLoad ? 0 : (i*0.8+j*0.05)
                    armsIcon.runAction(cc.sequence(cc.delayTime(delay), cc.callFunc(()=>{
                        MKUtils.loadSpriteFrame(armsConfig["img"], function(spriteFrame){
                            armsIconSprite.spriteFrame = spriteFrame
                        }.bind(this))
                    }, armsIcon)))

                    this.armsNodes[armsId] = grid
                    this.refreshArmsById(armsId)
                    grid.on(cc.Node.EventType.TOUCH_END, function(e){
                        this.clickArms(armsId)
                        cc.audioEngine.play(this.allSound[0], false, 1)
                    }.bind(this), this)
                }
                
                page.setContentSize(this.armsPageView.node.getContentSize())
                this.armsPageView.addPage(page)
            }

            this.pageChange(0)
        }
    }

    getPosByIndex(index) {
        return cc.v2(this.firstPosX+(index%this.colNum)*(this.spaceX), this.firstPosY-(Math.floor(index/this.colNum)*(this.spaceY)))
    }

    pageChange(curIndex) {
        if (this.curPageIndex == curIndex || curIndex < 0) {return}
        this.curPageIndex = curIndex
        this.refreshPage()
    }

    refreshPage() {
        let curPageArmsJson = this.armsJson["armsType"][this.curPageIndex]
        this.useGemBtn.node.active = false
        this.adBtn.node.active = false
        this.finishLevelImg.node.active = false
        if ((!curPageArmsJson) || (!curPageArmsJson["type"])) {return}
        if (curPageArmsJson["type"] == 1) {
            this.useGemBtn.node.active = true
            this.adBtn.node.active = true
            this.useGemBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + curPageArmsJson["gem"]
            this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "剩余" + (this.adUseMaxCount - this.adUseCount) + "次" 
            MKUtils.btnScaleAct(this.adBtn.node, 1)
        } else if (curPageArmsJson["type"] == 2) {
            this.finishLevelImg.node.active = true
        } else if (curPageArmsJson["type"] == 3) {
            this.useGemBtn.node.active = true
            this.adBtn.node.active = true
            let needGem = curPageArmsJson["gem"] * Math.pow(2, this.getUnlockArmsNum(this.curPageIndex))
            this.useGemBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + needGem
            this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + this.getPageAdCount(this.curPageIndex) + "/" + curPageArmsJson["ad"]
            MKUtils.btnScaleAct(this.adBtn.node, 1)
        }
    }

    getPageAdCount(index) {
        return parseInt(cc.sys.localStorage.getItem(this.getPageAdCountItemName(index))) || 0
    }

    setPageAdCount(index, count) {
        cc.sys.localStorage.setItem(this.getPageAdCountItemName(index), count)
    }

    getPageAdCountItemName(index) {
        return "Arms_ad_count_" + DataManager.getInstance().getuserData().PlayerID + "_"  + DataManager.getInstance().curGameID + "_" + index
    }

    clickArms(armsId) {
        if (this.isInUnlockNewArms) {return}
        cc.log("click --- ", armsId)
        if (SingleGameLogic.getInstance().curArmsId != armsId) {
            if (this.haveArms(armsId)) {
                this.useArms(armsId)
                SingleGameLogic.getInstance().changeArmsSyn(armsId)
                MKUtils.errorTips("武器装备成功！")
            } else {
                MKUtils.errorTips("此武器未解锁！")
            }
        }
    }

    useArms(armsId) {
        let lastId = SingleGameLogic.getInstance().curArmsId
        SingleGameLogic.getInstance().curArmsId = armsId
        this.refreshArmsById(lastId)
        this.refreshArmsById(SingleGameLogic.getInstance().curArmsId)
    }

    refreshArmsById(armsId) {
        if (this.armsNodes[armsId]) {

            let gridLock = this.armsNodes[armsId].getChildByName("gridLock")
            if (this.haveArms(armsId)) {
                this.armsNodes[armsId].getComponent(cc.Sprite).spriteFrame = this.gridHaveSpriteFrame
                if (gridLock) {
                    gridLock.removeFromParent()
                }
            } else {
                this.armsNodes[armsId].getComponent(cc.Sprite).spriteFrame = this.gridBgSpriteFrame
                if (!gridLock) {
                    let gridLock = new cc.Node()
                    let gridLockSprite = gridLock.addComponent(cc.Sprite)
                    gridLockSprite.sizeMode = cc.Sprite.SizeMode.RAW
                    gridLockSprite.trim = false
                    gridLockSprite.spriteFrame = this.gridLockSpriteFrame
                    this.armsNodes[armsId].addChild(gridLock, 5, "gridLock")
                    if (gridLock.opacity) {
                        gridLock.opacity = 125
                    }
                }
            }

            let armsSelect = this.armsNodes[armsId].getChildByName("armsSelect")
            if (SingleGameLogic.getInstance().curArmsId == armsId) {
                if (!armsSelect) {
                    let select = new cc.Node()
                    let selectSprite = select.addComponent(cc.Sprite)
                    selectSprite.spriteFrame = this.gridSelectSpriteFrame
                    this.armsNodes[armsId].addChild(select, 2, "armsSelect")
                    select.setPosition(this.selectOffsetPos)
                }
            } else {
                if (armsSelect) {
                    armsSelect.removeFromParent()
                    armsSelect = null
                }
            }
        }
    }

    haveArms(armsId) {
        for (let i = 0; i < this.haveArmsIds.length; i++) {
            if (armsId == this.haveArmsIds[i]) {
                return true
            }
        }
        return false
    }

    refreshCurArms() {
        if (!this.armsJson) {return}
        let curArmsId = SingleGameLogic.getInstance().curArmsId
        let armsConfig = this.armsJson["allArms"][curArmsId]
        if (!armsConfig) {return}
        MKUtils.loadSpriteFrame(armsConfig["img"], function(spriteFrame){
            this.curToolsIcon.spriteFrame = spriteFrame
            this.curToolsIcon.node.active = true
        }.bind(this))
    }

    //抽武器
    useGemUnlockArms() {
        if (this.isInUnlockNewArms) {return}
        let curPageArmsJson = this.armsJson["armsType"][this.curPageIndex]
        if (curPageArmsJson["type"] == 1 || curPageArmsJson["type"] == 3) {
            let needGem = curPageArmsJson["gem"]
            if (curPageArmsJson["type"] == 3) {
                needGem = curPageArmsJson["gem"] * Math.pow(2, this.getUnlockArmsNum(this.curPageIndex))
            }
            if (SingleGameLogic.getInstance().gemNum >= needGem) {
                this.unlockNewArms(this.curPageIndex, function(unlockArmsId){
                    cc.log("unlockNewArms success")
                    SingleGameLogic.getInstance().gemNum = SingleGameLogic.getInstance().gemNum - needGem
                    EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_REFRESH_GEM)
                    this.armsSyn(unlockArmsId, SingleGameLogic.getInstance().gemNum, this.adUseCount)
                }.bind(this))
            } else {
                MKUtils.errorTips("宝石数量不足")
            }
        }
    }

    adUnlockArms() {
        if (this.isInUnlockNewArms) {return}

        let curPageArmsJson = this.armsJson["armsType"][this.curPageIndex]
        if (curPageArmsJson["type"] == 1) {
            if (this.adUseCount < this.adUseMaxCount) {
                SingleGameLogic.getInstance().getReward(function(){
                    this.unlockNewArms(this.curPageIndex, function(unlockArmsId){
                        cc.log("unlockNewArms success")
                        this.adUseCount = this.adUseCount + 1
                        this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "剩余" + (this.adUseMaxCount - this.adUseCount) + "次"
                        this.armsSyn(unlockArmsId, SingleGameLogic.getInstance().gemNum, this.adUseCount)
                    }.bind(this))
                }.bind(this), function(){
                }.bind(this), 2)
            } else {
                MKUtils.errorTips("今日次数已用完！")
            }
        } else if (curPageArmsJson["type"] == 3) {
            SingleGameLogic.getInstance().getReward(function(){
                this.setPageAdCount(this.curPageIndex, this.getPageAdCount(this.curPageIndex)+1)
                if (this.getPageAdCount(this.curPageIndex) >= curPageArmsJson["ad"]) {
                    this.setPageAdCount(this.curPageIndex, 0)
                    this.unlockNewArms(this.curPageIndex, function(unlockArmsId){
                        cc.log("unlockNewArms success")
                        this.armsSyn(unlockArmsId, SingleGameLogic.getInstance().gemNum, this.adUseCount)
                    }.bind(this))
                }
                this.adBtn.node.getChildByName("numLabel").getComponent(cc.Label).string = "" + this.getPageAdCount(this.curPageIndex) + "/" + curPageArmsJson["ad"]
            }.bind(this), function(){
            }.bind(this), 2)
        }
    }

    unlockNewArms(pageIndex:number, successCallback) {
        if (this.isInUnlockNewArms) {return}
        this.isInUnlockNewArms = true

        let lockIds = []
        let curPageArmsJson = this.armsJson["armsType"][pageIndex]
        for (let i = 0; i < curPageArmsJson["ids"].length; i++) {
            let armsId = curPageArmsJson["ids"][i]["id"]
            if (!this.haveArms(armsId)) {
                lockIds.push(armsId)
            }
        }

        if (lockIds.length > 0) {
            let randomIndex = MKUtils.randomNM(0, lockIds.length-1)
            let unlockArmsId = lockIds[randomIndex]
            lockIds.splice(randomIndex, 1)

            let actNum = Math.floor(lockIds.length*2/3)
            let spaceTime = 0.15
            for (let i = 0; i < actNum; i++) {
                let index = MKUtils.randomNM(0, lockIds.length-1)
                if (this.armsNodes[lockIds[index]]) {
                    this.armsNodes[lockIds[index]].runAction(cc.sequence(cc.delayTime(i*spaceTime), cc.scaleTo(0.15, 1.2), cc.scaleTo(0.15, 1)))
                }
                lockIds.splice(index, 1)
            }

            this.node.runAction(cc.sequence(cc.delayTime(actNum*spaceTime+0.3), cc.callFunc(()=>{
                this.haveArmsIds.push(unlockArmsId)
                this.useArms(unlockArmsId)
                this.isInUnlockNewArms = false
                successCallback(unlockArmsId)
                this.refreshPage()
                cc.audioEngine.play(this.allSound[1], false, 1)
            }, this.node)))

        } else {
            this.isInUnlockNewArms = false
            MKUtils.errorTips("本页武器已经全部获得了")
        }

    }

    getUnlockArmsNum(pageIndex:number) {
        let unlockIds = []
        let curPageArmsJson = this.armsJson["armsType"][pageIndex]
        for (let i = 0; i < curPageArmsJson["ids"].length; i++) {
            let armsId = curPageArmsJson["ids"][i]["id"]
            if (this.haveArms(armsId)) {
                unlockIds.push(armsId)
            }
        }
        let num = unlockIds.length
        if (pageIndex == 0) {num -= 1}
        if (num < 0) {num = 0}
        return num
    }

    //获取数据
    getArmsData() {
        let value = new CSSingleGameSkin();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("getArmsData---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SKIN_ID, this.getArmsDataSuccess.bind(this), this.getArmsDataFailed.bind(this));
    }
    
    getArmsDataSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("getArmsDataSuccess---data null")
            return;
        }
        let protocol = new SCSingleGameSkin()
        protocol.unPack(data)
        cc.log("getArmsDataSuccess---", protocol)
        for (let i = 0; i < protocol.SkinList.length; i++) {
            this.haveArmsIds.push(protocol.SkinList[i])
        }
        this.adUseCount = protocol.Count
        this.createArmsPage()
    }

    getArmsDataFailed(states) {
        cc.log("getArmsDataFailed---")
    }

    //抽武器同步
    armsSyn(armsId, gem, adUseCount) {
        let value = new CSSingleGameLottery()
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        value.Skin = armsId
        value.GemStone = gem
        value.Count = adUseCount
        cc.log("armsSyn---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LOTTERY_ID, this.armsSynSuccess.bind(this), this.armsSynFailed.bind(this));
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE)
    }

    armsSynSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("armsSynSuccess---data null")
            return;
        }
        let protocol = new SCSingleGameLottery()
        protocol.unPack(data)
        cc.log("armsSynSuccess---", protocol)
    }

    armsSynFailed(states) {
        cc.log("getArmsDataFailed---")
    }
}
