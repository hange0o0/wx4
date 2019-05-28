class MyTimer extends egret.EventDispatcher {
    private cd = 0;
    private timer
    private lastTime = 0;
    public constructor(v) {
        super();
	wx4_function(9436);
        this.cd = v;
        this.timer = new egret.Timer(v);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onE_2841,this)


    }
	private wx4_functionX_45800(){console.log(9573)}

    private onE_2841(){
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
	wx4_function(418);
            return;
        }
        while(num --)
        {
            this.dispatchEventWith(egret.TimerEvent.TIMER)
            this.lastTime += this.cd;
	wx4_function(7925);
        }
    }

    public start(){
       this.timer.start();
        this.lastTime = egret.getTimer()
    }
	private wx4_functionX_45801(){console.log(1560)}

    public stop(){
        this.timer.stop();
    }


	private wx4_functionX_45802(){console.log(883)}

}