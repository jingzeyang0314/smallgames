//单机小游戏协议

import { Type } from "../Parser"
import PackeParent from "../Packe"

//道具
export class StagePropVo extends PackeParent{    

};

//游戏开始
export class CSSingleGameStart extends PackeParent{

};

export class SCSingleGameStart extends PackeParent{

};

//购买复活
export class CSSingleGameLife extends PackeParent{

};

export class SCSingleGameLife extends PackeParent{

};
	
//信息同步
export class CSSingleGameSyn extends PackeParent{

};

export class SCSingleGameSyn extends PackeParent{

};

//排行榜
export class CSSingleGameOrder extends PackeParent{

};

export class PlayerOrderVo extends PackeParent{    

};

export class SCSingleGameOrder extends PackeParent{

};

//微信次数
export class CSSingleGameSend extends PackeParent{

};

export class SCSingleGameSend extends PackeParent{

};

//武器库
//进入武器库界面初始化数据
export class CSSingleGameSkin extends PackeParent{


export class SCSingleGameSkin extends PackeParent{


//获得武器同步
export class CSSingleGameLottery extends PackeParent{

};

export class SCSingleGameLottery extends PackeParent{

};

//更换武器
export class CSSingleGameExchange extends PackeParent{

};

export class SCSingleGameExchange extends PackeParent{
    StateId       : number = 0;                  

};

//单机游戏签到信息获取
export class SingleGameShowCheck extends PackeParent{

};

export class CSSingleGameCheckIn extends PackeParent{

};

export class SCSingleGameCheckIn extends PackeParent{

};

//签到
export class CSSingleGameCheckDay extends PackeParent{
    
};

export class SCSingleGameCheckDay extends PackeParent{

};

//离线奖励
//领取离线奖励
export class CSSingleGameOffLine extends PackeParent{

};

export class SCSingleGameOffLine extends PackeParent{

};

//领取离线奖励
export class CSSingleGameClick extends PackeParent{

};

export class SCSingleGameClick extends PackeParent{

};


//离线翻倍
export class CSSingleGameDouble extends PackeParent{

};

export class SCSingleGameDouble extends PackeParent{

};

//关卡奖励
export class CSSingleGameRes extends PackeParent{

};

export class SCSingleGameRes extends PackeParent{

};

//邀请绑定
export class CSSingleGameInviteBind extends PackeParent{

};

export class SCSingleGameInviteBind extends PackeParent{

};

//邀请好友领取界面
export class InvitePlayerVo extends PackeParent{

};

export class InviteTaskVo  extends PackeParent{

};

export class CSSingleGameInviteInfo extends PackeParent{

};

export class SCSingleGameInviteInfo extends PackeParent{

};

//领取
export class CSSingleGameInviteDraw extends PackeParent{


};

export class SCSingleGameInviteDraw extends PackeParent{

};

//微信存储玩家信息
export class CSWXUserInfo extends PackeParent{

};

export class SCWXUserInfo extends PackeParent{

};

//用微博积分/看视频广告赚钻石
export class CSSingleExchangeInfo extends PackeParent{

};

export class SCSingleExchangeInfo extends PackeParent{

};

export class CSSingleExchange extends PackeParent{

};

export class SCSingleExchange extends PackeParent{

};
