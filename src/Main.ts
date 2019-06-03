var UM_wx4:UserManager_wx4,TM_wx4:TimeManager_wx4,EM_wx4:EventManager_wx4 ,CM_wx4:CacheManager_wx4,DM:DebugManager
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
	private wx4_functionX_54434(){console.log(2329)}
     */
    private loadingView: MainLoadingUI;
    protected createChildren(): void {
        super.createChildren();
        console.log('_10')

        //inject the custom material parser
        //注入自定义的素材解析器
	wx4_function(1395);
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //this.stage.setContentSize(640,1136);

        //this.stage.addEventListener(egret.Event.RESIZE,this.setScaleMode_6441,this);
        this.setScaleMode_6441();
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = MainLoadingUI.getInstance();
        //if(_get['debug'] != 100 && _get['debug'] != 101)
        //{
        //    this.loadingView.show(this);
        //}
	wx4_function(926);



        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_4780, this);
        RES.loadConfig("resource/default.res.json", "resource/");

	wx4_function(3569);


        UM_wx4 = UserManager_wx4.getInstance();
        TM_wx4 = TimeManager_wx4.getInstance();
        EM_wx4 = EventManager_wx4.getInstance();
        CM_wx4 = CacheManager_wx4.getInstance();
	wx4_function(2670);
        DM = DebugManager.getInstance();
        Config.initURLRequest();
        console.log('_1a')
    }

    private setScaleMode_6441(){
        //if(this.stage.stageWidth/this.stage.stageHeight < 640/1136)
        //{
        //    this.stage.setContentSize(640,1136)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else if(this.stage.stageWidth/this.stage.stageHeight > 640/960)
        //{
        //    this.stage.setContentSize(640,960)
        //    this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        //}
        //else
        //    this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
    }
	private wx4_functionX_54435(){console.log(8550)}


    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
	private wx4_functionX_54436(){console.log(3245)}
    private onConfigComplete_4780(event:RES.ResourceEvent):void {
        console.log('_1b')
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete_4780, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete_32, this);

	wx4_function(9609);




        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_2054, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_6704, this);
	wx4_function(2179);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_8587, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_993, this);
        RES.loadGroup("preload_png");
    }
    private isThemeLoadEnd: boolean = false;
    /**
	private wx4_functionX_54437(){console.log(1761)}
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    private onThemeLoadComplete_32(): void {
        this.isThemeLoadEnd = true;
        console.log('_1c')
        this.createScene_2228();
	wx4_function(4149);
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
	private wx4_functionX_54438(){console.log(1215)}
    private onResourceLoadComplete_2054(event:RES.ResourceEvent):void {
        console.log('_1d')
        if (event.groupName == "preload_png") {

            this.isResourceLoadEnd = true;

	wx4_function(7755);


            this.removeLoadEvent_7945();
            this.createScene_2228();
        }
        //else if (event.groupName == "preload_png") {
        //    RES.loadGroup("preload_jpg");//预加载第一阶段
        //}
        //else if (event.groupName == "preload_png") {
        //    this.removeLoadEvent_7945();
        //    this.createScene_2228();
        //    RES.loadGroup("preload_jpg");
        //    RES.loadGroup("preload_png32")
        //
        //}
    }
	private wx4_functionX_54439(){console.log(5947)}

    private removeLoadEvent_7945(){
        this.loadingView.setFinish();
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete_2054, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError_6704, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress_8587, this);
	wx4_function(4522);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError_993, this);
    }
    private createScene_2228(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
	private wx4_functionX_54440(){console.log(9134)}
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError_993(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
	wx4_function(1631);
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError_6704(event:RES.ResourceEvent):void {
        //TODO
	wx4_function(7461);
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete_2054(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
	private wx4_functionX_54441(){console.log(6990)}
     */
    private onResourceProgress_8587(event:RES.ResourceEvent):void {
        if (event.groupName == "game") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
	private wx4_functionX_54442(){console.log(4902)}
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        CM_wx4.initData(RES.getRes("data_txt"),'monster');
	wx4_function(8362);
        CM_wx4.initData(RES.getRes("gun_txt"),'gun');
        CM_wx4.initFinish()
        GameManager_wx4.stage = this.stage;
        GameManager_wx4.container = this;
        if(App.isIOS){
            GameManager_wx4.stage.frameRate = 60;
	wx4_function(2376);
        }
        GameManager_wx4.getInstance().init();
        console.log('_11')

        if(_get['hide'])
            return;
        //GameUI.getInstance().show();
        //var wx = window['wx'];
        //if(!wx)
        //{
        //    GameUI.getInstance().show();
        //    return;
        //}
        //console.log('_12')
	wx4_function(7881);
        LoadingUI.getInstance().show();

    }
}
