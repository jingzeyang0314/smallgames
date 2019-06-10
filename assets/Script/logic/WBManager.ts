
// import * as video from "../../resources/wbGame/ad/video"
import DataManager from "../data/DataManager";
import MKUtils from "../common/MKUtils";
import { Sina_Config } from "../data/configsFile";
import Constant from "../common/Constant";

export default class WBManager {

    videoAd:any = null
    firstPlay:boolean = true
    uid:any = ""
    mid:any = "1"
    android:boolean = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1

    constructor() {
    }

    init() {
        this.uid = DataManager.getInstance().getuserData().Account
        this.mid = "1"
        if (Sina_Config.GameType == Constant.GameType.WB_WALLET) {
            this.mid = "1"
        } else if (Sina_Config.GameType == Constant.GameType.WB_TASK) {
            this.mid = "2"
        }
        cc.log("WB Ad init, mid:", this.mid, ", uid:", this.uid)
        // this.videoAd = video.createRewardeVideo({uid:this.uid, mid:this.mid})
    }

    playVideoAd(successCallback?:any, failCallback?:any) {
        // cc.audioEngine.pauseAll()
        // if (!this.videoAd) {
        //     this.videoAd = video.createRewardeVideo({uid:this.uid, mid:this.mid})
        // }
        // this.videoAd.load().then(function(){
        //     this.videoAd.show()
        //     if (this.firstPlay) {
        //         this.videoAd.video.play()
        //         this.firstPlay = false
        //     }
        //     this.videoAd.onClose((status) => {
        //         cc.log("wb video ad onClose --- status ", status)
        //         cc.audioEngine.resumeAll()
        //         if (status && status.isEnded) {
        //             if (successCallback) {
        //                 successCallback()
        //             }
        //         } else {
        //             MKUtils.errorTips("视频广告观看失败")
        //             if (failCallback) {
        //                 failCallback()
        //             }
        //         }
        //     })
        // }.bind(this)).catch(
        //     err => console.log(err.message)
        // )
    }

    public static wbManager:WBManager = null

    public static getInstance() : WBManager {
        if (!this.wbManager) {
            this.wbManager = new WBManager()
        }
        return this.wbManager
    }

}
