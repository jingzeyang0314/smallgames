/**
 * Author: qinsj
 * Date: 2018.11.1
 * @export
 * @class TipsScene tips 界面
 * @extends {cc.Component}
 */
import GamesCommonLogic from "../../../Script/logic/GamesCommonLogic";
import MKSound from "../../../Script/common/MKSound";
import MKUtils from "../../../Script/common/MKUtils";
import DataManager from "../../../Script/data/DataManager";
import Constant from "../../../Script/common/Constant";
import EventDispath from "../../../Script/event/Event";
import { EventIDS } from "../../../Script/event/EvenID";

export var handerType = cc.Enum({
    continueGame: 0,        //继续
    findPlayer: 1,          //换个好友
    exit: 2,                //退出
});

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsScene extends cc.Component {

    @property(cc.Label)
    tipslabel: cc.Label = null;

    @property(cc.Button)
    btnSure: cc.Button = null;

    @property(cc.Button)
    btnCancel: cc.Button = null;

    @property({type: cc.AudioClip})
    clickSound:cc.AudioClip = null;

    @property(cc.Node)
    bg :cc.Node = null ;

    @property(cc.Sprite)
    bgSp:cc.Sprite = null;

    header:any = null;
    tager:any = null;
    handerExit = [];
    isSingel:boolean = false; //是否是单机游戏

    start () {
        let curSence = cc.director.getScene();
        if (curSence.name == "brave") {
            // let size = curSence.getContentSize();
            // cc.log("");
            // this.bgSp.node.setContentSize(size);
        } else {
            this.bgSp.node.scaleX = MKUtils.getShowScale().x;
            this.bgSp.node.scaleY = MKUtils.getShowScale().y;
        }

        
        this.handerExit = GamesCommonLogic.getInstance().getHeader(); 
         this.chickGameType();
    }

    initTipsValue(tips:string){
        cc.log("TipsScene tips ");
        if(tips){
            this.tipslabel.string = tips;
            this.tipslabel.enableWrapText = true;
        }
    }

    //传入一个回调函数
    initTipsExit(exit:any){
        cc.log("TipsScene initTipsExit");
        if(exit){
            this.header = exit;
        }
    }

    onBntExit(){
        cc.log(" send exit ");
        MKSound.play_wx_ThreeKing_SFX(this.clickSound);
        if(!this.isSingel){
            this.handerExit[handerType.exit]( );
        }else{
            cc.director.loadScene("Home");
        }
    }

    onCancel(){
        cc.log(" send cancel ");
        MKSound.play_wx_ThreeKing_SFX(this.clickSound);
        this.node.removeFromParent();
        if(this.isSingel){
            EventDispath.getInstance().send(EventIDS.CMD_SEND_CITYCAR_SIGNEL_EXIT);
        }
    }

    chickGameType(){
        let curGameID = DataManager.getInstance().curGameID
        let config = DataManager.getInstance().getGameConfig(curGameID)
        if (!config) {return}
        let enterType = config["enterType"]
        if (enterType == Constant.GameEnterType.SINGEL) {
           this.isSingel = true;
        } 
    }
}
