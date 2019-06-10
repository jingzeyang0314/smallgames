/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * socket 封装类
 */

import EventDispath from "../Event/Event";
import {EventIDS} from "../event/EvenID";
import {Sina_Config} from "../data/configsFile"
import DataManager  from "../data/DataManager";
import PacketFile from "./PacketFiles"

export class MsgInfo {
    msgID: number;     // 消息ID
    msg: ArrayBuffer;       // 消息内容  

    constructor () {
        this.msgID = 0;        
    }
};


const {ccclass, property} = cc._decorator;

@ccclass
export default class MKSocket extends cc.Component{
    m_socket = null;
    m_observers = null;
    m_recvBuffer = null;
    m_url : string = "";

    m_reconnectNum : number = 0;
    m_reconnectMax : number = 3;
    m_schedule : cc.Scheduler = null;
    public constructor() {
        super();
        this.m_observers = [];
        this.m_recvBuffer = new ArrayBuffer(0);
        //this.m_schedule = cc.director.getScheduler();
    }

    WX_ThreeKingFun_qin002wwwwww() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public connect(url:string): void {
        cc.log("connet url = ", url);
        this.disconnect();
        this.m_url = url;
        if (this.m_socket == null) {
            this.m_socket = new WebSocket(url);
        }
        
        this.m_socket.binaryType = "arraybuffer";

        this.m_socket.onopen = this.onConnect.bind(this);

        this.m_socket.onmessage = this.onSocketDataReceived.bind(this);

        this.m_socket.onerror = this.onError.bind(this);

        this.m_socket.onclose = this.onClose.bind(this);
    }

    public disconnect(): void {
        // cc.log("MKSocket disconnect");
        this.m_recvBuffer = new ArrayBuffer(0);
        if (this.m_socket !== null) {
            this.m_socket.onopen = null;
            this.m_socket.onmessage = null;
            this.m_socket.onerror = null;
            this.m_socket.onclose = null;
            this.m_socket.close();
            this.m_socket = null;
        }
    }

    WX_ThreeKingFun_qin002wwwwwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public isConnected (): boolean {
        if (this.m_socket !== null) {
            return this.m_socket.readyState == WebSocket.OPEN;
        }

        return false;
    }

    public send(msg, msgID):void {
        if (!this.isConnected()) {
            return;
        }

        this.m_socket.send(this.encodeMsgID(msg, msgID));
    }

    WX_ThreeKingFun_qin002wwwwwwee() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public addMsgObserver(observer): void  {
        var find = false;
        for (var i = 0; i < this.m_observers.length; ++i) {
            if (observer === this.m_observers[i]) {
                find = true;
                break;
            }
        }

        if (!find) {
            this.m_observers.push(observer);
        }
    }

    getHexToInt(hex) {
        return parseInt(hex,16);
     }

     WX_ThreeKingFun_qin002wwwwwwff() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public removeObserver(observer): void  {
        for (var i = 0; i < this.m_observers.length; ++i) {
            if (observer === this.m_observers[i]) {
                this.m_observers.splice(i, 1);
                break;
            }
        }
    }

    public onConnect(evt): void  {
        this.m_reconnectNum = 0;
        //this.stopReconnect();

        EventDispath.getInstance().send(EventIDS.CMD_TCP_CONNECT_SUCCESS);
    }

    WX_ThreeKingFun_qin002wwwwwwqqq() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public onMessage(buffer): void  {

        this.decodeMsgID(buffer);
    }

    public onError(evt) : void {
        cc.log("MKSocket onError , evt = ", evt);  
    }

    WX_ThreeKingFun_qin002wwqwwwwww() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    public onClose(evt) :void {
        cc.log("MKSocket onClose");        
        this.disconnect();
        EventDispath.getInstance().send(EventIDS.CMD_TCP_CLOSED);
    }

    private encodeMsgID (msg, msgID) : ArrayBuffer {
        var msgLength = 0;
        if (msg !== null) {
            msgLength = msg.byteLength;
        }

        var allLength = 20 + msgLength;
        var abAll = new ArrayBuffer(allLength);
        var view = new DataView(abAll);
        var playerID = DataManager.getInstance().getuserData().PlayerID;     

       view.setInt32(0, msgLength);  
       view.setInt32(4, msgID);
       view.setInt32(8, playerID);    //userID
       view.setInt32(12, Sina_Config.GameMsgVersion);   
       view.setInt32(16, 0);         
        
        if (msgLength != 0) {
            var abBodyView = new Uint8Array(abAll, 20);
            var abMsgView = new Uint8Array(msg);
            abBodyView.set(abMsgView);

        }
        
        // cc.log("abAll length = ", abAll.byteLength);
        return abAll;
    }
    WX_ThreeKingFun_qin002wwwwwwfss() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    
    private decodeMsgID(msg) {

        var abAll = msg;        
        var dv = new DataView(abAll)
        var msgLen = dv.getInt32(0);
        var msgID = dv.getInt32(4);
        var UserID = dv.getInt32(8);
        var version = dv.getInt32(12);
        var extent = dv.getInt32(16);

        let msgData = new MsgInfo();
        msgData.msgID = msgID;
        msgData.msg = abAll.slice(20, 20 + msgLen);
        cc.log("MKSocket reciveMsg MsgID is", msgID.toString(16)  + " msgID int is ", msgID + " MsgBodyLength is ", msgLen);

        let protocol = PacketFile.getInstance().getPacketFile(msgID)
        if (protocol != null) {
            protocol.unPack(msgData.msg)
            EventDispath.getInstance().send(msgID.toString(), protocol);
        } else {
            cc.log("ERROR!")
        }

    }

    WX_ThreeKingFun_qin002wwwwwwgg() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public onSocketDataReceived(evt) : void  {
        // cc.log("MKSocket onSocketDataReceived");
        var bufferData = evt.data;

        var buffer = null;
        var lastLen = this.m_recvBuffer.byteLength;
        if (lastLen > 0) {
            var addLen = bufferData.byteLength;
            var bufferAll = new ArrayBuffer(lastLen + addLen);

            var abLastView = new Int8Array(this.m_recvBuffer);
            var abAllLastView = new Int8Array(bufferAll, 0, lastLen);
            abAllLastView.set(abLastView);

            var abAddView = new Int8Array(bufferData);
            var abAllAddView = new Int8Array(bufferAll, lastLen);
            abAllAddView.set(abAddView);

            buffer = bufferAll;
        }
        else {
            buffer = bufferData;
        }

        var allLength = buffer.byteLength;
        if (allLength < 20) {
            this.m_recvBuffer = buffer;
            return;
        }

        var bufferView = new DataView(buffer);

        var startIdx = 0;
        while (startIdx < allLength) {
            var msgLength = bufferView.getInt32(startIdx + 0);
            var subBufferLength = 20 + msgLength;

            if (startIdx + subBufferLength > allLength) {
                break;
            }

            this.onMessage(buffer.slice(startIdx, startIdx + subBufferLength));
            startIdx += subBufferLength;
            return;
        }

        if (startIdx < allLength) {
            this.m_recvBuffer = buffer.slice(startIdx);
        }
        else {
            this.m_recvBuffer = new ArrayBuffer(0);
        }     
        
        this.onMessage(this.m_recvBuffer);
    }

    WX_ThreeKingFun_qin002wwwwwwhhh() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}
