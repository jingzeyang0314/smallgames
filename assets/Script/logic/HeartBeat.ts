/**
 * Author: Ma yuan
 * Date: 2018.11.1
 * CopyRight:
 * 心跳类
 */

import SocketManager from "./ScoketManager";
import {CSHeartBeat} from "../network/Protocol";
import EventDispath from "../Event/Event";
import {EventIDS} from "../event/EvenID";
import {PacketID} from "../network/PacketID";
import { Sina_Config } from "../data/configsFile";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeartBeat extends cc.Component  {
    m_socket:SocketManager = null;   
    m_curMissCount : number = 0;
    m_maxMissCount : number = 3;
    m_interVale : number = 15;
    m_schedule : cc.Scheduler = null;
    constructor () {
        super();
        this.m_socket = SocketManager.getInstance();
        this.m_schedule = cc.director.getScheduler();
        if (Sina_Config.SINA_HEARTBEAT_INTERVAL > 0) {
            this.m_interVale = Sina_Config.SINA_HEARTBEAT_INTERVAL;
        }
        
        EventDispath.getInstance().addEventListener((PacketID._SINA_PACKET_SC_HeartBeatID).toString(), this.onReciveHeartBeatAck, this);           
    }

    WX_ThreeKingFun_we3ws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    startHeartBeat() {
        // cc.log("HeartBeat :StartHeartBeat");

        this.m_curMissCount = 0;

        this.m_schedule.unschedule(this.onIdleTimer, this);

        if (Sina_Config.SINA_HEARTBEAT_INTERVAL > 0) {
            this.m_schedule.schedule(this.onIdleTimer, this, this.m_interVale,cc.macro.REPEAT_FOREVER, 0, false);
        }                
    }

    stopHeartBeat () {
        // cc.log("HeartBeat :stopHeartBeat");
        this.m_curMissCount = 0;
        this.m_schedule.unschedule(this.onIdleTimer, this);

    }

    WX_ThreeKingFun_wrwwqws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    onIdleTimer(dt) {        
        // cc.log("HeartBeat :onIdleTimer");        
        if (dt > this.m_interVale * this.m_maxMissCount) {
            this.heartTimeOut();                
        }
        else {
            this.sendHearBeat();
        }        
    }

    sendHearBeat () {
        // cc.log("HeartBeat :sendHearBeat");
        this.m_curMissCount++;

        if(this.m_curMissCount > this.m_maxMissCount) {
            this.heartTimeOut();
        } else {
            var  texting = new CSHeartBeat();        
            this.m_socket.send (texting.pack(), PacketID._SINA_PACKET_CS_HeartBeatID);
        }
    }

    WX_ThreeKingFun_wemffws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    heartTimeOut () {
        // cc.log("HeartBeat HeartTimeOut");
        EventDispath.getInstance().send(EventIDS.CMD_HEART_BEAT_TIMEOUT);
    }

    onReciveHeartBeatAck (data : ArrayBuffer) {
        // cc.log("HeartBeat :onReciveHeartBeatAck");
        this.m_curMissCount = 0;
    }
    WX_ThreeKingFun_wemgggs() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}

