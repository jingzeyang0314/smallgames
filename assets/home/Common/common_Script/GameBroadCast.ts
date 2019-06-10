import DataManager from "../../../Script/data/DataManager";
import MKUtils from "../../../Script/common/MKUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameBroadCast extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    maskNode:cc.Node = null;

    @property
    broadCastTips = [];  
    
    startPos = null;
    isPlaying:boolean = false;
    richTextLengh:number = 400;
    type:number = 0;
    callBackFunc : any =  null;
    onLoad () { 
        let richtext = MKUtils.findNode_wx_ThreeKing_ByName(this.node, "richtext");    
        this.startPos = richtext.getPosition();
        this.node.active = false;

        this.playAni();
    }

    start () {

    }

    playAni(){
        let richtext = MKUtils.findNode_wx_ThreeKing_ByName(this.node, "richtext");
        if (this.broadCastTips.length > 0) {
            this.node.active = true;
            this.node.opacity = 0;
            richtext.getComponent(cc.RichText).string =  this.broadCastTips[0];
            this.scheduleOnce(this.showAni, 1);
        } else {
            this.node.active = false;
        }
    }
    //收到通知显示调用这个共有方法  id = 1 三国数据 else 其他数据
    showBroad(data?:any,id?:any) {  
        this.type = id; 
        this.node.stopAllActions();
        if(id == 1){
           this.broadCastTips = data;
        }else{
            if(!DataManager.getInstance().broadCast)  {
                this.node.active = false;
                return;
            }

            let data = DataManager.getInstance().broadCast.Param;
            if(data == null || data == undefined || data.length == 0 ){
                return
            }
            let lst = [];
            for (let index = 0; index < data.length; index++) {
                let text = data[index];
                lst.push(text);
            }
            this.broadCastTips = lst;
        }

        if (!this.broadCastTips || this.broadCastTips == undefined) {   
            this.node.active = false;        
            return;
        }
    }

    showAni () {
        let richtext = MKUtils.findNode_wx_ThreeKing_ByName(this.node, "richtext");
        richtext.setPosition(238,0);
        let width = 0;
        if(this.type == 1){
            width = this.richTextLengh;
        }else{
            width =  richtext.width;
        }
        let timeW = Math.floor(width / 80);
        let moveToStartPos = cc.moveTo(0.01, this.startPos);
        let moveTo = cc.moveTo(timeW + 5, cc.v2(- richtext.getPosition().x - width, 0) ) ; 

        let callFunc = cc.callFunc(function () { 
            let fadeIn = cc.fadeIn(0.5);            
            this.node.runAction(fadeIn);
         }, this)   

        let callFunc1 = cc.callFunc(function () { 
            if(this.broadCastTips.length >= 1){
                richtext.getComponent(cc.RichText).string = this.broadCastTips[0];
                this.broadCastTips.shift();
                this.scheduleOnce(this.showAni, 1);
            } else{
                let fadeOut = cc.fadeOut(0.2);           
                this.node.runAction(fadeOut);
                richtext.getComponent(cc.RichText).string = "";
                this.broadCastTips = [];
                if(this.type == 1){
                    if (this.callBackFunc != null) {
                        this.callBackFunc();
                    }
                }else{
                    DataManager.getInstance().setHomeShowBroad(false) ;
                }
                this.node.removeFromParent(true);
            }         
        }, this)        

        let seq = cc.sequence(callFunc, moveToStartPos,moveTo,callFunc1);
        richtext.setPosition(this.startPos);
        richtext.runAction(seq);
    }

    setCallBack(callBackFunc:any){
        this.callBackFunc = callBackFunc;
    }

    Hide() {
        this.node.active = false;
    }
}
