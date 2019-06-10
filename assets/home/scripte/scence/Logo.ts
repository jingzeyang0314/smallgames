
import DataManager from "../../../Script/data/DataManager";
import LogicController from "../../../Script/logic/LogicController";
import {Sina_Config} from "../../../Script/data/configsFile";
import EventDispath from "../../../Script/event/Event";
import {EventIDS}  from "../../../Script/event/EvenID";
import GamesCommonLogic from "../../../Script/logic/GamesCommonLogic";
import MKUtils from "../../../Script/common/MKUtils";
import SingleGameLogic from "../../../Script/logic/GamesLogic/SingleGameLogic";
import SDKManager from "../../../Script/logic/SDKManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Logo extends cc.Component {

    @property(cc.Sprite)
    writeBg:cc.Sprite = null

    @property(cc.Node)
    wbLoading:cc.Node = null

    @property(cc.Node)
    wxLoading:cc.Node = null

    constructor() {
        super();
    }

    WX_ThreeKingFun_gethgryyh() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onLoad() {
        cc.log("Logo onLoad");
        this.writeBg.node.setContentSize(MKUtils.getShowSize())
        EventDispath.getInstance().addEventListener(EventIDS.CMD_LOAD_CONFIG_SUCCESS, this.initDataSuccess.bind(this), this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_LOGIN_SUCCESS, this.loginSuccess.bind(this), this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_ENTER_GAME_SUCCESS, this.tcpConnectSuccess.bind(this), this);
        EventDispath.getInstance().addEventListener(EventIDS.CMD_GET_GAME_LIST_SUCCESS, this.getGameListSuccess.bind(this), this);

        this.wbLoading.active = !MKUtils.isWXGameFun()
        this.wxLoading.active = MKUtils.isWXGameFun()

        if (MKUtils.isWXGameFun) {
            let loadingLabel = this.wxLoading.getChildByName("loadingLabel")
            let index = 1
            loadingLabel.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.2), cc.callFunc(()=>{
                let loadingStr = ""
                for (let i = 0; i < index; i++) {
                    loadingStr = loadingStr + "."                    
                }
                loadingLabel.getComponent(cc.Label).string = "正在加载中" + loadingStr

                index = index + 1
                if (index > 3) {
                    index = 1
                }
            }, loadingLabel))))
        }

        if (Sina_Config.DeveloperMode) {
            let editbox = MKUtils.findNode_wx_ThreeKing_ByName(this.node, "editbox");
            let enterBtn = MKUtils.findNode_wx_ThreeKing_ByName(this.node, "enterBtn");
            enterBtn.active = true
            editbox.active = true
            enterBtn.on(cc.Node.EventType.TOUCH_END, function(e){
                    cc.sys.localStorage.setItem("loginName", Sina_Config.SINA_WINACCOUNT);
                    LogicController.getInstance().sendHttplogin()
                }.bind(this), this );

            // 初始名称
            let loginName = cc.sys.localStorage.getItem("loginName");
            if (loginName) {
                editbox.getComponent(cc.EditBox).string = loginName;
                Sina_Config.SINA_WINACCOUNT = loginName;
            } else {
                editbox.getComponent(cc.EditBox).string = Sina_Config.SINA_WINACCOUNT;
            }
        }
    }

    WX_ThreeKingFun_gteght653475h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    start () {
        cc.log("Logo start");
        cc.loader.loadRes("home/prefab/ComTips")
        cc.loader.loadRes("home/prefab/Reconnect")
        cc.loader.loadRes("public/prefabs/tipsNode")
        DataManager.getInstance().initData();
    }

    WX_ThreeKingFun_fgtregt2ehg748tr5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    onDestroy() {
        EventDispath.getInstance().removeEventListeners(this);
    }

    WX_ThreeKingFun_ftehgthrgr5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    editBox2 (text, editbox, customEventData) {
        Sina_Config.SINA_WINACCOUNT = text;
        //cc.log("Logo editBox2");
    }

    //initData login socket getGamelist startGame
    initDataSuccess() {
        if (MKUtils.isWXGame()) {
            SDKManager.getInstance().startListener()
            SDKManager.getInstance().login()
        } else {
            if (Sina_Config.DeveloperMode) {
                
            } else {
                LogicController.getInstance().sendHttplogin()
            }
        }
    }

    WX_ThreeKingFun_fgetq4e38h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    loginSuccess() {
        if (MKUtils.isWXGame()) {
            this.startGame()
        } else {
            SDKManager.getInstance().wbInit();
            LogicController.getInstance().connectTcp()
        }
    }

    tcpConnectSuccess() {
        LogicController.getInstance().sendGetGameList()
    }

    WX_ThreeKingFun_gtrehy99925h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }

    getGameListSuccess() {
        this.startGame()
    }

    startGame() {
        if (Sina_Config.SmallGameId <= 1) {
            cc.loader.loadResDir("home", function(completedCount, totalCount, item){
                },
                function(error, res) {
                    cc.director.loadScene("Home");
                }
            )
        } else {
            let gameInfo = DataManager.getInstance().getGameConfig(Sina_Config.SmallGameId);
            if (gameInfo) {
                DataManager.getInstance().curGameID = Sina_Config.SmallGameId;
                SingleGameLogic.getInstance().inviteBind()
                GamesCommonLogic.getInstance().enterSmallGame()
            } else {
                cc.log("Logo did not find game info, id:", Sina_Config.SmallGameId)
            }
        }
    }

    WX_ThreeKingFun_frfrtgtetg5h() {
        let aaa = 1451
        let vrbgv = 258
        let fff = 3
        cc.log("aaa + bbb = ")
        return aaa + fff + fff + vrbgv
    }
}
