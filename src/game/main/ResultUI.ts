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
    private failText: eui.Label;





    public addCoin = 0;
    public rate = 3;
    public constructor() {
        super();
        this.skinName = "ResultUISkin";
        this.hideBehind = false;

        this.isShowAD = true;
        this.adBottom = 50;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.awardBtn,()=>{
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin,2),0xFFFF00),1000)
            this.close();
            SoundManager.getInstance().playEffect('coin')
        })
        this.addBtnEvent(this.shareBtn,()=>{
            ShareTool.openGDTV(()=>{
                UM.addCoin(this.addCoin*(this.rate-1));
                MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil.addNumSeparator(this.addCoin*this.rate,2),0xFFFF00),1000)
                this.close();
                SoundManager.getInstance().playEffect('coin')
            })

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
        this.failText.text = ''
        if(PlayManager.getInstance().isEndLess)
        {
            this.titleText.text = '游戏结束！'
            this.titleText.textColor = 0xFFFFFF
            this.failGroup.visible = false
            coin = (Math.abs(PD.enemyHp)/400)
            var cd = Math.floor(PD.actionStep/60)  + PD.endLessPassStep*5
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
            SoundManager.getInstance().playEffect('lose')
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
            SoundManager.getInstance().playEffect('win')
        }
        else
        {
             this.titleText.text = '惜败！'
            this.titleText.textColor = 0xFF0000
            this.failGroup.visible = true
            this.barMC.width = 360*rate;
            this.rateText.text = '剩余怪物：'+MyTool.toFixed(rate*100,1)+'%'
            var arr = [ '* 升级武器提升攻击力']
            if(GunManager.getInstance().getUnlockGun())
                arr.push( '* 解锁并装备新的武器')
            if(UM.level >= 100)
                arr.push( '* 打造新的武器')
            if(UM.gunPosNum < 9)
                arr.push( '* 解锁新的武器槽')
            if(BuffManager.getInstance().getUserNum() < 20)
                arr.push( '* 邀请好友增加城墙血量')

            this.failText.text = arr.join('\n')
            SoundManager.getInstance().playEffect('lose')
        }
        coin *= (1+add/100 + PKCode_wx3.getInstance().coinAdd/100);
        coin = this.addCoin = Math.ceil(coin);
        UM.addCoin(coin);
        this.coinText.text = '金币 +' + NumberUtil.addNumSeparator(coin);
        if(add)
            this.coinAddText.text = '好友助力加成 +'+add+'%'
        else
            this.coinAddText.text = '没有好友助力加成'


        if(PlayManager.getInstance().isEndLess)
            this.rate = Math.max(3,Math.ceil(900/this.addCoin))
        else if(rate != 0)
            this.rate = Math.max(3,Math.ceil(800/this.addCoin))
        else
            this.rate = Math.max(3,Math.ceil(1000/this.addCoin))
        this.rate = Math.min(20,this.rate);
        this.shareBtn.label = this.rate + '倍领取'

        //this.bg.source = UM.getBG();
    }

    public hide(){
        super.hide();
    }
}