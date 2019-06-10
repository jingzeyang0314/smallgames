import { Sina_Config } from "../data/configsFile";
import Constant from "../common/Constant";
import MKUtils from "../common/MKUtils";
import LogicController from "./LogicController";
import DataManager from "../data/DataManager";
import SingleGameLogic from "./GamesLogic/SingleGameLogic";
import BaseSdk from "../common/BaseSdk";


export default class BDManager extends BaseSdk{

    listenseIsOpen:boolean = false
    hideTime:number = 0 //游戏切后台时间
    isShare:boolean = false //当前是否在转发过程中
    shareSuccessCallback:any = null //转发成功回调
    shareFailCallback:any = null    //转发失败回调
    loginCode:string = ""
    loginParams:any = {}
    avatarUrl:string = ""
    nickName:string = ""

    //广告
    bannerAd:Array<any> = []
    bannerAdHeightScale = 0.18
    rewardVideoAd:any = null
    videoAdSuccessCallback:any = null //转发成功回调
    videoAdFailCallback:any = null    //转发失败回调

    bannerAdIdConfig:any = {
        "42" : [
            "adunit-51a285339da34baa", //0首页底部
            "adunit-cff2632d02e4b199", //1武器弹窗底部
            "adunit-d07538717df59c35", //2邀请弹窗底部
            "adunit-d9f1937c6505db29", //3果汁店弹窗底部
            "adunit-73b67d3fc913ecf0", //4签到弹窗底部
            "adunit-a0a99c346e004953", //5结算弹窗底部
            "adunit-bf4edca7e0b93347", //6复活弹窗底部
        ]
    }
    rewardVideoAdIdConfig:any = {
        "42" : [
            "adunit-36dbab5e6c6e547a", //0离线双倍
            "adunit-399d77fc810fba1b", //1我要开挂
            "adunit-fc97bfe149167fe2", //2抽武器
            "adunit-5c8a466347db0e9e", //3额外奖励
            "adunit-bf45618d4b54ff09", //4复活
        ]
    }

    shareConfig:any = {
        "42":[
            {
                title:"爽酷切水果，天天果汁飞溅！",
                imageUrlId:"Fo9KYIIHQOOsNWlPNpF4qw",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbStVXv3BweaKV20iaEhHb16Dic6tNumPZibjkEOI6DQ98xEjibkfTMgibZPTV/0"
            },
            {
                title:"发现传说中的恶魔果实一枚！你敢吃吗？！",
                imageUrlId:"zfvdDBDHT0SKlyeDqzsmFQ",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbSvoXnrdvfmdmmKf6iaNrHta0ZWyqpscBoNZpahbicFzsia3eJC3HkctBicw/0"
            },
            {
                title:"快刀斩乱麻，乱剑砍西瓜，快来一试！",
                imageUrlId:"8ZyLJX9TSBan9jnooRyYaw",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbSutiaDicDa15EdBID2ic2uQibNicPIHRF8QJj91ibxHZw3BT8s38CfGawDHG9/0"
            }
        ],
        "44":[
            {
                title:"震惊！听说主公被人打啦！",
                imageUrlId:"5EolT1EoSxuf5WzoVqrP2w",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbSssFAnCANlCiaAl8pNia3FColPhhmsgCtAibIXkic2hw5mDKPPOG8pBARFx/0"
            },
            {
                title:"诸葛亮年轻时居然…",
                imageUrlId:"kynqlKY4Q5-YcEXM5YdT7w",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbSvFQwpSNia4cu8qCx6SFVaia6JmzZSJOwxUZLYnsdXzrVdXUmIW3Oh1Fe/0"
            }
        ],
        "45":[
            {
                title:"听说你还没出过太阳系？哥来帮你一把",
                imageUrlId:"sE7MkP9fRK6y8TXR_9rG_w",
                imageUrl:"https://mmocgame.qpic.cn/wechatgame/YnOzJtRibbSsXXeyh017zibvbyKH7ByQvxs5jAbc3Z0W3KwJbOZa2SbB1wtTuG74X3/0"
            }
        ]
    }

