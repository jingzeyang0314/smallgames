import DataManager from "../../../Script/data/DataManager";
import MKSound from "../../../Script/common/MKSound";
import MKUtils from "../../../Script/common/MKUtils";
import { Sina_Config } from "../../../Script/data/configsFile";

// Learn TypeScript:

const {ccclass, property} = cc._decorator;

@ccclass
export default class NetErrorTips extends cc.Component {

    @property(cc.Label)
    lableHome: cc.Label = null;

    @property(cc.Label)
    lableGames: cc.Label = null;

    @property(cc.Node)
    netWeihu: cc.Node = null;

    @property(cc.Node)
    netError: cc.Node = null;

    @property(cc.Node)
    netHomeSubGameServerTips: cc.Node = null;

    @property(cc.Button)
    btnHome: cc.Button = null;

    @property({type: cc.AudioClip}) 
    btnAudio:cc.AudioClip = null;

    @property(cc.Sprite) 
    netWeihuback:cc.Sprite = null;

    showType = 2;   //显示类型

    WX_ThreeKingFun_gfetgyt6723482h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad () {
        this.btnHome.node.on(cc.Node.EventType.TOUCH_END, this.onBtnHome, this);

        this.netWeihuback.node.scaleX =  MKUtils.getShowScale().x;
        this.netWeihuback.node.scaleY =  MKUtils.getShowScale().y;
    }

    WX_ThreeKingFun_frgt4838h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {
        this.initNetLayers();
        if ( this.showType == 1 ) { //大厅 维护公告
            this.netWeihu.active = true;
            this.lableHome.node.active = true;
            var maintenance = DataManager.getInstance().getMaintenance();
            if (maintenance.length > 0) {
                this.lableHome.string = maintenance;
            }

        } else if (this.showType == 2) { //单个游戏维护公告
            if (Sina_Config.SmallGameId <= 1) { //在大厅点击
                this.netHomeSubGameServerTips.active = true;
                this.schedule(this.hideSelf, 0,0, 2);
            } else {
                this.netWeihu.active = true;
                this.lableGames.node.active = true;
            }
        
        } else if (this.showType == 3) { //网络错误
            this.netError.active = true;
        }

    }

    WX_ThreeKingFun_g4qw4348eg25h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    hideSelf() {
        this.node.destroy();      
    }

    initNetLayers () {
        this.netError.active = false;
        this.netWeihu.active = false;
        this.netHomeSubGameServerTips.active = false;

        this.lableGames.node.active = false;
        this.lableHome.node.active = false;
    }

    WX_ThreeKingFun_feqg4t6837925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    setShowType (type) {
        this.showType = type;
    }

    WX_ThreeKingFun_ferg99f46eg384t925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onBtnHome () {
        MKSound.play_wx_ThreeKing_SFX(this.btnAudio);
        cc.log("onBtnHome");
        var sence = cc.director.getScene();
        if(sence.name != "Home") {
            cc.director.loadScene("Home");
        }

        this.node.destroy();      
    }

    WX_ThreeKingFun_gtehgt4357h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
