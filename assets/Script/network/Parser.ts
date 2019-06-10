/**
 * Author: Ma yuan
 * Date: 2018.10.17
 * CopyRight:
 * 通用游戏数据
 */

/**
 * 数据类型定义
 */
export class Type {
	public static Byte = "Byte";         
    public static Boolean = "Boolean";   
    public static Short = "Short";       
	public static Integer = "Integer";   
	public static Float = "Float";        
	public static Double = "Double";        
	public static String = "String";
	public static objClass = "objClass";
	public static ArrayLst = "ArrayLst";
}

/**
 * 数据基础类型长度
 */
export enum  TypeByte  {
	Byte = 1,           
	Boolean = 1,	
    Short = 2,          
    Integer = 4,        
    Float = 4,          
	Double = 8         	
}


/**
 * 序列化数据偏移量
 */
export class BufStartOffset {
    startPos :number;    //这个数据有用，用户传回数据
	endPos:number;
	constructor () {
		this.startPos = 0;
		this.endPos = 0;
	}         

	WX_ThreeKingFun_qinsj00dtttfgfgasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

}

/**
 * 序列化类
 */
export class Parse {
	constructor() {
		let a :number = 0;
	}

	WX_ThreeKingFun_qinsj005fgggff() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	public static isPrimitive(valueType):boolean {
		
		if (valueType == Type.Byte || valueType == Type.Short || 
			valueType == Type.Integer || valueType == Type.Double || 
			valueType == Type.Float || valueType == Type.Boolean ) {
			return true;
		} 
		return false;			
	}
	WX_ThreeKingFun_qinsj00dfgf44gasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 是否为列表类型
	 */
	public static isArraylst (value) :boolean {		
		if (Object.prototype.toString.call(value) == '[object Array]') {
			return true;
		}		
		else {
			return false;
		}
	}

	WX_ThreeKingFun_qinsj005f1() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 获取基础类型占用字节数
	 */
	public static getBasicTypeLen(valueType) : number {
		var length = 0;
		if (valueType == Type.Boolean) {
			length = TypeByte.Boolean;				

		} else if(valueType == Type.Byte) {
			length = TypeByte.Byte;	
		} else if(valueType == Type.Integer) {
			length = TypeByte.Integer;	
		} else if(valueType == Type.Double) {
			length = TypeByte.Double;	
		} else if(valueType == Type.Float) {
			length = TypeByte.Float;	
		}  else if(valueType == Type.Short) {
			length = TypeByte.Short;	
		}  else {
		}

		return length;
	}
	
	WX_ThreeKingFun_qinsj00bbsd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 获取列表占用字节数
	 */
    public static getlstLen(lst, itemType) {
        var length = 4; //列表元素个数长度
        if (Parse.isPrimitive (itemType)) {
            length += this.getBasicTypeLen(itemType)*lst.length;                
		} 
		else if (itemType == Type.String) {             
            for(var i = 0; i < lst.length; i++) {
                length += this.getStringLen(lst[i]);
            }
		} 
		else if (itemType == Type.objClass) {
			for (var i = 0; i < lst.length; i++) {
				length += this.getSelfBufLenth(lst[i]);
			}
		}

        return length;        
	}

	WX_ThreeKingFun_qinsj005f2() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

    /**
	 * 获取字符串占用字节数
	 */
    public static getStringLen(str, charset = 'utf8') {
		var total = 2,
			charCode,
			i,
			len;
		charset = charset ? charset.toLowerCase() : '';
		if(charset === 'utf-16' || charset === 'utf16'){
			for(i = 0, len = str.length; i < len; i++){
				charCode = str.charCodeAt(i);
				if(charCode <= 0xffff){
					total += 2;
				}else{
					total += 4;
				}
			}
		}else{
			for(i = 0, len = str.length; i < len; i++){
				charCode = str.charCodeAt(i);
				if(charCode <= 0x007f) {
					total += 1;
				}else if(charCode <= 0x07ff){
					total += 2;
				}else if(charCode <= 0xffff){
					total += 3;
				}else{
					total += 4;
				}
			}
		}	
		return total;
	}

	
	WX_ThreeKingFun_qinsj005f3() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 写基础数据
	 */
	public static writeStreamBasic(dv:DataView, value, valueType, pos:BufStartOffset) {
		if (!this.isPrimitive(valueType)) {
			return;
		}

		var valueByteLen = this.getBasicTypeLen(valueType);
		if (valueType == Type.Boolean) {
			if (value == true) {
				dv.setInt8(pos.startPos, 1);					
			} else {
				dv.setInt8(pos.startPos, 0);
			}		
			pos.startPos += valueByteLen;	

		} else if(valueType == Type.Byte) {
			dv.setInt8(pos.startPos, value);							
			pos.startPos += valueByteLen;
		} else if(valueType == Type.Integer) {
			dv.setInt32(pos.startPos, value);				
			pos.startPos += valueByteLen;
		} else if(valueType == Type.Double) {
			dv.setFloat64(pos.startPos, value);
			pos.startPos += valueByteLen;
		} else if(valueType == Type.Float) {
			dv.setFloat32(pos.startPos, value);
			pos.startPos += valueByteLen;
		}  else if(valueType == Type.Short) {
			dv.setInt16(pos.startPos, value);
			pos.startPos += valueByteLen;
		}    else {

		}
	}


