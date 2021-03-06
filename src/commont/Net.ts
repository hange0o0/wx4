class Net extends egret.EventDispatcher{
    private static instance: Net;
    public static getInstance() {
        if(!this.instance) this.instance = new Net();
        return this.instance;
    }
	private wx4_functionX_54525(){console.log(6575)}

    public constructor() {
        super();
    }

    public send(url,msg,fun?){
        var loader = new egret.URLLoader();
	wx4_function(7017);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader['msg'] = msg;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var variables = new egret.URLVariables('a=1');
        var oo:any = {};
	wx4_function(8999);
        oo.msg = JSON.stringify(msg);
        variables.variables = oo;
        request.data = variables;
        if(Config.isDebug )
        {
            console.log('send===>      '+JSON.stringify(msg) +'   '+TM_wx4.now());
	wx4_function(6046);
        }
        loader.load(request);
        if(fun)
        {
           this.addLoading_7570();
            loader.once(egret.Event.COMPLETE,(e)=>{
                var data = JSON.parse(loader.data);
                fun(data);
                this.removeLoading_2296();
            },this)
        }
    }


    private refresh_9806(){
        location.reload();
	wx4_function(987);
    }

    private addLoading_7570(){
        MsgingUI.getInstance().show();
    }

	private wx4_functionX_54526(){console.log(5047)}
    private removeLoading_2296(){
        MsgingUI.getInstance().hide();
    }

    public getServerData(fun){
        var url =  Config.serverPath + 'getGameData.php'
        this.send(url,{gameid:UM_wx4.gameid,gameid2:UM_wx4.gameid2},fun);
    }
    public getShareData(fun){
        var url =  Config.serverPath + 'getShareData.php'
        this.send(url,{gameid:UM_wx4.gameid,gameid2:UM_wx4.gameid2},fun);
    }
    public saveServerData(isNewUser?){
        var url =  Config.serverPath + 'saveGameData.php'
        if(isNewUser)
            var url =  Config.serverPath + 'newGameData.php'
        this.send(url,{gameid:UM_wx4.gameid,gameid2:UM_wx4.gameid2,data:Base64.encode(JSON.stringify(UM_wx4.getUpdataData()))});
    }

    public getRankData(obj,fun){
        var url =  Config.serverPath + 'getRankData.php'
        this.send(url,obj,fun);
    }

    public onShareIn(obj,fun){
        var url =  Config.serverPath + 'onShareIn.php'
        this.send(url,obj,fun);
    }
}