/**
 * Author: Ma yuan
 * Date: 2018.11.5
 * CopyRight:
 * 网络
 */

import MKSocket from "../network/MKSocket";

export default class SocketManager{
    m_Commsocket:MKSocket = null;

    constructor () {
        this.m_Commsocket = new MKSocket();
    }

    WX_ThreeKingFun_sjee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    Connect (url) {
        this.m_Commsocket.connect("ws://"+ url);
    }

    send (data, msgID) {
        this.m_Commsocket.send(data, msgID);
    }
    
    WX_ThreeKingFun_sje22e() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public static singleton:SocketManager;

    public static getInstance(): SocketManager{
        if(!this.singleton){
            this.singleton = new SocketManager();
        }
        return this.singleton;
    }
}