	WX_ThreeKingFun_qinsj00dfgfgnnnasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}


	/**
	 * 读取基础数据
	 */
	public static readStreamBasic(dv:DataView, valueType, pos:BufStartOffset) :any {
		
		if (!this.isPrimitive(valueType)) {
			return;
		}

		var valueByteLen = this.getBasicTypeLen(valueType);
		var value = null;
		if (valueType == Type.Boolean) {
			var val = dv.getInt8(pos.startPos);
			if (val == 0) {
				value = false;
			} else {
				value = true;
			}		
			pos.startPos += valueByteLen;	

		} else if(valueType == Type.Byte) {
			//return 
			val = dv.getInt8(pos.startPos);			
			pos.startPos += valueByteLen;
		} else if(valueType == Type.Double) {
			val =  dv.getFloat64(pos.startPos);			
			pos.startPos += valueByteLen;
		} else if(valueType == Type.Float) {			
			val =  dv.getFloat32(pos.startPos);
			pos.startPos += valueByteLen;
		}  else if(valueType == Type.Short) {
			val =  dv.getInt16(pos.startPos);
			pos.startPos += valueByteLen;
		}  /*else if(valueType == Type.String) {			
			return this.readStringFromBuf(stream, pos);			
		} */ else if(valueType == Type.Integer) {
			val =  dv.getInt32(pos.startPos);				
			pos.startPos += valueByteLen;
		}  else {

		}
		return val;
	}

	WX_ThreeKingFun_qinsj005f4() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 写列表
	 */
	public static writeArray (dv:DataView, value, pos:BufStartOffset, itemType) {

		// cc.log("Parser:readArray lst length is", value.length);		

		if (value == null || value.length == 0) {
			dv.setInt32(pos.startPos, 0);
			pos.startPos += 4;
			return;
		}


		//写入列表长度数据
		dv.setInt32(pos.startPos, value.length);
		pos.startPos += 4;	

		//写入列表 数据
		if (itemType == Type.Boolean) {
			for (var i = 0; i < value.length; i++) {
				if (value[i] == true) {
					dv.setInt8(pos.startPos, 1);					
				} else {
					dv.setInt8(pos.startPos, 0);
				}						
				pos.startPos += TypeByte.Boolean;
			}
					
		} else if(itemType == Type.Byte) {
			for (var i = 0; i < value.length; i++) {
				dv.setInt8(pos.startPos, value[i]);												
				pos.startPos += TypeByte.Byte;
			}			
		} else if(itemType == Type.Double) {
			for (var i = 0; i < value.length; i++) {
				dv.setFloat64(pos.startPos, value[i]);											
				pos.startPos += TypeByte.Double;
			}
			
		} else if(itemType == Type.Float) {
			for (var i = 0; i < value.length; i++) {
				dv.setFloat32(pos.startPos, value[i]);				
				pos.startPos += TypeByte.Float;
			}
			
		}  else if(itemType == Type.Short) {
			for (var i = 0; i < value.length; i++) {
				dv.setInt16(pos.startPos, value[i]);
				pos.startPos += TypeByte.Short;
			}
						
		}  else if(itemType == Type.Integer) {
			for (var i = 0; i < value.length; i++) {
				dv.setInt32(pos.startPos, value[i]);
				pos.startPos += TypeByte.Integer;
			}				
		} else if(itemType == Type.String){
			for (var i = 0; i < value.length; i++) {
				var strLen = this.getStringLen(value[i]);
				this.writeStringToBuf(dv, value[i], pos);
			}
		}	else if(itemType == Type.objClass){
			for (var i = 0; i < value.length; i++) {
				var strLen = this.getSelfBufLenth(value[i]);
				this.packageToArrayBuf(value[i], dv, pos);
			}
		}	


	}

	WX_ThreeKingFun_qinsj005fsdsdasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}
	/**
	 * 读取列表
	 *
	 */
	public static readArray (dv:DataView, pos:BufStartOffset, itemType, lst, itemT:any = null) {
	
		//列表长度数据		
		var lstLen = dv.getInt32(pos.startPos);
		pos.startPos += 4;		
		// cc.log("Parser:readArray lst length is", lstLen);			

		//列表数据为0 则返回
		if (lstLen == 0) {
			return;
		}
		
		//读出列表 数据
		if (itemType == Type.Boolean) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getInt8(pos.startPos);
				if (itemValue == 0) {
					lst.push(false);
				} else {
					lst.push(true);
				}	
				pos.startPos += TypeByte.Boolean;

				//cc.log("readArray lst item i = ", itemValue);
			}
			
					
		} else if(itemType == Type.Byte) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getInt8(pos.startPos);
				lst.push(itemValue);				
				pos.startPos += TypeByte.Byte;						
				//cc.log("readArray lst item i = ", itemValue);		
			}	
					
		} else if(itemType == Type.Double) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getFloat64(pos.startPos);	
				lst.push(itemValue);
				pos.startPos += TypeByte.Double;						
				//cc.log("readArray lst item i = ", itemValue);					
			}
			
		} else if(itemType == Type.Float) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getFloat32(pos.startPos);	
				lst.push(itemValue);	
				pos.startPos += TypeByte.Float;						
				//cc.log("readArray lst item i = ", itemValue);			
			}
			
			
		}  else if(itemType == Type.Short) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getInt16(pos.startPos);
				lst.push(itemValue);
				//cc.log("readArray lst item i = ", itemValue);
				pos.startPos += TypeByte.Short;
			}
			
						
		} else if(itemType == Type.Integer) {
			
			for (var i = 0; i < lstLen; i++) {
				var itemValue = dv.getInt32(pos.startPos);
				lst.push(itemValue);
				//cc.log("readArray lst item i = ", itemValue);
				pos.startPos += TypeByte.Integer;								
			}			

		}  else if(itemType == Type.String) {
			
			for (var i = 0; i < lstLen; i++) {
				let itemValue :any;
				itemValue = this.readStringFromBuf(dv, pos);
				lst.push(itemValue);
				var strLen = this.getStringLen(itemValue);
				//cc.log("readArray lst item i = ", itemValue);									
			}
			
		} else if(itemType == Type.objClass) {
						
			for (var i = 0; i < lstLen; i++) {		
				//var temp = new (eval(itemT));
				//var temp = itemT;		
				var temp = this.deepClone(itemT);
							
				this.unPackSelf(temp, null, dv, pos);
				//itemT.unPack(dv, pos);
				// cc.log("object class value is ", itemT);
				lst.push(temp);				
				//cc.log("readArray lst item i = ", itemValue);									
			}						
		} else {

		}		
	}


	WX_ThreeKingFun_qinsj005fsssd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}
	public static deepClone(obj){
		var newObj= obj instanceof Array?[]:{};
		for(var i in obj){
		   newObj[i]=typeof obj[i]=='object'?  
		   this.deepClone(obj[i]):obj[i];    
		}
		return newObj;
	}


	/**
	 * 字符串转换成字节列表
	 */
	public static stringToByte(str) {
		var bytes = new Array();
		var len, c;
		len = str.length;
		for(var i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if(c >= 0x010000 && c <= 0x10FFFF) {
				bytes.push(((c >> 18) & 0x07) | 0xF0);
				bytes.push(((c >> 12) & 0x3F) | 0x80);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if(c >= 0x000800 && c <= 0x00FFFF) {
				bytes.push(((c >> 12) & 0x0F) | 0xE0);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if(c >= 0x000080 && c <= 0x0007FF) {
				bytes.push(((c >> 6) & 0x1F) | 0xC0);
				bytes.push((c & 0x3F) | 0x80);
			} else {
				bytes.push(c & 0xFF);
			}
		}
		return bytes;


	}

	WX_ThreeKingFun_qinsj00dfgfghhhasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}


	/**
	 * 字节列表转换成字符串
	 */
	public static byteToString(arr) {
		if(typeof arr === 'string') {
			return arr;
		}

		var str = '',
			_arr = arr;
		for(var i = 0; i < _arr.length; i++) {
			var one = _arr[i].toString(2),
				v = one.match(/^1+?(?=0)/);
			if(v && one.length == 8) {
				var bytesLength = v[0].length;
				var store = _arr[i].toString(2).slice(7 - bytesLength);
				for(var st = 1; st < bytesLength; st++) {
					store += _arr[st + i].toString(2).slice(2);
				}
				str += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1;
			} else {
				str += String.fromCharCode(_arr[i]);
			}
		}
		return str;
	}

	WX_ThreeKingFun_qinsj00dfgfga555sd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 写字符串
	 */
	public static writeStringToBuf(strdv:DataView, strValue, pos:BufStartOffset) {
		//var strdv = new DataView(stream, pos.startPos, this.getStringLen(strValue));
		// cc.log("write string buf start pos is ", pos.startPos+ "  string buf dataview leng is ", this.getStringLen(strValue));

		var strByteLen = this.getStringLen(strValue);

		//写入字符串长度 2
		var bytesLen = new Array();
		var len, c;
		len = strByteLen - 2;
		bytesLen.push(((len >> 8) & 0xFF));
		bytesLen.push(((len >> 0) & 0xFF));

		for(var j = 0; j < bytesLen.length; j++) {
			strdv.setUint8(pos.startPos, bytesLen[j]);
			pos.startPos++;				
		}	

		if(len <= 0) {
			return;
		}

		// cc.log("start to write string buf for start pos is ", pos.startPos + "===strByteLen = ", strByteLen);

		//写入字符串编码
		var bytes = this.stringToByte(strValue);
		for(var i = 0; i < bytes.length; i++) {
			strdv.setUint8(pos.startPos, bytes[i]);
			pos.startPos++;			
		}
	}

	WX_ThreeKingFun_qinsj005fwwwasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}
	/**
	 * 读字符串
	 */
	public static readStringFromBuf(dv:DataView, pos:BufStartOffset):any {
		if (dv.byteLength == 0) {
			return "";
		}
		
		var strLen = dv.getUint16(pos.startPos);		
		// cc.log("readStringFromBuf start pos = ", pos.startPos + " strByteLen =  ", strLen);		
		pos.startPos += 2;

		if (strLen <= 0) {
			return "";
		}

		var bytes = new Array();
		for(var i = 0; i < strLen; i++) {
			//cc.log("readStringFromBuf getUint8 startPos = ", pos.startPos + " i = ", i + "    dv Length = ", dv.byteLength);
			bytes.push(dv.getUint8(pos.startPos));
			pos.startPos++;				
		}
		
		var str = new String(this.byteToString(bytes));
		// cc.log("readStringFromBuf str is ", str);
		return str;
	}

	WX_ThreeKingFun_qinsj00dfg333fgasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

	/**
	 * 读取结构体长度
	 */
	public static getSelfBufLenth (objValue, length:number = 0) : number{        
        var length = 0;
        for(var obj in objValue) {
            if (typeof(objValue[obj]) != "function") {          
                if(obj.indexOf("_Type")==-1){

					// cc.log("obj = ", obj+",length=="+ objValue[obj+"_Type"]);  

					if (this.isArraylst(objValue[obj])) {
						length += Parse.getlstLen(objValue[obj], objValue[obj + "_Type"]);
						
                    } 
					 
					else if (objValue[obj + "_Type"] == Type.objClass) {						
						var objLen = this.getSelfBufLenth(objValue[obj]) 
						objLen += 4; //obj len
                        length += objLen;                                
                    } 
					
                    else if(this.isPrimitive(objValue[obj + "_Type"])) {
                        length += this.getBasicTypeLen(objValue[obj + "_Type"]);
					//    Parse.writeStreamBasic(stream, this[obj], this[obj+"_Type"], pos);   
					                             
                    } else if (objValue[obj + "_Type"] == Type.String) {
                        length += this.getStringLen(objValue[obj]);
                    } else {
						
					}
                    
                }                
            }                         
        }  
        // cc.log("Self Length = ", length);

        return length;      
	}

	WX_ThreeKingFun_qinsj00sdsdsasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}
	/**
	 * 打包结构体为二进制字节流
	 */
    public static packageToArrayBuf(objValue, dv:DataView = null, pos : BufStartOffset = null):ArrayBuffer {  
		var stream = null;
        if (dv == null) {
			var len  = this.getSelfBufLenth(objValue);
            stream = new ArrayBuffer(len);
            dv = new DataView(stream); 
            pos = new BufStartOffset();                
        }  
                
        for(var obj in objValue) {
            if (typeof(this[obj]) != "function") {          
                if(obj.indexOf("_Type")==-1){

                    // cc.log("write obj = ", obj+",write length=="+ objValue[obj+"_Type"]);  
					 
					if (this.isArraylst(objValue[obj])) {
                        this.writeArray(dv, objValue[obj], pos, objValue[obj+"_Type"]);
					} 
					
					else if (objValue[obj + "_Type"] == Type.objClass) {	
						this.packageToArrayBuf(objValue[obj],dv, pos);
                    }
                   else if(this.isPrimitive(objValue[obj + "_Type"])) {
                        this.writeStreamBasic(dv, objValue[obj], objValue[obj+"_Type"], pos);                                
                        // cc.log("write basic obj to buf obj = ", objValue[obj]);
                    } else if (objValue[obj + "_Type"] == Type.String) {
                        // cc.log("write string to buffer string = ", objValue[obj])
                        this.writeStringToBuf(dv, objValue[obj], pos);                        
                    }                     
                }                
            }                         
        }
        return stream;
	}
	
	WX_ThreeKingFun_qinsj00dfgfgasswd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}


	/**
	 * 解包二进制字节流到结构体
	 */
    public static unPackSelf(objValue, arrayBuf:ArrayBuffer, dv:DataView = null, pos:BufStartOffset = null) {
        if (dv == null ) {
            pos = new BufStartOffset();                
            dv = new DataView(arrayBuf);
		}
		
		// 判读长度
		let bufLen = 0; 
		if (arrayBuf!= null ) {
			bufLen = arrayBuf.byteLength; 
		}
		
		if (dv != null) {
			bufLen = dv.byteLength;
		}
         
        for(var obj in objValue) {
            if (typeof(objValue[obj]) != "function") {            				
				// cc.log("unPackSelf obj name is ", obj+ "  typeof obj is ", typeof(objValue[obj]) );
				

				if (pos.startPos >= bufLen) {
					// cc.log("unPackSelf is End");
					return;
				}

                if(obj.indexOf("_Type")==-1){						                    						
					if(this.isArraylst(objValue[obj])) {                    
						var lst = new Array();    	
						var itemType = objValue[obj + "_TypeItem"];
						// cc.log("itemType is", itemType);										
						this.readArray(dv, pos, objValue[obj+"_Type"], lst, (objValue[obj + "_TypeItem"]));
						objValue[obj] = lst;
					}
					
					else if (objValue[obj + "_Type"] == Type.objClass) {														 			
						this.unPackSelf(objValue[obj], null, dv, pos);
						// cc.log("unPackSelf object Type is", objValue[obj + "_Type"] + ", objClass = ", objValue[obj]);																						
                    }
                    else if(this.isPrimitive(objValue[obj + "_Type"])) {
                        objValue[obj] = this.readStreamBasic(dv, objValue[obj+"_Type"], pos);      
						// cc.log("obj = ", obj + "value = ", objValue[obj]); 
						                         
                    } else if (objValue[obj + "_Type"] == Type.String) {
                        objValue[obj] = this.readStringFromBuf(dv, pos);
                        // cc.log("read string from buf obj = ", objValue[obj]);
                    } 
					
					// cc.log("unPackSelf obj = ", obj+",unPackSelf length=="+ this[obj+"_Type"] + "  objValue is", objValue[obj]);  
                }                
            }                         
        }

	}
	WX_ThreeKingFun_qinsj00dfgfgasd() {
		let aaa = 1
		let bbb = 2
		let ccc = 3
		cc.log("aaa + bbb = ", aaa + bbb)
		return aaa + bbb + ccc
	}

}
