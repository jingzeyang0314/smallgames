/**
 * Author: Ma yuan
 * Date: 2018.5.22
 * CopyRight:
 * 通用游戏数据
 */

import { Configs } from "./configsFile";
import { Sina_Config } from "./configsFile"
import {UserData} from "./UserData";
import {GameListV, ItemReturn, SCSignInfo, SCRotateNotice, SCLoginRet, SCEnterGame, SCBigWheelInfo, SCBigWheelGain} from "../network/Protocol";import {PlayerData} from "../../home/Common/common_Script/GameData";
import {GameResultData} from "../../home/Common/common_Script/GameData"
import EventDispath from "../event/Event"
import {EventIDS} from "../event/EvenID";
import MKUtils from "../common/MKUtils";
import Constant from "../common/Constant";
import LogicController from "../logic/LogicController";

export default class DataManager {


    constructor(){
        this.configs = {};        
        this.userData = new UserData();
        this.gameLst = new Array<GameListV>();  
        this.playerData = new PlayerData();  
        this.resultData = new GameResultData();     
        this.signInfo = new SCSignInfo();

        this.wheelInfo = new SCBigWheelInfo();
        this.wheelGainInfo = new SCBigWheelGain();
    }

    public initData(): void{
        cc.log("DataManager --- initData");
        this.initGameType()
        this.initSmallGameId()

        let arr = Object.keys(Configs);
        for (let i = 0; i < arr.length; i++) {
            let jsonFile = Configs[arr[i]];
            this.loadConfig(jsonFile);
        }
    }

    WX_ThreeKingFun_qinb44b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public initGameType() {
        let gameType = MKUtils.getUrlParamByName("gameType")
        if (gameType) {
            gameType = parseInt(gameType)
            if (gameType == 8) {
                Sina_Config.GameType = Constant.GameType.WB_WALLET 
            } else if (gameType == 9) {
                Sina_Config.GameType = Constant.GameType.WB_WYX
            } else if (gameType == 10) {
                Sina_Config.GameType = Constant.GameType.WB_TASK
            }
        }
        cc.log("initGameType --- Sina_Config.GameType:", Sina_Config.GameType)
    }

    public initSmallGameId() {
        let smallGameID = MKUtils.getUrlParamByName("gameId")
        if (smallGameID) {
            smallGameID = parseInt(smallGameID)
            Sina_Config.SmallGameId = smallGameID
        }
        cc.log("initSmallGameId --- Sina_Config.SmallGameId:", Sina_Config.SmallGameId)
    }

    public downCommonConfig(successCallback) {
        DataManager.getInstance().loadGameJson("commonConfig", function() {
            cc.log("downCommonConfig success")
            if (successCallback) {
                successCallback()
            }
        }.bind(this))
    }

    public getCommonConfig() {
        return DataManager.getInstance().getGameJson("commonConfig")
    }

    public getCommonConfigByItem(item) {
        let commonConfig = DataManager.getInstance().getCommonConfig()
        if (commonConfig && commonConfig[item] != undefined) {
            return commonConfig[item]
        } else {
            return null
        }
    }

    WX_ThreeKingFun_qinb44bv() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    // 读取配置表
    public loadConfig(name, folder?) {
        var fileName = name ;
        var data = this.configs[fileName];
        if(data != undefined) {
            return;
        }
        if(!folder) folder = "home/configs/";
        var jsonFile = folder + fileName;
        cc.loader.loadRes(jsonFile, (error, jsonData)=>{
            if(error) {
                cc.log(error);
            } else {
                //cc.log("loadConfig json data = ", jsonData);
                this.configs[name] = jsonData.json;      
                this.checkFinishConfig()
            }            
        });
    }

    public checkFinishConfig() {
        let arr = Object.keys(Configs);
        for (let i = 0; i < arr.length; i++) {
            let jsonFile = Configs[arr[i]];
            if (!this.configs[jsonFile]) {
                return false
            }
        }
        DataManager.getInstance().downCommonConfig(function(){
            EventDispath.getInstance().send(EventIDS.CMD_LOAD_CONFIG_SUCCESS)
        }.bind(this))
        return true
    }