    loginConfig:any = {
        "42":{
            GameType:11,
            ChannelID:"30004"
        },
        "44":{
            GameType:12,
            ChannelID:"30005"
        },
        "45":{
            GameType:11,
            ChannelID:"30004"
        },
    }

    miniProgressIdConfig:Array<string> = [
        "wxb1f253874a3a8e8c" //猜成语之王
    ]

    constructor() {
        super()
        let showSize = MKUtils.getShowSize()
        if ((showSize.height/showSize.width) <= (1290/720)) {
            this.bannerAdHeightScale = 0.16
        }
        console.log("wx bannerAdHeightScale:", this.bannerAdHeightScale)
    }

    //注册监听事件
    startListener() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx startListener")
        if (!this.listenseIsOpen) {
            this.listenseIsOpen = true

            swan.onShow(function(res){
                console.log("swan.onShow, time:", MKUtils.getCurOsMillisecond(), ", res:", res)
                // MKUtils.errorTips("onshow --- " + MKUtils.getCurOsMillisecond())
                BDManager.getInstance().checkShareResult()
            }.bind(this))

            swan.onHide(function(){
                // MKUtils.errorTips("onhide --- " + MKUtils.getCurOsMillisecond())
                console.log("swan.onHide, time:", MKUtils.getCurOsMillisecond())
                BDManager.getInstance().hideTime = MKUtils.getCurOsMillisecond()
            }.bind(this))
        }
    }

    WX_ThreeKingFun_sjee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getLoginConfig() {
        return this.loginConfig
    }

    getWXGameItemName(id) {
        if (Constant.WXGameItemName[id]) {
            return Constant.WXGameItemName[id]
        }
        return null
    }

    //登录
    login() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx login start")
        swan.login({
            success(res) {
                cc.log("wx login success, res:", res)
                if (res.code) {
                    BDManager.getInstance().showShareMenu()
                    BDManager.getInstance().loginCode = res.code
                    BDManager.getInstance().checkUserInfo()
                } else {
                    cc.log("wx login failed, errMsg:" + res.errMsg)
                }
            }
        })
    }

    WX_ThreeKingFun_sjtttee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //登录成功后从服务器获取uid等数据
    getLoginData() {
        let xhr = cc.loader.getXMLHttpRequest()
        let url = Sina_Config.WX_XYX_LOGIN_URL + "?code=" + BDManager.getInstance().loginCode + "&gamdid=" + Sina_Config.SmallGameId
        xhr.open("POST", url)

        xhr.onreadystatechange = function () {
            cc.log("getLoginData xhr.readyState=" + xhr.readyState + "xhr.status=" + xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    cc.log("getLoginData success response:", xhr.response)
                    this.loginParams = JSON.parse(xhr.response)
                    LogicController.getInstance().sendHttplogin()
                    BDManager.getInstance().initRewardVideoAd()
                }
            }
        }.bind(this);
        xhr.send()
    }

    getLoginParams() {
        return this.loginParams
    }

    WX_ThreeKingFun_steejee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //启动参数
    getLaunchOptionsSync() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx getLaunchOptionsSync")
        let res = swan.getLaunchOptionsSync()
        console.log("wx getLaunchOptionsSync res:", res)
        // let str = "---"
        // if (res.query["gameId"]) {
        //     str = str + "gameId:" + res.query["gameId"] + ", "
        // }
        // if (res.query["pid"]) {
        //     str = str + "pid:" + res.query["pid"] + ", "
        // }
        // if (res.shareTicket && res.shareTicket != "undefined") {
        //     str = str + "shareTicket:" + res.shareTicket + ", "
        // }
        return res
    }

    getInvitePid() {
        cc.log("wx getInvitePid")
        if (!MKUtils.isWXGame()) {return 0}
        let res = swan.getLaunchOptionsSync()
        if (res.query["pid"]) {
            return res.query["pid"]
        }
        return 0
    }

    WX_ThreeKingFun_s533jee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //获取用户信息
    checkUserInfo() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx checkUserInfo")
        swan.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo'] == true) { 
                    console.log("用户已经授权")
                    BDManager.getInstance().getUserInfo()
                } else {
                    BDManager.getInstance().getLoginData()
                }
            }
        })
    }

    authSettingUserInfo() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx authSettingUserInfo")
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.1")) {
            cc.log("当前微信版本过低，无法授权")
            return
        }

        swan.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo'] == true) { 
                    console.log("用户已经授权")
                } else {
                    swan.getSystemInfo({
                        success(res) {
                            console.log("swan.getSystemInfo", res)
                            let screenWidth = res.screenWidth
                            let screenHeight = res.screenHeight
                            let ratio = 1
                            if (screenHeight/screenWidth >= 1280/720) {
                                ratio = screenWidth / 720
                            } else {
                                ratio = screenHeight / 1280
                            }
                            // let imgWidth = 256
                            // let imgHeight = 102
                            // let btnPosY = -200
                            // let btnWidth = imgWidth * ratio
                            // let btnHeight = imgHeight * ratio
                            // let btnLeft = (screenWidth-btnWidth)/2
                            // let btnTop = screenHeight/2-btnPosY*ratio

                            let btnWidth = screenWidth
                            let btnHeight = screenHeight
                            let btnLeft = 0
                            let btnTop = 0

                            // let button = wx.createUserInfoButton({
                            //     type: 'image',
                            //     image: Sina_Config.WX_USERINFO_BTN_URL,
                            //     style: {
                            //         left: btnLeft,
                            //         top: btnTop,
                            //         width: btnWidth,
                            //         height: btnHeight,
                            //     }
                            // })
                            let button = swan.createUserInfoButton({
                                type: 'text',
                                text: "",
                                style: {
                                    left: btnLeft,
                                    top: btnTop,
                                    width: btnWidth,
                                    height: btnHeight,
                                    backgroundColor: "#00000000",
                                }
                            })
                            button.onTap((res) => {
                                console.log("bd createUserInfoButton", res)
                                if (res.userInfo) {
                                    console.log("用户授权成功");
                                    BDManager.getInstance().avatarUrl = res.userInfo.avatarUrl
                                    BDManager.getInstance().nickName = res.userInfo.nickName
                                    SingleGameLogic.getInstance().wxUserInfo(BDManager.getInstance().nickName, BDManager.getInstance().avatarUrl)
                                }else {
                                    console.log("用户拒绝授权");
                                }
                                button.destroy()
                            })
                        }
                    })
                }
            }
        })
    }

    WX_ThreeKingFun_sjee43() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getUserInfo() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("bd getUserInfo")
        swan.getUserInfo({
            success(res) {
                console.log("getUserInfo success, ", res)
                BDManager.getInstance().avatarUrl = res.userInfo.avatarUrl
                BDManager.getInstance().nickName = res.userInfo.nickName
                BDManager.getInstance().getLoginData()
            }
        })
    }

    getAvatarUrl() {
        return this.avatarUrl
    }

    getNickName() {
        return this.nickName
    }

    WX_ThreeKingFun_sbnbdjee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //分享
    showShareMenu() {
        if (!MKUtils.isWXGame()) {return}
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {}
        let shareConfig = this.getShareConfig()
        if (!shareConfig) {return}

        swan.showShareMenu({
            success:function(res) {cc.log("wx showShareMenu success, res:", res)},
            fail:function(res) {cc.log("wx showShareMenu failed, res:", res)}
        })

        swan.onShareAppMessage(function() {
            cc.log("用户点击了“转发”按钮")
            let shareConfig = this.getShareConfig()
            let queryStr = this.getShareQuery()
            return {
                title: shareConfig.title,
                imageUrlId: shareConfig.imageUrlId,
                imageUrl: shareConfig.imageUrl,
                query: queryStr
            }
        }.bind(this))
    }

    WX_ThreeKingFun_sreejee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    shareAppMessage(successCallback?:any, failCallback?:any) {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx shareAppMessage start")
        this.isShare = true
        this.shareSuccessCallback = successCallback
        this.shareFailCallback = failCallback

        let shareConfig = this.getShareConfig()
        if (!shareConfig) {
            MKUtils.errorTips("分享失败")
            this.isShare = false
            this.shareSuccessCallback = null
            this.shareFailCallback = null
            if (failCallback) {
                failCallback()
            }
        }
        let queryStr = this.getShareQuery()
        swan.shareAppMessage({
            title: shareConfig.title,
            imageUrl: shareConfig.imageUrl,
            query: queryStr
        })
    }

    getShareConfig() {
        if (!this.shareConfig[Sina_Config.SmallGameId]) {return null}
        if (this.shareConfig[Sina_Config.SmallGameId].length < 1) {return null}
        let index = MKUtils.randomNM(0, this.shareConfig[Sina_Config.SmallGameId].length-1)
        return this.shareConfig[Sina_Config.SmallGameId][index]
    }

    getShareQuery() {
        let gameId = DataManager.getInstance().curGameID
        let pid = DataManager.getInstance().getuserData().PlayerID
        if (pid > 0) {
            return "gameId=" + gameId + "&pid=" + pid
        } else {
            return ""
        }
    }

    WX_ThreeKingFun_sje32e() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    checkShareResult() {
        if (this.isShare) {
            this.isShare = false
            let curTime = MKUtils.getCurOsMillisecond()
            console.log("checkShareResult --- curTime:", curTime, ", hideTime:",  this.hideTime)
            if (curTime - this.hideTime >= 2000 && this.hideTime > 0) {
                if (this.shareSuccessCallback) {
                    this.shareSuccessCallback()
                }
            } else {
                MKUtils.errorTips("分享失败")
                if (this.shareFailCallback) {
                    this.shareFailCallback()
                }
            }
            this.shareSuccessCallback = null
            this.shareFailCallback = null
        }
    }

    //排行榜
    setUserScore(item, score) {
        if (!MKUtils.isWXGame()) {return}
        console.log("wx setUserScore item:", item, ", score:", score)
        if (!item) {return}
        swan.postMessage({
            messageType: 1,
            item: item,
            score: score,
        });
    }

    WX_ThreeKingFun_sjehhhe() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    showAllRank(item) {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx showAllRank, item:", item)
        swan.postMessage({
            messageType: 2,
            item: item,
        });
    }

    showSideRank(item) {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx showSideRank, item:", item)
        swan.postMessage({
            messageType: 3,
            item: item,
        });
    }

    showCenterRank(item, refresh) {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx showSideRank, item:", item)
        let mType = refresh?4:5
        swan.postMessage({
            messageType: mType,
            item: item,
        });
    }

    WX_ThreeKingFun_sjeewe() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    showResultRank(item) {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx showResultRank, item:", item)
        swan.postMessage({
            messageType: 6,
            item: item,
        });
    }

    createImage() {
        return swan.createImage()
    }

    //手机振动
    vibrateShort() {
        if (!MKUtils.isWXGame()) {return}
        cc.log("wx vibrateShort")
        swan.vibrateShort({
            success:function(res) {cc.log("wx vibrateShort success")},
            fail:function(res) {cc.log("wx vibrateShort failed")}
        })
    }

    WX_ThreeKingFun_strerjee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    //广告 Banner
    createBannerAd(adIndex, topScale?:number) {
        if (!MKUtils.isWXGame()) {return}

        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            cc.log("当前微信版本过低，请升级微信版本")
            return
        }

        for (let i = 0; i < this.bannerAd.length; i++) {
            if (i != adIndex && this.bannerAd[i]) {
                this.bannerAd[i].hide()
            }
        }
        
        let adUnitId = BDManager.getInstance().getBannerAdId(adIndex)
        if (!adUnitId) {
            console.log("wx getBannerAdId error")
            return
        }
        if (adUnitId == "") {
            console.log("wx getBannerAdId not show")
            return
        }
        console.log("wx createBannerAd, adUnitId:", adUnitId)

        if (!this.bannerAd[adIndex]) {
            let sysInfo = swan.getSystemInfoSync()
            console.log("swan.getSystemInfoSync ", sysInfo)
            let screenWidth = sysInfo.screenWidth
            let screenHeight = sysInfo.screenHeight
            let adWidth = 300
            let adLeft = (screenWidth - adWidth) / 2
            topScale = topScale || BDManager.getInstance().bannerAdHeightScale
            let adTop = screenHeight * (1-topScale)

            if (screenHeight - adTop < 110) {
                adTop = screenHeight - 110
            }

            BDManager.getInstance().bannerAd[adIndex] = swan.createBannerAd({
                adUnitId: adUnitId,
                style: {
                    left: adLeft,
                    top: adTop,
                    width: adWidth
                }
            })
            BDManager.getInstance().bannerAd[adIndex].onError(function(res){
                console.log("wx bannerAd, error res:", res)
                if (res.errCode == 1000) {

                } else if (res.errCode == 1001) {

                }
            }.bind(this))
            BDManager.getInstance().bannerAd[adIndex].show()
        } else {
            this.bannerAd[adIndex].show()
        }
    }


    WX_ThreeKingFun_sjegddde() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    destroyBannerAd(adIndex) {
        if (!MKUtils.isWXGame()) {return}
        if (this.bannerAd[adIndex]) {
            this.bannerAd[adIndex].destroy()
        }
        this.bannerAd[adIndex] = null
    }

    getBannerAdHeight() {
        return MKUtils.getShowSize().height * this.bannerAdHeightScale
    }

    WX_ThreeKingFun_sjeree() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    getBannerAdId(index) {
        let gameId = DataManager.getInstance().curGameID
        if (!this.bannerAdIdConfig[gameId]) {return null}
        if (this.bannerAdIdConfig[gameId].length > index) {
            return this.bannerAdIdConfig[gameId][index]
        } else {
            return this.bannerAdIdConfig[gameId][0]
        }
    }


    WX_ThreeKingFun_smmjee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    //激励视频广告
    initRewardVideoAd() {
        if (!MKUtils.isWXGame()) {return}

        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            SingleGameLogic.getInstance().rewardVideoAdEnable = false
            return
        }

        let adUnitId = BDManager.getInstance().getRewardVideoAdId(0)
        if (!adUnitId) {
            console.log("wx initRewardVideoAd failed!")
            return
        }
        let videoAd = swan.createRewardedVideoAd({
            adUnitId: adUnitId
        })
        BDManager.getInstance().rewardVideoAd = videoAd

        videoAd.onError(function(res){
            console.log("wx videoAd, error1 res:", res)
        }.bind(this))
        
        videoAd.load()
    }


    WX_ThreeKingFun_sjenff() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    playRewardVideoAd(adIndex?:number, successCallback?:any, failCallback?:any) {
        if (!MKUtils.isWXGame()) {return}
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.0.4")) {
            MKUtils.errorTips("当前微信版本过低，请升级")
            if (failCallback) {
                failCallback()
            }
            SingleGameLogic.getInstance().rewardVideoAdEnable = false
            SingleGameLogic.getInstance().refreshRewardType()
            return
        }

        console.log("wx playRewardVideoAd, adIndex:", adIndex)
        let adUnitId = BDManager.getInstance().getRewardVideoAdId(adIndex)
        if (!adUnitId) {
            MKUtils.errorTips("暂时不支持视频广告")
            if (failCallback) {
                failCallback()
            }
            SingleGameLogic.getInstance().refreshRewardType()
            return
        }
        console.log("wx playRewardVideoAd, adUnitId:", adUnitId)

        BDManager.getInstance().videoAdSuccessCallback = successCallback
        BDManager.getInstance().videoAdFailCallback = failCallback

        let videoAd = swan.createRewardedVideoAd({
            adUnitId: adUnitId
        })
        BDManager.getInstance().rewardVideoAd = videoAd

        videoAd.onError(function(res){
            console.log("wx videoAd, error res:", res)
            videoAd.offError()
            videoAd.offClose()
            if (!BDManager.getInstance().rewardVideoAd) {return}
            MKUtils.errorTips("今日视频广告次数已用完")
            SingleGameLogic.getInstance().rewardVideoAdEnable = false
            if (BDManager.getInstance().videoAdFailCallback) {
                BDManager.getInstance().videoAdFailCallback()
            }
            SingleGameLogic.getInstance().refreshRewardType()

            BDManager.getInstance().videoAdFailCallback = null
            BDManager.getInstance().videoAdSuccessCallback = null
            BDManager.getInstance().rewardVideoAd = null
        }.bind(this))

        videoAd.onClose(res => {
            // 用户点击了【关闭广告】按钮
            console.log("videoAd close res:", res)
            videoAd.offClose()
            videoAd.offError()
            if (!BDManager.getInstance().rewardVideoAd) {return}
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                if (BDManager.getInstance().videoAdSuccessCallback) {
                    BDManager.getInstance().videoAdSuccessCallback()
                }
            } else {
                // 播放中途退出，不下发游戏奖励
                MKUtils.errorTips("视频广告观看失败")
                if (BDManager.getInstance().videoAdFailCallback) {
                    BDManager.getInstance().videoAdFailCallback()
                }
            }
            SingleGameLogic.getInstance().refreshRewardType()

            BDManager.getInstance().videoAdFailCallback = null
            BDManager.getInstance().videoAdSuccessCallback = null
            BDManager.getInstance().rewardVideoAd = null
        })

        videoAd.show().catch(err => {
            videoAd.load().then(() => videoAd.show())
        })
    }

    WX_ThreeKingFun_sjederwee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getRewardVideoAdId(index?:number) {
        index = index || 0
        let gameId = Sina_Config.SmallGameId
        if (!this.rewardVideoAdIdConfig[gameId]) {
            return null
        }
        if (this.rewardVideoAdIdConfig[gameId].length > index) {
            return this.rewardVideoAdIdConfig[gameId][index]
        } else {
            return this.rewardVideoAdIdConfig[gameId][0]
        }
    }

    //适配不同版本
    compareVersion(v1, v2) {
        v1 = v1.split('.')
        v2 = v2.split('.')
        const len = Math.max(v1.length, v2.length)
      
        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }
      
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i])
            const num2 = parseInt(v2[i])
            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }
        return 0
    }

    WX_ThreeKingFun_sjreeee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    wxSDKVersionIsBig(version) {
        if (!MKUtils.isWXGame()) {return false}
        let curVersion = swan.getSystemInfoSync().SDKVersion
        return BDManager.getInstance().compareVersion(curVersion, version) >= 0
    }

    //小游戏跳转
    toMiniProgram(appIndex) {
        if (!MKUtils.isWXGame()) {return} 
        if (!BDManager.getInstance().wxSDKVersionIsBig("2.2.0")) {
            MKUtils.errorTips("当前微信版本过低，请升级")
            return
        }
        console.log("wx navigateToMiniProgram appId:", appIndex)
        let appId = BDManager.getInstance().miniProgressIdConfig[appIndex]
        if (!appId) {
            MKUtils.errorTips("跳转失败")
            return
        }
        swan.navigateToMiniProgram({
            appKey: appId,
            success(res) {
                console.log("wx navigateToMiniProgram success, res:", res)
            },
            fail(res) {
                console.log("wx navigateToMiniProgram fail, res:", res)
            }
        })
    }

    isWxHeaUrl(fullUrl) {
        let isWXHeadUrl = (fullUrl.indexOf("https://wx.") >= 0)
        if (isWXHeadUrl) {
            fullUrl = fullUrl + "?.jpg"
        }
        return fullUrl
    }

    WX_ThreeKingFun_sjrreee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public static bdManager:BDManager = null

    public static getInstance() : BDManager {
        if (!this.bdManager) {
            this.bdManager = new BDManager()
        }
        return this.bdManager
    }

}
