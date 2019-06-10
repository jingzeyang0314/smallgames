var ACK = 0x80000000
var MINIGAME_LOBBY_ID = 0x00880000;
var BASIC_ID 			= 0x00010000;
var LANDLORDS_TABLE_ID= 0x00050000;
var LANDLORDS_ROOM_ID = 0x00070000; 	// 斗地主房间
var MATCH_ID			= 0x00090000;	// 比赛
var DRAGON_TIGER_ID   = 0x00600000;    // 龙虎斗id

var BIGTURNTABLE_ID   = 0x00500000; //大转盘
var WANRENNIUNIU_ID   = 0x00400000;  //万人牛牛
var FRUITS_ID         = 0x00300000;  //水果机
var THREECARDS_ID		= 0x00200000;	// 三张牌基础id

var CITY_CAR_ID		= 0x00800000;	// 城市车行

var CAR_DEALER_ID		= 0x00310000;	// 新城市车行

 
var MERRY_SOULS_ID    = 0x00900000;	// 时来运转

var ARENA_ID          = 0x00280000;	// 擂台赛
var DRAGON_TIGER_ID          = 0x00290000;	// 龙凤斗

var VANISH_BRICK_ID       = 0x00910000;	// 砖块消除
var SQU_ELIMITE_ID        = 0x00920000;	// 方块消除
var JUNGLE_ID             = 0x00950000;	// 斗兽棋
var LAND_MINE_ID          = 0x00930000;	// 扫雷
var RUNNING_CHIPMUNK_ID   = 0x00940000;	// 奔跑吧
var SIXANGLES_ID          = 0x00980000;	// 六角消消
var CIRCLE_ID             = 0x00210000;	// 圈圈消除
var HUNT_ID               = 0x00250000;	// 围猎棋
var GAME2048_ID           = 0x00960000;    // 2048
var SAVECHEF_ID           = 0x00970000;    // 放开那厨师
var SUSHI_ID              = 0x00990000;    //搭寿司
var OHTELL_ID             = 0x00220000;    // 翻转棋
var TNT_ID                = 0x00240000;    //TNT
var TETRIS_ID             = 0x00260000;    //俄罗斯方块
var LINK_ID               = 0x00270000;    //连连看
var FORWARD_ID            = 0x00320000;   //勇往直前


function getHexToInt(hex){
	return parseInt(hex,16);
 }
 

//登陆
export class PacketID {

