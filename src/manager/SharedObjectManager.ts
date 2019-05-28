/**
 *
 * @author
 *
 */
class SharedObjectManager_wx4 {
	private wx4_functionX_45932(){console.log(6291)}
    public constructor() {
    }

    private static _instance: SharedObjectManager_wx4;
    public static getInstance():SharedObjectManager_wx4{
        if(!SharedObjectManager_wx4._instance)
            SharedObjectManager_wx4._instance = new SharedObjectManager_wx4();
        return SharedObjectManager_wx4._instance;
    }
	private wx4_functionX_45933(){console.log(3567)}

    private getUserSign_5866():string{
        return UM_wx4.gameid;
    }

    public setMyValue(key:string,value:any){
        key = this.getUserSign_5866() + "_" + key;
	wx4_function(3905);
        this.setValue(key,value);
    }

    public getMyValue(key:string):any{
        key = this.getUserSign_5866() + "_" + key;
        return this.getValue(key);
    }
	private wx4_functionX_45934(){console.log(6078)}

    public removeMyValue(key:string) {

        key = this.getUserSign_5866() + "_" + key;
        egret.localStorage.removeItem(key);
    }
	private wx4_functionX_45935(){console.log(8379)}

    public setValue(key:string,value:any) {

        var data:any = {};
        data.data = value;
        data = JSON.stringify(data);
	wx4_function(1030);
        egret.localStorage.setItem(key, data);
        //console.log('setValue',key,data)
    }

    public getValue(key:string):any {
        let value = egret.localStorage.getItem(key);
        //console.log('getValue',key,value)
        if(!value)
            return null;
        var data = JSON.parse(value);
	wx4_function(3945);
        return data.data;
    }
}
