class ResultUI extends game.BaseUI{

    private static _instance:ResultUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ResultUI();
        return this._instance;
    }

    private awardBtn: eui.Button;
    private shareBtn: eui.Button;
    private coinText: eui.Label;
    private coinAddText: eui.Label;
    private failGroup: eui.Group;
    private barMC: eui.Rect;
    private rateText: eui.Label;
    private titleText: eui.Label;


    public addCoin = 0;
    public constructor() {
        super();
        this.skinName = "ResultUISkin";
        this.hideBehind = false;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.awardBtn,()=>{
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin,2),0xFFFF00),2000)
            this.close();
        })
        this.addBtnEvent(this.shareBtn,()=>{
            UM.addCoin(this.addCoin*2);
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin*3,2),0xFFFF00),2000)
            this.close();
        })
    }

    public close(){
        this.hide();
        PKingUI.getInstance().hide()
    }

    public onShow(){
        this.renew();
    }


    public renew(){
        var PD = PKCode_wx3.getInstance();
        var rate = PD.enemyHp / PD.enemyHpMax;
        var coin = (PD.enemyHpMax - PD.enemyHp)/500
        var add = 0;
        if(rate == 0)
        {
             this.titleText.text = '大胜！'
            this.failGroup.visible = false
            coin*=5;
            UM.level ++;
        }
        else
        {
             this.titleText.text = '惜败！'
            this.failGroup.visible = true
            this.barMC.width = 360*rate;
            this.rateText.text = '剩余怪物：'+MyTool.toFixed(rate*100,1)+'%'
        }
        coin *= (1+add/100);
        coin = this.addCoin = Math.ceil(coin);
        UM.addCoin(coin);
        this.coinText.text = 'x' + NumberUtil.addNumSeparator(coin);
        if(add)
            this.coinAddText.text = '好友助力加成 +'+add+'%'
        else
            this.coinAddText.text = '没有好友助力加成'
    }

    public hide(){
        super.hide();
    }
}