    WX_ThreeKingFun_qin004fgggff() {
      let aaa = 1
      let bbb = 2
      let ccc = 3
      cc.log("aaa + bbb = ", aaa + bbb)
      return aaa + bbb + ccc
    }
    //登录
    public static _SINA_PACKET_CS_Login_ID = BASIC_ID+1;
    public static _SINA_PACKET_SC_Login_ID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Login_ID).toString(16));

    //进入游戏
    public static _SINA_PACKET_CS_EnterGameID = (BASIC_ID)+ 3;
    public static _SINA_PACKET_SC_EnterGameID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_EnterGameID).toString(16));

    //大厅游戏列表
    public static _SINA_PACKET_CS_GAMELISTID = BASIC_ID + 112;
    public static _SINA_PACKET_SC_GAMELISTIDRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GAMELISTID).toString(16));

    //积分
    public static _SINA_PACKET_CS_CREDIT = BASIC_ID + 269;
    public static _SINA_PACKET_SC_CREDIT = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CREDIT).toString(16));

    //下线通知
    public static _SINA_PACKET_SC_UserOfflineID = PacketID.GetInt((ACK + (BASIC_ID+4)).toString(16));
    //(bit.bor(flag,BASIC_ID+4))

    //心跳
    public static _SINA_PACKET_CS_HeartBeatID = BASIC_ID+5
    public static _SINA_PACKET_SC_HeartBeatID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HeartBeatID).toString(16));
    
    //服务器维护踢人下线
    public static _SINA_PACKET_SC_CutLineID = PacketID.GetInt((ACK + (BASIC_ID+63)).toString(16));
    
    //判断用户是否在线通知
    public static _SINA_PACKET_SC_NoticePlayersOnlineRetID = PacketID.GetInt((ACK + (BASIC_ID+115)).toString(16));
  

    WX_ThreeKingFun_qin004fgggff33() {
      let aaa = 1
      let bbb = 2
      let ccc = 3
      cc.log("aaa + bbb = ", aaa + bbb)
      return aaa + bbb + ccc
    }

    //签到
    public static BASIC_SIGN_IN = BASIC_ID + 28;
    public static BASIC_SIGN_IN_ACK = PacketID.GetInt((ACK + PacketID.BASIC_SIGN_IN).toString(16));

    //签到初始化
    public static BASIC_SIGN_INFO = BASIC_ID + 27;
    public static BASIC_SIGN_INFO_ACK = PacketID.GetInt((ACK + PacketID.BASIC_SIGN_INFO).toString(16));

    //救济金
    public static _SINA_PACKET_CS_RESCUES_INFO_ID = BASIC_ID + 33;
    public static _SINA_PACKET_SC_RESCUES_INFO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_RESCUES_INFO_ID).toString(16));

    public static _SINA_PACKET_CS_RESCUES_GOIN_ID = BASIC_ID + 34;
    public static _SINA_PACKET_SC_RESCUES_GOIN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_RESCUES_GOIN_ID).toString(16));

    //广播推送  走马灯
    public static  _SINA_PACKET_CS_RotateNoticeID =  BASIC_ID+51;
    public static  _SINA_PACKET_SC_RotateNoticeID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_RotateNoticeID).toString(16));
    
    //看微博视频广告进游戏
    public static  _SINA_PACKET_CS_ENTER_GAME_ADVERT_ID =  BASIC_ID+267;
    public static  _SINA_PACKET_SC_ENTER_GAME_ADVERT_ID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_ENTER_GAME_ADVERT_ID).toString(16));

    //最新love的游戏
    public static  _SINA_PACKET_CS_MINI_LOVE_GAME_ID =  BASIC_ID+268;
    public static  _SINA_PACKET_SC_MINI_LOVE_GAME_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MINI_LOVE_GAME_ID).toString(16));
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////-
    //单机小游戏
    //单机游戏开始
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_START_ID = BASIC_ID + 222;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_START_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_START_ID).toString(16));
    
    //单机游戏数据同步
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_SYN_ID = BASIC_ID + 223;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_SYN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SYN_ID).toString(16));
    
    //购买复活
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_LIFE_ID = BASIC_ID + 224;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_LIFE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LIFE_ID).toString(16));

    //排行榜
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_ORDER_ID = BASIC_ID + 225;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_ORDER_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_ORDER_ID).toString(16));

    WX_ThreeKingFun_qin004fgggfrrf() {
      let aaa = 1
      let bbb = 2
      let ccc = 3
      cc.log("aaa + bbb = ", aaa + bbb)
      return aaa + bbb + ccc
    }

    //获取大转盘信息
    public static _SINA_PACKET_CS_BASIC_BIGWHEEL_INFO = BASIC_ID + 226;
    public static _SINA_PACKET_SC_BASIC_BIGWHEEL_INFO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_INFO).toString(16));

    //摇中大转盘
    public static _SINA_PACKET_CS_BASIC_BIGWHEEL_GAIN = BASIC_ID + 227;
    public static _SINA_PACKET_SC_BASIC_BIGWHEEL_GAIN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_BIGWHEEL_GAIN).toString(16));
    
    //排行榜
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_SEND_ID = BASIC_ID + 228;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_SEND_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SEND_ID).toString(16));
    
    //进入武器库界面初始化数据
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_SKIN_ID = BASIC_ID + 244;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_SKIN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_SKIN_ID).toString(16));

    //获得武器同步
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_LOTTERY_ID = BASIC_ID + 245;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_LOTTERY_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LOTTERY_ID).toString(16));

    //更换武器
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_EXCHANGE_ID = BASIC_ID + 246;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_EXCHANGE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_EXCHANGE_ID).toString(16));
    
    //签到
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKIN_ID = BASIC_ID + 242;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_CHECKIN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKIN_ID).toString(16));
    
    //签到信息
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKDAY_ID = BASIC_ID + 243;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_CHECKDAY_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_CHECKDAY_ID).toString(16));
    
    //离线奖励点击翻倍
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_ID = BASIC_ID + 248;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_DOUBLE_ID).toString(16));
    
    WX_ThreeKingFun_qin004fgggfggf() {
      let aaa = 1
      let bbb = 2
      let ccc = 3
      cc.log("aaa + bbb = ", aaa + bbb)
      return aaa + bbb + ccc
    }
    //离线奖励
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_ID = BASIC_ID + 250;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_ID).toString(16));
    
    //领取离线奖励
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_CLICK_ID = BASIC_ID + 251;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_OFFLINE_CLICK_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_OFFLINE_CLICK_ID).toString(16));

    //关卡奖励
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_LEVEL_REWARD_ID = BASIC_ID + 252;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_LEVEL_REWARD_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_LEVEL_REWARD_ID).toString(16));

    //邀请绑定
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_BIND_ID = BASIC_ID + 253;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_BIND_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_BIND_ID).toString(16));

    //邀请好友领取界面
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_INFO_ID = BASIC_ID + 254;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_INFO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_INFO_ID).toString(16));

    //点击领取
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_DRAW_ID = BASIC_ID + 255;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_INVITE_DRAW_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_INVITE_DRAW_ID).toString(16));

    //微信用户信息
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_WX_USERINFO_ID = BASIC_ID + 256;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_WX_USERINFO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_WX_USERINFO_ID).toString(16));

    //兑换钻石
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_ID = BASIC_ID + 265;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_INFO_ID).toString(16));

    //兑换钻石
    public static _SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_ID = BASIC_ID + 266;
    public static _SINA_PACKET_SC_BASIC_SINGLE_GAME_GEM_EXCHANGE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_SINGLE_GAME_GEM_EXCHANGE_ID).toString(16));
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 三国

  //   //玩家进入战场
  //   public static _SINA_PACKET_CS_BASIC_KING_ENTER_ID = BASIC_ID + 229;
  //   public static _SINA_PACKET_SC_BASIC_KING_ENTER_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_ENTER_ID).toString(16));

  //   //玩家钱币同步
  //   public static _SINA_PACKET_CS_BASIC_KING_MONEY_ID = BASIC_ID + 230;
  //   public static _SINA_PACKET_SC_BASIC_KING_MONEY_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_MONEY_ID).toString(16));

  //   //记录玩家的衍生卡标志
  //   public static _SINA_PACKET_CS_BASIC_KING_BRING_ID = BASIC_ID + 231;
  //   public static _SINA_PACKET_SC_BASIC_KING_BRING_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_BRING_ID).toString(16));

  //   //回营
  //   public static _SINA_PACKET_CS_BASIC_KING_BACK_ID = BASIC_ID + 232;
  //   public static _SINA_PACKET_SC_BASIC_KING_BACK_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_BACK_ID).toString(16));

  //   WX_ThreeKingFun_qin004fgssgff() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //出战
  //   public static _SINA_PACKET_CS_BASIC_KING_GO_ID = BASIC_ID + 233;
  //   public static _SINA_PACKET_SC_BASIC_KING_GO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_GO_ID).toString(16));

  //   //遣散
  //   public static _SINA_PACKET_CS_BASIC_KING_DISBAND_ID = BASIC_ID + 234;
  //   public static _SINA_PACKET_SC_BASIC_KING_DISBAND_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_DISBAND_ID).toString(16));

  //   //武将升级
  //   public static _SINA_PACKET_CS_BASIC_KING_GOUP_ID = BASIC_ID + 235;
  //   public static _SINA_PACKET_SC_BASIC_KING_GOUP_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_GOUP_ID).toString(16));

  //   //初级、高级招贤
  //   public static _SINA_PACKET_CS_BASIC_KING_RECRUIT_ID = BASIC_ID + 236;
  //   public static _SINA_PACKET_SC_BASIC_KING_RECRUIT_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_RECRUIT_ID).toString(16));

  //   //酒馆
  //   public static _SINA_PACKET_CS_BASIC_KING_BISTRO_ID = BASIC_ID + 237;
  //   public static _SINA_PACKET_SC_BASIC_KING_BISTRO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_BISTRO_ID).toString(16));

  //   //招募获得武将
  //   public static _SINA_PACKET_CS_BASIC_KING_HERO_ID = BASIC_ID + 238;
  //   public static _SINA_PACKET_SC_BASIC_KING_HERO_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_HERO_ID).toString(16));

  //   //点亮情缘
  //   public static _SINA_PACKET_CS_BASIC_KING_LUCK_ID = BASIC_ID + 239;
  //   public static _SINA_PACKET_SC_BASIC_KING_LUCK_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_LUCK_ID).toString(16));

  //   //情缘列表
  //   public static _SINA_PACKET_CS_BASIC_KING_LIGHTEN_ID = BASIC_ID + 240;
  //   public static _SINA_PACKET_SC_BASIC_KING_LIGHTEN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_LIGHTEN_ID).toString(16));

  //   //点击领取衍生卡
  //   public static _SINA_PACKET_CS_BASIC_KING_GAIN_ID = BASIC_ID + 241;
  //   public static _SINA_PACKET_SC_BASIC_KING_GAIN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_GAIN_ID).toString(16));

  //   WX_ThreeKingFun_qin004fggghhhff() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //武将换位置
  //   public static _SINA_PACKET_CS_BASIC_KING_EXCHANGE_ID = BASIC_ID + 247;
  //   public static _SINA_PACKET_SC_BASIC_KING_EXCHANGE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_EXCHANGE_ID).toString(16));

  //    //主公等级
  //   public static _SINA_PACKET_CS_BASIC_KING_PLAYER_ID = BASIC_ID + 249;
  //   public static _SINA_PACKET_SC_BASIC_KING_PLAYER_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_PLAYER_ID).toString(16));

  //   //判定是不是新手
  //   public static _SINA_PACKET_CS_BASIC_KING_NOVICE_ID = BASIC_ID + 257;
  //   public static _SINA_PACKET_SC_BASIC_KING_NOVICE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_NOVICE_ID).toString(16));
    
  //   //三国排行榜
  //   public static _SINA_PACKET_CS_BASIC_KING_ORDER_ID = BASIC_ID + 258;
  //   public static _SINA_PACKET_SC_BASIC_KING_ORDER_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_ORDER_ID).toString(16));

  //    //三国竞技榜
  //    public static _SINA_PACKET_CS_BASIC_KING_COMPETITION_ID = BASIC_ID + 259;
  //    public static _SINA_PACKET_SC_BASIC_KING_COMPETITION_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_COMPETITION_ID).toString(16));
 
  //   //三国，获得被挑战玩家的武将
  //   public static _SINA_PACKET_CS_BASIC_KING_OTHER_ID = BASIC_ID + 260;
  //   public static _SINA_PACKET_SC_BASIC_KING_OTHER_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_OTHER_ID).toString(16));
  
  //   //三国，挑战结果排序对调
  //   public static _SINA_PACKET_CS_BASIC_KING_CLICK_ID = BASIC_ID + 261;
  //   public static _SINA_PACKET_SC_BASIC_KING_CLICK_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_CLICK_ID).toString(16));

  //    //三国，跑马灯
  //    public static _SINA_PACKET_CS_BASIC_KING_QUEUE_CLICK_ID = BASIC_ID + 262;
  //    public static _SINA_PACKET_SC_BASIC_KING_QUEUE_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_QUEUE_CLICK_ID).toString(16));

  //    //三国，武将品质提升
  //    public static _SINA_PACKET_CS_BASIC_KING_QUALITY_ID = BASIC_ID + 263;
  //    public static _SINA_PACKET_SC_BASIC_KING_QUALITY_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_QUALITY_ID).toString(16));

  //    //三国，兵符兑换武将
  //    public static _SINA_PACKET_CS_BASIC_KING_CONVERT_ID = BASIC_ID + 264;
  //    public static _SINA_PACKET_SC_BASIC_KING_CONVERT_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_CONVERT_ID).toString(16));

  //     //三国，领取钻石
  //   public static _SINA_PACKET_CS_BASIC_KING_CREDIT_ID = BASIC_ID + 270;
  //   public static _SINA_PACKET_SC_BASIC_KING_CREDIT_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_CREDIT_ID).toString(16));

  //    //三国，跳过新手
  //    public static _SINA_PACKET_CS_BASIC_KING_SKIP_ID = BASIC_ID + 271;
  //    public static _SINA_PACKET_SC_BASIC_KING_SKIP_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BASIC_KING_SKIP_ID).toString(16));
 
  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////-

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////-
  //   //搭寿司

  //   WX_ThreeKingFun_qin004fggghhff() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //关闭维护
  //   public static _SINA_PACKET_CS_GameSushi_CloseID = SUSHI_ID + 1;
  //   public static _SINA_PACKET_SC_GameSushi_CloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_CloseID).toString(16));

  //   //进入游戏
  //   public static _SINA_PACKET_CS_GameSushi_FindPlayerID = SUSHI_ID + 2;
  //   public static _SINA_PACKET_SC_GameSushi_FindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_FindPlayerID).toString(16));

  //   //发送结算
  //   public static _SINA_PACKET_CS_GameSushi_Result_ReceiveID = SUSHI_ID + 3;
  //   public static _SINA_PACKET_SC_GameSushi_Result_ReceiveRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_Result_ReceiveID).toString(16));

  //   //同步结算
  //   public static _SINA_PACKET_CS_GameSushi_ResultSYNID = SUSHI_ID + 4;
  //   public static _SINA_PACKET_SC_GameSushi_ResultSYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_ResultSYNID).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_GameSushi_ExitID = SUSHI_ID + 5;
  //   public static _SINA_PACKET_SC_GameSushi_ExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_ExitID).toString(16));

  //   //组队成功
  //   public static _SINA_PACKET_CS_GameSushi_MakeTeamID = SUSHI_ID + 6;
  //   public static _SINA_PACKET_SC_GameSushi_MakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_MakeTeamID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_GameSushi_ContinueID = SUSHI_ID + 7;
  //   public static _SINA_PACKET_SC_GameSushi_ContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_ContinueID).toString(16));

  //   WX_ThreeKingFun_qin004fgggffsww() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //分数变化同步
  //   public static _SINA_PACKET_CS_GameSushi_Score_SYNID = SUSHI_ID + 8;
  //   public static _SINA_PACKET_SC_GameSushi_Score_SYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSushi_Score_SYNID).toString(16));
  //   ////////////////////////////////////////////////////////////////////////////////////////////

  //   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////-
  //   //连连看

  //   //关闭维护
  //   public static _SINA_PACKET_CS_GameLink_CloseID = LINK_ID + 1;
  //   public static _SINA_PACKET_SC_GameLink_CloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_CloseID).toString(16));

  //   //进入游戏
  //   public static _SINA_PACKET_CS_GameLink_FindPlayerID = LINK_ID + 2;
  //   public static _SINA_PACKET_SC_GameLink_FindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_FindPlayerID).toString(16));

  //   //发送结算
  //   public static _SINA_PACKET_CS_GameLink_Result_ReceiveID = LINK_ID + 3;
  //   public static _SINA_PACKET_SC_GameLink_Result_ReceiveRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_Result_ReceiveID).toString(16));

  //   //同步结算
  //   public static _SINA_PACKET_CS_GameLink_ResultSYNID = LINK_ID + 4;
  //   public static _SINA_PACKET_SC_GameLink_ResultSYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_ResultSYNID).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_GameLink_ExitID = LINK_ID + 5;
  //   public static _SINA_PACKET_SC_GameLink_ExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_ExitID).toString(16));

  //   //组队成功
  //   public static _SINA_PACKET_CS_GameLink_MakeTeamID = LINK_ID + 6;
  //   public static _SINA_PACKET_SC_GameLink_MakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_MakeTeamID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_GameLink_ContinueID = LINK_ID + 7;
  //   public static _SINA_PACKET_SC_GameLink_ContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_ContinueID).toString(16));

  //   //分数变化同步
  //   public static _SINA_PACKET_CS_GameLink_Score_SYNID = LINK_ID + 8;
  //   public static _SINA_PACKET_SC_GameLink_Score_SYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameLink_Score_SYNID).toString(16));

  //   /**********************************************************消砖块*********************************************************************/    
  //   //游戏关闭
  //   public static _SINA_PACKET_CS_BrickGameCloseID = VANISH_BRICK_ID + 1;
  //   public static _SINA_PACKET_SC_BrickGameCloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickGameCloseID).toString(16));
    
  //   //进入游戏
  //   public static _SINA_PACKET_CS_BrickEnterGameID = VANISH_BRICK_ID + 2;
  //   public static _SINA_PACKET_SC_BrickEnterGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickEnterGameID).toString(16));

  //   //给对方添加行
  //   public static _SINA_PACKET_CS_BrickAddLinesID = VANISH_BRICK_ID + 3;
  //   public static _SINA_PACKET_SC_BrickAddLinesRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickAddLinesID).toString(16)); 
  //   WX_ThreeKingFun_qin004fgggff1() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //结算接收，发送自己的结算消息 //就是自己游戏结束
  //   public static _SINA_PACKET_CS_BrickLostID = VANISH_BRICK_ID + 4;
  //   public static _SINA_PACKET_SC_BrickLostRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickLostID).toString(16)); 

  //   //结算推送
  //   public static _SINA_PACKET_CS_BrickResult_SYN_ID = VANISH_BRICK_ID + 5;
  //   public static _SINA_PACKET_SC_BrickResult_SYN_RetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickResult_SYN_ID).toString(16)); 
    
  //   //退出
  //   public static _SINA_PACKET_CS_BrickExitID = VANISH_BRICK_ID + 6;
  //   public static _SINA_PACKET_SC_BrickExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickExitID).toString(16)); 

  //   //组队 //匹配
  //   public static _SINA_PACKET_CS_BrickMatchID = VANISH_BRICK_ID + 7;
  //   public static _SINA_PACKET_SC_BrickMatchRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickMatchID).toString(16)); 
  //   //再来一局
  //   public static _SINA_PACKET_CS_BrickContinueID = VANISH_BRICK_ID + 8;
  //   public static _SINA_PACKET_SC_BrickContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_BrickContinueID).toString(16)); 

  //   /**********************************************************斗兽棋*********************************************************************/
  //   //进入游戏
  //   public static _SINA_PACKET_CS_JungleEnterGameID = JUNGLE_ID + 2;
  //   public static _SINA_PACKET_SC_JungleEnterGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleEnterGameID).toString(16));

  //   //位置同步
  //   public static _SINA_PACKET_CS_JunglePosSynID = JUNGLE_ID + 3;
  //   public static _SINA_PACKET_SC_JunglePosSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JunglePosSynID).toString(16));

  //   //结算接受
  //   public static _SINA_PACKET_CS_JungleResultRecID = JUNGLE_ID + 4;
  //   public static _SINA_PACKET_SC_JungleResultRecRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleResultRecID).toString(16));

  //   //结算推送
  //   public static _SINA_PACKET_SC_JungleResultSynRetID = PacketID.GetInt((ACK + JUNGLE_ID + 5).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_JungleExitID = JUNGLE_ID + 6;
  //   public static _SINA_PACKET_SC_JungleExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleExitID).toString(16));

  //   //组队成功推送消息
  //   public static _SINA_PACKET_SC_JungleMatchRetID = PacketID.GetInt((ACK + JUNGLE_ID + 7).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_JungleContinueID = JUNGLE_ID + 8;
  //   public static _SINA_PACKET_SC_JungleContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleContinueID).toString(16));

  //   //求和
  //   public static _SINA_PACKET_CS_JunglePeaceID = JUNGLE_ID + 9;
  //   public static _SINA_PACKET_SC_JunglePeaceRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JunglePeaceID).toString(16));
  //   WX_ThreeKingFun_qin004fggmm() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //认输
  //   public static _SINA_PACKET_CS_JungleLossID = JUNGLE_ID + 10;
  //   public static _SINA_PACKET_SC_JungleLossRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleLossID).toString(16));

  //   //聊天
  //   public static _SINA_PACKET_CS_JungleChatID = JUNGLE_ID + 11;
  //   public static _SINA_PACKET_SC_JungleChatRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_JungleChatID).toString(16));

  //   /**********************************************************围猎棋*********************************************************************/
  //   //进入游戏
  //   public static _SINA_PACKET_CS_HuntFindPlayerID = HUNT_ID + 2;
  //   public static _SINA_PACKET_SC_HuntFindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntFindPlayerID).toString(16));

  //   //结算接受
  //   public static _SINA_PACKET_CS_HuntResultID = HUNT_ID + 3;
  //   public static _SINA_PACKET_SC_HuntResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntResultID).toString(16));

  //   //结算推送
  //   public static _SINA_PACKET_CS_HuntResultSynID = HUNT_ID + 4;
  //   public static _SINA_PACKET_SC_HuntResultSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntResultSynID).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_HuntExitID = HUNT_ID + 5;
  //   public static _SINA_PACKET_SC_HuntExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntExitID).toString(16));

  //   //组队成功推送消息
  //   public static _SINA_PACKET_CS_HuntMakeTeamID = HUNT_ID + 6;
  //   public static _SINA_PACKET_SC_HuntMakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntMakeTeamID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_HuntContinueID = HUNT_ID + 7;
  //   public static _SINA_PACKET_SC_HuntContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntContinueID).toString(16));

  //   //求和
  //   public static _SINA_PACKET_CS_HuntPeaceGameID = HUNT_ID + 8;
  //   public static _SINA_PACKET_SC_HuntPeaceGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntPeaceGameID).toString(16));

  //   WX_ThreeKingFun_qin004fgggff22() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //位移
  //   public static _SINA_PACKET_CS_HuntMoveGameID = HUNT_ID + 9;
  //   public static _SINA_PACKET_SC_HuntMoveGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntMoveGameID).toString(16));

  //   //表情
  //   public static _SINA_PACKET_CS_HuntEmotionID = HUNT_ID + 10;
  //   public static _SINA_PACKET_SC_HuntEmotionRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntEmotionID).toString(16));

  //   //认输
  //   public static _SINA_PACKET_CS_HuntLossID = HUNT_ID + 11;
  //   public static _SINA_PACKET_SC_HuntLossRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_HuntLossID).toString(16));

  //   /**********************************************************扫雷*********************************************************************/
  //   //进入游戏
  //   public static _SINA_PACKET_CS_MineEnterGameID = LAND_MINE_ID + 2;
  //   public static _SINA_PACKET_SC_MineEnterGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MineEnterGameID).toString(16));

  //   //结算请求
  //   public static _SINA_PACKET_CS_MineResultID = LAND_MINE_ID + 3;
  //   public static _SINA_PACKET_SC_MineResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MineResultID).toString(16));

  //   //结算推送
  //   public static _SINA_PACKET_SC_MineResultSynRetID = PacketID.GetInt((ACK + LAND_MINE_ID + 4).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_MineExitGameID = LAND_MINE_ID + 5;
  //   public static _SINA_PACKET_SC_MineExitGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MineExitGameID).toString(16));

  //   //组队成功
  //   public static _SINA_PACKET_SC_MineMatchRetID = PacketID.GetInt((ACK + LAND_MINE_ID + 6).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_MineAgainID = LAND_MINE_ID + 7;
  //   public static _SINA_PACKET_SC_MineAgainRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MineAgainID).toString(16));

  //   //格局同步
  //   public static _SINA_PACKET_CS_MinePanceID = LAND_MINE_ID + 8;
  //   public static _SINA_PACKET_SC_MinePanceRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MinePanceID).toString(16));

  //   //时间同步
  //   public static _SINA_PACKET_CS_MineTimeSynID = LAND_MINE_ID + 9;
  //   public static _SINA_PACKET_SC_MineTimeSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_MineTimeSynID).toString(16));

  //   /**********************************************************方块消除*********************************************************************/    
  //   //进入游戏
  //   public static _SINA_PACKET_CS_SquEnterGameID = SQU_ELIMITE_ID + 2;
  //   public static _SINA_PACKET_SC_SquEnterGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SquEnterGameID).toString(16));

  //   //进入游戏
  //   public static _SINA_PACKET_CS_SquElimiID = SQU_ELIMITE_ID + 3;
  //   public static _SINA_PACKET_SC_SquElimiRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SquElimiID).toString(16));

  //   WX_ThreeKingFun_qin004fgggmm() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //结算请求
  //   public static _SINA_PACKET_CS_SquResultID = SQU_ELIMITE_ID + 4;
  //   public static _SINA_PACKET_SC_SquResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SquResultID).toString(16));

  //   //结算推送
  //   public static _SINA_PACKET_SC_SquResultBackRetID = PacketID.GetInt((ACK + SQU_ELIMITE_ID + 5).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_SquExitGameID = SQU_ELIMITE_ID + 6;
  //   public static _SINA_PACKET_SC_SquExitGameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SquExitGameID).toString(16));

  //   //组队成功
  //   public static _SINA_PACKET_SC_SquMatchRetID = PacketID.GetInt((ACK + SQU_ELIMITE_ID + 7).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_SquAgainID = SQU_ELIMITE_ID + 8;
  //   public static _SINA_PACKET_SC_SquAgainRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SquAgainID).toString(16));

  // /**********************************************************龙凤斗********************************************************************/    
  //   //进入游戏
    
  //   // // 龙虎斗
  //   // //进入游戏
  //   //进入游戏
  //   public static _SINA_PACKET_CS_DragonTigerEnterID = DRAGON_TIGER_ID + 1;
  //   public static _SINA_PACKET_SC_DragonTigerEnterID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerEnterID).toString(16));

  //   // //进入游戏返回
  //   public static _SINA_PACKET_CS_DragonTigerSyncStageID = DRAGON_TIGER_ID + 2;
  //   public static _SINA_PACKET_SC_DragonTigerSyncStageID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerSyncStageID).toString(16));

  //   // //玩家压注
  //   public static _SINA_PACKET_CS_DragonTigerBetID = DRAGON_TIGER_ID + 3;
  //   public static _SINA_PACKET_SC_DragonTigerBetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerBetID).toString(16));

  //   // //刷新棋牌桌面上的信息
  //   public static _SINA_PACKET_CS_DragonTigerTableSyncID = DRAGON_TIGER_ID + 4;
  //   public static _SINA_PACKET_SC_DragonTigerTableSyncID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerTableSyncID).toString(16));
  //   // //开牌结果
  //   public static _SINA_PACKET_CS_DragonTigerResultID = DRAGON_TIGER_ID + 5;
  //   public static _SINA_PACKET_SC_DragonTigerResultID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerResultID).toString(16));

  //   // //结算
  //   public static _SINA_PACKET_CS_DragonTigerRewardID = DRAGON_TIGER_ID + 6;
  //   public static _SINA_PACKET_SC_DragonTigerRewardID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonTigerRewardID).toString(16));

  //   // //走势申请
  //   public static _SINA_PACKET_CS_DragonHistoryRecordID = DRAGON_TIGER_ID + 7;
  //   public static _SINA_PACKET_SC_DragonHistoryRecordID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonHistoryRecordID).toString(16));
   
  //   // //申请退出
  //   public static _SINA_PACKET_CS_DragonQuitID = DRAGON_TIGER_ID + 8;
  //   public static _SINA_PACKET_SC_DragonQuitID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonQuitID).toString(16));

  //   // ////龙虎斗赠送金币 //桃李卡
  //   public static _SINA_PACKET_CS_DragonPresentID = DRAGON_TIGER_ID + 9;
  //   public static _SINA_PACKET_SC_DragonPresentRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_DragonPresentID).toString(16));

  //   /**********************************************************放开那厨师*********************************************************************/    
  //   //关闭维护
  //   public static _SINA_PACKET_CS_GameSaveChef_CloseID = SAVECHEF_ID + 1;
  //   public static _SINA_PACKET_SC_GameSaveChef_CloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_CloseID).toString(16));

  //   WX_ThreeKingFun_qin004fgggffsss3() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //进入游戏
  //   public static _SINA_PACKET_CS_GameSaveChef_FindPlayerID = SAVECHEF_ID + 2;
  //   public static _SINA_PACKET_SC_GameSaveChef_FindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_FindPlayerID).toString(16));

  //   //发送结算
  //   public static _SINA_PACKET_CS_GameSaveChef_ResultID = SAVECHEF_ID + 3;
  //   public static _SINA_PACKET_SC_GameSaveChef_ResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_ResultID).toString(16));

  //   //同步结算
  //   public static _SINA_PACKET_CS_GameSaveChef_ResultSYNID = SAVECHEF_ID + 4;
  //   public static _SINA_PACKET_SC_GameSaveChef_ResultSYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_ResultSYNID).toString(16));

  //   //退出
  //   public static _SINA_PACKET_CS_GameSaveChef_ExitID = SAVECHEF_ID + 5;
  //   public static _SINA_PACKET_SC_GameSaveChef_ExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_ExitID).toString(16));

  //   //组队成功
  //   public static _SINA_PACKET_CS_GameSaveChef_FindTeamID = SAVECHEF_ID + 6;
  //   public static _SINA_PACKET_SC_GameSaveChef_FindTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_FindTeamID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_GameSaveChef_ContinueID = SAVECHEF_ID + 7;
  //   public static _SINA_PACKET_SC_GameSaveChef_ContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_ContinueID).toString(16));

  //   //分数变化同步
  //   public static _SINA_PACKET_CS_GameSaveChef_ChefScoreID = SAVECHEF_ID + 8;
  //   public static _SINA_PACKET_SC_GameSaveChef_ChefScoreRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_ChefScoreID).toString(16));

  //   //时间同步
  //   public static _SINA_PACKET_CS_GameSaveChef_TimeSynID = SAVECHEF_ID + 9;
  //   public static _SINA_PACKET_SC_GameSaveChef_TimeSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameSaveChef_TimeSynID).toString(16));

  //   /**********************************************************翻转棋*********************************************************************/    
  //   //进入游戏
  //   public static _SINA_PACKET_CS_TURN_FINDPLAYERID = OHTELL_ID + 2;
  //   public static _SINA_PACKET_SC_TURN_FINDPLAYERRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_FINDPLAYERID).toString(16));

  //   //结算接受
  //   public static _SINA_PACKET_CS_TURN_RESULTRECEIVEID = OHTELL_ID + 3;
  //   public static _SINA_PACKET_SC_TURN_RESULTRECEIVERETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_RESULTRECEIVEID).toString(16));
    
  //   //结算推送
  //   public static _SINA_PACKET_CS_TURN_RESULTSYNID = OHTELL_ID + 4;
  //   public static _SINA_PACKET_SC_TURN_RESULTSYNRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_RESULTSYNID).toString(16));

  //   WX_ThreeKingFun_qin004fgggffmg() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //退出
  //   public static _SINA_PACKET_CS_TURN_EXITID = OHTELL_ID + 5;
  //   public static _SINA_PACKET_SC_TURN_EXITRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_EXITID).toString(16));
    
  //   //组队成功推送消息
  //   public static _SINA_PACKET_CS_TURN_MAKETEAMID = OHTELL_ID + 6;
  //   public static _SINA_PACKET_SC_TURN_MAKETEAMRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_MAKETEAMID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_TURN_CONTINUEGAMEID = OHTELL_ID + 7;
  //   public static _SINA_PACKET_SC_TURN_CONTINUEGAMERETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_CONTINUEGAMEID).toString(16));
  
  //   //分数变化时同步
  //   public static _SINA_PACKET_CS_TURN_SCOREID = OHTELL_ID + 8;
  //   public static _SINA_PACKET_SC_TURN_SCORERETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_SCOREID).toString(16));

  //   //发送表情
  //   public static _SINA_PACKET_CS_TURN_EMOTICONID = OHTELL_ID + 9;
  //   public static _SINA_PACKET_SC_TURN_EMOTICONRETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_EMOTICONID).toString(16));

  //   //求和
  //   public static _SINA_PACKET_CS_TURN_PEACEGAMEID = OHTELL_ID + 10;
  //   public static _SINA_PACKET_SC_TURN_PEACEGAMERETID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_TURN_PEACEGAMEID).toString(16));
    

  //    /**********************************************************圈圈消除*********************************************************************/    
  //   //findPlayer进入游戏 
  //   public static _SINA_PACKET_CS_CircleFindPlayerID = CIRCLE_ID + 2;
  //   public static _SINA_PACKET_SC_CircleFindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleFindPlayerID).toString(16));

  //    //结算接受
  //    public static _SINA_PACKET_CS_CircleResultID = CIRCLE_ID + 3;
  //    public static _SINA_PACKET_SC_CircleResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleResultID).toString(16));

  //    //结算推送
  //    public static _SINA_PACKET_CS_CircleResultSynID = CIRCLE_ID + 4;
  //    public static _SINA_PACKET_SC_CircleResultSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleResultSynID).toString(16));
    
  //   //退出
  //   public static _SINA_PACKET_CS_CircleExitID = CIRCLE_ID + 5;
  //   public static _SINA_PACKET_SC_CircleExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleExitID).toString(16));

  //   //组队
  //   public static _SINA_PACKET_CS_CircleMakeTeamID = CIRCLE_ID + 6;
  //   public static _SINA_PACKET_SC_CircleMakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleMakeTeamID).toString(16));

  //   //再来一局
  //   public static _SINA_PACKET_CS_CircleContinueID = CIRCLE_ID + 7;
  //   public static _SINA_PACKET_SC_CircleContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleContinueID).toString(16));
  
  //   //分数变化时同步
  //   public static _SINA_PACKET_CS_CircleScoreID = CIRCLE_ID + 8;
  //   public static _SINA_PACKET_SC_CircleScoreID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleScoreID).toString(16));

  //   //时间
  //   public static _SINA_PACKET_CS_CircleTimeID = CIRCLE_ID + 9;
  //   public static _SINA_PACKET_SC_CircleTimeRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CircleTimeID).toString(16));

  //   WX_ThreeKingFun_qin004fgggffsdsd() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   /****************************************************************************** 2048*/
  //       ////2048游戏
  //       ////关闭维护
  //   public static _SINA_PACKET_CS_Game2048_CloseID = GAME2048_ID + 1;
  //   public static  _SINA_PACKET_SC_Game2048_CloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_CloseID).toString(16));

  //   ////进入游戏
  //   public static _SINA_PACKET_CS_Game2048_Find_PlayerID = GAME2048_ID + 2;
  //   public static _SINA_PACKET_SC_Game2048_Find_PlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Find_PlayerID).toString(16));
    

  //   ////发送结算 //到达2048
  //   public static _SINA_PACKET_CS_Game2048_Result_ReceiveID = GAME2048_ID + 3;
  //   public static _SINA_PACKET_SC_Game2048_Result_ReceiveRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Result_ReceiveID).toString(16));


  //   ////结算推送
  //   public static _SINA_PACKET_CS_Game2048_Result_SYNID = GAME2048_ID + 4;
  //   public static _SINA_PACKET_SC_Game2048_Result_SYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Result_SYNID).toString(16));

  //   ////退出
  //   public static _SINA_PACKET_CS_Game2048_EXITID = GAME2048_ID + 5;
  //   public static _SINA_PACKET_SC_Game2048_EXITRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_EXITID).toString(16));


  //   ////组队成功推送
  //   public static _SINA_PACKET_CS_Game2048_Make_TeamID = GAME2048_ID + 6;
  //   public static _SINA_PACKET_SC_Game2048_Make_TeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Make_TeamID).toString(16));


  //   ////再来一局
  //   public static _SINA_PACKET_CS_Game2048_Continue_GameID = GAME2048_ID + 7;
  //   public static _SINA_PACKET_SC_Game2048_Continue_GameRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Continue_GameID).toString(16));


  //   ////分数变化同步
  //   public static _SINA_PACKET_CS_Game2048_Score_SYNID = GAME2048_ID + 8;
  //   public static _SINA_PACKET_SC_Game2048_Score_SYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_Score_SYNID).toString(16));

  //   ////时间同步
  //   public static _SINA_PACKET_CS_Game2048_TimeSynID = GAME2048_ID + 9;
  //   public static _SINA_PACKET_SC_Game2048_TimeSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_Game2048_TimeSynID).toString(16));


  //   ////////////////////////////////////////////////////////////////////////////////////////////////////-
  //   //六角消消
  //   //进入游戏
  //   public static _SINA_PACKET_CS_SixFindPlayerID = SIXANGLES_ID + 2;
  //   public static _SINA_PACKET_SC_SixFindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixFindPlayerID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixFindPlayerID))

  //   //结算接受
  //   public static _SINA_PACKET_CS_SixResultID = SIXANGLES_ID + 3;
  //   public static _SINA_PACKET_SC_SixResultRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixResultID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixResultID))

  //   //结算推送
  //   public static _SINA_PACKET_CS_SixResultSynID = SIXANGLES_ID + 4;
  //   public static _SINA_PACKET_SC_SixResultSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixResultSynID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixResultSynID))
  //   WX_ThreeKingFun_qin004fgggswwff() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   //退出
  //   public static _SINA_PACKET_CS_SixExitID = SIXANGLES_ID + 5;
  //   public static _SINA_PACKET_SC_SixExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixExitID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixExitID))

  //   //组队成功推送消息
  //   public static _SINA_PACKET_CS_SixMakeTeamID = SIXANGLES_ID + 6;
  //   public static _SINA_PACKET_SC_SixMakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixMakeTeamID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixMakeTeamID))

  //   //再来一局
  //   public static _SINA_PACKET_CS_SixContinueID = SIXANGLES_ID + 7;
  //   public static _SINA_PACKET_SC_SixContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixContinueID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixContinueID))

  //   //血量同步
  //   public static _SINA_PACKET_CS_SixBloodID = SIXANGLES_ID + 8;
  //   public static _SINA_PACKET_SC_SixBloodRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixBloodID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixBloodID))

  //   //点击获取色块
  //   public static _SINA_PACKET_CS_SixBlockClickID = SIXANGLES_ID + 9;
  //   public static _SINA_PACKET_SC_SixBlockClickRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixBlockClickID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixBlockClickID))

  //   //发表情
  //   public static _SINA_PACKET_CS_SixEmotionID = SIXANGLES_ID + 10;
  //   public static _SINA_PACKET_SC_SixEmotionRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_SixEmotionID).toString(16));
  //   //(bit.bor(flag,_SINA_PACKET_CS_SixEmotionID))


  // ////////////////////////////////////////////////////////////////////////////////////////////////////-
  // //俄罗斯方块

  // //进入游戏
  // public static _SINA_PACKET_CS_GameTetris_FindPlayerID = TETRIS_ID + 2;
  // public static _SINA_PACKET_SC_GameTetris_FindPlayerRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_FindPlayerID).toString(16));

  // //发送结算
  // public static _SINA_PACKET_CS_GameTetris_Result_ReceiveID = TETRIS_ID + 3;
  // public static _SINA_PACKET_SC_GameTetris_Result_ReceiveRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_Result_ReceiveID).toString(16));

  // //同步结算
  // public static _SINA_PACKET_CS_GameTetris_ResultSYNID = TETRIS_ID + 4;
  // public static _SINA_PACKET_SC_GameTetris_ResultSYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_ResultSYNID).toString(16));

  // //退出
  // public static _SINA_PACKET_CS_GameTetris_ExitID = TETRIS_ID + 5;
  // public static _SINA_PACKET_SC_GameTetris_ExitRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_ExitID).toString(16));

  // //组队成功
  // public static _SINA_PACKET_CS_GameTetris_MakeTeamID = TETRIS_ID + 6;
  // public static _SINA_PACKET_SC_GameTetris_MakeTeamRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_MakeTeamID).toString(16));

  // //再来一局
  // public static _SINA_PACKET_CS_GameTetris_ContinueID = TETRIS_ID + 7;
  // public static _SINA_PACKET_SC_GameTetris_ContinueRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_ContinueID).toString(16));
  // WX_ThreeKingFun_qin004fgggaaaff() {
  //   let aaa = 1
  //   let bbb = 2
  //   let ccc = 3
  //   cc.log("aaa + bbb = ", aaa + bbb)
  //   return aaa + bbb + ccc
  // }
  // //分数变化同步
  // public static _SINA_PACKET_CS_GameTetris_Score_SYNID = TETRIS_ID + 8;
  // public static _SINA_PACKET_SC_GameTetris_Score_SYNRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_Score_SYNID).toString(16));

  // //位置同步
  // public static _SINA_PACKET_CS_GameTetris_MoveID = TETRIS_ID + 9;
  // public static _SINA_PACKET_SC_GameTetris_MoveRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_MoveID).toString(16));

  // //时间同步
  // public static _SINA_PACKET_CS_GameTetris_TimeID = TETRIS_ID + 10;
  // public static _SINA_PACKET_SC_GameTetris_TimeRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_GameTetris_TimeID).toString(16));
  // ////////////////////////////////////////////////////////////////////////////////////////////////////-

  //   /****************************************************************************** 城市车行*/
  //   //进入城市车行
  //   public static _SINA_PACKET_CS_CityCarOpenID = CAR_DEALER_ID + 1;
  //   public static _SINA_PACKET_SC_CityCarOpenIRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarOpenID).toString(16)); 
  //   //状态推送
  //   public static _SINA_PACKET_CS_CityCarStateID = CAR_DEALER_ID + 2;
  //   public static _SINA_PACKET_SC_CityCarStateRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarStateID).toString(16)); 
  //   //Bet下注
  //   public static _SINA_PACKET_CS_CityCarBetID = CAR_DEALER_ID + 3;
  //   public static _SINA_PACKET_SC_CityCarBetRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarBetID).toString(16));
  //   //车行状态同步推送
  //   public static _SINA_PACKET_CS_CityCarSynID = CAR_DEALER_ID + 4;
  //   public static _SINA_PACKET_SC_CityCarSynRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarSynID).toString(16));
  //   //摇奖开奖抽奖推送
  //   public static _SINA_PACKET_CS_CityCarDrawLotteryID = CAR_DEALER_ID + 5;
  //   public static _SINA_PACKET_SC_CityCarDrawLotteryRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarDrawLotteryID).toString(16)); 
  //   //中奖结算推送
  //   public static _SINA_PACKET_CS_CityCarAwardResultsID = CAR_DEALER_ID + 6;
  //   public static _SINA_PACKET_SC_CityCarAwardResultsRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarAwardResultsID).toString(16));
  //   //退出车行
  //   public static _SINA_PACKET_CS_CityCarExitID = CAR_DEALER_ID + 7;
  //     //开店申请
  //   public static _SINA_PACKET_CS_CityCarSetUpShopApplyID = CAR_DEALER_ID + 9;
  //   public static _SINA_PACKET_SC_CityCarSetUpShopApplyRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarSetUpShopApplyID).toString(16));
  //   //开店撤销申请
  //   public static _SINA_PACKET_CS_CityCarDischargePetitionID = CAR_DEALER_ID + 10;
  //   public static _SINA_PACKET_SC_CityCarDischargePetitionRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarDischargePetitionID).toString(16));
  //   //庄家列表
  //   public static _SINA_PACKET_CS_CityCarBankerListID = CAR_DEALER_ID + 11;
  //   public static _SINA_PACKET_SC_CityCarBankerListRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarBankerListID).toString(16)); 
  //   //中奖纪录
  //   public static _SINA_PACKET_CS_CityCarWinningRecordID = CAR_DEALER_ID + 12;
  //   public static _SINA_PACKET_SC_CityCarWinningRecordRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarWinningRecordID).toString(16));
  //   //庄家信息更新推送
  //   public static _SINA_PACKET_CS_CityCarBankerUpdataID = CAR_DEALER_ID + 13;
  //   public static _SINA_PACKET_SC_CityCarBankerUpdataRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarBankerUpdataID).toString(16));
  //   WX_ThreeKingFun_qin004fgggwwff() {
  //     let aaa = 1
  //     let bbb = 2
  //     let ccc = 3
  //     cc.log("aaa + bbb = ", aaa + bbb)
  //     return aaa + bbb + ccc
  //   }
  //   public static _SINA_PACKET_CS_CityCarCloseID = CAR_DEALER_ID + 14;
  //   public static _SINA_PACKET_SC_CityCarCloseRetID = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CityCarCloseID).toString(16));
    
  //   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   //勇往直前
  //   //关闭维护 
  //   public static _SINA_PACKET_CS_FORWARD_GMCLOSE  = FORWARD_ID + 1;
  //   public static _SINA_PACKET_SC_FORWARD_GMCLOSE  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_GMCLOSE).toString(16)); 

  //   //进入游戏
  //   public static _SINA_PACKET_CS_FORWARD_FIND_PLAYER  = FORWARD_ID + 2;
  //   public static _SINA_PACKET_SC_FORWARD_FIND_PLAYER  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_FIND_PLAYER).toString(16)); 

  //   //结算接受
  //   public static _SINA_PACKET_CS_FORWARD_RESULT_RECEIVE  = FORWARD_ID + 3;
  //   public static _SINA_PACKET_SC_FORWARD_RESULT_RECEIVE  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_RESULT_RECEIVE).toString(16)); 

  //   //结算推送
  //   public static _SINA_PACKET_CS_FORWARD_RESULT_SYN  = FORWARD_ID + 4;
  //   public static _SINA_PACKET_SC_FORWARD_RESULT_SYN  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_RESULT_SYN).toString(16)); 

  //   //退出
  //   public static _SINA_PACKET_CS_FORWARD_EXIT  = FORWARD_ID + 5;
  //   public static _SINA_PACKET_SC_FORWARD_EXIT  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_EXIT).toString(16)); 

  //   //组队成功推送消息
  //   public static _SINA_PACKET_CS_FORWARD_MAKE_TEAM  = FORWARD_ID + 6;
  //   public static _SINA_PACKET_SC_FORWARD_MAKE_TEAM  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_FORWARD_MAKE_TEAM).toString(16)); 

  //   //再来一局
  //   public static _SINA_PACKET_CS_CONTINUE_GAME  = FORWARD_ID + 7;
  //   public static _SINA_PACKET_SC_CONTINUE_GAME  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CONTINUE_GAME).toString(16)); 

  //   //分数变化时同步
  //   public static _SINA_PACKET_CS_CONTINUE_SCORE  = FORWARD_ID + 8;
  //   public static _SINA_PACKET_SC_CONTINUE_SCORE  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CONTINUE_SCORE).toString(16)); 

  //   //倒计时同步
  //   public static _SINA_PACKET_CS_CONTINUE_TIME  = FORWARD_ID + 9
  //   public static _SINA_PACKET_SC_CONTINUE_TIME  = PacketID.GetInt((ACK + PacketID._SINA_PACKET_CS_CONTINUE_TIME).toString(16)); 


    WX_ThreeKingFun_qin004fggwwgff() {
      let aaa = 1
      let bbb = 2
      let ccc = 3
      cc.log("aaa + bbb = ", aaa + bbb)
      return aaa + bbb + ccc
    }
    public static GetInt (value) {
      let su = parseInt(PacketID.transform(value), 2);
        return parseInt(PacketID.transform(value), 2);
    }

    //十六进制转换成有符号十进制方法
    public static transform (i)  {
        var two = parseInt(i, 16).toString(2);
        var bitNum=i.length*4;
        if (two.length < bitNum) {
          while (two.length < bitNum) {
            two = "0" + two;
          }
        }
       
        if (two.substring(0, 1) == "0") {
          two = parseInt(two, 2).toString(2);
       
          return two;
        } else {
          let two_unsign = "";
          two = (parseInt(two, 2) - 1).toString(2);      
          two_unsign = two.substring(1, bitNum);
          two_unsign = two_unsign.replace(/0/g, "z");
          two_unsign = two_unsign.replace(/1/g, "0");
          two_unsign = two_unsign.replace(/z/g, "1");
          two = parseInt(("-" + two_unsign), 2).toString(2);
       
         return two;
        }
      }
      
      WX_ThreeKingFun_qin004fgggffqq() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
      }
}
