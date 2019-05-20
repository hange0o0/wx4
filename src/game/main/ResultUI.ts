class ResultUI extends game.BaseUI{

    private static _instance:ResultUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ResultUI();
        return this._instance;
    }

    private bg: eui.Image;
    private awardBtn: eui.Button;
    private shareBtn: eui.Button;
    private coinText: eui.Label;
    private coinAddText: eui.Label;
    private failGroup: eui.Group;
    private barMC: eui.Rect;
    private rateText: eui.Label;
    private titleText: eui.Label;
    private timeText: eui.Label;




    public addCoin = 0;
    public constructor() {
        super();
        this.skinName = "ResultUISkin";
        this.hideBehind = false;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.awardBtn,()=>{
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin,2),0xFFFF00),1000)
            this.close();
        })
        this.addBtnEvent(this.shareBtn,()=>{
            UM.addCoin(this.addCoin*2);
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin*3,2),0xFFFF00),1000)
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
        var add = BuffManager.getInstance().getCoinAdd();

        this.timeText.text = ''
        if(PlayManager.getInstance().isEndLess)
        {
            this.titleText.text = '游戏结束！'
            this.titleText.textColor = 0xFFFFFF
            this.failGroup.visible = false
            coin = (Math.abs(PD.enemyHp)/500)
            var cd = Math.floor(PD.actionStep/60)
            var cd2 = Math.floor(PD.actionStep/60*100)%100

            if(cd > UM.endLess)
            {
                UM.endLess = cd;
                UM.needUpUser = true;
                UM.upWXEndLess()
                this.timeText.text = '新纪录\n' + DateUtil.getStringBySecond(cd).substr(-5) + '.' + ('00' + cd2).substr(-2)
            }
            else
            {
                this.timeText.text = '用时\n' + DateUtil.getStringBySecond(cd).substr(-5) + '.' + ('00' + cd2).substr(-2)
            }
        }
        else if(rate == 0)
        {
             this.titleText.text = '大胜！'
            this.titleText.textColor = 0xFFFF00
            this.failGroup.visible = false
            coin*=5;
            UM.level ++;
            UM.needUpUser = true;
            UM.upWXLevel()
        }
        else
        {
             this.titleText.text = '惜败！'
            this.titleText.textColor = 0xFF0000
            this.failGroup.visible = true
            this.barMC.width = 360*rate;
            this.rateText.text = '剩余怪物：'+MyTool.toFixed(rate*100,1)+'%'
        }
        coin *= (1+add/100 + PKCode_wx3.getInstance().coinAdd/100);
        coin = this.addCoin = Math.ceil(coin);
        UM.addCoin(coin);
        this.coinText.text = '金币 +' + NumberUtil.addNumSeparator(coin);
        if(add)
            this.coinAddText.text = '好友助力加成 +'+add+'%'
        else
            this.coinAddText.text = '没有好友助力加成'

        //this.bg.source = UM.getBG();
    }

    public hide(){
        super.hide();
    }
}