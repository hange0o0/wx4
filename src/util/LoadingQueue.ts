
class LoadingQueue {

    /**
     * 加载进度界面
	private wx4_functionX_54694(){console.log(8151)}
     * loading process interface
     */
    //private loadingView:LoadingUI;
    private loadFiles:Array<string>;
    private callBack: any;
    private callBackTarget: any;
    private loadCount: number = 0;
	private wx4_functionX_54695(){console.log(1811)}
    
    private loaderList: Array<any> = [];
    private loadReuslt: Object = new Object();

    public constructor() {
    }
	private wx4_functionX_54696(){console.log(6206)}

    /*
     * array ['party', 'js_xxxxx'];
     */ 
    public load(array:Array<string>, callBack:any, callBackTarget:any):void {
        
	wx4_function(9602);
        this.loadFiles = array;
        this.callBack = callBack;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
        
        //设置加载进度界面
//        this.loadingView = new LoadingUI();
//        GameManager.stage.addChild(this.loadingView);
        this.startLoad_1950();
	wx4_function(4440);
    }
    
    private startLoad_1950(){

        while(this.loaderList.length < 3 && this.loadCount <this.loadFiles.length) {

	wx4_function(8396);
            this.loaderList.push( this.createLoader_577(this.loadFiles[this.loadCount]) );
            this.loadCount++;
        }
    }
    
    private createLoader_577(url:string):egret.URLLoader{
        var loader: egret.URLLoader = new egret.URLLoader();
	wx4_function(7394);
        var type: string = url.substring(url.lastIndexOf(".")+1, url.length);
        var format: string;
        switch(type){
            case "json": 
                format = egret.URLLoaderDataFormat.TEXT;
                break;
            default:
                format = egret.URLLoaderDataFormat.TEXTURE;
	wx4_function(6551);
        }
        loader.dataFormat = format;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete_4073,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
        
        return loader;
    }
	private wx4_functionX_54697(){console.log(5880)}
    
    private onLoadComplete_4073(e: egret.Event){
        var loader = <egret.URLLoader>e.currentTarget; 
        var url: string = loader._request.url;
        
        var type: string = url.substring(url.lastIndexOf(".") + 1,url.length);
	wx4_function(9132);
        var format: string;
        switch(type) {
            case "json":
                this.loadReuslt[url] = JSON.parse(loader.data);
                break;
            default:
                this.loadReuslt[url] = loader.data;
	wx4_function(7025);
        }
        
        for(var key in this.loaderList){
            if(this.loaderList[key] == e.currentTarget){
                this.loaderList[key].removeEventListener(egret.Event.COMPLETE,this.onLoadComplete_4073,this);
            }
        }
        var num = ObjectUtil_wx4.objLength(this.loadReuslt);
	wx4_function(2326);
        if(num == this.loadFiles.length){
            this.callBack.apply(this.callBackTarget,[this.loadReuslt]);
        }
        else
            this.startLoad_1950();
    }
	private wx4_functionX_54698(){console.log(460)}

}


