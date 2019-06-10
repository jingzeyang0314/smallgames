
import {PacketID} from "../../network/PacketID"
import EventDispath from "../../Event/Event"
import DataManager from "../../data/DataManager"
import {EventIDS} from "../../event/EvenID"
import { CSSingleGameStart, SCSingleGameStart, CSSingleGameLife, SCSingleGameLife, CSSingleGameSyn, SCSingleGameSyn, CSSingleGameOrder, SCSingleGameOrder, CSSingleGameSend, SCSingleGameSend, CSSingleGameCheckIn, CSSingleGameCheckDay, SCSingleGameCheckIn, SCSingleGameCheckDay, CSSingleGameOffLine, SCSingleGameOffLine, CSSingleGameClick, SCSingleGameClick, CSSingleGameDouble, SCSingleGameDouble, CSSingleGameRes, SCSingleGameRes, CSSingleGameInviteInfo, SCSingleGameInviteInfo, CSSingleGameInviteBind, SCSingleGameInviteBind, CSSingleGameInviteDraw, SCSingleGameInviteDraw, CSSingleGameExchange, SCSingleGameExchange, CSWXUserInfo, SCWXUserInfo } from "../../network/gameProtocols/singleGameProtocol";
import { HttpHelper } from "../../network/HttpHelper";
import MKUtils from "../../common/MKUtils";
import Constant from "../../common/Constant";
import { Sina_Config } from "../../data/configsFile";
import SDKManager from "../SDKManager";

export default class SingleGameLogic {

    singleGameStart:SCSingleGameStart = null
    curGameId:number = 0
    singleGameOrder:SCSingleGameOrder = null
    wxShareNum:number = 0 //微信分享剩余次数 
    startNode:cc.Node = null
    curArmsId:number = 0 //当前使用武器的id
    curGameMaxLevel:number = 0 //当前游戏玩到的最高关卡
    gemNum:number = 0 //宝石数量
    level:number = 0 //当前关卡等级

    newArmsId:number = 0 //通关获得新的武器

    //看视频广告/转发
    curGetRewardType:number = Constant.SingleRewardType.AD  //领奖获取方式
    curRewardTypeIndex:number = -1
    rewardVideoAdEnable:boolean = true

    activeShowConfig:Array<number> = [
        Constant.SingleActiveType.SIGN,
        Constant.SingleActiveType.OFFLINE,
    ]

    constructor() {
    }

    public static singleton:SingleGameLogic;
    public static getInstance(): SingleGameLogic{
        if(!this.singleton){
            this.singleton = new SingleGameLogic();
        }
        return this.singleton;
    }

