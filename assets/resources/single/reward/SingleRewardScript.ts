import MKUtils from "../../../Script/common/MKUtils";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";

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
export default class SingleRewardScript extends cc.Component {

    @property(cc.Sprite)
    blackBg:cc.Sprite = null

    @property(cc.Sprite)
    light:cc.Sprite = null

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Sprite)
    sureBtn:cc.Sprite = null

    @property(cc.Sprite)
    star:Array<cc.Sprite> = []

    @property(cc.Sprite)
    rewardIcon:cc.Sprite = null

    @property({type: cc.AudioClip})
    allSound:Array<cc.AudioClip> = []

    onLoad () {
        this.initUI()
        MKUtils.playBlackBgAct(this.blackBg.node)
        MKUtils.playScaleAni(this.node.getChildByName("baseNode"))
        cc.audioEngine.play(this.allSound[1], false, 1)
    }

    WX_ThreeKingFun_e214fregt1ac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    initUI() {
        this.blackBg.node.setContentSize(MKUtils.getShowSize())

        this.blackBg.node.on(cc.Node.EventType.TOUCH_END, function(e){
        }.bind(this), this)

        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, function(e){
            cc.audioEngine.play(this.allSound[0], false, 1)
            this.node.removeFromParent()
            SingleGameLogic.getInstance().checkActive()
        }.bind(this), this)
        MKUtils.btnEffect1(this.sureBtn.node)

        this.light.node.runAction(cc.repeatForever(cc.rotateBy(5, 360)))
        for (let i = 0; i < this.star.length; i++) {
            this.star[i].node.runAction(cc.repeatForever(cc.rotateBy(3, 360)))
        }
    }

    WX_ThreeKingFun_564ygrt() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    start () {}

    setNum(num) {
        this.numLabel.string = "x" + num
    }

    WX_ThreeKingFun_e25yt64h() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    setArms(armsId) {
        this.rewardIcon.node.rotation = 0
        this.rewardIcon.node.active = false
        this.numLabel.string = "新武器"
        let armsConfig = SingleGameLogic.getInstance().getArmsJsonConfig(armsId)
        MKUtils.loadSpriteFrame(armsConfig["img"], function(spriteFrame){
            this.rewardIcon.node.active = true
            this.rewardIcon.node.scale = 0.7
            this.rewardIcon.spriteFrame = spriteFrame
        }.bind(this))
    }

    WX_ThreeKingFun_gtrh48647fjr1ac() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    WX_ThreeKingFun_471ferghrtynhh() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}
