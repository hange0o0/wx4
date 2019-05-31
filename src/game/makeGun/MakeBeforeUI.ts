class MakeBeforeUI extends game.BaseWindow_wx4{

    private static _instance:MakeBeforeUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MakeBeforeUI();
        return this._instance;
    }

    private gunItem0: GunItem;
    private gunItem1: GunItem;
    private des0: eui.Label;
    private des1: eui.Label;
    private btn0: eui.Button;
    private btn1: eui.Button;
    private atkText: eui.Label;
    private gunItem: GunItem;
    private costText: eui.Label;
    private upGroup: eui.Group;
    private removeBtn: eui.Button;
    private btn: eui.Button;
    private levelText: eui.Label;




   public data
    public gun1
    public gun2

    public disableStr = '';
    public constructor() {
        super();
        this.skinName = "MakeBeforeUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        var GM = GunManager.getInstance();

        this.addBtnEvent(this.removeBtn,()=>{
            MyWindow.Confirm('确定丢弃该图纸吗？',(b)=>{
                if(b==1)
                {
                    var index = UM_wx4.makeList.indexOf(this.data);
                    UM_wx4.makeList.splice(index,1);
                    this.hide()
                    EM_wx4.dispatch(GameEvent.client.MAKE_CHANGE)
                }
            });
        })

        this.addBtnEvent(this.btn,()=>{
             if(this.disableStr)
             {
                 MyWindow.ShowTips(this.disableStr)
                 return;
             }
            if(!UM_wx4.checkCoin(GM.getGunCost(this.data)))
                return;

           GM.makeGun(this.data);
            this.hide()
            GunListUI.getInstance().show(this.data)
        })

        this.addBtnEvent(this.btn0,()=>{
               if(this.btn0.label == '拆分')
               {
                   MakeGunInfoUI.getInstance().show(GM.disableGun[this.gun1])
               }
               else
               {
                   GunListUI.getInstance().show(this.gun1)
               }
        })

        this.addBtnEvent(this.btn1,()=>{
            if(this.btn1.label == '拆分')
            {
                MakeGunInfoUI.getInstance().show(GM.disableGun[this.gun2])
            }
            else
            {
                GunListUI.getInstance().show(this.gun2)
            }
        })

    }

    public show(data?){
        this.data = data;
        this.gun1 = Math.floor(data/100)
        this.gun2 = data%100;
        super.show();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renew)
    }



    private onE(){
        this.gunItem0.move2();
        this.gunItem1.move2();
        this.gunItem.move2();
    }


    public renew(){
        var GM = GunManager.getInstance();
        //var vo:GunVO = this.data;



        var vos = GM.getVOs(this.data)
        this.gunItem.data =  this.data;

        var str = '';
        str += this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.data) + this.createHtml('\n攻速：',0xFFF666) + GM.getGunSpeed(this.data) + '/秒'


        str += '\n' + this.createHtml(vos.vo1.getTitle() + '：',0xFFF666) + vos.vo1.getDes(1,true)
        if(vos.vo2)
            str += '\n' + this.createHtml(vos.vo2.getTitle() + '：',0xFFF666) + vos.vo2.getDes(1,true)
        this.setHtml(this.atkText, str)

        var cost = GM.getGunCost(this.data);
        this.costText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.coin) + ' / ' + NumberUtil_wx4.addNumSeparator(cost)
        this.costText.textColor = cost>UM_wx4.coin?0xFF0000:0xFFFFFF;

        this.levelText.text = '';
        this.setTitle(GM.getGunName(this.data))



        this.disableStr = '';
        this.gunItem0.data =  this.gun1;
        this.gunItem1.data =  this.gun2;
        if(GM.disableGun[this.gun1])
        {
            this.des0.text = '已被打造'
            this.des0.textColor = 0xFF0000
            this.disableStr = '【' + GunVO.getObject(this.gun1).name + '】已被使用'
            this.btn0.label = '拆分'
        }
        else if(GM.getGunLevel(this.gun1) != 8)
        {
            this.des0.text = '等级不足8级'
            this.des0.textColor = 0xFF0000
            this.disableStr = '【' + GunVO.getObject(this.gun1).name + '】等级不足8级'
            this.btn0.label = '升级'
        }
        else
        {
            this.des0.text = '满足要求'
            this.des0.textColor = 0xFFFFFF
            this.btn0.label = '详情'
        }

        if(GM.disableGun[this.gun2])
        {
            this.des1.text = '已被打造'
            this.des1.textColor = 0xFF0000
            this.disableStr = '【' + GunVO.getObject(this.gun2).name + '】已被使用'
            this.btn1.label = '拆分'
        }
        else if(GM.getGunLevel(this.gun2) != 8)
        {
            this.des1.text = '等级不足8级'
            this.des1.textColor = 0xFF0000
            this.disableStr = '【' + GunVO.getObject(this.gun2).name + '】等级不足8级'
            this.btn1.label = '升级'
        }
        else
        {
            this.des1.text = '满足要求'
            this.des1.textColor = 0xFFFFFF
            this.btn1.label = '详情'
        }


    }

    public hide(){
        super.hide();
    }
}