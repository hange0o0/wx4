class Net extends egret.EventDispatcher{
    private static instance: Net;
    public static getInstance() {
        if(!this.instance) this.instance = new Net();
        return this.instance;
    }
	private wx4_functionX_45835(){console.log(5820)}

    public constructor() {
        super();
    }

    public send(url,msg){
        var loader = new egret.URLLoader();
	wx4_function(8367);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader['msg'] = msg;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var variables = new egret.URLVariables('a=1');
        var oo:any = {};
	wx4_function(3049);
        oo.msg = JSON.stringify(msg);
        variables.variables = oo;
        request.data = variables;
        if(Config.isDebug )
        {
            console.log('send===>      '+JSON.stringify(msg) +'   '+TM_wx4.now());
	wx4_function(3656);
        }
        loader.load(request);
    }


    private refresh_3982(){
        location.reload();
	wx4_function(5787);
    }

    private addLoading_8921(){
        MsgingUI.getInstance().show();
    }

	private wx4_functionX_45836(){console.log(7687)}
    private removeLoading_7796(){
        MsgingUI.getInstance().hide();
    }
}