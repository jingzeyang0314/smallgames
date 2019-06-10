
import MKSound from "../../../Script/common/MKSound";
import MKUtils from "../../../Script/common/MKUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComTips extends cc.Component {
    @property(cc.Label)
    labTips: cc.Label = null;

    @property(cc.Label)
    labBtnTips: cc.Label = null;

    
    @property({type: cc.AudioClip})
    btnAudio: cc.AudioClip = null;

    @property(cc.Sprite)
    bg : cc.Sprite = null;

    @property(cc.Button)
    btnOK : cc.Button = null


    //确定按钮回调事件
    callBackFunc : any =  null;
    strTips : string = "";
    strBtnTips : string = "";
    btnVisible : boolean = true;

    WX_ThreeKingFun_ffgregt925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    setShowPar(tips : string, callBackFunc : any = null, strBtnTips:string = "", btnVisible: boolean = true) {
        this.strTips = tips;
        this.strBtnTips = strBtnTips;
        this.callBackFunc = callBackFunc;
        this.btnVisible = btnVisible;
    }

    WX_ThreeKingFun_fgtegt5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {
        this.bg.node.scaleX =  MKUtils.getShowScale().x;
        this.bg.node.scaleY =  MKUtils.getShowScale().y;
    }

    WX_ThreeKingFun_ferg9fregt9925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    WX_ThreeKingFun_fegtewgt25h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {

        this.labTips.string = this.strTips;
        if (this.strBtnTips.length > 0) {
            this.labBtnTips.string = this.strBtnTips;
        }

        this.btnOK.node.active = this.btnVisible;
    }
    
    WX_ThreeKingFun_gtegt5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onBtnOK () {
        MKSound.play_wx_ThreeKing_SFX(this.btnAudio);
        if (this.callBackFunc != null) {
            this.callBackFunc();
        }

        this.node.destroy();
    }

    WX_ThreeKingFun_fregfgetghtgth() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
