import WBManager from "./WBManager";
import WXManager from "./WXManager";
import BaseSdk from "../common/BaseSdk";
import { Sina_Config } from "../data/configsFile";
import Constant from "../common/Constant";
import BDManager from "./BDManager";

export default class SDKManager {

    baseManager:BaseSdk = null;

    constructor() {
    }

    init() {
        // 初始化用哪种接口
        if (Sina_Config.GameType == Constant.GameType.WX_XYX) {
            this.baseManager = WXManager.getInstance();
        } else if (Sina_Config.GameType == Constant.GameType.BD_XYX) {
            this.baseManager = BDManager.getInstance();
        } else {
            this.baseManager = WXManager.getInstance();
        }
    }

    // 微博 ------------------------------------------------------------------

    // 微博初始化
    wbInit() {
        WBManager.getInstance().init()
    }

    // 微博广告
    playVideoAd(successCallback?:any, failCallback?:any) {
        WBManager.getInstance().playVideoAd(successCallback, failCallback);
    }

    // 微信 ------------------------------------------------------------------

    //登录
    login() {
        this.baseManager.login()
    }

    //注册监听事件
    startListener() {
        this.baseManager.startListener()
    }

    //手机振动
    vibrateShort() {
        this.baseManager.vibrateShort()
    }

    // 获取广告条高度
    getBannerAdHeight() {
        return this.baseManager.getBannerAdHeight()
    }

    //排行榜
    setUserScore(item, score) {
        this.baseManager.setUserScore(item, score)
    }

    getWXGameItemName(id) {
        return this.baseManager.getWXGameItemName(id)
    }

    //广告 Banner
    createBannerAd(adIndex, topScale?:number) {
        this.baseManager.createBannerAd(adIndex, topScale)
    }

    // 用户授权
    authSettingUserInfo() {
        this.baseManager.authSettingUserInfo()
    }

    showAllRank(item) {
        this.baseManager.showAllRank(item)
    }

    shareAppMessage(successCallback?:any, failCallback?:any) {
        this.baseManager.shareAppMessage(successCallback, failCallback)
    }

    showCenterRank(item, refresh) {
        this.baseManager.showCenterRank(item, refresh)
    }

    showResultRank(item) {
        this.baseManager.showResultRank(item)
    }

    // 玩家头像
    createImage() {
        return this.baseManager.createImage();
    }

    isWxHeaUrl(fullUrl) {
        return this.baseManager.isWxHeaUrl(fullUrl);
    }

    //小游戏跳转
    toMiniProgram(appIndex) {
        this.baseManager.toMiniProgram(appIndex)
    }

    showSideRank(item) {
        this.baseManager.showSideRank(item)
    }

    playRewardVideoAd(adIndex?:number, successCallback?:any, failCallback?:any) {
        this.baseManager.playRewardVideoAd(adIndex, successCallback, failCallback)
    }

    getInvitePid() {
        return this.baseManager.getInvitePid()
    }

    getLoginParams() {
        return this.baseManager.getLoginParams()
    }

    getNickName() {
        return this.baseManager.getNickName()
    }

    getAvatarUrl() {
        return this.baseManager.getAvatarUrl()
    }

    getLoginConfig() {
        return this.baseManager.getLoginConfig()
    }

    public static sdkManager:SDKManager = null

    public static getInstance() : SDKManager {
        if (!this.sdkManager) {
            this.sdkManager = new SDKManager()
            this.sdkManager.init()
        }
        return this.sdkManager
    }

}
