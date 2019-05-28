/**
 *
 * @author 
 *
 */
class ObjectUtil_wx4 {
	private wx4_functionX_46028(){console.log(5313)}
	public constructor() {
	}

    public static join(paramList:any, joinStr:string="&"){
        var arr = [];
        for(var key in paramList)
            arr.push(key + "=" + paramList[key]);
        return arr.join(joinStr);
    }
	private wx4_functionX_46029(){console.log(4998)}
		
	public static arrayToObj(array:Array<any>, key:string, value:any):any{
    	key = key || "key";
    	value = value || "value";
    	var o: any = {};
    	for(var s in array){
        	var o2 = array[s];
        	if(value == '@whole')
            	o[o2[key]] = o2;
            	else
            	o[o2[key]] = o2[value];
    	}
    	return o;
	}
	private wx4_functionX_46030(){console.log(7392)}
    	
    public static objToArray(obj:any):Array<any>{
        var list = [];
        for(var key in obj)
            list.push(obj[key]);
        return list;
    }
	private wx4_functionX_46031(){console.log(3855)}
    
        	
    public static objLength(obj: any,removeEmpty?): number {
        var count = 0;
        for(var key in obj)
        {
            if(removeEmpty && !obj[key])
                continue;
            count++;
        }
        return count;
    }
	private wx4_functionX_46032(){console.log(1807)}

	public static clone (source) {
		return JSON.parse(JSON.stringify(source))    //++add   临时
	}

	public static addClickEvent(btn: egret.DisplayObject, fun:any, thisObject:any):void{
        if(btn) {


            var startX: number,startY: number;
            var touchBegin = function(e: egret.TouchEvent) {
                startX = e.stageX;
                startY = e.stageY;
                btn.addEventListener(egret.TouchEvent.TOUCH_END,touchEnd,thisObject);
            }
            var touchEnd = function(e: egret.TouchEvent) {
                btn.removeEventListener(egret.TouchEvent.TOUCH_END,touchEnd,thisObject);

                var endX: number,endY: number;
                endX = e.stageX;
                endY = e.stageY;
                //10px以内不响应
                if(Math.abs(endY - startY) > 10 || Math.abs(endX - startX) > 10) return;
                if(fun) fun.apply(thisObject,[e]);
            }

            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchBegin,thisObject);
            btn["clickFun_touchBegin"] = touchBegin;
            btn["clickFun_touchEnd"] = touchEnd;
        }
		
	}
	private wx4_functionX_46033(){console.log(9248)}
    public static removeClickEvent(btn: egret.DisplayObject,fun: any,thisObject: any): void {
        if(btn) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,btn["clickFun_touchBegin"],thisObject);
            btn.removeEventListener(egret.TouchEvent.TOUCH_END,btn["clickFun_touchEnd"],thisObject);
        }
    }
	private wx4_functionX_46034(){console.log(1260)}

    public static swapKey(data,key1,key2){
        var temp = data[key1]
        data[key1] = data[key2]
        data[key2] = temp;
    }
}
