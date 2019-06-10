export class GlbData{
    public static  HEAD_URL = "http://images.qp.games.weibo.com/";
}
// 结果data
export class GameResultData{
    selfScore:number;       //玩家自己的分数
    otherScore:number;      //其他玩家的分数
    createType:number;      //牌桌类型 0 进入匹配 1 挑战赛 3 密码建房
    winType:number;         //--是否胜利   --失败 -1 ，0 平，1 胜利
    playerExitType:number   //对手是否离线
    scoresPercent:number    //--分数占比重 超过多少老铁
    pkCount:number          //--连续对战次数
    winCount:number         //自己胜利次数 
    otherPlayercount:number //对方胜利次数 
    bestLines:number        //--最佳分数

    constructor(){
        this.selfScore = 0;
        this.otherScore = 0;
        this.createType = 0;
        this.winType = 0;
        this.playerExitType = 0;
        this.scoresPercent = 0;
        this.pkCount = 0;
        this.winCount = 0;
        this.otherPlayercount = 0;
        this.bestLines = 0;
    }
}


// 玩家信息
export class PlayerData{
    playerID:number;       //playerId
    playerHeadPath:string;      //头像路径
    playerName:string; //玩家昵称
    playerAge:number;
    playerCity:string;
    playerSex:number;
    playerScore:number;//分数

    otherCity:string;
    otherAge:number;
    otherID:number;
    otherSex:number;
    otherHead:string;
    otherName:string;
    otherScore:number;//分数

    creditState:number; //积分状态 state 0:积分充足  144：积分不足

    constructor(){
        this.playerID = 0;
        this.playerHeadPath = "";
        this.playerName = "";
        this.playerAge = 0 ;
        this.playerCity= "";
        this.playerSex= 0;

        this.otherID = 0;
        this.otherCity = "";
        this.otherName = "";
        this.otherAge = 0 ;
        this.otherHead= "";
        this.otherSex= 0;

    }
}

export class ShowData{
    headPath:string;      //头像路径
    name:string; //玩家昵称
    age:number;
    city:string;
    sex:number;
}