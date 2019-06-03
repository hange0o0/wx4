class MsgingUI extends egret.Sprite {

    private static instance:MsgingUI;
    public static getInstance() {
        if (!this.instance) this.instance = new MsgingUI();
        return this.instance;
    }
	private wx4_functionX_54446(){console.log(1327)}


    public constructor() {
        super();
        this.createView_229();
    }
	private wx4_functionX_54447(){console.log(8080)}

    private loadingMC
    private shape

    private timer
    private showTimer
	private wx4_functionX_54448(){console.log(4628)}

    private createView_229():void {

        this.shape = new eui.Rect();
        this.shape.width = 640;
        this.shape.fillColor = 0;
	wx4_function(5384);
        this.shape.fillAlpha = 0.3;
        this.shape.touchEnabled = true;
        this.addChild(this.shape)



	wx4_function(8434);

        this.loadingMC = new eui.Image();
        //this.loadingMC.scaleX = this.loadingMC.scaleY = 1.5
        this.loadingMC.source = 'ui_loading_png'
        this.addChild(this.loadingMC);
        this.loadingMC.x = 320;
        this.loadingMC.anchorOffsetX = 70/2
        this.loadingMC.anchorOffsetY = 70/2



    }
	private wx4_functionX_54449(){console.log(2155)}

    public show(){
        this.showTimer = egret.getTimer();
        GameManager_wx4.container.addChild(this);

        this.width = 640;
	wx4_function(107);
        this.height = GameManager_wx4.stage.stageHeight;
        this.shape.height = GameManager_wx4.stage.stageHeight;
        this.loadingMC.y = this.height/2 - 100;

        egret.Tween.removeTweens(this.loadingMC)
        var tw = egret.Tween.get(this.loadingMC,{loop:true})
        tw.to({rotation:0}).to({rotation:360},1000);
	wx4_function(9443);

        this.alpha = 0;
        egret.clearTimeout(this.timer);
        this.timer = egret.setTimeout(function(){
            this.alpha = 1;
        },this,200)
    }
	private wx4_functionX_54450(){console.log(3429)}


    public hide(){
        egret.Tween.removeTweens(this.loadingMC)
        MyTool.removeMC(this);
    }
}
