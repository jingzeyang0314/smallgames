/**
 * Author: Ma yuan
 * Date: 2018.11.1
 * CopyRight:
 * 游戏开始匹配处理类
 */

import EventDispath from "../Event/Event";
import {Sina_Config, Configs} from "../data/configsFile";
import DataManager from "../data/DataManager";
import {EventIDS } from "../event/EvenID";

// import SuShiLogic from "./GamesLogic/SuShiLogic"
// import squElimiLogic from "./GamesLogic/squElimiLogic"
// import HuntLogic from "./GamesLogic/HuntLogic"
// import MineLogic from "./GamesLogic/MineLogic"
// import JungleLogic from "./GamesLogic/JungleLogic"
// import LinkLogic from "./GamesLogic/LinkLogic"
// import brickLogic from "./GamesLogic/brickLogic"
// import DPLogic from "./GamesLogic/DPLogic"
// import CircleLogic from "./GamesLogic/CircleLogic"
// import ohtellLogic from "./GamesLogic/ohtellLogic"
// import number2048Logic from "./GamesLogic/number2048Logic"
// import ChiefLogic from "./GamesLogic/ChiefLogic"
// import HexagonLogic from "./GamesLogic/HexagonLogic"
// import TetrisLogic from "./GamesLogic/tetrisLogic"
import {PacketID} from "../network/PacketID";
// import BraveLogic from "./GamesLogic/BraveLogic";
import Constant from "../common/Constant";
import LogicController from "./LogicController";
import SingleGameLogic from "./GamesLogic/SingleGameLogic";
import { CSFindPlayer, CSEnterGameAdvert, SCEnterGameAdvert } from "../network/Protocol";
import SocketManager from "./ScoketManager";
import MKUtils from "../common/MKUtils";
import { HttpHelper } from "../network/HttpHelper";
import SDKManager from "./SDKManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamesCommonLogic extends cc.Component{ 
    curIsInStartGameScene:boolean = false  //true代表在匹配界面或者在加载中
    haveGetMakeTeamData:boolean = false
    curIsAdEnterGame:boolean = false //是否广告免费进入游戏

    onlyOne = null;
    constructor() {
        super();
        // SuShiLogic.getInstance();
        // squElimiLogic.getInstance();
        // HuntLogic.getInstance();
        // MineLogic.getInstance();
        // JungleLogic.getInstance();
        // LinkLogic.getInstance();
        // brickLogic.getInstance();
        // DPLogic.getInstance();
        // number2048Logic.getInstance();
        // CircleLogic.getInstance();
        // ohtellLogic.getInstance();
        // ChiefLogic.getInstance();
        // HexagonLogic.getInstance();
        // BraveLogic.getInstance();
        // TetrisLogic.getInstance();
        //EventDispath.getInstance().addEventListener(EventIDS.CMD_SHOW_VS_LAYER, this.showVSLayer, this); 
        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_CREDIT).toString(), this.onGetUserCreditCountAck, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SHOW_OTHER_EXIT, this.upDataExitStatus, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SHOW_OTHER_TO_SELF, this.upDataOtherToSelfStatus, this);
    }     

    WX_ThreeKingFun_wbffbfg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    enterSmallGame() {
        let curGameID = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(curGameID)
        if (!config) {
            cc.log("Error! not found config, gameid:", curGameID)
            return
        }
        DataManager.getInstance().curGameType = config["gameType"]

        if (config["jsonData"] && config["jsonData"] != "") {
            DataManager.getInstance().loadGameJson(config["jsonData"], this.loadJsonSuccess.bind(this))
        } else {
            this.loadJsonSuccess()
        }
    }

    loadJsonSuccess() {
        cc.log("loadJsonSuccess---enter game")
        SingleGameLogic.getInstance().refreshRewardType()
        let curGameID = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(curGameID)
        let enterType = config["enterType"]
        if (enterType == Constant.GameEnterType.MATCH) {
            if (!DataManager.getInstance().isWheelEnterState() && MKUtils.isCreditChannel()) {
                cc.director.loadScene("integralScene");
            } else {
                this.sendFindPlayer(curGameID)
            }
        } else if (enterType == Constant.GameEnterType.DIRECT) {
            cc.director.loadScene(config["gameType"]);
            DataManager.getInstance().addGameCount(curGameID)
        } else if (enterType == Constant.GameEnterType.SINGEL) {
            SingleGameLogic.getInstance().sendStart(curGameID)
            DataManager.getInstance().addGameCount(curGameID)
        }
    }

    enterGameWBAdvert(successCallback?:any, failCallback?:any) {
        let value = new CSEnterGameAdvert()
        value.code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        value.Platform = 4
        cc.log("enterGameWBAdvert---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_ENTER_GAME_ADVERT_ID, function(states, data:ArrayBuffer) {
            if (data == null || data == undefined ) {
                cc.log("enterGameWBAdvert---data null")
                if (failCallback) {
                    failCallback()
                }
                return;
            }
            let protocol = new SCEnterGameAdvert()
            protocol.unPack(data)
            cc.log("enterGameWBAdvertSuccess---", protocol)
            if (protocol.StateId == 0) {
                DataManager.getInstance().setWbAdCount(protocol.WbAdCount)
                if (successCallback) {
                    successCallback()
                }
            } else {
                if (failCallback) {
                    failCallback()
                }
            }
        }.bind(this), function() {
            cc.log("enterGameWBAdvertFailed---")
            if (failCallback) {
                failCallback()
            }
        }.bind(this))
    }

    WX_ThreeKingFun_wbbb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    sendFindPlayer(gameId) {
        cc.log("send Find Player")
        let SmallGameFindPlayerPacketIds = {
            // 11:PacketID._SINA_PACKET_CS_BrickEnterGameID,
            // 12:PacketID._SINA_PACKET_CS_SquEnterGameID,
            // 13:PacketID._SINA_PACKET_CS_MineEnterGameID,
            // 14:PacketID._SINA_PACKET_CS_GameLink_FindPlayerID,
            // 15:PacketID._SINA_PACKET_CS_JungleEnterGameID,
            // 16:PacketID._SINA_PACKET_CS_Game2048_Find_PlayerID,
            // 17:PacketID._SINA_PACKET_CS_GameSaveChef_FindPlayerID,
            // 18:PacketID._SINA_PACKET_CS_SixFindPlayerID,
            // 19:PacketID._SINA_PACKET_CS_GameSushi_FindPlayerID,
            // 33:PacketID._SINA_PACKET_CS_CircleFindPlayerID,
            // 34:PacketID._SINA_PACKET_CS_TURN_FINDPLAYERID,
            // // 35:tnt,
            // 36:PacketID._SINA_PACKET_CS_HuntFindPlayerID,
            // 37:PacketID._SINA_PACKET_CS_GameTetris_FindPlayerID,
            // 38:PacketID._SINA_PACKET_CS_GameLink_FindPlayerID,
            // // 39:DPScene,
            // // 40:CityCarScene,
            // 41:PacketID._SINA_PACKET_CS_FORWARD_FIND_PLAYER,
            // 42:fruit,
            // 43:hitPeas,
        }

        let findPlayer = new CSFindPlayer()
        let msgID = SmallGameFindPlayerPacketIds[gameId]
        if (!msgID) {
            cc.log("did not found game PacketId, ", gameId)
        }
        cc.log("LogicController sendFindPlayer gameType is", gameId + "  MsgID is", msgID);
        this.scheduleOnce(this.findPlayerTimeOut, 5);
        SocketManager.getInstance().send(findPlayer.pack(), msgID);
        DataManager.getInstance().addGameCount(gameId)
    }


    WX_ThreeKingFun_wbffbd() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    findPlayerTimeOut() {
        DataManager.getInstance().isLoading = false;
    }

    upDataOtherToSelfStatus(){
        DataManager.getInstance().setSeveceID(EventIDS.CMD_SHOW_OTHER_TO_SELF);
    }

    upDataExitStatus(){
        DataManager.getInstance().setSeveceID(EventIDS.CMD_SHOW_OTHER_EXIT);
    }

    WX_ThreeKingFun_wbffmff2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    setGameServerState(data,_thisGame) {
        DataManager.getInstance().setSeveceID("");
        //server 正常
        this.onlyOne = _thisGame ;
        cc.log("setGameServerState---data = ", data)
        if (data == 0) {
            //do 显示雷达界面
            this.curIsInStartGameScene = true
            cc.director.loadScene("StartGameScene");
            
        }else {             
            cc.loader.loadRes("home/prefab/NetTip", function (err, prefab) {
                let comTips = cc.instantiate(prefab);
                let objIt = comTips.getComponent("NetErrorTips");
                if (objIt) {                
                    objIt.setShowType(2);                            
                }                        
                cc.director.getScene().addChild(comTips);   
                DataManager.getInstance().setIsLoading(false);         
            });                                         
        }
    }

    WX_ThreeKingFun_wbdssg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    getHeader(){
        if(!this.onlyOne){
            return;
        }
        let arrayMethod = [];
        let fun1 = this.onlyOne.onSendContinueGame;
        let fun2 = this.onlyOne.onSendFindPlayer;
        let fun3 = this.onlyOne.onSendExit;
        let fun4 = this.onlyOne.onSendPeace;
        let fun5 = this.onlyOne.onSendLoss;
        arrayMethod.push(fun1,fun2,fun3,fun4,fun5);
        return  arrayMethod;
    }

    setGameData(value) { 
        DataManager.getInstance().setSeveceID("");

        let userData = DataManager.getInstance().getPlayerData();
        userData.playerName = DataManager.getInstance().userData.Name;
        userData.playerHeadPath = DataManager.getInstance().userData.HeadImgPath;
        userData.playerAge = value.SelfAge;
        userData.playerCity = value.SelfCity;
        userData.playerSex = value.SelfSex;

        userData.otherName = value.OtherPlayerName;
        userData.otherHead = Sina_Config.HEAD_URL + value.OtherPlayerHead;
        userData.otherAge = value.OtherAge;
        userData.otherCity = value.OtherCity;
        userData.otherSex = value.OtherPlayerSex;

        if(!DataManager.getInstance().getWheelEnterState() && MKUtils.isCreditChannel() && !GamesCommonLogic.getInstance().curIsAdEnterGame){
            //组队成功 客户端 扣积分
            this.userCreditNum();
        }
        GamesCommonLogic.getInstance().curIsAdEnterGame = false
        cc.log("value setGameData =" , value);     
        let gameType = DataManager.getInstance().curGameType;
        if (this.curIsInStartGameScene) {
            let secne = cc.director.getScene()
            if(secne.name == "StartGameScene"){
                EventDispath.getInstance().send(EventIDS.CMD_SHOW_VS_LAYER);
            } else {
                this.haveGetMakeTeamData = true
            }
        } else {
            cc.director.loadScene(gameType, this.LoadCallback); 
        }
    }

    WX_ThreeKingFun_wbndsg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    LoadCallback() {
        DataManager.getInstance().setIsLoading(false);
    }

    //客户端更新 积分信息
    userCreditNum(){
        let gameInfo = DataManager.getInstance().getGameItemInfo(DataManager.getInstance().curGameID);
        cc.log("gameInfo is ", gameInfo);
        if (gameInfo) {
            let creditNum = DataManager.getInstance().userData.getUserCreditNum();
            cc.log("进入游戏带入的积分数量 = ",creditNum);
            DataManager.getInstance().userData.setUserCreditNum(creditNum - gameInfo.decCredit);
            cc.log("进入游戏消耗报名费之后积分数量 = ",DataManager.getInstance().userData.getUserCreditNum());
        }        
     }

     WX_ThreeKingFun_wbffbss2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onGetUserCreditCountAck(data){
        cc.log("onGetUserCreditCountAck ");
        let temp = {};
        // temp.count = data.count; //积分数量
        // temp.channelFlag = data.channelFlag;// 渠道标志
        // temp.state = data.state; //state 0:积分充足  144：积分不足
        let plData = DataManager.getInstance().playerData;
        plData.creditState = data.state;
        cc.log("onGetUserCreditCountAck data = ",data);
    }

    WX_ThreeKingFun_wbffswg2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //创建玩家头像，parent：头像父节点，diameter：头像直径，headUrl：头像url
    createHead(parent:cc.Node, diameter:number, headUrl:string) {        
        // cc.log("createHead---diameter:", diameter, ", headUrl:", headUrl)
        if (!parent || parent == null) {cc.log("head parent is null error"); return;}
        
        let oldHead = parent.getChildByName("sinaCommonHeadNode")
        if (oldHead) {
            oldHead.removeFromParent()
            oldHead = null
        }

        let fullUrl = headUrl
        if (fullUrl.indexOf("http") < 0) {
            fullUrl = Sina_Config.HEAD_URL + headUrl
        }
        
        fullUrl = SDKManager.getInstance().isWxHeaUrl(fullUrl)
        // cc.log("fullUrl:", fullUrl)

        let prefabUrl = "head/Head"
        cc.loader.loadRes(prefabUrl, function(error, headPrefab){
            if (error) { cc.log( '载入head预制资源失败, 原因:' + error); return; }

            let headNode = cc.instantiate(headPrefab)
            headNode.name = "sinaCommonHeadNode"
            parent.addChild(headNode, 1)
            headNode.setPosition(0, 0)
            headNode.setScale(diameter/headNode.getContentSize().width)

            if (headUrl && headUrl != "" && headUrl != " ") {
                let headIcon:cc.Node = headNode.getChildByName("headIcon")
                headIcon.active = false
                let headIconBg:cc.Node = headNode.getChildByName("headIconbg") //解决微薄透明图问题
                headIconBg.active = false;

                cc.loader.load(fullUrl, function (err, tex) {
                    headIcon.active = true
                    headIconBg.active = true;
                    if (err) {cc.log("load head img error, ", err); return;}
                    if (!(tex instanceof cc.Texture2D)) {cc.log("load head img type error!"); return;}
                    headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex)
                    headIcon.setScale(headNode.getContentSize().width/headIcon.getComponent(cc.Sprite).spriteFrame.getOriginalSize().width)
                });
            }
        })
    }

    public static singleton:GamesCommonLogic;
    public static getInstance(): GamesCommonLogic{
        if(!this.singleton){
            this.singleton = new GamesCommonLogic();
        }
        return this.singleton;
    }
}