    WX_ThreeKingFun_qinb44b2() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //下载小游戏的json文件
    public loadGameJson(name, callback:Function) {
        if (this.gameJson[name]) {
            callback()
            return
        }

        let fullUrl =  Sina_Config.JSON_SERVER_URL + name + ".json"
        cc.loader.load(fullUrl, function (error, jsonData) {
            if(error) {
                cc.log("loadGameConfig ERROR! name:", name, ", ", error);
            } else {
                cc.log("loadConfig json data = ", jsonData);
                this.gameJson[name] = jsonData;   
                cc.log("loadConfig json success! name:", name, ", json:", this.gameJson[name]);  
                callback()
            } 
        }.bind(this));
    }

    public getGameJson(name) {
        return this.gameJson[name]
    }

    public getGameJsonById(gameId) {
        let config = DataManager.getInstance().getGameConfig(gameId)
        if (config && config["jsonData"] && config["jsonData"] != "") {
            return this.getGameJson(config["jsonData"])
        }
        return null
    }
    WX_ThreeKingFun_qinb44bnn() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public getGameConfig(gameId) {
        return this.configs[Configs.GameLst][gameId]
    }

    public setIsLoading(value) {
        this.isLoading = value;
    }

    public getIsLoading() {
        return this.isLoading;
    }

    public setNetState(state:boolean) {
        this.netState = state;
    }

    public getNetState() {
        return this.netState;
    }

    public getuserData() {
        return this.userData;
    }

    public setHomeShowBroad(info) {
        this.isHomeShowBroad = info;
    }

    public getHomeShowBroad () {
        return this.isHomeShowBroad;
    }

    WX_ThreeKingFun_qinb454b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public setWheelEnterState() {
        this.isWheelEnter = true;
    }

    public isWheelEnterState() {
        return this.isWheelEnter;
    }

    public getWheelEnterState() {
        let temp = this.isWheelEnter;
        this.isWheelEnter = false;
        return temp;
    }

    public setUserData(scLogin:SCLoginRet) {
        this.userData.Account = scLogin.Account;
        this.userData.Address = scLogin.Address;
        this.userData.Gender = scLogin.Gender;
        this.userData.HeadImgPath = scLogin.HeadImgPath;
        this.userData.Name = scLogin.Name;
        this.userData.Password = scLogin.Password;
        this.userData.StatusID = scLogin.StatusID;
        this.userData.PlatformID = scLogin.PlatformID;
        this.userData.HttpCode = scLogin.HttpCode;
        this.userData.playerFlag = scLogin.playerFlag;
        this.userData.credit = scLogin.credit;
        this.userData.wbAdCount = parseInt(scLogin.Password)
        cc.log("setUserData --- ", this.userData)
    }

    WX_ThreeKingFun_qinb44hhb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public setUserData2(enterGame:SCEnterGame) {
        this.userData.StatusID = enterGame.StatusID;
        this.userData.GiftNum = enterGame.GiftNum;
        this.userData.Level  = enterGame.Level;
        this.userData.CoinNum = enterGame.CoinNum;
        this.userData.NowExp = enterGame.NowExp;
        this.userData.NextExp = enterGame.NextExp;
        this.userData.Title = enterGame.Title;
    }

    public setWbAdCount(count) {
        this.userData.wbAdCount = count
        cc.log("setWbAdCount --- ", this.userData.wbAdCount)
    }

    public getWbAdCount() {
        return this.userData.wbAdCount
    }

    public getGameItemInfo(gameID){
        for (var i = 0; i <this.gameLst.length; i++ ) {
           if(gameID == this.gameLst[i].ID) {
                return this.gameLst[i];
           }
        }
        return null; 
    }

    //判断是否有新游戏标签
    public getIsNew(gameID:number) {
        for(let i = 0; i <Constant.NewGameIds.length; i++) {
            if (gameID == Constant.NewGameIds[i]) {
                return true;
            }
        }
        return false;
    }

    WX_ThreeKingFun_qinb44mjb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //判断是否有火爆游戏标签
    public getIsHot(gameID:number) {
        for(let i = 0; i < Constant.HotGameIds.length; i++) {
            if (gameID == Constant.HotGameIds[i]) {
                return true;
            }
        }
        return false;
    }

