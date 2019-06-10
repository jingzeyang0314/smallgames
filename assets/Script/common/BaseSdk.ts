// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class BaseSdk {

    //登录
    abstract login():any

    //注册监听事件
    abstract startListener():any

    //手机振动
    abstract vibrateShort():any

    // 获取广告条高度
    abstract getBannerAdHeight():any

    //排行榜
    abstract setUserScore(item, score):any

    abstract getWXGameItemName(id):any

    //广告 Banner
    abstract createBannerAd(adIndex, topScale?:number):any

    // 用户授权
    abstract authSettingUserInfo():any

    abstract showAllRank(item):any

    abstract shareAppMessage(successCallback?:any, failCallback?:any):any

    abstract showCenterRank(item, refresh):any

    abstract showResultRank(item):any

    // 玩家头像
    abstract createImage():any

    abstract isWxHeaUrl(fullUrl):any

    //小游戏跳转
    abstract toMiniProgram(appIndex):any

    abstract showSideRank(item):any

    abstract playRewardVideoAd(adIndex?:number, successCallback?:any, failCallback?:any):any

    abstract getInvitePid():any

    abstract getLoginParams():any

    abstract getNickName():any

    abstract getAvatarUrl():any

    abstract getLoginConfig():any
}
