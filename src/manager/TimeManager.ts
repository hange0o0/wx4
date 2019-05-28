class TimeManager_wx4 {

	public constructor() {
	}
	
	private wx4_functionX_45936(){console.log(8301)}
    private static _instance: TimeManager_wx4;
    
    public static getInstance():TimeManager_wx4{
        if(!TimeManager_wx4._instance)
            TimeManager_wx4._instance = new TimeManager_wx4();
        return TimeManager_wx4._instance;
    }
	private wx4_functionX_45937(){console.log(9200)}
    
    private _timeDiff: number = 0;
    public get timeDiff():number {
        return this._timeDiff - DM.addTime;
    }

	private wx4_functionX_45938(){console.log(9663)}
    public loginTime: number = 0;//等陆时的服务器时间

    private loginWXTime = 0;
    public init(time:number):void{
        //本地和服务器的时间差
        this._timeDiff = Math.floor(Date.now() / 1000 - time);
    }
	private wx4_functionX_45939(){console.log(7396)}

    public getTimer(){
        var wx = window['wx'];
        if(wx)
            return  Math.floor((wx.getPerformance().now() -  this.loginWXTime)/1000)
        return egret.getTimer();
    }
	private wx4_functionX_45940(){console.log(1314)}

    public initlogin(t){
        var wx = window['wx'];
        this.loginWXTime = wx.getPerformance().now()
        this.loginTime = Math.floor(t/1000)//Math.floor((t - wx.getPerformance().now())/1000);
    }
	private wx4_functionX_45941(){console.log(6557)}
    
    public now():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime + Math.floor(this.getTimer()/1000)
        }
        return Math.floor(Date.now() / 1000) - this.timeDiff //+ 24*3600 *7;
    }
	private wx4_functionX_45942(){console.log(450)}
    public nowMS():number{
        if(this.loginTime)
        {
            var wx = window['wx'];
            return this.loginTime*1000 + this.getTimer();
        }
        return Date.now() - this.timeDiff*1000
    }
	private wx4_functionX_45943(){console.log(6513)}

    public getLastDayOfWeekDate(time:number, endDay:any):Date{
        endDay = endDay || 5;
        //得到今天是周几
        var d = new Date(time * 1000);
            var curDay = d.getDay();
            var add = endDay > curDay
            ? endDay - curDay
            : 7 - (curDay - endDay);
	wx4_function(6281);
            
            return new Date(d.getTime() + add * 24 * 3600 * 1000);
    }
    
    public offsetDate():Date{
        var offsetTime = -21600;
	wx4_function(3363);
        var time = this.now();
        time += offsetTime;
        return DateUtil_wx4.timeToChineseDate(time);
    }
    
    public chineseDate():Date{
        return DateUtil_wx4.timeToChineseDate(this.now());
    }
	private wx4_functionX_45944(){console.log(2261)}
    
    public getNextDateTime():number{
        return DateUtil_wx4.getNextDateTimeByHours(6);
    }
    
}
