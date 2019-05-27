class GunListUI extends game.BaseWindow{

    private static _instance:GunListUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunListUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private atkText: eui.Label;
    private gunItem: GunItem;
    private upGroup: eui.Group;
    private costText: eui.Label;
    private btn: eui.Button;
    private maxMC: eui.Label;
    private levelText: eui.Label;




    private gunid;
    public get data(){
        return this.list.selectedItem;
    }
    public constructor() {
        super();
        this.skinName = "GunListUISkin";

    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('我的飞刀')
        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunListItem
        this.list.selectedIndex = 0;
        this.gunItem.scaleX = this.gunItem.scaleY = 1

        this.addBtnEvent(this.btn,()=>{
            var GM = GunManager.getInstance();
            if(!UM.checkCoin(GM.getGunCost(this.data.id)))
                return;
            GM.levelUpGun(this.data.id)
        })

        this.list.addEventListener(egret.Event.CHANGE,this.renewChoose,this)
    }

    public show(id?){
        this.gunid = id;
        super.show()
    }

    public onShow(){
        this.renew();
        this.renewChoose();
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.GUN_UNLOCK,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    private onE(){
        this.gunItem.move2();
    }

    public renewList(){
        MyTool.renewList(this.list);
        this.renewChoose();
    }

    public renew(){
        var list = ObjectUtil.objToArray(GunVO.data);
        this.list.dataProvider = new eui.ArrayCollection(list)
        if(this.gunid)
        {
            for(var i=0;i<list.length;i++)
            {
                  if(list[i].id == this.gunid)
                  {
                      this.list.selectedIndex = i;
                      break
                  }
            }
        }
    }

    public renewChoose(){
        var GM = GunManager.getInstance();
        var vo:GunVO = this.data;
        var lv = GM.getGunLevel(vo.id);



        this.gunItem.data = vo.id;
        var str = '';
        if(!lv || lv == GM.maxGunLevel)
            str += this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.data.id) + this.createHtml('\n攻速：',0xFFF666) + vo.speed + '/秒'
        else
        {
            str +=  this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.data.id) + this.createHtml('  ('+GM.getGunAtk(this.data.id,lv+1) + ')',0x00FF00)+
                this.createHtml('\n攻速：',0xFFF666)  + this.data.speed + '/秒' ;
        }
        str += '\n' + this.createHtml(vo.getTitle() + '：',0xFFF666) + vo.getDes()
        this.setHtml(this.atkText, str)

        var cost = GM.getGunCost(this.data.id);
        this.costText.text = NumberUtil.addNumSeparator(UM.coin) + ' / ' + NumberUtil.addNumSeparator(cost)
        this.costText.textColor = cost>UM.coin?0xFF0000:0xFFFFFF;

        var pos = GunManager.getInstance().getPosByGun(vo.id)
        if(pos)
            this.levelText.text = pos + ' 号位'
        else
            this.levelText.text = '';

        if(!lv)
        {
            this.btn.label = '解锁'
            this.btn.skinName = 'Btn1Skin'
            this.upGroup.visible = true
            this.maxMC.text = ''

            this.setTitle(vo.name)
        }
        else if(lv == GM.maxGunLevel)
        {

            this.upGroup.visible = false
            this.maxMC.text = '已满级'
            this.setTitle(vo.name + '  LV.'+lv)
        }
        else
        {
            this.btn.label = '升级'
            this.btn.skinName = 'Btn2Skin'
            this.upGroup.visible = true
            this.maxMC.text = ''
            this.setTitle(vo.name + '  LV.'+lv)
        }

        console.log(vo.id)
    }

    public hide(){
        super.hide();
    }
}