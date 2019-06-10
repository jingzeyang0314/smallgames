import MKUtils from "../../../Script/common/MKUtils";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import { SCSingleGameInviteInfo, InvitePlayerVo } from "../../../Script/network/gameProtocols/singleGameProtocol";
import DataManager from "../../../Script/data/DataManager";
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
export default class SingleInviteScript extends cc.Component {

    @property(cc.Sprite)
    blackBg: cc.Sprite = null

    @property(cc.Sprite)
    closeBtn: cc.Sprite = null

    @property(cc.Sprite)
    inviteBtn: cc.Sprite = null

    @property(cc.ScrollView)
    playerScrollView: cc.ScrollView = null

    @property(cc.ScrollView)
    taskScrollView: cc.ScrollView = null

    @property(cc.Prefab)
    playerItemPrefab: cc.Prefab = null

    @property(cc.Prefab)
    taskItemPrefab: cc.Prefab = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    WX_ThreeKingFun_4freg327t8nhh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {
        this.initUI()
        SingleGameLogic.getInstance().getInviteInfo(function(data){
            this.refreshView(data)
        }.bind(this))
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))

        this.node.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(()=>{
            SDKManager.getInstance().createBannerAd(2)
        }, this.node)))
    }

    WX_ThreeKingFun_ferg99925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onDestroy() {
    }

    start () {

    }

    WX_ThreeKingFun_tgbheht5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
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

        this.inviteBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            SDKManager.getInstance().shareAppMessage()
        }.bind(this), this)
        MKUtils.btnEffect1(this.inviteBtn.node)
    }

    WX_ThreeKingFun_fethgrejytuyjh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    refreshView(data:SCSingleGameInviteInfo) {
        let players = []
        for (let i = 0; i < 30; i++) {
            let playerInfo = data.PlayerList[i] || null
            let item = this.createPlayerItem(playerInfo)
            this.playerScrollView.content.addChild(item)
            players.push(item)
        }
        if (players.length > 0) {
            this.playerScrollView.content.setContentSize(players[0].getContentSize().width*30, this.playerScrollView.content.getContentSize().height)
        }

        let items = []
        for (let i = 0; i < data.TaskList.length; i++) {
            let item = cc.instantiate(this.taskItemPrefab)
            item.getComponent("SingleInviteTaskItem").setData(data.TaskList[i])
            this.taskScrollView.content.addChild(item)
            items.push(item)
        }
        if (items.length > 0) {
            this.taskScrollView.content.setContentSize(this.taskScrollView.content.getContentSize().width, items[0].getContentSize().height*data.TaskList.length)
        }
    }

    WX_ThreeKingFun_teghthy6rwt() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    createPlayerItem(data:InvitePlayerVo) {
        let item = cc.instantiate(this.playerItemPrefab)
        if (data) {
            item.getChildByName("levelLabel").active = true
            if (DataManager.getInstance().curGameID == 45) {
                item.getChildByName("levelLabel").getComponent(cc.Label).string = "" + data.MaxLevel + "m"
            } else {
                item.getChildByName("levelLabel").getComponent(cc.Label).string = "第" + data.MaxLevel + "关"
            }
            let headUrl = data.Photo
            if (headUrl && headUrl != "") {
                let image = SDKManager.getInstance().createImage();
                image.onload = () => {
                    let texture = new cc.Texture2D();
                    texture.initWithElement(image);
                    texture.handleLoadedTexture();

                    let head = new cc.Node()
                    let headSprite = head.addComponent(cc.Sprite)
                    headSprite.spriteFrame = new cc.SpriteFrame(texture);

                    head.setScale(110/head.getContentSize().width)
                    item.getChildByName("headNode").addChild(head)
                };
                image.src = headUrl;
            } else {
                item.getChildByName("defaultHead").active = true
            }
        }
        item.getChildByName("levelLabel").zIndex = 2
        return item
    }

    WX_ThreeKingFun_gtehgrwh485h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
