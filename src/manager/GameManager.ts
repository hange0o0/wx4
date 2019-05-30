class GameManager_wx4 {
    private static _instance:GameManager_wx4;
    public static getInstance():GameManager_wx4 {
        if (!this._instance)
            this._instance = new GameManager_wx4();
        return this._instance;
    }
	private wx4_functionX_45895(){console.log(9151)}

    private timeID: egret.Timer;
    private timeE = new MyTimer(1000/60);
    private lastTime: number;
    public lastTouchTime: number;
    public lastTouchMC;
	private wx4_functionX_45896(){console.log(5769)}
    public changeUserTime = 0
    public changeUserID = 0
    public changeUserFun;

    public isActive = true;
    public onShowFun
	private wx4_functionX_45897(){console.log(7138)}
    public bannerAD
    public shareFailTime = 0;
	public constructor() {
        this.timeID = new egret.Timer(1000);
        this.timeID.addEventListener(egret.TimerEvent.TIMER,this.timerun_5456,this);
        this.timeID.start();
	wx4_function(6161);

        this.timeE.addEventListener(egret.TimerEvent.TIMER,this.onTimeE_6040,this);
        this.timeE.start();
	}
	
    public static stage:egret.Stage;
	private wx4_functionX_45898(){console.log(9233)}
    public static stageX;
    public static stageY;
    public static container:egret.DisplayObjectContainer;
    public static loadStep


	private wx4_functionX_45899(){console.log(1401)}
    public static isLiuHai(){
        return this.stage.stageHeight > 1250;
    }
    public static paddingTop(){
        return GameManager_wx4.isLiuHai()?50:0
    }
	private wx4_functionX_45900(){console.log(7290)}
    public static paddingBottom(){
        if(App.isIphoneX)
            return 30;
        return 0;
    }

	private wx4_functionX_45901(){console.log(671)}
    public static get uiHeight(){
        var h = this.stage.stageHeight// - Config.adHeight;

        if(this.isLiuHai())
        {
            if(App.isIphoneX)
                return h-this.paddingTop()-30;
            return h-this.paddingTop();
        }
        return h//Math.min(1136,this.stage.stageHeight);
        //return this.stage.stageHeight;
    }
	private wx4_functionX_45902(){console.log(4766)}
    public static get uiWidth(){
        return this.stage.stageWidth;
    }

    public isWebGL(){
        return egret.Capabilities.renderMode == 'webgl';
    }
	private wx4_functionX_45903(){console.log(8063)}

    public init(){
        GameManager_wx4.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove_6592,this);
        GameManager_wx4.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin_1370,this);
        //this.createAD_4819();
    }

	private wx4_functionX_45904(){console.log(2211)}
    private createAD_4819(){
    //Config.adHeight = 200;
    if(!window['wx'])
        return;
    if(GameManager_wx4.stage.stageHeight < 1080)
        return;


    var btnw = Math.min(Math.pow(GameManager_wx4.stage.stageHeight/1330,1.6)*640,640)

	wx4_function(4203);
    let scalex = screen.availWidth/640;
    let scaley = screen.availHeight/GameManager_wx4.stage.stageHeight;
    if(btnw * scalex < 300){ //微信限制广告宽度不能小于300
        btnw = 300 / scalex;
    }
    Config.adHeight =  btnw/640 * 224;
	wx4_function(6011);
    var  btny = GameManager_wx4.uiHeight;//给广告留的高度
    var  paddingTop = GameManager_wx4.paddingTop();
    var btnx =  (640-btnw)/2;

    let left = scalex * (btnx);
    let top = scaley * (btny + paddingTop);
	wx4_function(7655);
    let width = scalex * btnw;

    let bannerAd = this.bannerAD = wx.createBannerAd({
        adUnitId: 'adunit-d406f443acb5f7d2',
        style: {
            left: left,
            top: top,
            width: width
        }
    })
    bannerAd.onError(()=>{
        Config.adHeight = 0
        GameManager_wx4.stage.dispatchEventWith(egret.Event.RESIZE);
	wx4_function(6487);
    })
    bannerAd.onLoad(()=>{

    })
    bannerAd.onResize((res)=>{
        var hh = res.height/scalex*(640/btnw);
	wx4_function(5580);
        if(Math.abs(hh - 224)/224 > 0.02)
        {
            Config.adHeight =  btnw/640 * hh;
            GameManager_wx4.stage.dispatchEventWith(egret.Event.RESIZE);
            bannerAd.style.top = scaley * (GameManager_wx4.uiHeight + paddingTop);
        }
        //console.log(res,scalex,scaley,GameManager.stage.stageHeight)
    })
    bannerAd.show()
}
	private wx4_functionX_45905(){console.log(2752)}

    public showBanner(bottom){
        if(this.bannerAD)
        {
            this.bannerAD.show()
            var scaley = screen.availHeight/GameManager_wx4.stage.stageHeight;
	wx4_function(7069);
            var  paddingTop = GameManager_wx4.paddingTop();
            this.bannerAD.style.top = scaley * (GameManager_wx4.uiHeight + paddingTop - bottom)// - GameManager.paddingBottom());
        }
    }

    public hideBanner(){
        if(this.bannerAD)
            this.bannerAD.hide();
	wx4_function(7741);
    }

    public stopTimer(){
        this.timeID.stop();
        this.timeE.stop();
    }
	private wx4_functionX_45906(){console.log(5909)}


    private onTimeE_6040(){
        EM_wx4.dispatch(GameEvent.client.timerE);
    }

	private wx4_functionX_45907(){console.log(5553)}

    private onTouchMove_6592(e){
        GameManager_wx4.stageX = e.stageX;
        GameManager_wx4.stageY = e.stageY;
    }
    private onTouchBegin_1370(e){
        this.lastTouchMC = e.target;
	wx4_function(4266);
        GameManager_wx4.stageX = e.stageX;
        GameManager_wx4.stageY = e.stageY;
        this.lastTouchTime = egret.getTimer();
    }


	private wx4_functionX_45908(){console.log(6325)}
    private timerun_5456(): void {
        if(!UM_wx4.gameid)
            return;
        var now = TM_wx4.now();
        if(!this.lastTime) {
            this.lastTime = now;
	wx4_function(5637);
            return;
        }
        if(!DateUtil_wx4.isSameDay(this.lastTime,now))//跨0点
        {
            //TeamPVEManager.getInstance().passDay();
            //DayGameManager.getInstance().passDay();
            //GuessManager.getInstance().passDay();

            UM_wx4.testPassDay();
            EM_wx4.dispatch(GameEvent.client.pass_day);
	wx4_function(3791);
        }

        EM_wx4.dispatch(GameEvent.client.timer);

        //if(UM.friendtime == 0){  //拿过日志了
        //    if(now%30 == 0) //5分钟请求一次
        //    {
        //        FriendManager.getInstance().getLog(null,null,false);
        //    }
        //}
        this.lastTime = now
        //if(SyncDataManager.getInstance().lastConnectTime && now - SyncDataManager.getInstance().lastConnectTime > 3600) //超过1小时要重新登录
        //{
        //    MyWindow.AlertRelogin('已经离开很长时间了，请重新登陆吧')
        //}
    }
	private wx4_functionX_45909(){console.log(5856)}

    //取现在到晚上12点还差的时间
    public getZeroCD(){
        return this.getZeroTime() - TM_wx4.now();
    }
    public getZeroTime(){
        var d= DateUtil_wx4.timeToChineseDate(TM_wx4.now());
	wx4_function(9793);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        d.setHours(24);

        return Math.floor(d.getTime()/1000);
    }
	private wx4_functionX_45910(){console.log(3608)}

}


