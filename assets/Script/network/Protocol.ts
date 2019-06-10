/**
 * Author: Ma yuan
 * Date: 2018.10.17
 * CopyRight:
 * 大厅数据定义
 */
import { Type } from "./Parser";
import PackeParent from "./Packe";

/**
 * 用户登录请求
 */
export class CSLogin extends PackeParent{        


 };

 //登录成功
 export class SCLoginRet extends PackeParent{    

 };

 //-- 进入游戏 
 export class CSEnterGame extends PackeParent{    

 };

 export class SCEnterGame extends PackeParent{    

 };

 //游戏列表
 export class CSGameList extends PackeParent{   

 };
 
 export class GameListV extends PackeParent{   

};

// 服务器游戏列表返回
export class SCGameListRet extends PackeParent{       

};

//心跳
export class CSHeartBeat extends PackeParent{     

};
 
export class SCHeartBeat extends PackeParent{     

};

//匹配用户
export class CSFindPlayer extends PackeParent {
    
}

//服务器踢人维护
export class SCCutLine extends PackeParent {

} 

//判断游戏用户是否在线通知
export class SCNoticePlayersOnline extends PackeParent {

} 

//每日签到
export class CSDailySign extends PackeParent { 

}

//签到返回
export class SCDailySign extends PackeParent {

}
 
//每日签到
export class ItemReturn  extends PackeParent {  


}

export class CSSignInfo extends PackeParent {    

}

//获取签到信息
export class SCSignInfo extends PackeParent {    

}

export class ShowSign extends PackeParent {    

}

export class ShowReward extends PackeParent {    

}

// 转盘
//获取大转盘信息
export class CSBigWheelInfo extends PackeParent {

}

//获取大转盘信息
export class SCBigWheelInfo extends PackeParent {    

}

//摇中转盘
export class CSBigWheelGain extends PackeParent {

}

//转到的概率值
export class SCBigWheelGain extends PackeParent {    

}

export class BigWheelVo extends PackeParent {    

}

//救济金
export class CSRescuesInfo extends PackeParent {

}

export class SCRescuesInfo extends PackeParent {

}

export class CSRescuesGoin extends PackeParent {

}

export class SCRescuesGoin extends PackeParent {

}

export class SCRotateNotice extends PackeParent {

}

//广告看视频
export class CSEnterGameAdvert extends PackeParent {

}

export class SCEnterGameAdvert extends PackeParent{
    StateId       : number = 0;                  
};

//猜你喜欢的游戏
export class CSMiniGameLove extends PackeParent {

}

export class SCMiniGameLove extends PackeParent{

};

//积分同步
export class CSCredit extends PackeParent {

}

export class SCCredit extends PackeParent{

};
