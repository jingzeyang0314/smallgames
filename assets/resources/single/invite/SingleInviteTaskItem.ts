import MKUtils from "../../../Script/common/MKUtils";
import { InviteTaskVo } from "../../../Script/network/gameProtocols/singleGameProtocol";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import DataManager from "../../../Script/data/DataManager";

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
export default class SingleInviteTaskItem extends cc.Component {

    @property(cc.Label)
    gemNumLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    proLabel: cc.Label = null;

    @property(cc.Button)
    getButton: cc.Button = null;

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    taskData:InviteTaskVo = null

    WX_ThreeKingFun_4ghryuh5347hh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {
        this.initUI()
    }

    WX_ThreeKingFun_gtg43574h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {}

    WX_ThreeKingFun_45rg64tgh48() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    initUI() {
        this.getButton.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            if (this.getButton.interactable && this.taskData && this.taskData.Flag == 1) {
                this.getButton.interactable = false
                SingleGameLogic.getInstance().getInviteReward(this.taskData.TypeId, function(data){
                    this.getButton.interactable = false
                }.bind(this), function(){
                    this.getButton.interactable = true
                })
            } else {
                MKUtils.errorTips("没有新的奖励，暂不可领取")
            }
        }.bind(this), this)
        MKUtils.btnEffect1(this.getButton.node)
    }

    WX_ThreeKingFun_eg46743867hh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    setData(data:InviteTaskVo) {
        this.taskData = data
        this.gemNumLabel.string = "x" + data.Count
        this.nameLabel.string = this.getTaskInfo(data.TypeId)
        this.proLabel.string = "" + data.NowCount + "/" + data.Max
        this.getButton.interactable = data.Flag == 1
    }

    WX_ThreeKingFun_56434fr3gteh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    getTaskInfo(typeId) {
        let gameId = DataManager.getInstance().curGameID
        let gameJson = DataManager.getInstance().getGameJsonById(gameId)
        if (gameJson && gameJson["inviteTaskConfig"]) {
            return gameJson["inviteTaskConfig"][typeId] || ""
        } else {
            return ""
        }
    }

    WX_ThreeKingFun_frg4t838g7te() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
