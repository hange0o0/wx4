class MakeGunInfoUI extends game.BaseWindow_wx4{

    private static _instance:MakeGunInfoUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MakeGunInfoUI();
        return this._instance;
    }

    private leftBtn: eui.Group;
    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private rightBtn: eui.Group;
    private atkText: eui.Label;
    private gunItem: GunItem;
    private nameText: eui.Label;
    private levelText: eui.Label;
    private posText: eui.Label;


    private gunid
    private index

    public constructor() {
        super();
        this.skinName = "MakeGunInfoUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
            ResultUI.getInstance().show();
        })

    }

    public show(gunid?,list?){
        this.gunid = gunid;
         super.show();
    }

    public onShow(){
        this.setTitle('更换'+GunChooseUI.getInstance().index+'号位武器')
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    private onE(){
        this.gunItem.move2();
    }


    public renew(){

        this.index = GunChooseUI.getInstance().dataList.indexOf(this.gunid);
        this.renewBtn()
        var pos = GunManager.getInstance().getPosByGun(this.gunid)
        if(pos)
            this.posText.text = pos + ' 号位'
        else
            this.posText.text = '';
        if(pos == GunChooseUI.getInstance().index)
        {
            this.okBtn.label = '卸下'
        }
        else if(pos && GunManager.getInstance().getGunByPos(GunChooseUI.getInstance().index))
        {
            this.okBtn.label = '交换'
        }
        else
        {
            this.okBtn.label = '装备'
        }

        var GM = GunManager.getInstance();

        var lv = GM.getGunLevel(this.gunid);
        var vo:GunVO = GunVO.getObject(this.gunid);
        this.nameText.text = vo.name;
        this.gunItem.data = this.gunid;
        this.levelText.text = 'LV.' + lv;
        this.setHtml(this.atkText, this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.gunid) + this.createHtml('\n攻速：',0xFFF666) + GM.getGunSpeed(this.gunid) + '/秒\n'+
            this.createHtml(vo.getTitle() + '：',0xFFF666) + vo.getDes(lv,true))
    }

    private renewBtn(){
        this.rightBtn.visible = GunChooseUI.getInstance().dataList[this.index + 1]
        this.leftBtn.visible = this.index>0
    }

    public hide(){
        super.hide();
    }
}