    public setGameLst(lst) {
        this.gameLst = lst;

        let showGameIds;
        if (Sina_Config.GameType == Constant.GameType.WB_TASK || Sina_Config.GameType == Constant.GameType.WB_WALLET) {
            showGameIds = Constant.ShowGameIds_WBTASK
        } else {
            showGameIds = Constant.ShowGameIds_OTHER
        }

        let len = this.gameLst.length
        for (let i = len-1; i >= 0; i--) {
            let haveId = false
            for (let j = 0; j < showGameIds.length; j++) {
                if (this.gameLst[i].ID == showGameIds[j]) {
                    haveId = true
                    break
                }
            }
            if (!haveId) {
                this.gameLst.splice(i, 1)
            }
        }

        this.refreshOnlineNum()
    }

    WX_ThreeKingFun_qinb44324b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public refreshOnlineNum() {
        for (let i = 0; i < this.gameLst.length; i++) {
            if (this.gameLst[i].onlineNum <= 0) {
                let config = this.getGameConfig(this.gameLst[i].ID)
                if (config && config["onlineIds"] && config["onlineIds"] != "") {
                    let onlineIds = config["onlineIds"].split("_")
                    let onlineNum = 0
                    let addNum = 0
                    for (let j = 0; j < onlineIds.length; j++) {
                        let gameInfo = this.getGameInfo(parseInt(onlineIds[j]))
                        if (gameInfo != null) {
                            onlineNum = onlineNum + gameInfo.onlineNum
                            addNum = addNum + 1
                        }
                    }
                    if (addNum > 0) {
                        onlineNum = Math.floor(onlineNum / addNum)
                    }
                    onlineNum = onlineNum + MKUtils.randomNM(0, 200)
                    if (onlineNum <= 0) {onlineNum = 0}
                    this.gameLst[i].onlineNum = onlineNum
                    cc.log("onlineNum---", this.gameLst[i].ID, ", ", this.gameLst[i].onlineNum)
                }
            }
        }
    }

    public getGameInfo(id:number) {
        for (let i = 0; i < this.gameLst.length; i++) {
            if (id == this.gameLst[i].ID) {
                return this.gameLst[i]
            }
        }
        return null
    }

    WX_ThreeKingFun_qinb4qq4b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public setSignInfo (info) {
        this.signInfo = info;
    }

    public getSignInfo () {
        return this.signInfo;
    }

    public setWheelInfo (info) {
        this.wheelInfo = info;
    }

    public getWheelInfo () {
        return this.wheelInfo;
    }

    public setWheelGainInfo (info) {
        this.wheelGainInfo = info;
    }

    public getWheelGainInfo () {
        return this.wheelGainInfo;
    }

    WX_ThreeKingFun_qin234b44b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public getGameLst () {
        return this.gameLst;
    }

    public getPlayerData () {
        return this.playerData;
    }

    public setPlayerData (data) {
         this.playerData = data;
    }

    public getResultData () {
        return this.resultData;
    }

    public setResultData (data) {
         this.resultData = data;
    }
    
    public setMaintenance(data) {
        this.mMaintence = data;
    }

    public getMaintenance() {
        return this.mMaintence;
    }

    WX_ThreeKingFun_qinb44ewwb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public setSeveceID(value) {
        cc.log("收到数据，保存等待处理---", value)
        this.seveceID = value;
    }

    public getSeveceID() {
        return this.seveceID;
    }

    public setHotGameID (ID) {
        this.hotGameID = ID;
    }

    public getHotGameID () {
        return this.hotGameID;
    }

    //获取我的最爱游戏id，第一个为次数最多的，第23分别为最近玩的游戏
    public getLoveIds() {
        let ids = []
        let maxCountId = this.getMaxGameCountId()
        if (maxCountId > 0) {
            ids.push(maxCountId)

            let lastIds = this.readLastGameIds()
            for (let i = 0; i < lastIds.length; i++) {
                if (lastIds[i] != maxCountId) {
                    ids.push(lastIds[i])
                    if (ids.length >= 3) {
                        break
                    }
                }
            }
        }
        if (ids.length < 3) {
            ids = []
        }
        return ids
    }

