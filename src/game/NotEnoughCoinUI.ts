class NotEnoughCoinUI extends game.BaseWindow_wx4 {

    private static _instance:NotEnoughCoinUI;

    public static getInstance():NotEnoughCoinUI {
        if (!this._instance)
            this._instance = new NotEnoughCoinUI();
        return this._instance;
    }

    private desText: eui.Label;
    private btnGroup: eui.Group;
    private shareBtn: eui.Button;
    private coinAddText: eui.Label;
    private coinText: eui.Label;






    private coin
    public constructor() {
        super();
        this.canBGClose = false;
        this.skinName = "NotEnoughCoinUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('领取补助')
        this.addBtnEvent(this.shareBtn,this.onShare)
    }

    public hide(){
        super.hide();
    }


    public onShare(){
        ShareTool.openGDTV(()=>{
            UM_wx4.coinTimes ++;
            UM_wx4.addCoin(this.coin);
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.coin,2),0xFFFF00),1000)
            this.hide();
            SoundManager.getInstance().playEffect('coin')
        })
    }

    public show(){
        if(UM_wx4.coinTimes >= 10 || Config.isNoVideo())
        {
            MyWindow.ShowTips('金币不足！')
            return
        }
        super.show();
    }

    public onShow(){
        this.coin = Math.max(1000,Math.floor(UM_wx4.getPassDayCoin()/5))
        var add = BuffManager.getInstance().getCoinAdd();
        if(add)
        {
            this.coin = Math.ceil(this.coin * (1+add/100));
            this.coinAddText.text = '好友助力加成 +'+add+'%'
        }
        else
        {
            this.coinAddText.text = '没有好友助力加成'
        }
        this.coinText.text = NumberUtil_wx4.addNumSeparator(this.coin,2);
        this.desText.text = '今日还可领取 '+(10 - UM_wx4.coinTimes)+' 次'
    }
}