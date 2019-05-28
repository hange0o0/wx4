
class LoadingQueue {

    /**
     * 加载进度界面
	private wx4_functionX_45996(){console.log(6669)}
     * loading process interface
     */
    //private loadingView:LoadingUI;
    private loadFiles:Array<string>;
    private callBack: any;
    private callBackTarget: any;
    private loadCount: number = 0;
	private wx4_functionX_45997(){console.log(3102)}
    
    private loaderList: Array<any> = [];
    private loadReuslt: Object = new Object();

    public constructor() {
    }
	private wx4_functionX_45998(){console.log(7524)}

    /*
     * array ['party', 'js_xxxxx'];
     */ 
    public load(array:Array<string>, callBack:any, callBackTarget:any):void {
        
	wx4_function(5561);
        this.loadFiles = array;
        this.callBack = callBack;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
        
        //设置加载进度界面
//        this.loadingView = new LoadingUI();
//        GameManager.stage.addChild(this.loadingView);
        this.startLoad_2558();
	wx4_function(7032);
    }
    
    private startLoad_2558(){

        while(this.loaderList.length < 3 && this.loadCount <this.loadFiles.length) {

	wx4_function(2466);
            this.loaderList.push( this.createLoader_7168(this.loadFiles[this.loadCount]) );
            this.loadCount++;
        }
    }
    
    private createLoader_7168(url:string):egret.URLLoader{
        var loader: egret.URLLoader = new egret.URLLoader();
	wx4_function(737);
        var type: string = url.substring(url.lastIndexOf(".")+1, url.length);
        var format: string;
        switch(type){
            case "json": 
                format = egret.URLLoaderDataFormat.TEXT;
                break;
            default:
                format = egret.URLLoaderDataFormat.TEXTURE;
	wx4_function(9806);
        }
        loader.dataFormat = format;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete_1678,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
        
        return loader;
    }
	private wx4_functionX_45999(){console.log(401)}
    
    private onLoadComplete_1678(e: egret.Event){
        var loader = <egret.URLLoader>e.currentTarget; 
        var url: string = loader._request.url;
        
        var type: string = url.substring(url.lastIndexOf(".") + 1,url.length);
	wx4_function(2999);
        var format: string;
        switch(type) {
            case "json":
                this.loadReuslt[url] = JSON.parse(loader.data);
                break;
            default:
                this.loadReuslt[url] = loader.data;
	wx4_function(9792);
        }
        
        for(var key in this.loaderList){
            if(this.loaderList[key] == e.currentTarget){
                this.loaderList[key].removeEventListener(egret.Event.COMPLETE,this.onLoadComplete_1678,this);
            }
        }
        var num = ObjectUtil_wx4.objLength(this.loadReuslt);
	wx4_function(8449);
        if(num == this.loadFiles.length){
            this.callBack.apply(this.callBackTarget,[this.loadReuslt]);
        }
        else
            this.startLoad_2558();
    }
	private wx4_functionX_46000(){console.log(1168)}

}