    WX_ThreeKingFun_qinbrw44b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //记录游戏玩的次数
    public addGameCount(id) {
        this.recordLastGameId(id)
        let gameCount = this.readGameCountData()
        let haveWrite = false
        for (let i = 0; i < gameCount.length; i++) {
            if (gameCount[i].id == id) {
                gameCount[i].count = gameCount[i].count + 1
                haveWrite = true
                break
            }
        }
        if (!haveWrite) {
            gameCount.push({id:id, count:1})
        }
        this.writeGameCountData(gameCount)
        
        let maxCountId = this.getMaxGameCountId()
        if (maxCountId > 0) {
            LogicController.getInstance().miniLoveGameSyn("" + maxCountId)
        }
    }

    public getMaxGameCountId() {
        let gameCount = this.readGameCountData()
        let maxId = 0
        let maxCount = 0
        for (let i = 0; i < gameCount.length; i++) {
            if (gameCount[i].count > maxCount) {
                maxId = gameCount[i].id
                maxCount = gameCount[i].count
            }
        }
        return maxId
    }

    WX_ThreeKingFun_qinb44hgb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    writeGameCountData(gameCount) {
        let str = ""
        for (let i = 0; i < gameCount.length; i++) {
            let id = gameCount[i].id
            let count = gameCount[i].count
            str = str + id + "_" + count
            if (i != gameCount.length-1) {
                str = str + ","
            }
        }
        cc.log("writeGameCountData ", str, ", ", gameCount)
        cc.sys.localStorage.setItem("SmallGameCountData", str)
    }

    readGameCountData() {
        let str = cc.sys.localStorage.getItem("SmallGameCountData")
        if (!str) {str = ""}
        let gameCountStr = str.split(",")
        let gameCount = []
        for (let i = 0; i < gameCountStr.length; i++) {
            if (gameCountStr[i] && gameCountStr[i] != "") {
                let id = parseInt(gameCountStr[i].split("_")[0])
                let count = parseInt(gameCountStr[i].split("_")[1])
                gameCount.push({id:id, count:count})
            }
        }
        cc.log("readGameCountData gameCount:", gameCount)
        return gameCount
    }

    //记录最近玩过的游戏id
    recordLastGameId(id) {
        let lastIds = this.readLastGameIds()
        for (let i = 0; i < lastIds.length; i++) {
            if (id == lastIds[i]) {
                lastIds.splice(i, 1)
                break
            }
        }
        lastIds.splice(0, 0, id)
        this.writeLastGameIds(lastIds)
    }

    WX_ThreeKingFun_qinb44nhhhb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    writeLastGameIds(lastIds) {
        let str = ""
        for (let i = 0; i < lastIds.length; i++) {
            let id = lastIds[i]
            str = str + id
            if (i != lastIds.length-1) {
                str = str + ","
            }
        }
        cc.log("writeLastGameIds ", str, ", ", lastIds)
        cc.sys.localStorage.setItem("SmallGameLastPlayIds", str)
        if (!MKUtils.isWXGame()) {
            MKUtils.setCookie("SmallGameLastPlayIds", str)
        }
    }

    WX_ThreeKingFun_qinnnb44b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    readLastGameIds() {
        let str = cc.sys.localStorage.getItem("SmallGameLastPlayIds")
        if (!str) {str = ""}
        let lastIdsStr = str.split(",")
        let lastIds = []
        for (let i = 0; i < lastIdsStr.length; i++) {
            if (lastIdsStr[i] && lastIdsStr[i] != "") {
                let id = parseInt(lastIdsStr[i])
                if (id && id > 0) {
                    lastIds.push(id)
                }
            }
        }
        cc.log("readLastGameIds gameCount:", lastIds)
        return lastIds
    }
    WX_ThreeKingFun_qinb44bew() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    private static ins:DataManager;
    public static getInstance(): DataManager{ 
        if(!this.ins){
            this.ins = new DataManager();
        }
        return this.ins;
    }
}

