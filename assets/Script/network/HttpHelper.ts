/**
 * Author: Ma yuan
 * Date: 2018.10.24
 * CopyRight:
 * HTTP 封装类
 */
import {Sina_Config} from "../data/configsFile"
import PackeParent from "./Packe";
import DataManager from "../data/DataManager";

export class HttpHelper {    
    public static getPathHttpPost () {
        if(cc.sys.isNative ) {
            return "";
        } else {
            return "jspost/";
        }
    }

    WX_ThreeKingFun_qin001wqqweqwe() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    public static sendHttpData (data:PackeParent, msgID, successCallback, failedCallback?) {
        var xhr = cc.loader.getXMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // cc.log("sendHttpData dataLen = ", xhr.response.byteLength);
                    successCallback(xhr.status, self.DecodeBuffer(xhr.response));
                } else {
                    if (failedCallback) {
                        failedCallback(xhr.status);
                    }
                }
            }
        };              

        var dataArray = this.EndcodeToBuffer(data.pack(), msgID);

        let url = this.getPathHttpPost() + Sina_Config.ServerURL;
        
        xhr.open("POST", Sina_Config.ServerURL, true);  

        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");        
        xhr.responseType = "arraybuffer";

        let strLen = dataArray.byteLength.toString();
        //xhr.setRequestHeader("content-length", strLen);
        xhr.timeout = 5000;// 5 seconds for timeout

        
        xhr.send(dataArray);
    }
    WX_ThreeKingFun_qin001wwwwwwrrr() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    private static EndcodeToBuffer(msg:ArrayBuffer, msgID) {
        var msgLength = 0;
        if (msg !== null) {
            msgLength = msg.byteLength;
        }

        var allLength = 20 + msgLength;
        var abAll = new ArrayBuffer(allLength);
        var view = new DataView(abAll)
        // cc.log("allLength = ", allLength);

        var playerID = DataManager.getInstance().getuserData().PlayerID;     

        view.setInt32(0, msgLength);  
        view.setInt32(4, msgID);
        view.setInt32(8, playerID); //userID
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

    WX_ThreeKingFun_qin001wwwwww() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
    private static DecodeBuffer (data:ArrayBuffer) {
        // cc.log("data length is ", data.byteLength);
        var abAll = data;        
        var dv = new DataView(abAll)
        var msgLen = dv.getInt32(0);
        var msgID = dv.getInt32(4);
        var UserID = dv.getInt32(8);
        var version = dv.getInt32(12);
        var extent = dv.getInt32(16);

        cc.log("UserID = ", UserID);
        if (UserID != 0) {
            DataManager.getInstance().getuserData().PlayerID = UserID;
        }

        //let msgData = new MsgInfo();
        //msgData.msgID = msgID;
        var msg = new ArrayBuffer(msgLen);
        msg = abAll.slice(20, 20 + msgLen);

        // cc.log("msg Length is", msgLen);
        
        return msg;
        //EventDispath.getInstance().send(msgID.toString(), msgData.msg);
    }

    WX_ThreeKingFun_qin001wwwwwws() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }
}
