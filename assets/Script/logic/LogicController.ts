/**
 * Author: Ma yuan
 * Date: 2018.11.1
 * CopyRight:
 * 大厅通用
 */

import EventDispath from "../Event/Event";
import {EventIDS} from "../event/EvenID";
import { CSLogin, SCLoginRet, CSEnterGame, SCEnterGame, CSGameList, SCGameListRet, CSFindPlayer, SCNoticePlayersOnline, CSSignInfo,CSDailySign, SCDailySign,SCSignInfo, CSRescuesInfo, SCRescuesInfo, CSRescuesGoin, SCRescuesGoin, CSBigWheelInfo, CSBigWheelGain, SCBigWheelInfo, SCBigWheelGain, BigWheelVo, CSMiniGameLove, SCMiniGameLove, CSCredit, SCCredit} from "../network/Protocol";
import { HttpHelper } from "../network/HttpHelper";
import {PacketID} from "../network/PacketID";
import {Sina_Config, Configs} from "../data/configsFile";
import DataManager from "../data/DataManager";
import { Md5 } from "../../libs/md5/md5";
import SocketManager from "./ScoketManager";
import HeartBeat from "./HeartBeat";
import GamesCommonLogic from "./GamesCommonLogic"
import MKUtils from "../common/MKUtils";
import Constant from "../common/Constant";
import SDKManager from "./SDKManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LogicController extends cc.Component{
    
    m_socket:SocketManager = null;
    m_hearBeat:HeartBeat = null;
    m_gameLogin:GamesCommonLogic = null;
    m_isDPReConnect:boolean = false; //是否需要重连龙虎斗游戏
    m_reconnectNum:number = 0;
    m_reconnectMax : number = 3;
    m_schedule : cc.Scheduler = null;

    haveGetSignInfo:boolean = false //是否已经请求过签到数据
    haveDealSign:boolean = false //是否已经处理过签到功能，签到和救济金不同时显示

    socketErrorNodeName:string = "SocketConnectError"

    constructor() {
        super();
        this.m_socket = SocketManager.getInstance();
        this.m_hearBeat = new HeartBeat();
        this.m_gameLogin = GamesCommonLogic.getInstance();       
        this.m_schedule = cc.director.getScheduler(); 

        EventDispath.getInstance().addEventListener(EventIDS.CMD_TCP_CONNECT_SUCCESS, this.tcpConnectSuccess, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_TCP_CLOSED, this.onTcpClose, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_TCP_CONNECT_ERROR, this.showNetError, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_HEART_BEAT_TIMEOUT, this.showNetError, this);
        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_EnterGameID).toString(), this.onEnterGame, this);

        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_CutLineID).toString(), this.onServerCutLine, this);   
        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_NoticePlayersOnlineRetID).toString(), this.onNoticePayersOnlineRetID, this);           
        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_RotateNoticeID).toString(), this.onRotateNotice, this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_SHOW_BROADCAST, this.showBroad.bind(this), this);
    }

    public static singleton:LogicController;

    public static getInstance(): LogicController{
        if(!this.singleton){
            this.singleton = new LogicController();
        }
        return this.singleton;
    }

    WX_ThreeKingFun_we43s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    // -------------------------登录-------------------------
    sendHttplogin() {
        let params = this.getLoginParams()

        let csLogin = new CSLogin();
        csLogin.Code = 0;
        csLogin.GameID = Sina_Config.GameAppID;
        csLogin.GameVersion = "4";
        csLogin.VersionName = "";
        csLogin.Devices = params["Devices"] || "";
        csLogin.Passwd = "";
        csLogin.IMEI = params["IMEI"] || "";
        csLogin.sourse = 1; //0:默认socket， 1 websocket 

        csLogin.GameType = params["GameType"] || 1;
        csLogin.ChannelID = params["ChannelID"] || "1001";
        csLogin.PlatformID = params["PlatformID"] || 1;
        csLogin.Token = params["Token"] || "";
        csLogin.UnionID = params["UnionID"] || "";
        csLogin.Account = params["Account"] || this.getDefaultId();

        let str = "versionName=" + csLogin.VersionName + "&channelId=" + csLogin.ChannelID + "&mobileInfo=" + csLogin.Devices + "&platform=" + csLogin.PlatformID + "&account=" + csLogin.Account;
        csLogin.Md5msg = Md5.hashStr(str) + "";
        cc.log("sendHttplogin --- start, ", csLogin.Account)
        cc.log("sendHttplogin --- csLogin ", csLogin)
        HttpHelper.sendHttpData(csLogin, PacketID._SINA_PACKET_CS_Login_ID, this.onLoginSuccess.bind(this), this.onLoginFailed.bind(this));
    }

    getDefaultId() {
        let randomId = ""
        if (Sina_Config.SINA_DEBUG_ACCOUNT) {
            randomId = "" + MKUtils.getCurOsTime() + "" + MKUtils.randomNM(1, 1000)
        }
        return Sina_Config.SINA_WINACCOUNT + randomId
    }

    WX_ThreeKingFun_wewqs() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getLoginParams() {
        let params = {}
        if (Sina_Config.GameType == Constant.GameType.WB_TASK || Sina_Config.GameType == Constant.GameType.WB_WYX || Sina_Config.GameType == Constant.GameType.WB_WALLET) {
            let urlParams = MKUtils.getUrlParams()
            params["GameType"] = parseInt(urlParams["gameType"])
            params["ChannelID"] = urlParams["channelid"]
            params["PlatformID"] = parseInt(urlParams["platformId"])
            params["Token"] = urlParams["access_token"]
            params["UnionID"] = urlParams["uid"]
            params["Account"] = urlParams["uid"]
        } else if (Sina_Config.GameType >= Constant.GameType.WX_XYX) {
            let loginParams = SDKManager.getInstance().getLoginParams()
            let loginConfig = SDKManager.getInstance().getLoginConfig()[Sina_Config.SmallGameId]
            params["GameType"] = loginConfig.GameType
            params["ChannelID"] = loginConfig.ChannelID
            params["PlatformID"] = 5
            params["Token"] = loginParams["access_token"]
            params["UnionID"] = loginParams["openId"]
            params["Account"] = loginParams["openId"]
            params["Devices"] = SDKManager.getInstance().getNickName()
            params["IMEI"] = SDKManager.getInstance().getAvatarUrl()
        }

        cc.log("getLoginParams --- ", params)

        return params
    }

    WX_ThreeKingFun_w323s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onLoginSuccess(states, data : ArrayBuffer) {
        if (data == null || data == undefined) {
            cc.log ("onLoginSuccess data null");
            return;
        }

        let scLogin = new SCLoginRet();
        scLogin.unPack(data);
        cc.log("onLoginSuccess = ", scLogin)
        console.log("login success status:", scLogin.StatusID)
        Sina_Config.SINA_TCP_SERVER_ADDRESS = scLogin.Address;
        cc.log("Sina_Config.SINA_TCP_SERVER_ADDRESS = ", Sina_Config.SINA_TCP_SERVER_ADDRESS)
        if (scLogin.Address == "39.96.166.45:10001") { //正式服
            Sina_Config.SINA_TCP_SERVER_ADDRESS = "gate1.qp.games.weibo.com:10001"
        } else if (scLogin.Address == "39.96.162.9:10001") {//正式服
            Sina_Config.SINA_TCP_SERVER_ADDRESS = "gate2.qp.games.weibo.com:10001"
        } else if (scLogin.Address == "27.221.32.136:10001") {//测试服
            Sina_Config.SINA_TCP_SERVER_ADDRESS = "g1.qp.games.weibo.com:10001"
        } else if (scLogin.Address == "27.221.32.137:10001") {//测试服
            Sina_Config.SINA_TCP_SERVER_ADDRESS = "g2.qp.games.weibo.com:10001"
        }
        cc.log("Sina_Config.SINA_TCP_SERVER_ADDRESS new = ", Sina_Config.SINA_TCP_SERVER_ADDRESS)
        DataManager.getInstance().setUserData(scLogin)
        DataManager.getInstance().setMaintenance(scLogin.Maintenance);
        if (scLogin.StatusID == 0) {
            EventDispath.getInstance().send(EventIDS.CMD_LOGIN_SUCCESS)
        } else {
            this.checkManintence()
        }
    }

    WX_ThreeKingFun_wens3s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onLoginFailed(states) {
        cc.log("onLoginFailed --- ", states)
        this.showCommonTips("网络异常\r\n 请检查网络后重试", function(){
            this.sendHttplogin()
        }.bind(this), "重试", true)
    }

    // -------------------------socket-------------------------
    connectTcp() {
        cc.log("connectTcp --- start ", Sina_Config.SINA_TCP_SERVER_ADDRESS);
        this.unschedule(this.connectTcpOverTime);
        this.scheduleOnce(this.connectTcpOverTime, 5);
        this.m_socket.Connect(Sina_Config.SINA_TCP_SERVER_ADDRESS);
    }

    //发送进入游戏。
    tcpConnectSuccess() {
        cc.log("tcp Connect Success");
        this.unschedule(this.connectTcpOverTime);
        this.stopReconnect();
        this.m_reconnectNum = 0;
        this.hideWaitingTips();
        DataManager.getInstance().setNetState(true);        

        this.sendEnterGame()
    }

    WX_ThreeKingFun_webbs() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    connectTcpOverTime(dt) {
        cc.log("connect Tcp Over Time, ", dt)
        this.unschedule(this.connectTcpOverTime);
        this.hideWaitingTips();

        if (cc.director.getScene().getChildByName(this.socketErrorNodeName)) {return}
        this.showCommonTips("啊哦，网络开了小差\r\n重试或检查网络", function(){
            this.showWaitingTips()
            this.connectTcp()
        }.bind(this), "重试", true, this.socketErrorNodeName)
    }

    onTcpClose() {
        cc.log("on Tcp Close");
        DataManager.getInstance().setNetState(false);
        this.m_hearBeat.stopHeartBeat();

        //大厅、龙虎斗等自动重连3次，失败则弹框
        //对战小游戏直接弹框提示重连
        //切水果单机小游戏不处理

        let curGameID = DataManager.getInstance().curGameID
        if (curGameID <= 1) {
            this.startTcpReconnect()
        } else {
            let gameConfig = DataManager.getInstance().getGameConfig(curGameID)
            if (gameConfig) {
                let enterType = gameConfig["enterType"]
                if (enterType == Constant.GameEnterType.MATCH) {
                    this.showNetError()
                } else if (enterType == Constant.GameEnterType.DIRECT) {
                    this.m_isDPReConnect = true
                    this.startTcpReconnect()
                } else if (enterType == Constant.GameEnterType.SINGEL) {
                    // this.startTcpReconnect()
                }
            } else {
                this.startTcpReconnect()
            }
        }
    }

    WX_ThreeKingFun_weww3s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //tcp重连
    public startTcpReconnect() {
        cc.log("start Tcp Reconnect");
        this.stopReconnect();
        this.schedule(this.reconnectTcp, 0.5, this.m_reconnectMax, 0);
    }

    reconnectTcp(dt) {
        cc.log("reconnect Tcp")
        this.m_reconnectNum++
        if (this.m_reconnectNum >= (this.m_reconnectMax-1) ) {
            this.unschedule(this.reconnectTcp);
            this.showNetError();
        } else {
            this.connectTcp();
        }
    }

    WX_ThreeKingFun_we4ggg3s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public stopReconnect() {
        this.unschedule(this.reconnectTcp);
    }   

    showNetError() {
        cc.log("show Net Error")
        DataManager.getInstance().setNetState(false);
        this.m_hearBeat.stopHeartBeat();
        this.hideWaitingTips();

        if (this.isInSmallGame(Constant.GameEnterType.SINGEL)) {return} //单机小游戏不需要弹网络异常

        if (cc.director.getScene().getChildByName(this.socketErrorNodeName)) {return}
        this.showCommonTips("啊哦，网络开了小差\r\n重试或检查网络", function(){
            this.retryConnect()
        }.bind(this), "重试", true, this.socketErrorNodeName)
    }

    retryConnect() {
        let sceneName = cc.director.getScene().name
        if (sceneName == "Loading" || sceneName == "Home" || this.isInSmallGame(Constant.GameEnterType.DIRECT)) {
            this.showWaitingTips()
            this.connectTcp()
        } else {
            cc.director.loadScene("Home")
        }
    }

    WX_ThreeKingFun_we4sww3s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    isInSmallGame(type) {
        let curGameID = DataManager.getInstance().curGameID
        if (curGameID > 1) {
            let gameConfig = DataManager.getInstance().getGameConfig(curGameID)
            if (gameConfig) {
                let enterType = gameConfig["enterType"]
                return enterType == type
            }
        }
        return false
    }

    checkTcpConnect() {
        if (!DataManager.getInstance().getNetState()) {
            this.showNetError()
        }
    }

    // -------------------------enter game-------------------------
    sendEnterGame() {
        let value = new CSEnterGame();
        value.GameID = Sina_Config.GameAppID;       
        value.Key =  DataManager.getInstance().getuserData().HttpCode;
        SocketManager.getInstance().send(value.pack(), PacketID._SINA_PACKET_CS_EnterGameID);
    }

    WX_ThreeKingFun_we4eww3s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onEnterGame(data) {
        cc.log("on Enter Game");
        DataManager.getInstance().setUserData2(data)
        this.m_hearBeat.startHeartBeat();

        //重连龙凤斗
        if(this.m_isDPReConnect) {
            EventDispath.getInstance().send(EventIDS.CMD_SEND_DP_NETERROR_RECONNECT);
            this.m_isDPReConnect = false;
            return;
        }
        EventDispath.getInstance().send(EventIDS.CMD_ENTER_GAME_SUCCESS);
    }

    // -------------------------game list-------------------------
    sendGetGameList() {
        cc.log("send Get Game List");
        let value = new CSGameList();
        value.Code = DataManager.getInstance().getuserData().HttpCode;   
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_GAMELISTID, this.onGetGameList);            
    }

    WX_ThreeKingFun_wenddd43s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onGetGameList(states, data : ArrayBuffer) {
        cc.log("on Get Game List");
        if (data == null || data == undefined) {return}

        let value = new SCGameListRet();
        value.unPack(data);
        cc.log("server game list --- ", value)
        DataManager.getInstance().setGameLst(value.gameList);
        EventDispath.getInstance().send(EventIDS.CMD_GET_GAME_LIST_SUCCESS);
    }

    // -------------------------online-------------------------
    //服务器维护踢人消息
    onServerCutLine( data ) {
        cc.log("LogicController   onServerCutLine");        
        EventDispath.getInstance().send(EventIDS.CMD_SERVER_CUT_LINE);  
    }

    
    onNoticePayersOnlineRetID (data) {
        cc.log("LogicController  onNoticePayersOnlineRetID");
        let value = new SCNoticePlayersOnline();
    }
    
    WX_ThreeKingFun_we43bffss() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    // -------------------------common-------------------------
    // 显示维护信息/网络错误
    showNetTips(type) {
        cc.loader.loadRes("home/prefab/NetTip", function(err, prefab){
            if (err) {cc.log("home/prefab/NetTip load error:" + err); return;} 
            var itPre = cc.instantiate(prefab);                    
            let objIt = itPre.getComponent("NetErrorTips");
            if (objIt) {
                objIt.setShowType(type);                    
            }
            cc.director.getScene().addChild(itPre);
        });
    }

    //commonTips
    showCommonTips(tips:string, callback:any=null, btnTips:string="", btnVisible:boolean=true, nodeName:string="") {
        cc.loader.loadRes("home/prefab/ComTips", function (err, prefab) {
            if (err) { cc.log("home/prefab/ComTips load error:" + err); return; }
            var commonTips = cc.instantiate(prefab);
            let objIt = commonTips.getComponent("ComTips");
            if (objIt) {
                objIt.setShowPar(tips, callback, btnTips, btnVisible);
            }
            cc.director.getScene().addChild(commonTips, 9999, nodeName);
        });
    }

    //等待动画
    showWaitingTips() {
        cc.log("show Waiting Tips");
        let node = cc.director.getScene().getChildByName("WAITING_TIPS");
        if (!node) {
            cc.loader.loadRes("home/prefab/Reconnect", function (err, prefab) {
                if (err) { cc.log( '载入prefab/Reconnect预制资源失败, 原因:' + err); return; }
                let tipsNode = cc.instantiate(prefab);        
                if (tipsNode) {
                    cc.director.getScene().addChild(tipsNode, 10000, "WAITING_TIPS");
                }
            });
        }
    }

    WX_ThreeKingFun_weeww43s() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    hideWaitingTips() {
        cc.log("hide Waiting Tips");
        let node = cc.director.getScene().getChildByName("WAITING_TIPS");
        if (node) {
            node.removeFromParent();
        }
    }

    //维护处理
    checkManintence() {
        let stateId = DataManager.getInstance().getuserData().StatusID
        if (stateId != 0) {
            if (stateId == 43) {
                this.showNetTips(1)
            } else {
                this.showCommonTips("登陆失败\r\n 请重试或检查网络", null, "确定", false)
            }
            return true
        }
        return false
    }
    
    // -------------------------sign-------------------------
    setHaveDealSign(have:boolean) {
        this.haveDealSign = have
    }

    getHaveDealSign() {
        return this.haveDealSign
    }

    WX_ThreeKingFun_ewwwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //发送签到信息请求
    sendGetSignInfo() {
        if (!MKUtils.isCreditChannel()) {return}
        if (this.haveGetSignInfo) {return}
        this.haveGetSignInfo = true
        cc.log("send Get Sign Info");

        let commonConfig = DataManager.getInstance().getCommonConfig()
        if (commonConfig && commonConfig["OpenSign"] != undefined) {
            cc.log("checksign --- OpenSign:", commonConfig["OpenSign"])
        }
        if (commonConfig && commonConfig["OpenSign"] != undefined && commonConfig["OpenSign"] > 0) {
            cc.log("get sign info")
            let value = new CSSignInfo();
            value.Code = DataManager.getInstance().getuserData().HttpCode;           
            value.appId = Sina_Config.GameAppID;
            HttpHelper.sendHttpData(value, PacketID.BASIC_SIGN_INFO, this.onGetSignListInfo);
        } else {
            cc.log("not open sign")
        }
    }

    //签到ACK 
    onGetSignListInfo(states, data : ArrayBuffer) {
        if (data == null || data == undefined ) {return}
        let value = new SCSignInfo();
        value.unPack(data);
        cc.log("onGetSignListInfo1", value);
        if (value.StatusID == 1) {
            // 已经签过了直接弹转盘
            cc.log("onGetSignListInfo3");
            LogicController.getInstance().sendGetWheelInfo()
        }
        DataManager.getInstance().setSignInfo(value);
        cc.log("onGetSignListInfo2", value);
        EventDispath.getInstance().send(EventIDS.CMD_GET_SIGN_LIST_SUCCESS);
    }

    WX_ThreeKingFun_ewwtwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //当天签到
    sendDailySign() {
        if (!MKUtils.isCreditChannel()) {return}

        cc.log("LogicController sendDailySign");
        let value = new CSDailySign();

        let user = DataManager.getInstance().getuserData();
        value.Code = user.HttpCode;   

        value.appId = Sina_Config.GameAppID
        HttpHelper.sendHttpData(value, PacketID.BASIC_SIGN_IN, this.onDailySign);            
    }

    //当天签到返回
    onDailySign(states, data : ArrayBuffer) {
        cc.log("LogicController onDailySign");

        let value = new SCDailySign();
        if (data == null || data == undefined ) {
            return;
        }

        value.unPack(data);
        
        let signInfo = DataManager.getInstance().getSignInfo();
        signInfo.hasGet = 1;

        if(value.itemsList.length > 0) {
            //DataManager.getInstance().  
            if (value.itemsList[0].itemId == 1006) {
                var creditNum = DataManager.getInstance().userData.getUserCreditNum();
                DataManager.getInstance().userData.setUserCreditNum(creditNum + value.itemsList[0].itemCt);
                EventDispath.getInstance().send(EventIDS.CMD_REFRESH_COIN);
            }
        }
           
    }

    WX_ThreeKingFun_ew32wwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    // -------------------------大转盘-------------------------
    //假数据
    testData() {
        let value = new SCBigWheelInfo();
        value.count = 3;

        let value1 = new BigWheelVo();
        value1.index = 1;
        value1.type = 1;
        value1.gameId = 0;
        value1.content = 888;
        let value2 = new BigWheelVo();
        value2.index = 2;
        value2.type = 1;
        value2.gameId = 0;
        value2.content = 10;
        let value3 = new BigWheelVo();
        value3.index = 3;
        value3.type = 2;
        value3.gameId = 0;
        value3.content = 0;
        let value4 = new BigWheelVo();
        value4.index = 4;
        value4.type = 1;
        value4.gameId = 0;
        value4.content = 5;
        let value5 = new BigWheelVo();
        value5.index = 5;
        value5.type = 3;
        value5.gameId = 0;
        value5.content = 0;
        let value6 = new BigWheelVo();
        value6.index = 6;
        value6.type = 1;
        value6.gameId = 0;
        value6.content = 20;

        let value7 = new BigWheelVo();
        value7.index = 7;
        value7.type = 2;
        value7.gameId = 0;
        value7.content = 0;
        let value8 = new BigWheelVo();
        value8.index = 8;
        value8.type = 1;
        value8.gameId = 0;
        value8.content = 5;

        value.list.push(value1);
        value.list.push(value2);
        value.list.push(value3);
        value.list.push(value4);
        value.list.push(value5);
        value.list.push(value6);
        value.list.push(value7);
        value.list.push(value8); 

        DataManager.getInstance().setWheelInfo(value);
        EventDispath.getInstance().send(EventIDS.CMD_GET_WHEEL_LIST_SUCCESS);
    }

    //假数据
    testData2() {
        let value = new SCBigWheelGain();
        value.count = 2;
        value.index = 3;
        value.type = 2;
        value.gameId = 38;
        value.content = 5;
        DataManager.getInstance().setWheelGainInfo(value);
        EventDispath.getInstance().send(EventIDS.CMD_GET_WHEEL_GAIN_LIST_SUCCESS);
        cc.log("xx:CMD_GET_WHEEL_GAIN_LIST_SUCCESS");
    }

    //发送转盘信息请求
    sendGetWheelInfo() {
        if (!MKUtils.isCreditChannel()) {return}
        cc.log("send Get Wheel Info");

        let commonConfig = DataManager.getInstance().getCommonConfig()
        if (commonConfig && commonConfig["OpenWheel"] != undefined) {
            cc.log("checksign --- OpenWheel:", commonConfig["OpenWheel"])
        }
        if (commonConfig && commonConfig["OpenWheel"] != undefined && commonConfig["OpenWheel"] > 0) {
            cc.log("get wheel info")
            let value = new CSBigWheelInfo();
            value.Code = DataManager.getInstance().getuserData().HttpCode;           
            HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_INFO, this.onWheelListInfo);
        } else {
            cc.log("not open wheel")
        }
    }

    WX_ThreeKingFun_ewwwhdsws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //转盘内容信息get
    onWheelListInfo(states, data : ArrayBuffer) {
        if (data == null || data == undefined ) {return}
        let value = new SCBigWheelInfo();
        value.unPack(data);
        cc.log("212968:" + value.count);
        if (value.count == 0) {return}
        DataManager.getInstance().setWheelInfo(value);
        cc.log("onGetWheelListInfo", value);
        EventDispath.getInstance().send(EventIDS.CMD_GET_WHEEL_LIST_SUCCESS);
    }

    //点击抽奖
    sendWheelGain() {
        cc.log("212968:sendWheelGain-----------------------------");
        if (!MKUtils.isCreditChannel()) {return}
        cc.log("212968:sendWheelGain1-----------------------------");
        cc.log("send Get Sign Info");

        let value = new CSBigWheelGain();
        value.Code = DataManager.getInstance().getuserData().HttpCode;    
        cc.log("212968:HttpCode-----------------------------:" + value.Code);       
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_GAIN, this.onWheelGain);
    }

    WX_ThreeKingFun_ewwwbbws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //抽奖返回
    onWheelGain(states, data : ArrayBuffer) {
        cc.log("onGetWheelGainInfo0");
        if (data == null || data == undefined ) {return}
        let value = new SCBigWheelGain();
        cc.log("onGetWheelGainInfo1", value);
        value.unPack(data);
        cc.log("onGetWheelGainInfo2", value);
        DataManager.getInstance().setWheelGainInfo(value);
        EventDispath.getInstance().send(EventIDS.CMD_GET_WHEEL_GAIN_LIST_SUCCESS);
    }

    // -------------------------救济金-------------------------
    checkRescues() {
        let commonConfig = DataManager.getInstance().getCommonConfig()
        if (commonConfig && commonConfig["RescuesMinCredit"] != undefined) {
            cc.log("checkRescues --- minCredit:", commonConfig["RescuesMinCredit"])
        }
        if (commonConfig && commonConfig["RescuesMinCredit"] != undefined && MKUtils.isCreditChannel() && DataManager.getInstance().userData.getUserCreditNum() < commonConfig["RescuesMinCredit"]) {
            let value = new CSRescuesInfo();
            value.code = DataManager.getInstance().getuserData().HttpCode;
            value.appId = Sina_Config.GameAppID;
            cc.log("checkRescues---", value)
            HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_RESCUES_INFO_ID, this.onRescuesInfo.bind(this));
        } else {
            cc.log("212968:LogicController.getInstance().sendGetWheelInfo()")
            LogicController.getInstance().sendGetWheelInfo()
        }
    }

    WX_ThreeKingFun_ewwwnnws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    onRescuesInfo(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onRescuesInfo---data null")
            return;
        }
        let protocol = new SCRescuesInfo()
        protocol.unPack(data)
        cc.log("onRescuesInfo---", protocol)

        if (protocol.remainCt > 0 && protocol.giveCount > 0) {
            this.getRescues()
        }
    }

    getRescues() {
        let value = new CSRescuesGoin();
        value.code = DataManager.getInstance().getuserData().HttpCode;
        value.appId = Sina_Config.GameAppID;
        cc.log("getRescues---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_RESCUES_GOIN_ID, this.onGetRescues.bind(this));
    }

    WX_ThreeKingFun_ewwrewws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onGetRescues(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("onGetRescues---data null")
            return;
        }
        let protocol = new SCRescuesGoin()
        protocol.unPack(data)
        cc.log("onGetRescues---", protocol)

        if (protocol.stateId == 0) {
            DataManager.getInstance().userData.setUserCreditNum(DataManager.getInstance().userData.getUserCreditNum() + protocol.gainMoney);
            EventDispath.getInstance().send(EventIDS.CMD_REFRESH_COIN)

            let prefabUrl = "rescues/rescues";
            cc.loader.loadRes(prefabUrl, function(errorMessage, loadedResource){
                if (errorMessage) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }

                var prefab = cc.instantiate(loadedResource);
                prefab.setPosition(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
                cc.director.getScene().addChild(prefab, 9)

                let touchSprite:cc.Node = prefab.getChildByName("touchSprite")
                touchSprite.setContentSize(MKUtils.getShowSize())

                let numLabel = prefab.getChildByName("resuesBg").getChildByName("numLabel").getComponent(cc.Label)
                numLabel.string = "+" + protocol.gainMoney + "积分"

                touchSprite.on(cc.Node.EventType.TOUCH_END, function(e){
                    cc.log("领取救济金")
                    LogicController.getInstance().sendGetWheelInfo() // 救济金领取后请求转盘
                    prefab.removeFromParent()
                    prefab = null
                }.bind(this), this)

                MKUtils.playScaleAni(prefab.getChildByName("resuesBg"))
                
                let moneySound:cc.AudioSource = prefab.getComponent(cc.AudioSource)
                cc.audioEngine.play(moneySound.clip, false, 1)
            }.bind(this));
        }
    }

    // -------------------------通知-------------------------
    onRotateNotice(data) {
        DataManager.getInstance().broadCast = data;   
        EventDispath.getInstance().send(EventIDS.CMD_SHOW_BROADCAST);     
    }

    showBroad() {
        if (MKUtils.isWXGameFun()) {return}
        if( DataManager.getInstance().curGameID == 44){

        }else{
            if(DataManager.getInstance().getHomeShowBroad()){
                return;
            }
            MKUtils.showBroad(cc.v2(360,MKUtils.getShowSize().height - 30));
        }   
    }
    WX_ThreeKingFun_ewewwwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //最爱游戏同步
    miniLoveGameSyn(loveStr) {
        let value = new CSMiniGameLove();
        value.Code = DataManager.getInstance().getuserData().HttpCode
        value.Uid = DataManager.getInstance().getuserData().Account
        value.LoveStr = loveStr
        cc.log("miniLoveGameSyn---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_MINI_LOVE_GAME_ID, function(states, data:ArrayBuffer){
            if (data == null || data == undefined ) {
                cc.log("miniLoveGameSyn---data null")
                return;
            }
            let protocol = new SCMiniGameLove()
            protocol.unPack(data)
            cc.log("miniLoveGameSyn---", protocol)
        }.bind(this), function(states){
        }.bind(this));
    }

    //积分同步
    creditSyn() {
        cc.log("creditSyn start")
        // if (!MKUtils.isCreditChannel()) {
        //     cc.log("not isCreditChannel")
        //     return
        // }
        let value = new CSCredit();
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_CREDIT, function(states, data:ArrayBuffer) {
            if (data == null || data == undefined ) {
                cc.log("creditSyn---data null")
                return;
            }
            let protocol = new SCCredit()
            protocol.unPack(data)
            cc.log("creditSyn success---", protocol)
            if (protocol && protocol.StateId == 0) {
                DataManager.getInstance().getuserData().setUserCreditNum(protocol.Count)
                EventDispath.getInstance().send(EventIDS.CMD_REFRESH_COIN)
            }
        }.bind(this), function(states){
            cc.log("creditSyn failed")
        }.bind(this));
    }
}
