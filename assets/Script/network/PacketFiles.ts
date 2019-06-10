
import {PacketID} from "./PacketID"
import {CSLogin, SCLoginRet, CSEnterGame, SCEnterGame, CSGameList, SCGameListRet, CSFindPlayer, CSHeartBeat, SCHeartBeat, SCNoticePlayersOnline, CSRescuesInfo, SCRescuesInfo, CSRescuesGoin, SCRescuesGoin, SCRotateNotice, SCEnterGameAdvert, CSEnterGameAdvert, CSCredit, SCCredit} from "./Protocol"
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
import {CSSingleGameStart, SCSingleGameStart, CSSingleGameLife, SCSingleGameLife, CSSingleGameSyn, SCSingleGameSyn, CSSingleGameOrder, SCSingleGameOrder, CSSingleGameSend, SCSingleGameSend, CSSingleGameSkin, SCSingleGameSkin, CSSingleGameLottery, SCSingleGameLottery, CSSingleGameExchange, SCSingleGameExchange, CSSingleGameCheckIn, CSSingleGameCheckDay, SCSingleGameCheckDay, CSSingleGameDouble, SCSingleGameDouble, CSSingleGameOffLine, SCSingleGameOffLine, CSSingleGameClick, SCSingleGameClick, CSSingleGameRes, SCSingleGameRes, CSSingleGameInviteBind, SCSingleGameInviteBind, CSSingleGameInviteInfo, SCSingleGameInviteInfo, CSSingleGameInviteDraw, SCSingleGameInviteDraw, CSWXUserInfo, SCWXUserInfo, CSSingleExchangeInfo, SCSingleExchangeInfo, CSSingleExchange, SCSingleExchange} from "./gameProtocols/singleGameProtocol"
// import { SCForwardClose, SCForwardFindPlayerRet, SCForwardResultSynRet, SCForwardExitRet, SCForwardMakeTeamRet, SCForwardContinueGameRet, SCForwardScoreSynRet, SCForwardResultReceiveRet } from "./gameProtocols/BraveProtocol";


export default class PacketFiles {

    Protocols:any = {}