class App {
    public static touchEvent: string = egret.TouchEvent.TOUCH_TAP;
	private wx4_functionX_45911(){console.log(2333)}
    
    public constructor() {
    }

    public static get isIphoneX():boolean{
        let hh = screen.height, ww = screen.width;
        if(window['wx']){
            hh = screen.availHeight, ww = screen.availWidth;
        }
        let _iphoneX = /iphone/gi.test(navigator.userAgent) && (hh == 812 && ww == 375);
        let _iphoneXR = /iphone/gi.test(navigator.userAgent) && (hh == 896 && ww == 414);
        return _iphoneX || _iphoneXR;
    }
	private wx4_functionX_45912(){console.log(6208)}
    	
    public static get isMobile():boolean{
        return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
    }
    public static get isAndroid():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return ua.indexOf('android') != -1;
    }
	private wx4_functionX_45913(){console.log(7009)}
    public static get isIOS():boolean{
        //var Agents:string[] = ["Android", "iPhone",  "SymbianOS", "Windows Phone",  "iPad", "iPod"];
        var ua:string = navigator.userAgent.toLowerCase();
        return /ip(ad|hone|od)/.test(ua);
    }
}
//#stop_wx_change#//
function wx4_function(v){}
function sendClientError(str){
    //var url =  'http://172.17.196.195:90/error_wx2/log_error.php'
    //if(window["wx"])
    var url =  'https://www.hangegame.com/error_wx4/log_error.php'
    Net.getInstance().send(url,{str:str});
}
//window.onerror=handleErr;


