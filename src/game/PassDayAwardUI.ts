class PassDayAwardUI extends game.BaseWindow {

    private static _instance:PassDayAwardUI;

    public static getInstance():PassDayAwardUI {
        if (!this._instance)
            this._instance = new PassDayAwardUI();
        return this._instance;
    }

    private btnGroup: eui.Group;
    private okBtn: eui.Button;
    private shareBtn: eui.Button;
    private coinAddText: eui.Label;
    private coinText: eui.Label;





    private isVideo = false
    private coin
    public constructor() {
        super();
        this.canBGClose = false;
        this.skinName = "PassDayAwardUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.okBtn,this.hide)
        this.addBtnEvent(this.shareBtn,this.onShare)
    }

    public hide(){
        super.hide();
    }

    public onShare(){
        if(this.isVideo)
        {

        }
        //if(this.videoIcon.visible)
        //{
        //    this.onAddCoin_5742()
        //    return
        //}
        ShareTool.share('我需要你们的帮助！！',Config.localResRoot + "share_img_2.jpg",{},()=>{
            this.onAddCoin_5742()
        })
    }


    private onAddCoin_5742(){
        MyTool.removeMC(this.shareBtn);
        UM.addCoin(this.coin*2);
        this.okBtn.label = '关闭'

        var old = this.coin
        var pre = this.coin*2/50
        var coin = old;
        for(var i = 0 ; i < 50 ; i++)
        {
            egret.setTimeout(()=>{
                coin += pre
                this.coinText.text = NumberUtil.addNumSeparator(Math.round(coin),2);
            },this,20*i)
        }
    }

    public show(){
        super.show();
    }

    public onShow(){

        this.coinText.text = NumberUtil.addNumSeparator(this.coin,2);

        this.btnGroup.addChild(this.shareBtn)
        //MyTool.removeMC(this.shareBtn);



    }
}