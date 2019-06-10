export default class MKSound {
    private static bgmVolume:number = 1.0;
    private static sfxVolume:number = 1.0;
    private static bgmAudioID:number = -1;
    private static effAudioID:number = -1;
    
    public constructor() {
        // var t = cc.sys.localStorage.getItem("bgmVolume");
        // if(t != null){
        //     this.bgmVolume = parseFloat(t);    
        // }
        
        // var t = cc.sys.localStorage.getItem("sfxVolume");
        // if(t != null){
        //     this.sfxVolume = parseFloat(t);    
        // }
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    }
    
    WX_ThreeKingFun_qingg44f() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    /**
     * 播放背景音乐
     * @param url 
     */
    public static play_wx_ThreeKing_BGM(audioUrl){
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
    }
    
    WX_ThreeKingFun_qing22g44f() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    /**
     * 播放音效
     * @param url 
     */
    public static play_wx_ThreeKing_SFX(audioUrl:cc.AudioClip){
        // var audioUrl = this.getUrl(url);
        if(this.sfxVolume > 0){
            this.effAudioID = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
        }
    }

    //停止播放
    public static stopSFX( ){
        if(this.sfxVolume > 0){
            cc.audioEngine.stopAll();
        }
    }

    WX_ThreeKingFun_qingg4hh4f() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //停止播放
    public static pause_wx_ThreeKing_All( ){
        if(this.sfxVolume > 0){
            cc.audioEngine.pauseAll();
        }
    }
    
    public static setSFX_wx_ThreeKing_Volume(v){
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    }
    
    WX_ThreeKingFun_qingghf() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public static setBGM_wx_ThreeKing_Volume(v,force){
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
            cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    }

    WX_ThreeKingFun_qin32w4f() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    
    public static pause_wx_ThreeKing_BGM(){
        cc.audioEngine.pause(this.bgmAudioID);
    }
    
    public static resume_wx_ThreeKing_BGM(){
        cc.audioEngine.resume(this.bgmAudioID);
    }

    public static pause_wx_ThreeKing_Eff(){
        cc.audioEngine.pause(this.effAudioID);
    }
    
    public static resume_wx_ThreeKing_Eff(){
        cc.audioEngine.resume(this.effAudioID);
    }

    WX_ThreeKingFun_qinlif() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}