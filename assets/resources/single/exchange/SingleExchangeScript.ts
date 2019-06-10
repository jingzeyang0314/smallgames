import { CSSingleExchangeInfo, SCSingleExchangeInfo, CSSingleExchange, SCSingleExchange } from "../../../Script/network/gameProtocols/singleGameProtocol";
import DataManager from "../../../Script/data/DataManager";
import { HttpHelper } from "../../../Script/network/HttpHelper";
import { PacketID } from "../../../Script/network/PacketID";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import MKUtils from "../../../Script/common/MKUtils";

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
export default class SingleExchangeScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Label)
    gemLabel:cc.Label = null

    @property(cc.Sprite)
    close:cc.Sprite = null

    @property(cc.Button)
    creditButton:cc.Button = null

    @property(cc.Label)
    creditLabel:cc.Label = null

    @property(cc.Label)
    curCreditLabel:cc.Label = null

    @property(cc.Button)
    adButton:cc.Button = null

    data:SCSingleExchangeInfo = null
    isExchange:number = 0 //是否在过程中

    onLoad () {
        this.node.opacity = 0
        this.initUI()
        this.getExchangeInfo()
    }

    start () {}

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())
        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.close.node.on(cc.Node.EventType.TOUCH_END, function(e){
            // cc.audioEngine.play(this.allSound[0], false, 1)
            this.node.removeFromParent()
        }.bind(this), this)
        MKUtils.btnEffect1(this.close.node)

        this.creditButton.node.on(cc.Node.EventType.TOUCH_END, function(e){
            // cc.audioEngine.play(this.allSound[0], false, 1)
            if (this.data.Credit >= this.data.PayVredit) {
                this.exchangeGem(2)
            } else {
                MKUtils.errorTips("积分不足")
            }
        }.bind(this), this)
        MKUtils.btnEffect1(this.creditButton.node)

        this.adButton.node.on(cc.Node.EventType.TOUCH_END, function(e){
            // cc.audioEngine.play(this.allSound[0], false, 1)
            SingleGameLogic.getInstance().getReward(function(){
                this.exchangeGem(1)
            }.bind(this), function(){
            }.bind(this))
        }.bind(this), this)
        MKUtils.btnEffect1(this.adButton.node)
    }

    refreshUI() {
        if (this.data) {
            this.gemLabel.string = "x" + this.data.Gem
            this.creditLabel.string = "" + this.data.PayVredit + "积分"
            this.curCreditLabel.string = "剩余" + this.data.Credit + "积分"
        } else {

        }
    }

    getExchangeInfo() {
        let value = new CSSingleExchangeInfo()
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        cc.log("getExchangeInfo---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_ID, this.getExchangeInfoSuccess.bind(this), this.getExchangeInfoFailed.bind(this));
    }

    getExchangeInfoSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            cc.log("getExchangeInfoSuccess---data null")
            return;
        }
        let protocol = new SCSingleExchangeInfo()
        protocol.unPack(data)
        cc.log("getExchangeInfoSuccess---", protocol)
        this.data = protocol
        this.refreshUI()
        this.node.opacity = 255
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))
    }

    getExchangeInfoFailed(states) {
        cc.log("getExchangeInfoFailed---")
    }

    exchangeGem(exchangeType) { //看视频1，积分兑换2
        if (this.isExchange > 0) {return}
        this.isExchange = exchangeType
        let value = new CSSingleExchange()
        value.Code = DataManager.getInstance().getuserData().HttpCode;
        value.GameId = DataManager.getInstance().curGameID
        value.ExchangeType = exchangeType
        value.Platform = 4
        cc.log("exchangeGem---", value)
        HttpHelper.sendHttpData(value, PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_ID, this.exchangeGemSuccess.bind(this), this.exchangeGemFailed.bind(this));
    }

    exchangeGemSuccess(states, data:ArrayBuffer) {
        if (data == null || data == undefined ) {
            this.isExchange = 0
            cc.log("exchangeGemSuccess---data null")
            return;
        }
        let protocol = new SCSingleExchange()
        protocol.unPack(data)
        cc.log("exchangeGemSuccess---", protocol)
        DataManager.getInstance().setWbAdCount(protocol.WbAdCount)
        this.data.Credit = protocol.Credit
        DataManager.getInstance().getuserData().setUserCreditNum(protocol.Credit)
        this.isExchange = 0
        this.refreshUI()
        SingleGameLogic.getInstance().addGem(protocol.Gem)
        SingleGameLogic.getInstance().showReward(protocol.Gem)
    }

    exchangeGemFailed(states) {
        this.isExchange = 0
        cc.log("exchangeGemFailed---")
    }
}