if(window["wx"])
{
    //window["TeamUI"] = TeamUI;
    //window["BottomUI"] = BottomUI;
    //window["TopUI"] = TopUI
    window["ChangeUserUI"] = ChangeUserUI
    window["GunItem"] = GunItem
    window["sendClientError"] = sendClientError
    window["GameManager_wx4"] = GameManager_wx4
    window["BasePanel"] = BasePanel


    var wx =  window["wx"];

    wx.onError(function(res){
        UM_wx4 && UM_wx4.upDateUserData();
        try{
            var str = "onError:" + ("openid:" + UM_wx4.gameid + "--") + res.message + "--" + res.stack;
            sendClientError(str);
        }catch(e){}
    });

    wx.onHide(function(res){
        console.log(res)
        if(!GameManager_wx4.stage)
            return;
        UM_wx4 && UM_wx4.upDateUserData();
        SoundManager.getInstance().stopBgSound();
        GameManager_wx4.getInstance().isActive = false;
        //GameManager.stage.dispatchEventWith(egret.Event.DEACTIVATE);
        EM_wx4.dispatch(egret.Event.DEACTIVATE)
        console.log('hide')
        //GameUI.getInstance().cleanTouch();
    });

    wx.onShow(function(res){
        console.log(res)
        if(!GameManager_wx4.stage)
            return;
        SoundManager.getInstance().testBGPlay();
        //GameManager.stage.dispatchEventWith(egret.Event.ACTIVATE);
        EM_wx4.dispatch(egret.Event.ACTIVATE)
        GameManager_wx4.getInstance().onShowFun && GameManager_wx4.getInstance().onShowFun();
        GameManager_wx4.getInstance().onShowFun = null;
        GameManager_wx4.getInstance().isActive = true;
        //GameUI.getInstance().cleanTouch();
        console.log('show')


        if(GameManager_wx4.getInstance().changeUserTime)
        {
            console.log(TM_wx4.now() - GameManager_wx4.getInstance().changeUserTime)
            if(TM_wx4.now() - GameManager_wx4.getInstance().changeUserTime > 30) //停留超过30秒
            {
                var arr = SharedObjectManager_wx4.getInstance().getMyValue('exchangeUserAppid')|| [];
                var index = arr.indexOf(GameManager_wx4.getInstance().changeUserID)
                if(index != -1)
                    arr.splice(index,1);
                arr.push(GameManager_wx4.getInstance().changeUserID)
                while(arr.length > 30)
                    arr.shift()
                SharedObjectManager_wx4.getInstance().setMyValue('exchangeUserAppid',arr)
                if(GameManager_wx4.getInstance().changeUserFun)
                {
                    wx.aldSendEvent("点击跳转其它小程序_通过",{'time' : TM_wx4.now() - GameManager_wx4.getInstance().changeUserTime})
                    GameManager_wx4.getInstance().changeUserFun('changeUser')
                    ChangeJumpUI.getInstance().hide();
                }
            }
            else
            {
                wx.aldSendEvent("点击跳转其它小程序_不通过",{'time' : TM_wx4.now() - GameManager_wx4.getInstance().changeUserTime})
            }
        }
        GameManager_wx4.getInstance().changeUserTime = 0;
        GameManager_wx4.getInstance().changeUserFun = null;
    });
    //wx.exitMiniProgram(function(res){
    //    if(!GameManager.stage)
    //        return;
    //    PKManager.getInstance().upDateUserData();
    //});

    wx.onShareAppMessage(() => ({
        title: '这个游戏很好玩，推荐一下',
        imageUrl: Config.localResRoot + "share_img_2.jpg"
    }))

    if(wx.getUpdateManager){ //1.9.90以上版本支持
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            //console.log(res.hasUpdate)
            if(res.hasUpdate){
                wx.showToast({icon:"none", title:"有新版本，正在下载中..", duration: 600000});//10分钟
                window["clearTempCache"] && window["clearTempCache"]();
            }
        })
        updateManager.onUpdateReady(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请点击确定重启应用',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })

        })
        updateManager.onUpdateFailed(function () {
            wx.hideToast();
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败，点击确定重试哦',
                showCancel: false,
                success: function (res) {
                    updateManager.applyUpdate()
                }
            })
        })
    }


    window["wx"].setKeepScreenOn && window["wx"].setKeepScreenOn({keepScreenOn:true});//屏幕常亮

    Config.isDebug = false;
}
