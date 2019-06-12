(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/network/PacketFiles.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5bbf4gTHdVPg5Ny8/kqI9XV', 'PacketFiles', __filename);
// Script/network/PacketFiles.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PacketID_1 = require("./PacketID");
var Protocol_1 = require("./Protocol");
/*import {CSLinkFindPlayer, SCLinkFindPlayerRet, CSLinkContinueGame, SCLinkContinueGameRet, CSLinkExit, SCLinkExitRet, CSLinkResultReceive, SCLinkResultReceiveRet, CSLinkScoreSyn, SCLinkScoreSynRet, SCLinkCloseRet, SCLinkResultSynRet, SCLinkMakeTeamRet} from "./gameProtocols/linkProtocol"
import {SCBulidHouseMakeTeamRet,SCBulidHouseFindPlayerRet,SCBulidHouseResultSynRet,SCBulidHouseResultReceiveRet,SCBulidHouseScoreSynRet
    ,SCBulidHouseContinueGameRet,SCBulidHouseExitRet,SCBulidHouseCloseRet } from "./gameProtocols/sushiProtocol"
import {SCSquMatchRet,SCSquEnterGameRet,SCSquAgainRet,SCSquExitGameRet,SCSquResultRet,SCSquElimiRet,SCSquResultBackRet} from "./gameProtocols/squelimiProtocol"
import {CSJungleEnter,SCJungleEnterRet,CSJungleContinue,SCJungleContinueRet,CSJungleExit,SCJungleExitRet,CSJungleResultRec,SCJungleResultRecRet,CSJunglePosSyn,SCJunglePosSynRet,SCJungleResultSynRet,SCJungleMatchRet,CSJungleChat,SCJungleChatRet,CSJungleLoss,SCJungleLossRet,CSJunglePeace,SCJunglePeaceRet} from "./gameProtocols/JungleProtocol"
import {CSHuntEnter,SCHuntEnterRet,CSHuntContinue,SCHuntContinueRet,CSHuntExit,SCHuntExitRet,CSHuntResultRec,SCHuntResultRecRet,CSHuntMoveSyn,SCHuntMoveSynRet,SCHuntResultSynRet,SCHuntMatchRet,CSHuntChat,SCHuntChatRet,CSHuntLoss,SCHuntLossRet,CSHuntPeace,SCHuntPeaceRet} from "./gameProtocols/HuntProtocol"
import {CSMineEnterGame,SCMineEnterGameRet,CSMineAgain,SCMineAgainRet,CSMineExitGame,SCMineExitGameRet,CSMineResultGame,SCMineResultGameRet,CSMinePance,SCMinePanceRet,SCMineResultSynRet,SCMineMatchRet} from "./gameProtocols/MineProtocol"
import {CSBrickEnterGame,SCBrickEnterGameRet,CSBrickAddLines,SCBrickAddLinesRet,CSBrickLost,SCBrickLostRet,SCBrickResultSYNRet,CSBrickExit,SCBrickExitRet,SCBrickMatchRet,CSBrickContinue,SCBrickContinueRet} from "./gameProtocols/brickProtocol"
//龙凤斗
import {SCDragonTigerEnter,SCDragonTigerSyncStage,SCDragonTigerBet,SCDragonTigerTableSync,SCDragonTigerResult,SCDragonTigerReward,SCDragonHistoryRecord,SCDragonQuit} from "./gameProtocols/DPProtocol"

import {CSSaveChefFindPlayer, SCSaveChefFindPlayerRet, CSSaveChefContinueGame, SCSaveChefContinueGameRet, CSSaveChefExit, SCSaveChefExitRet, CSSaveChefResultReceive, SCSaveChefResultReceiveRet, CSChefScore, SCChefScoreRet, CSChefTimeSyn, SCChefTimeSynRet, SCChefCloseRet, SCSaveChefResultSYNRet, SCSaveChefFindTeamRet}  from "./gameProtocols/gamechiefProtocol"
import {CSCircleContinue,CSCircleEnter,CSCircleExit,CSCircleResultRec,CSCircleScoreSyn,CSSmallGameTimeSyn,SCCircleContinueRet,SCCircleEnterRet,SCCircleExitRet,SCCircleMatchRet,SCCircleResultRecRet,SCCircleResultSynRet,SCCircleScoreSynRet,SCSmallGameTimeSynRet }from "./gameProtocols/circleProtocol"
import {CSOhtelloFindPlayer,SCOhtelloFindPlayerRet,CSOhtelloResultReceive,SCOhtelloResultReceiveRet,SCOhtelloResultSynRet,CSOhtelloExit,SCOhtelloExitRet,SCOhtelloMakeTeamRet,CSOhtelloContinueGame, SCOhtelloContinueGameRet,CSOhtelloScore,SCOhtelloScoreRet,CSOhtelloEmoticon,SCOhtelloEmoticonRet,CSOhtelloPeaceGame,SCOhtelloPeaceGameRet} from "./gameProtocols/ohtelloProtocol"
import {CSGame2048FindPlayer,SCGame2048FindPlayerRet,CSGame2048Exit,SCGame2048ExitRet,CSGame2048ContinueGame,SCGame2048ContinueGame,CSGame2048ScoreSYN,SCGame2048ScoreSYNRet,CSGame2048ResultReceive,SCGame2048ResultReceiveRet,CSGame2048ResultSYN,SCGame2048ResultSYNRet,CSGame2048TimeSyn,SCGame2048TimeSynRet,SCGame2048MakeTeamRet} from "./gameProtocols/2048Protocol"

//六角
import {CSHexagonBloodClick, CSHexagonBloodSyn,CSHexagonEnter, SCHexagonEnterRet, CSHexagonChat, SCHexagonChatRet, CSHexagonContinue, CSHexagonExit, CSHexagonResultRec, SCHexagonBloodClickRet, SCHexagonBloodSynRet, SCHexagonContinueRet, SCHexagonExitRet, SCHexagonMatchRet, SCHexagonResultRecRet, SCHexagonResultSynRet} from "./gameProtocols/hexagonProtocol"
//俄罗斯方块
import {CSTetrisFindPlayer, SCTetrisFindPlayerRet,CSTetrisResultReceive, SCTetrisResultReceiveRet, SCTetrisResultSynRet, CSTetrisExit, SCTetrisExitRet, SCTetrisMakeTeamRet, CSTetrisContinueGame,SCTetrisContinueGameRet, CSTetrisScore, SCTetrisScoreRet, CSTetrisMove, SCTetrisMoveRet} from "./gameProtocols/tetrisProtocol";
//城市车行
import {CSCityCarOpen,SCCityCarOpenIRet,SCCityCarStateRet,CSCityCarBet,SCCityCarBetRet,SCCityCarSynRet,SCCityCarDrawLotteryRet,SCCityCarAwardResultsRet,CSCityCarExit,CSCityCarSetUpShopApply,SCCityCarSetUpShopApplyRet,CSCityCarDischargePetition,SCCityCarDischargePetitionRet,CSCityCarBankerList,SCCityCarBankerListRet,CSCityCarWinningRecord,SCCityCarWinningRecordRet,SCCityCarBankerUpdataRet,SCCityCarCloseRet} from "./gameProtocols/CityCarProtocol"
*/
var singleGameProtocol_1 = require("./gameProtocols/singleGameProtocol");
// import { SCForwardClose, SCForwardFindPlayerRet, SCForwardResultSynRet, SCForwardExitRet, SCForwardMakeTeamRet, SCForwardContinueGameRet, SCForwardScoreSynRet, SCForwardResultReceiveRet } from "./gameProtocols/BraveProtocol";
var PacketFiles = /** @class */ (function () {
    function PacketFiles() {
        this.Protocols = {};

    }
    PacketFiles.prototype.WX_ThreeKingFun_qin001wwwwgddww = function () {
        var aaa = 1;
        var bbb = 2;
        var ccc = 3;
        cc.log("aaa + bbb = ", aaa + bbb);
        return aaa + bbb + ccc;
    };
    PacketFiles.prototype.getPacketFile = function (id) {
        if (this.Protocols[id] != null) {
            return new this.Protocols[id]();
        }
        else {
            cc.log("did not find protocol, ERROE! id = ", id);
            return null;
        }
    };
    PacketFiles.getInstance = function () {
        if (!this._packetFiles) {
            this._packetFiles = new PacketFiles();
        }
        return this._packetFiles;
    };
    return PacketFiles;
}());
exports.default = PacketFiles;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PacketFiles.js.map
        