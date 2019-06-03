class MyTimer extends egret.EventDispatcher {
    private cd = 0;
    private timer
    private lastTime = 0;
    public constructor(v) {
        super();
	wx4_function(3965);
        this.cd = v;
        this.timer = new egret.Timer(v);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onE_5770,this)


    }
	private wx4_functionX_54522(){console.log(7462)}

    private onE_5770(){
        var total = egret.getTimer() - this.lastTime;
        var num = Math.floor(total/this.cd)
        //if(total > 200)
        //{
        //     console.log(total)
        //}
        if(total > 3000)//卡太久，跳过
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime = egret.getTimer();
	wx4_function(8810);
            return;
        }
        while(num --)
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime += this.cd;
	wx4_function(4138);
        }
    }

    public start(){
       this.timer.start();
        this.lastTime = egret.getTimer()
    }
	private wx4_functionX_54523(){console.log(3372)}

    public stop(){
        this.timer.stop();
    }


	private wx4_functionX_54524(){console.log(6203)}

}