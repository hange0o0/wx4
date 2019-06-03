/**
 *
 * @author
 *
 */
class SharedObjectManager_wx4 {
	private wx4_functionX_54610(){console.log(3888)}
    public constructor() {
    }

    private static _instance: SharedObjectManager_wx4;
    public static getInstance():SharedObjectManager_wx4{
        if(!SharedObjectManager_wx4._instance)
            SharedObjectManager_wx4._instance = new SharedObjectManager_wx4();
        return SharedObjectManager_wx4._instance;
    }
	private wx4_functionX_54611(){console.log(8600)}

    private getUserSign_9345():string{
        return UM_wx4.gameid;
    }

    public setMyValue(key:string,value:any){
        key = this.getUserSign_9345() + "_" + key;
	wx4_function(1733);
        this.setValue(key,value);
    }

    public getMyValue(key:string):any{
        key = this.getUserSign_9345() + "_" + key;
        return this.getValue(key);
    }
	private wx4_functionX_54612(){console.log(5935)}

    public removeMyValue(key:string) {

        key = this.getUserSign_9345() + "_" + key;
        egret.localStorage.removeItem(key);
    }
	private wx4_functionX_54613(){console.log(3246)}

    public setValue(key:string,value:any) {

        var data:any = {};
        data.data = value;
        data = JSON.stringify(data);
	wx4_function(5274);
        egret.localStorage.setItem(key, data);
        //console.log('setValue',key,data)
    }

    public getValue(key:string):any {
        let value = egret.localStorage.getItem(key);
        //console.log('getValue',key,value)
        if(!value)
            return null;
        var data = JSON.parse(value);
	wx4_function(3239);
        return data.data;
    }
}