    WX_ThreeKingFun_w2243g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //游戏开始
    sendStart(gameId:number) {
        let value = new CSSingleGameStart();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = gameId
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_START_ID, this.onStart.bind(this));
        cc.log("sendStart---", gameId)
    }

    onStart(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onStart---data null")
            return;
        }
        let protocol = new SCSingleGameStart()
        protocol.unPack(data)
        this.singleGameStart = protocol
        this.wxShareNum = this.singleGameStart.WxShareNum
        this.curGameId = protocol.GameId
        this.curGameMaxLevel = protocol.maxChapter
        this.gemNum = protocol.Gemstone
        this.level = protocol.Chapter > 0 ? protocol.Chapter : 0
        this.curArmsId = protocol.CurArmsId
        cc.log("onStart---", this.singleGameStart)
        cc.director.loadScene(DataManager.getInstance().curGameType + "Start")
    }

    getStartData() {
        return this.singleGameStart
    }

    WX_ThreeKingFun_w22465g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //同步数据
    gameSyn(gameSynData:CSSingleGameSyn) {
        this.level = gameSynData.Chapter
        gameSynData.Code = DataManager.getInstance().getuserData().HttpCode;
        cc.log("gameSyn---", gameSynData)
        if (SingleGameLogic.getInstance().curGameMaxLevel < this.level) {
            SingleGameLogic.getInstance().curGameMaxLevel = this.level
            SingleGameLogic.getInstance().checkLevelFinishArms()
        }
        HttpHelper.sendHttpData(gameSynData, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SYN_ID, this.onGameSyn.bind(this), this.onGameSynFailed.bind(this));
    }

    WX_ThreeKingFun_w2bb2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onGameSyn(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onGameSyn---data null")
            return;
        }
        let protocol = new SCSingleGameSyn()
        protocol.unPack(data)
        this.curGameMaxLevel = protocol.maxChapter
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_SNY_SUCCESS);
        cc.log("onGameSyn---", protocol)
    }

    onGameSynFailed(states) {
        cc.log("onGameSynFailed---")
        MKUtils.errorTips("网络异常，进度无法保存哦");
    }

    WX_ThreeKingFun_w22nhg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //复活
    buyLife(credit) {
        let value = new CSSingleGameLife();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        value.CREDIT = credit
        cc.log("buyLife---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LIFE_ID, this.onBuyLife.bind(this), this.onBuyLifeFailed.bind(this));
    }

    onBuyLife(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onBuyLife---data null")
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
            MKUtils.errorTips("复活失败");
            return;
        }
        let protocol = new SCSingleGameLife()
        protocol.unPack(data)
        cc.log("onBuyLife---", protocol)
        if(protocol.StateId == 0){
            DataManager.getInstance().userData.setUserCreditNum(DataManager.getInstance().userData.getUserCreditNum() - protocol.CREDIT);
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BUY_LIEF_SUCCESS)
        }else{
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
            MKUtils.errorTips("复活失败");
        }
    }

    WX_ThreeKingFun_w224hsds2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onBuyLifeFailed(states) {
        cc.log("onBuyLifeFailed--- net error", states)
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_BUY_LIEF_FAIL);
        MKUtils.errorTips("网络异常，复活失败");
    }

    //结算/失败
    showFail(data?:any) {
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/fail/SingleFail"
            MKUtils.loadPrefab(prefabUrl, function(prefab){
                let dialog = cc.instantiate(prefab)
                dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                cc.director.getScene().addChild(dialog, 10)
                dialog.getComponent("SingleFailScript").setData(data)
            }.bind(this))
        }
    }

    WX_ThreeKingFun_w22ds2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    showSuccess() {
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/success/SingleSuccess"
            MKUtils.loadPrefab(prefabUrl, function(prefab){
                let dialog = cc.instantiate(prefab)
                dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                cc.director.getScene().addChild(dialog, 10)

                //检查有没有新的武器
                dialog.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
                    SingleGameLogic.getInstance().checkNewArms()
                })))
            }.bind(this))
        }
    }

    WX_ThreeKingFun_w22mhg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //通关奖励数量
    getLevelRewardNum() {
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson && gameJson["levelSuccessRewardGemNum"]) {
            return gameJson["levelSuccessRewardGemNum"]
        } else {
            return 1
        }
    }

    WX_ThreeKingFun_w22nbcg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //离线奖励/果汁店
    getLevelReward(gemNum:number) {
        let value = new CSSingleGameRes();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        value.Gem = gemNum
        cc.log("getLevelReward---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LEVEL_REWARD_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("getLevelReward---data null")
                return;
            }
            let protocol = new SCSingleGameRes()
            protocol.unPack(data)
            cc.log("getLevelRewardsuccess---", protocol)
            SingleGameLogic.getInstance().showReward(gemNum)
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL)
        }.bind(this), function(states){
            EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_START_NEXT_LEVEL)
            MKUtils.errorTips("网络异常，领取失败")
        }.bind(this));
    }

    WX_ThreeKingFun_w2ww2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //显示失误了
    onOpenGameFailure(callFun,price) {
        let prefabUrl = "public/prefabs/GameFailure"; 
        cc.loader.loadRes(prefabUrl, function(errorMessage,loadedResource){
            //检查资源加载
            if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
            //开始实例化预制资源
            let prefab = cc.instantiate(loadedResource);
            prefab.setAnchorPoint(0.5,0.5);
            prefab.setPosition(0,0);
            let objIt = prefab.getComponent("GameFailure");
            if (objIt) {  
                //传入 一个回调函数，一个复活消耗数量              
                //objIt.setfallbackFunction(function(){},100);    
                objIt.setfallbackFunction(callFun,price);                
            } 
            prefab.setPosition(360,640);
            cc.director.getScene().addChild(prefab, 8, "SingleGameFailureDialog");  
       }.bind(this));
    }

    WX_ThreeKingFun_wvd3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //显示暂停
    onOpenGamePause(callFun) {
        let prefabUrl = "public/prefabs/GamePause"; 
        cc.loader.loadRes(prefabUrl, function(errorMessage,loadedResource){
            //检查资源加载
            if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
            //开始实例化预制资源
            var prefab = cc.instantiate(loadedResource);
            prefab.setAnchorPoint(0.5,0.5);
            prefab.setPosition(0,0);
            let objIt = prefab.getComponent("GamePause");
            if (objIt) {                
                objIt.setfallbackFunction(callFun);                    
            }   
            prefab.setPosition(360,640);
            cc.director.getScene().addChild(prefab,100); 
            
       }.bind(this));
    }

    //排行
    getGameOrder(gameId:number) {
        let value = new CSSingleGameOrder();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = gameId
        cc.log("getGameOrder---", gameId)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_ORDER_ID, this.onGetGameOrder.bind(this));
    }

    WX_ThreeKingFun_w22vcx() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onGetGameOrder(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onGetGameOrder---data null")
            return;
        }
        let protocol = new SCSingleGameOrder()
        protocol.unPack(data)
        this.singleGameOrder = protocol
        cc.log("onGetGameOrder---", this.singleGameOrder)
    }

    WX_ThreeKingFun_w222453g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    getOrderData() {
        if (this.singleGameOrder != null && this.singleGameOrder.GameId == DataManager.getInstance().curGameID) {
            return this.singleGameOrder
        } else {
            return null
        }
    }

    //分享次数
    getWXShareNum() {
        return this.wxShareNum
    }

    WX_ThreeKingFun_w224543g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    useWXShareNum() {
        this.wxShareNum = this.wxShareNum - 1
        let value = new CSSingleGameSend();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("useWXShareNum---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SEND_ID, this.onUseWXShareNum.bind(this));
    }

    onUseWXShareNum(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onUseWXShareNum---data null")
            return;
        }
        let protocol = new SCSingleGameSend()
        protocol.unPack(data)
        this.wxShareNum = protocol.WxShareNum
        cc.log("onUseWXShareNum---", protocol)
    }

    WX_ThreeKingFun_w2245ddg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    refreshRewardType() {
        if (MKUtils.isWXGameFun()) {
            let gameId = DataManager.getInstance().curGameID
            let jsonData = DataManager.getInstance().getGameJsonById(gameId)
            if (jsonData && jsonData["rewardTypes"] && jsonData["rewardTypes"].length > 0) {
                let rewardTypeConfig = jsonData["rewardTypes"]
                this.curRewardTypeIndex = this.curRewardTypeIndex + 1
                if (this.curRewardTypeIndex < 0) {
                    this.curRewardTypeIndex = 0
                }
                if (this.curRewardTypeIndex >= rewardTypeConfig.length) {
                    this.curRewardTypeIndex = 0
                }
                this.curGetRewardType = rewardTypeConfig[this.curRewardTypeIndex]
                if (this.curGetRewardType == Constant.SingleRewardType.SHARE && this.getWXShareNum() <= 0) {
                    this.curGetRewardType = Constant.SingleRewardType.AD
                }
                if (this.curGetRewardType == Constant.SingleRewardType.AD && (!this.rewardVideoAdEnable) && this.getWXShareNum() > 0) {
                    this.curGetRewardType = Constant.SingleRewardType.SHARE
                }
            } else {
                this.curGetRewardType = Constant.SingleRewardType.AD
            }
        } else {
            this.curGetRewardType = Constant.SingleRewardType.AD
        }
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_REWARD_TYPE_CHANGE)
    }


    WX_ThreeKingFun_w2vv() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //领奖
    getReward(successCallback?:any, failCallback?:any, adIndex?:number) {
        // if (successCallback) { //test
        //     successCallback()
        //     return
        // }
        if (SingleGameLogic.getInstance().curGetRewardType == Constant.SingleRewardType.AD) {
            if (MKUtils.isWXGameFun()) {
                SDKManager.getInstance().playRewardVideoAd(adIndex, successCallback, failCallback)
            } else {
                SingleGameLogic.getInstance().refreshRewardType()
                if (DataManager.getInstance().getWbAdCount() > 0) {
                    SDKManager.getInstance().playVideoAd(successCallback, failCallback)
                } else {
                    MKUtils.errorTips("今日视频广告次数已用完")
                    if (failCallback) {
                        failCallback()
                    }
                }
            }
        } else if (SingleGameLogic.getInstance().curGetRewardType == Constant.SingleRewardType.SHARE) {
            if (MKUtils.isWXGameFun()) {
                if (SingleGameLogic.getInstance().getWXShareNum() > 0) {
                    SDKManager.getInstance().shareAppMessage(function(){
                        SingleGameLogic.getInstance().useWXShareNum()
                        if (successCallback) {
                            successCallback()
                        }
                        if (this.curGetRewardType == Constant.SingleRewardType.SHARE && this.getWXShareNum() <= 0) {
                            SingleGameLogic.getInstance().refreshRewardType()
                        }
                    }.bind(this), failCallback)
                } else {
                    MKUtils.errorTips("今日分享次数已用完")
                    if (failCallback) {
                        failCallback()
                    }
                }
            } else {
                if (failCallback) {
                    failCallback()
                }
            }
            SingleGameLogic.getInstance().refreshRewardType()
        } else {
            MKUtils.errorTips("功能暂未开放，敬请期待！")
            SingleGameLogic.getInstance().refreshRewardType()
            if (failCallback) {
                failCallback()
            }
        }
    }

    addGem(num) {
        SingleGameLogic.getInstance().gemNum = SingleGameLogic.getInstance().gemNum + num
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_REFRESH_GEM)
    }

    subGem(num) {
        SingleGameLogic.getInstance().gemNum = SingleGameLogic.getInstance().gemNum - num
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_REFRESH_GEM)
    }

    WX_ThreeKingFun_w224wq() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //打开武将库界面
    openArmsDialog() {
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/arms/SingleArms"
            MKUtils.loadPrefab(prefabUrl, function(armsPrefab){
                if (cc.director.getScene().getChildByName("SingleArms")) {return}
                let dialog = cc.instantiate(armsPrefab)
                dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2+100)
                cc.director.getScene().addChild(dialog, 10, "SingleArms")
            }.bind(this))
        }
    }

    getNextArmsConfig(maxLevel?:number) {
        if (!maxLevel) {maxLevel = SingleGameLogic.getInstance().curGameMaxLevel}
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson && gameJson["arms"]) {
            for (let i = 0; i < gameJson["arms"]["armsType"].length; i++) {
                let jsonData = gameJson["arms"]["armsType"][i]
                if (jsonData["type"] == 2) {
                    for (let j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] >= maxLevel) {
                            return jsonData["ids"][j]
                        }
                    }
                }
            }
        }
        return 0
    }

    WX_ThreeKingFun_w22w23g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    getArmsJsonConfig(armsId) {
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson && gameJson["arms"]) {
            return gameJson["arms"]["allArms"][armsId]
        } 
        return null
    }

    checkLevelFinishArms() {
        let maxLevel = SingleGameLogic.getInstance().curGameMaxLevel
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson && gameJson["arms"]) {
            for (let i = 0; i < gameJson["arms"]["armsType"].length; i++) {
                let jsonData = gameJson["arms"]["armsType"][i]
                if (jsonData["type"] == 2) {
                    for (let j = 0; j < jsonData["ids"].length; j++) {
                        if (jsonData["ids"][j]["level"] == maxLevel-1) {
                            SingleGameLogic.getInstance().newArmsId = jsonData["ids"][j]["id"]
                            return
                        }
                    }
                }
            }
        }
    }

    WX_ThreeKingFun_w224eq3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    checkNewArms() {
        if (SingleGameLogic.getInstance().newArmsId > 0) {
            SingleGameLogic.getInstance().changeArmsSyn(SingleGameLogic.getInstance().newArmsId)
            SingleGameLogic.getInstance().showRewardArms(SingleGameLogic.getInstance().newArmsId)
            SingleGameLogic.getInstance().newArmsId = 0
        }
    }

    //更换武器
    changeArmsSyn(armsId) {
        let value = new CSSingleGameExchange()
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        value.Skin = armsId
        cc.log("changeArmsSyn---", value)
        SingleGameLogic.getInstance().curArmsId = armsId
        EventDispath.getInstance().send(EventIDS.CMD_SINGLE_GAME_ARMS_CHANGE)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_EXCHANGE_ID, this.changeArmsSynSuccess.bind(this), this.changeArmsSynFailed.bind(this));
    }

    changeArmsSynSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("changeArmsSynSuccess---data null")
            return;
        }
        let protocol = new SCSingleGameExchange()
        protocol.unPack(data)
        cc.log("changeArmsSynSuccess---", protocol)
    }

    changeArmsSynFailed(states) {
        cc.log("changeArmsSynFailed---")
    }

    WX_ThreeKingFun_w22sw3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //签到
    getSignData(successCallback, failCallback?:any) {
        let value = new CSSingleGameCheckIn();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        cc.log("getSignData---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKIN_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("getSignDataSuccess---data null")
                return;
            }
            let protocol = new SCSingleGameCheckIn()
            protocol.unPack(data)
            cc.log("getSignDataSuccess---", protocol)
            successCallback(protocol)
        }.bind(this), function(states){
            if (failCallback) {
                failCallback(states)
            }
        }.bind(this));
    }

    WX_ThreeKingFun_w22bdd3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    signReward() {
        let value = new CSSingleGameCheckDay();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("signReward---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKDAY_ID, this.signRewardSuccess.bind(this))
    }

    signRewardSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("signRewardSuccess---data null")
            return;
        }
        let protocol = new SCSingleGameCheckDay()
        protocol.unPack(data)
        cc.log("signRewardSuccess---", protocol)
        this.addGem(protocol.Gem)
        this.showReward(protocol.Gem)
    }

    WX_ThreeKingFun_w224bdsg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    checkSign(mustOpen:boolean) {
        this.getSignData(function(protocol:SCSingleGameCheckIn){
            if (mustOpen || protocol.HasGet == 0) {
                let gameId = DataManager.getInstance().curGameID
                let config = DataManager.getInstance().getGameConfig(gameId)
                if (config && config["fileName"] && config["fileName"] != "") {
                    let signPrefabUrl = "smallgames/" + config["fileName"] +"/base/sign/SingleSign"
                    MKUtils.loadPrefab(signPrefabUrl, function(armsPrefab){
                        if (cc.director.getScene().getChildByName("SingleSign")) {return}
                        let dialog = cc.instantiate(armsPrefab)
                        dialog.getComponent("SingleSignScript").setSignData(protocol)
                        dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                        cc.director.getScene().addChild(dialog, 10, "SingleSign")
                    }.bind(this))
                }
            } else {
                SingleGameLogic.getInstance().checkActive()
            }
        }.bind(this))
    }

    //钻石奖励界面
    showReward(num) {
        let prefabUrl = "single/reward/RewardDialog";
        MKUtils.loadPrefab(prefabUrl, function(prefab){
            let node = cc.instantiate(prefab);
            node.getComponent("SingleRewardScript").setNum(num)
            node.setPosition(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
            cc.director.getScene().addChild(node, 11, "SingleReward")
        }.bind(this))
    }

    showRewardArms(armsId) {
        let prefabUrl = "single/reward/RewardDialog";
        MKUtils.loadPrefab(prefabUrl, function(prefab){
            let node = cc.instantiate(prefab);
            node.getComponent("SingleRewardScript").setArms(armsId)
            node.setPosition(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
            cc.director.getScene().addChild(node, 11, "SingleReward")
        }.bind(this))
    }

    WX_ThreeKingFun_w2ewq3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //离线奖励/果汁店
    getOfflineData(successCallback, failCallback?:any) {
        let value = new CSSingleGameOffLine();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("getOfflineData---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("getOfflineData---data null")
                return;
            }
            let protocol = new SCSingleGameOffLine()
            protocol.unPack(data)
            cc.log("getOfflineData---", protocol)
            successCallback(protocol)
        }.bind(this), function(states){
            if (failCallback) {
                failCallback(states)
            }
        }.bind(this));
    }

    offlineReward(flag) {
        let value = new CSSingleGameClick();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        value.Flag = flag
        cc.log("offlineReward---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_CLICK_ID, this.offlineRewardSuccess.bind(this))
    }

    offlineRewardSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("offlineRewardSuccess---data null")
            return;
        }
        let protocol = new SCSingleGameClick()
        protocol.unPack(data)
        cc.log("offlineRewardSuccess---", protocol)
        this.addGem(protocol.Gem)
        this.showReward(protocol.Gem)
    }

    WX_ThreeKingFun_w2bde() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    offlineDouble() {
        let value = new CSSingleGameDouble();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("offlineDouble---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("offlineDouble---data null")
                return;
            }
            let protocol = new SCSingleGameDouble()
            protocol.unPack(data)
            cc.log("offlineDouble---", protocol)
        }.bind(this))
    }

    //打开界面
    checkOffline(mustOpen:boolean) {
        if (MKUtils.isWxReview()) {
            return
        }
        this.getOfflineData(function(protocol:SCSingleGameOffLine){
            if (mustOpen || protocol.Gem > 0) {
                let gameId = DataManager.getInstance().curGameID
                let config = DataManager.getInstance().getGameConfig(gameId)
                if (config && config["fileName"] && config["fileName"] != "") {
                    let offlinPrefabUrl = "smallgames/" + config["fileName"] +"/base/offline/SingleOffline"
                    MKUtils.loadPrefab(offlinPrefabUrl, function(prefab){
                        if (cc.director.getScene().getChildByName("SingleOffline")) {return}
                        let dialog = cc.instantiate(prefab)
                        dialog.getComponent("SingleOfflineScript").setOfflineData(protocol)
                        dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                        cc.director.getScene().addChild(dialog, 10, "SingleOffline")
                    }.bind(this))
                }
            } else {
                SingleGameLogic.getInstance().checkActive()
            }
        }.bind(this))
    }

    WX_ThreeKingFun_w224nddg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //主动弹出活动界面
    checkActive() {
        if (this.activeShowConfig.length > 0) {
            let activeType = this.activeShowConfig[0]
            this.activeShowConfig.splice(0, 1)
            if (activeType == Constant.SingleActiveType.SIGN) {
                SingleGameLogic.getInstance().checkSign(false)
            } else if (activeType == Constant.SingleActiveType.OFFLINE) {
                SingleGameLogic.getInstance().checkOffline(false)
            } else {
                SingleGameLogic.getInstance().checkActive()
            }
        } 
    }

    //邀请好友
    openInvite() {
        if (!MKUtils.isWXGameFun()) {
            MKUtils.errorTips("功能暂未开放，敬请期待")
            return
        }
        if (MKUtils.isWxReview()) {
            MKUtils.errorTips("功能暂未开放，敬请期待")
            return
        }
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/invite/SingleInvite"
            MKUtils.loadPrefab(prefabUrl, function(prefab){
                if (cc.director.getScene().getChildByName("SingleInvite")) {return}
                let dialog = cc.instantiate(prefab)
                dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                cc.director.getScene().addChild(dialog, 10, "SingleInvite")
            }.bind(this))
        }
    }

    WX_ThreeKingFun_w224vdd2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getInviteInfo(successCallback) {
        let value = new CSSingleGameInviteInfo();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        cc.log("getInviteInfo---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_INFO_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("getInviteInfo---data null")
                return;
            }
            let protocol = new SCSingleGameInviteInfo()
            protocol.unPack(data)
            cc.log("getInviteInfo success---", protocol)
            successCallback(protocol)
        }.bind(this), function(states){
        }.bind(this));
    }

    inviteBind() {
        if (!MKUtils.isWXGame()) {return}
        let value = new CSSingleGameInviteBind();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        value.InvitePid = SDKManager.getInstance().getInvitePid()
        cc.log("inviteBind---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_BIND_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("inviteBind---data null")
                return;
            }
            let protocol = new SCSingleGameInviteBind()
            protocol.unPack(data)
            cc.log("inviteBind success---", protocol)
        }.bind(this), function(states){
        }.bind(this));
    }

    WX_ThreeKingFun_w224ndfdg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    getInviteReward(typeId, successCallback, failCallback) {
        let value = new CSSingleGameInviteDraw();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID;
        value.TypeId = typeId
        cc.log("getInviteReward---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_DRAW_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("getInviteReward---data null")
                return;
            }
            let protocol = new SCSingleGameInviteDraw()
            protocol.unPack(data)
            cc.log("getInviteReward success---", protocol)
            successCallback(protocol)
            this.showReward(protocol.Total)
            this.addGem(protocol.Total)
        }.bind(this), function(states){
            if (failCallback) {
                failCallback()
            }
        }.bind(this));
    }

    WX_ThreeKingFun_w2rrr3g2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //服务器存储微信用户信息
    wxUserInfo(name, photo) {
        if (!MKUtils.isWXGame()) {return}
        let value = new CSWXUserInfo();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.Name = name
        value.Photo = photo
        cc.log("wxUserInfo---", DataManager.getInstance().curGameID)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_WX_USERINFO_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("wxUserInfo---data null")
                return;
            }
            let protocol = new SCWXUserInfo()
            protocol.unPack(data)
            cc.log("wxUserInfo success---", protocol)
        }.bind(this), function(states){
        }.bind(this));
    }

    //排行榜
    showAllRank(item) {
        cc.log("showAllRank, item:", item)
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/rank/rankPrefab"
            cc.loader.loadRes(prefabUrl, function(errorMessage, loadedResource){
                if (errorMessage) { cc.log("load rankPrefab error : " + errorMessage ); return; }
    
                let prefab = cc.instantiate(loadedResource);
                prefab.setPosition(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
                cc.director.getScene().addChild(prefab, 9)
    
                SDKManager.getInstance().showAllRank(item)
            }.bind(this));
        }        
    }
    WX_ThreeKingFun_w22bbb2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //邀请好友
    openExchangeGem() {
        if (MKUtils.isWXGameFun()) {
            MKUtils.errorTips("功能暂未开放，敬请期待")
            return
        }
        let gameId = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["fileName"] && config["fileName"] != "") {
            let prefabUrl = "smallgames/" + config["fileName"] +"/base/exchange/SingleExchange"
            MKUtils.loadPrefab(prefabUrl, function(prefab){
                if (cc.director.getScene().getChildByName("SingleExchange")) {return}
                let dialog = cc.instantiate(prefab)
                dialog.setPosition(cc.winSize.width/2, cc.winSize.height/2)
                cc.director.getScene().addChild(dialog, 10, "SingleExchange")
            }.bind(this))
        }
    }
}
