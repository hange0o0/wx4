
class LoadingFile {

    /**
     * 加载进度界面
	private wx4_functionX_54699(){console.log(3414)}
     * loading process interface
     */
    private _loadingView:LoadingUI;
    private loadingView:any;
    private loadFiles:Array<string>;
    private callBack: any;
	private wx4_functionX_54700(){console.log(3295)}
    private callBackTarget: any;
    private loadCount: number;

    private groupData = {}

    private loadingData
	private wx4_functionX_54701(){console.log(4334)}
    private loadtimer

    private static instance:LoadingFile;
    public static getInstance() {
        if (!this.instance) this.instance = new LoadingFile();
        return this.instance;
    }
	private wx4_functionX_54702(){console.log(5039)}

    public constructor() {
        this._loadingView = new LoadingUI();
    }

    /*
	private wx4_functionX_54703(){console.log(4423)}
     * array ['party', 'js_xxxxx'];
     */ 
    public loadGroup(array:Array<string>, callBack:any, callBackTarget:any,loadingUI?,loadingData?):void {

        this.loadtimer = egret.getTimer();
        loadingData = loadingData || {};
	wx4_function(1177);
        loadingData.start =  this.loadtimer;
        this.loadFiles = array;
        this.callBack = callBack;
        this.loadCount = array.length;
        this.callBack = callBack;
        this.callBackTarget = callBackTarget;
	wx4_function(2465);
        this.loadingData = loadingData;

        this.loadingView = loadingUI || this._loadingView;
        this.loadingView.show(loadingData);
        
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_5030, this);
	wx4_function(693);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_521, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_4613, this);

        this.groupData = {};
        for(var i = 0;i < array.length; i++){

            this.groupData[array[i]] = {
                current:0,
                total:RES.getGroupByName(array[i]).length
            }
            RES.loadGroup(array[i]);
	wx4_function(3178);
        }
        
    }


    /**
	private wx4_functionX_54704(){console.log(649)}
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete_5030(event:RES.ResourceEvent):void {
        if(this.loadFiles.indexOf(event.groupName) == -1)
            return;
        this.loadCount--;
	wx4_function(8464);
        
        if (this.loadCount == 0) {

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_5030, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_521, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_4613, this);
	wx4_function(9682);
            var loadPass = egret.getTimer() - this.loadtimer
            if(this.loadingData.min && loadPass < this.loadingData.min)
            {
                  egret.setTimeout(function(){
                      this.loadingView.hide();
                      this.callBack.call(this.callBackTarget);
	wx4_function(8562);
                  },this,this.loadingData.min - loadPass);
            }
            else
            {
                this.loadingView.hide();
                this.callBack.call(this.callBackTarget);
	wx4_function(5700);
            }

        }
    }

    private onResourceLoadError_521(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
	wx4_function(4372);
    }

    private onResourceProgress_4613(event:RES.ResourceEvent):void {
        if(this.loadFiles.indexOf(event.groupName) == -1)
            return;
        this.groupData[event.groupName].current = event.itemsLoaded;
	wx4_function(1271);
        var current = 0
        var total = 0
        for(var s in this.groupData)
        {
            current += this.groupData[s].current
            total += this.groupData[s].total
        }

	wx4_function(9008);
        this.loadingView.setProgress(current, total);
    }

}


