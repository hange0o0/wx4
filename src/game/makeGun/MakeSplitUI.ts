class MakeSplitUI extends game.BaseWindow_wx4{

    private static _instance:MakeSplitUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MakeSplitUI();
        return this._instance;
    }

    private gunItem0: GunItem;
    private gunItem1: GunItem;
    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private desText: eui.Label;
    private gunText0: eui.Label;
    private gunText1: eui.Label;



    private gunid;
    private gun1;
    private gun2;
    private coin;
    public constructor() {
        super();
        this.skinName = "MakeSplitUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
        })

        this.addBtnEvent(this.okBtn,()=>{
            GunManager.getInstance().splitGun(this.gunid)
            UM_wx4.addCoin(this.coin);
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.coin,2),0xFFFF00),1000)
            MakeGunInfoUI.getInstance().hide();
            this.hide();
        })

    }

    public show(gunid?){
        this.gunid = gunid;
        this.gun1 = Math.floor(gunid/100)
        this.gun2 = gunid%100;
        super.show();
    }

    public onShow(){
        this.setTitle('拆分【'+GunManager.getInstance().getGunName(this.gunid)+'】')
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }



    private onE(){
         this.gunItem0.move2()
         this.gunItem1.move2()
    }


    public renew(){
        var GM = GunManager.getInstance();
        this.gunItem0.data = this.gun1
        this.gunItem1.data = this.gun2
        this.gunText0.text = GunVO.getObject(this.gun1).name
        this.gunText1.text = GunVO.getObject(this.gun2).name
        this.coin = 0;
        var lv = GM.getGunLevel(this.gunid)
        for(var i=0;i<lv;i++)
        {
            this.coin += GM.getGunCost(this.gunid,i)
        }
        this.coin = Math.ceil(this.coin/2)
        this.setHtml(this.desText,'拆分武器只能返还50%的金币消耗\n拆分后可获得金币 ' + this.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.coin),0xFFFF00))
    }

    public hide(){
        super.hide();
    }
}