    constructor() {

        //common
        this.Protocols[PacketID._SINA_PACKET_CS_HeartBeatID] = CSHeartBeat
        this.Protocols[PacketID._SINA_PACKET_SC_HeartBeatID] = SCHeartBeat
        this.Protocols[PacketID._SINA_PACKET_CS_Login_ID] = CSLogin
        this.Protocols[PacketID._SINA_PACKET_SC_Login_ID] = SCLoginRet
        this.Protocols[PacketID._SINA_PACKET_CS_EnterGameID] = CSEnterGame
        this.Protocols[PacketID._SINA_PACKET_SC_EnterGameID] = SCEnterGame
        this.Protocols[PacketID._SINA_PACKET_SC_CutLineID] = SCNoticePlayersOnline
        this.Protocols[PacketID._SINA_PACKET_SC_RotateNoticeID] = SCRotateNotice
        this.Protocols[PacketID._SINA_PACKET_CS_CREDIT] = CSCredit
        this.Protocols[PacketID._SINA_PACKET_SC_CREDIT] = SCCredit

        //救济金
        this.Protocols[PacketID._SINA_PACKET_CS_RESCUES_INFO_ID] = CSRescuesInfo
        this.Protocols[PacketID._SINA_PACKET_SC_RESCUES_INFO_RetID] = SCRescuesInfo
        this.Protocols[PacketID._SINA_PACKET_CS_RESCUES_GOIN_ID] = CSRescuesGoin
        this.Protocols[PacketID._SINA_PACKET_SC_RESCUES_GOIN_RetID] = SCRescuesGoin

        this.Protocols[PacketID._SINA_PACKET_CS_ENTER_GAME_ADVERT_ID] = CSEnterGameAdvert
        this.Protocols[PacketID._SINA_PACKET_SC_ENTER_GAME_ADVERT_ID] = SCEnterGameAdvert

        //单机小游戏
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_START_ID] = CSSingleGameStart
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_START_RetID] = SCSingleGameStart
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SYN_ID] = CSSingleGameSyn
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_SYN_RetID] = SCSingleGameSyn
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LIFE_ID] = CSSingleGameLife
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_LIFE_RetID] = SCSingleGameLife
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_ORDER_ID] = CSSingleGameOrder
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_ORDER_RetID] = SCSingleGameOrder
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SEND_ID] = CSSingleGameSend
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_SEND_RetID] = SCSingleGameSend
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SKIN_ID] = CSSingleGameSkin
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_SKIN_RetID] = SCSingleGameSkin
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LOTTERY_ID] = CSSingleGameLottery
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_LOTTERY_RetID] = SCSingleGameLottery
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_EXCHANGE_ID] = CSSingleGameExchange
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_EXCHANGE_RetID] = SCSingleGameExchange
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKIN_ID] = CSSingleGameCheckIn
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_CHECKIN_RetID] = CSSingleGameCheckIn
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKDAY_ID] = CSSingleGameCheckDay
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_CHECKDAY_RetID] = SCSingleGameCheckDay
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_ID] = CSSingleGameDouble
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_RetID] = SCSingleGameDouble
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_ID] = CSSingleGameOffLine
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_RetID] = SCSingleGameOffLine
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_CLICK_ID] = CSSingleGameClick
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_CLICK_RetID] = SCSingleGameClick
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LEVEL_REWARD_ID] = CSSingleGameRes
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_LEVEL_REWARD_RetID] = SCSingleGameRes
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_BIND_ID] = CSSingleGameInviteBind
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_BIND_RetID] = SCSingleGameInviteBind
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_INFO_ID] = CSSingleGameInviteInfo
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_INFO_RetID] = SCSingleGameInviteInfo
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_DRAW_ID] = CSSingleGameInviteDraw
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_DRAW_RetID] = SCSingleGameInviteDraw
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_WX_USERINFO_ID] = CSWXUserInfo
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_WX_USERINFO_RetID] = SCWXUserInfo
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_ID] = CSSingleExchangeInfo
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_RetID] = SCSingleExchangeInfo
        this.Protocols[PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_ID] = CSSingleExchange
        this.Protocols[PacketID._SINA_PACKET_SC_BASIC_SINGLE_GAME_GEM_EXCHANGE_RetID] = SCSingleExchange

        /*
        //连连看
        this.Protocols[PacketID._SINA_PACKET_CS_GameLink_FindPlayerID] = CSLinkFindPlayer
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_FindPlayerRetID] = SCLinkFindPlayerRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameLink_ContinueID] = CSLinkContinueGame
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_ContinueRetID] = SCLinkContinueGameRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameLink_ExitID] = CSLinkExit
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_ExitRetID] = SCLinkExitRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameLink_Result_ReceiveID] = CSLinkResultReceive
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_Result_ReceiveRetID] = SCLinkResultReceiveRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameLink_Score_SYNID] = CSLinkScoreSyn
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_Score_SYNRetID] = SCLinkScoreSynRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_CloseRetID] = SCLinkCloseRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_ResultSYNRetID] = SCLinkResultSynRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameLink_MakeTeamRetID] = SCLinkMakeTeamRet

        //寿司
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_MakeTeamRetID] = SCBulidHouseMakeTeamRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_FindPlayerRetID] = SCBulidHouseFindPlayerRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_Result_ReceiveRetID] = SCBulidHouseResultReceiveRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_ContinueRetID] = SCBulidHouseContinueGameRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_ResultSYNRetID] = SCBulidHouseResultSynRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_CloseRetID] = SCBulidHouseCloseRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_ExitRetID] = SCBulidHouseExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSushi_Score_SYNRetID] = SCBulidHouseScoreSynRet

        //消砖块 
        this.Protocols[PacketID._SINA_PACKET_CS_BrickEnterGameID] = CSBrickEnterGame
        this.Protocols[PacketID._SINA_PACKET_SC_BrickEnterGameRetID] = SCBrickEnterGameRet
        this.Protocols[PacketID._SINA_PACKET_CS_BrickAddLinesID] = CSBrickAddLines
        this.Protocols[PacketID._SINA_PACKET_SC_BrickAddLinesRetID] = SCBrickAddLinesRet
        this.Protocols[PacketID._SINA_PACKET_CS_BrickLostID] = CSBrickLost
        this.Protocols[PacketID._SINA_PACKET_SC_BrickLostRetID] = SCBrickLostRet
        this.Protocols[PacketID._SINA_PACKET_SC_BrickResult_SYN_RetID] = SCBrickResultSYNRet
        this.Protocols[PacketID._SINA_PACKET_CS_BrickExitID] = CSBrickExit
        this.Protocols[PacketID._SINA_PACKET_SC_BrickExitRetID] = SCBrickExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_BrickMatchRetID] = SCBrickMatchRet
        this.Protocols[PacketID._SINA_PACKET_CS_BrickContinueID] = CSBrickContinue
        this.Protocols[PacketID._SINA_PACKET_SC_BrickContinueRetID] = SCBrickContinueRet
        
        //斗兽棋
        this.Protocols[PacketID._SINA_PACKET_CS_JungleEnterGameID] = CSJungleEnter
        this.Protocols[PacketID._SINA_PACKET_SC_JungleEnterGameRetID] = SCJungleEnterRet
        this.Protocols[PacketID._SINA_PACKET_CS_JunglePosSynID] = CSJunglePosSyn
        this.Protocols[PacketID._SINA_PACKET_SC_JunglePosSynRetID] = SCJunglePosSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_JungleResultRecID] = CSJungleResultRec
        this.Protocols[PacketID._SINA_PACKET_SC_JungleResultRecRetID] = SCJungleResultRecRet
        this.Protocols[PacketID._SINA_PACKET_SC_JungleResultSynRetID] = SCJungleResultSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_JungleExitID] = CSJungleExit
        this.Protocols[PacketID._SINA_PACKET_SC_JungleExitRetID] = SCJungleExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_JungleMatchRetID] = SCJungleMatchRet
        this.Protocols[PacketID._SINA_PACKET_CS_JungleContinueID] = CSJungleContinue
        this.Protocols[PacketID._SINA_PACKET_SC_JungleContinueRetID] = SCJungleContinueRet
        this.Protocols[PacketID._SINA_PACKET_CS_JunglePeaceID] = CSJunglePeace
        this.Protocols[PacketID._SINA_PACKET_SC_JunglePeaceRetID] = SCJunglePeaceRet
        this.Protocols[PacketID._SINA_PACKET_CS_JungleLossID] = CSJungleLoss
        this.Protocols[PacketID._SINA_PACKET_SC_JungleLossRetID] = SCJungleLossRet
        this.Protocols[PacketID._SINA_PACKET_CS_JungleChatID] = CSJungleChat
        this.Protocols[PacketID._SINA_PACKET_SC_JungleChatRetID] = SCJungleChatRet

        //围猎棋
        this.Protocols[PacketID._SINA_PACKET_CS_HuntFindPlayerID] = CSHuntEnter
        this.Protocols[PacketID._SINA_PACKET_SC_HuntFindPlayerRetID] = SCHuntEnterRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntMoveGameID] = CSHuntMoveSyn
        this.Protocols[PacketID._SINA_PACKET_SC_HuntMoveGameRetID] = SCHuntMoveSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntResultID] = CSHuntResultRec
        this.Protocols[PacketID._SINA_PACKET_SC_HuntResultRetID] = SCHuntResultRecRet
        this.Protocols[PacketID._SINA_PACKET_SC_HuntResultSynRetID] = SCHuntResultSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntExitID] = CSHuntExit
        this.Protocols[PacketID._SINA_PACKET_SC_HuntExitRetID] = SCHuntExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_HuntMakeTeamRetID] = SCHuntMatchRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntContinueID] = CSHuntContinue
        this.Protocols[PacketID._SINA_PACKET_SC_HuntContinueRetID] = SCHuntContinueRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntPeaceGameID] = CSHuntPeace
        this.Protocols[PacketID._SINA_PACKET_SC_HuntPeaceGameRetID] = SCHuntPeaceRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntLossID] = CSHuntLoss
        this.Protocols[PacketID._SINA_PACKET_SC_HuntLossRetID] = SCHuntLossRet
        this.Protocols[PacketID._SINA_PACKET_CS_HuntEmotionID] = CSHuntChat
        this.Protocols[PacketID._SINA_PACKET_SC_HuntEmotionRetID] = SCHuntChatRet

        //扫雷
        this.Protocols[PacketID._SINA_PACKET_CS_MineEnterGameID] = CSMineEnterGame
        this.Protocols[PacketID._SINA_PACKET_SC_MineEnterGameRetID] = SCMineEnterGameRet
        this.Protocols[PacketID._SINA_PACKET_CS_MinePanceID] = CSMinePance
        this.Protocols[PacketID._SINA_PACKET_SC_MinePanceRetID] = SCMinePanceRet
        this.Protocols[PacketID._SINA_PACKET_CS_MineResultID] = CSMineResultGame
        this.Protocols[PacketID._SINA_PACKET_SC_MineResultRetID] = SCMineResultGameRet
        this.Protocols[PacketID._SINA_PACKET_SC_MineResultSynRetID] = SCMineResultSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_MineExitGameID] = CSMineExitGame
        this.Protocols[PacketID._SINA_PACKET_SC_MineExitGameRetID] = SCMineExitGameRet
        this.Protocols[PacketID._SINA_PACKET_SC_MineMatchRetID] = SCMineMatchRet
        this.Protocols[PacketID._SINA_PACKET_CS_MineAgainID] = CSMineAgain
        this.Protocols[PacketID._SINA_PACKET_SC_MineAgainRetID] = SCMineAgainRet

        //方块消除
        this.Protocols[PacketID._SINA_PACKET_SC_SquMatchRetID] = SCSquMatchRet
        this.Protocols[PacketID._SINA_PACKET_SC_SquEnterGameRetID] = SCSquEnterGameRet     
        this.Protocols[PacketID._SINA_PACKET_SC_SquAgainRetID] = SCSquAgainRet
        this.Protocols[PacketID._SINA_PACKET_SC_SquExitGameRetID] = SCSquExitGameRet   
        this.Protocols[PacketID._SINA_PACKET_SC_SquResultRetID] = SCSquResultRet
        this.Protocols[PacketID._SINA_PACKET_SC_SquElimiRetID] = SCSquElimiRet   
        this.Protocols[PacketID._SINA_PACKET_SC_SquResultBackRetID] = SCSquResultBackRet
        this.Protocols[PacketID._SINA_PACKET_SC_SquEnterGameRetID] = SCSquEnterGameRet

        //龙凤斗
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerEnterID] = SCDragonTigerEnter
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerSyncStageID] = SCDragonTigerSyncStage
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerBetID] = SCDragonTigerBet
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerTableSyncID] = SCDragonTigerTableSync
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerResultID] = SCDragonTigerResult
        this.Protocols[PacketID._SINA_PACKET_SC_DragonTigerRewardID] = SCDragonTigerReward
        this.Protocols[PacketID._SINA_PACKET_SC_DragonHistoryRecordID] = SCDragonHistoryRecord
        this.Protocols[PacketID._SINA_PACKET_SC_DragonQuitID] = SCDragonQuit

        //放开那厨师
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_FindPlayerID] = CSSaveChefFindPlayer
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_FindPlayerRetID] = SCSaveChefFindPlayerRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_ContinueID] = CSSaveChefContinueGame
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_ContinueRetID] = SCSaveChefContinueGameRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_ExitID] = CSSaveChefExit
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_ExitRetID] = SCSaveChefExitRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_ResultID] = CSSaveChefResultReceive
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_ResultRetID] = SCSaveChefResultReceiveRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_ChefScoreID] = CSChefScore
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_ChefScoreRetID] = SCChefScoreRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_CloseRetID] = SCChefCloseRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_ResultSYNRetID] = SCSaveChefResultSYNRet
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_FindTeamRetID] = SCSaveChefFindTeamRet
        this.Protocols[PacketID._SINA_PACKET_CS_GameSaveChef_TimeSynID] = CSChefTimeSyn
        this.Protocols[PacketID._SINA_PACKET_SC_GameSaveChef_TimeSynRetID] = SCChefTimeSynRet

        //圈圈消除
        this.Protocols[PacketID._SINA_PACKET_CS_CircleContinueID] = CSCircleContinue
        this.Protocols[PacketID._SINA_PACKET_CS_CircleFindPlayerID] = CSCircleEnter
        this.Protocols[PacketID._SINA_PACKET_CS_CircleExitID] = CSCircleExit
        this.Protocols[PacketID._SINA_PACKET_CS_CircleResultID] = CSCircleResultRec
        this.Protocols[PacketID._SINA_PACKET_CS_CircleScoreID] = CSCircleScoreSyn
        this.Protocols[PacketID._SINA_PACKET_CS_CircleTimeID] = CSSmallGameTimeSyn
        this.Protocols[PacketID._SINA_PACKET_SC_CircleContinueRetID] = SCCircleContinueRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleFindPlayerRetID] = SCCircleEnterRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleExitRetID] = SCCircleExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleMakeTeamRetID] = SCCircleMatchRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleResultRetID] = SCCircleResultRecRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleResultSynRetID] = SCCircleResultSynRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleScoreID] = SCCircleScoreSynRet
        this.Protocols[PacketID._SINA_PACKET_SC_CircleTimeRetID] = SCSmallGameTimeSynRet

        //翻转棋
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_FINDPLAYERID] = CSOhtelloFindPlayer
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_FINDPLAYERRETID] = SCOhtelloFindPlayerRet 
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_RESULTRECEIVEID] = CSOhtelloResultReceive
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_RESULTRECEIVERETID] = SCOhtelloResultReceiveRet 
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_RESULTSYNRETID] = SCOhtelloResultSynRet
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_EXITID] = CSOhtelloExit
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_EXITRETID] = SCOhtelloExitRet
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_MAKETEAMRETID] = SCOhtelloMakeTeamRet
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_CONTINUEGAMEID] = CSOhtelloContinueGame
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_CONTINUEGAMERETID] = SCOhtelloContinueGameRet
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_SCOREID] = CSOhtelloScore
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_SCORERETID] = SCOhtelloScoreRet
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_EMOTICONID] = CSOhtelloEmoticon
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_EMOTICONRETID] = SCOhtelloEmoticonRet 
        this.Protocols[PacketID._SINA_PACKET_CS_TURN_PEACEGAMEID] = CSOhtelloPeaceGame
        this.Protocols[PacketID._SINA_PACKET_SC_TURN_PEACEGAMERETID] = SCOhtelloPeaceGameRet

        // 2048
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_Find_PlayerID] = CSGame2048FindPlayer;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Find_PlayerRetID] = SCGame2048FindPlayerRet;
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_EXITID] = CSGame2048Exit;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_EXITRetID] = SCGame2048ExitRet;
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_Continue_GameID] = CSGame2048ContinueGame;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Continue_GameRetID] = SCGame2048ContinueGame;
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_Score_SYNID] = CSGame2048ScoreSYN;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Score_SYNRetID] = SCGame2048ScoreSYNRet;
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_Result_ReceiveID] = CSGame2048ResultReceive;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Result_ReceiveRetID] = SCGame2048ResultReceiveRet;
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_Result_SYNID] = CSGame2048ResultSYN;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Result_SYNRetID] = SCGame2048ResultSYNRet; 
        this.Protocols[PacketID._SINA_PACKET_CS_Game2048_TimeSynID] = CSGame2048TimeSyn;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_TimeSynRetID] = SCSaveChefResultSYNRet;
        this.Protocols[PacketID._SINA_PACKET_SC_Game2048_Make_TeamRetID] = SCGame2048MakeTeamRet;

        //六角消消
        this.Protocols[PacketID._SINA_PACKET_CS_SixBlockClickID] = CSHexagonBloodClick;
        this.Protocols[PacketID._SINA_PACKET_CS_SixBloodID] = CSHexagonBloodSyn;
        this.Protocols[PacketID._SINA_PACKET_CS_SixEmotionID] = CSHexagonChat;
        this.Protocols[PacketID._SINA_PACKET_CS_SixContinueID] = CSHexagonContinue;
        this.Protocols[PacketID._SINA_PACKET_CS_SixFindPlayerID] = CSHexagonEnter;
        this.Protocols[PacketID._SINA_PACKET_CS_SixExitID] = CSHexagonExit;
        this.Protocols[PacketID._SINA_PACKET_CS_SixResultID] = CSHexagonResultRec;
        this.Protocols[PacketID._SINA_PACKET_SC_SixBlockClickRetID] = SCHexagonBloodClickRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixBloodRetID] = SCHexagonBloodSynRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixEmotionRetID] = SCHexagonChatRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixContinueRetID] = SCHexagonContinueRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixFindPlayerRetID] = SCHexagonEnterRet; 
        this.Protocols[PacketID._SINA_PACKET_SC_SixExitRetID] = SCHexagonExitRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixMakeTeamRetID] = SCHexagonMatchRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixResultRetID] = SCHexagonResultRecRet;
        this.Protocols[PacketID._SINA_PACKET_SC_SixResultSynRetID] = SCHexagonResultSynRet;

        //俄罗斯方块 
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_FindPlayerID] = CSTetrisFindPlayer;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_FindPlayerRetID] = SCTetrisFindPlayerRet;
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_Result_ReceiveID] = CSTetrisResultReceive;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_Result_ReceiveRetID] = SCTetrisResultReceiveRet;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_ResultSYNRetID] = SCTetrisResultSynRet;
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_ExitID] = CSTetrisExit;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_ExitRetID] = SCTetrisExitRet;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_MakeTeamRetID] = SCTetrisMakeTeamRet;
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_ContinueID] = CSTetrisContinueGame;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_ContinueRetID] = SCTetrisContinueGameRet;
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_Score_SYNID] = CSTetrisScore;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_Score_SYNRetID] = SCTetrisScoreRet;
        this.Protocols[PacketID._SINA_PACKET_CS_GameTetris_MoveID] = CSTetrisMove;
        this.Protocols[PacketID._SINA_PACKET_SC_GameTetris_MoveRetID] = SCTetrisMoveRet;
  
        
        //城市车行
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarOpenID] = CSCityCarOpen;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarOpenIRetID] = SCCityCarOpenIRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarStateRetID] = SCCityCarStateRet;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarBetID] = CSCityCarBet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarBetRetID] = SCCityCarBetRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarSynRetID] = SCCityCarSynRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarDrawLotteryRetID] = SCCityCarDrawLotteryRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarAwardResultsRetID] = SCCityCarAwardResultsRet;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarExitID] = CSCityCarExit;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarSetUpShopApplyID] = CSCityCarSetUpShopApply;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarSetUpShopApplyRetID] = SCCityCarSetUpShopApplyRet;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarDischargePetitionID] = CSCityCarDischargePetition;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarDischargePetitionRetID] = SCCityCarDischargePetitionRet;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarBankerListID] = CSCityCarBankerList;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarBankerListRetID] = SCCityCarBankerListRet;
        //this.Protocols[PacketID._SINA_PACKET_CS_CityCarWinningRecordID] = CSCityCarWinningRecord;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarWinningRecordRetID] = SCCityCarWinningRecordRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarBankerUpdataRetID] = SCCityCarBankerUpdataRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CityCarCloseRetID] = SCCityCarCloseRet;


        //勇往直前
        this.Protocols[PacketID._SINA_PACKET_SC_FORWARD_FIND_PLAYER] = SCForwardFindPlayerRet;
        this.Protocols[PacketID._SINA_PACKET_SC_FORWARD_RESULT_RECEIVE] = SCForwardResultReceiveRet;
        this.Protocols[PacketID._SINA_PACKET_SC_FORWARD_RESULT_SYN] = SCForwardResultSynRet;
        this.Protocols[PacketID._SINA_PACKET_SC_FORWARD_EXIT] = SCForwardExitRet;
        this.Protocols[PacketID._SINA_PACKET_SC_FORWARD_MAKE_TEAM] = SCForwardMakeTeamRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CONTINUE_GAME] = SCForwardContinueGameRet;
        this.Protocols[PacketID._SINA_PACKET_SC_CONTINUE_SCORE] = SCForwardScoreSynRet;
        */
    }

    WX_ThreeKingFun_qin001wwwwgddww() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    getPacketFile (id:number) {
        if (this.Protocols[id] != null) {
            return new this.Protocols[id]()
        } else {
            cc.log("did not find protocol, ERROE! id = ", id)
            return null
        }
    }

    public static _packetFiles:PacketFiles;

    public static getInstance(): PacketFiles{
        if(!this._packetFiles){
            this._packetFiles = new PacketFiles()
        }
        return this._packetFiles
    }
}
