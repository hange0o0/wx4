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
    public gunList;

    public constructor() {
        super();
        this.skinName = "MakeGunInfoUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('武器详情')
        this.addBtnEvent(this.cancelBtn,()=>{
            MakeSplitUI.getInstance().show(this.gunid);
        })
        this.addBtnEvent(this.okBtn,()=>{
            GunListUI.getInstance().show(this.gunid);
        })

    }

    public show(gunid?,list?){
        this.gunid = gunid;
        this.gunList = list;
         super.show();
    }

    public onShow(){

        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)
    }

    private onE(){
        this.gunItem.move2();
    }


    public renew(){


        this.renewBtn()
        var pos = GunManager.getInstance().getPosByGun(this.gunid)
        if(pos)
            this.posText.text = pos + ' 号位'
        else
            this.posText.text = '';

        var GM = GunManager.getInstance();
        var lv = GM.getGunLevel(this.gunid);
        this.nameText.text = GM.getGunName(this.gunid);
        this.gunItem.data = this.gunid;
        this.levelText.text = 'LV.' + lv;
        var vos = GM.getVOs(this.gunid)
        var str = '';
        str += this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.gunid) + this.createHtml('\n攻速：',0xFFF666) + GM.getGunSpeed(this.gunid) + '/秒'
        str += '\n' + this.createHtml(vos.vo1.getTitle() + '：',0xFFF666) + vos.vo1.getDes(lv || 1)
        if(vos.vo2)
            str += '\n' + this.createHtml(vos.vo2.getTitle() + '：',0xFFF666) + vos.vo2.getDes(lv || 1)
        this.setHtml(this.atkText, str)
    }

    private renewBtn(){
        if(this.gunList)
        {
            this.index = this.gunList.indexOf(this.gunid);
            this.rightBtn.visible = this.gunList[this.index + 1]
            this.leftBtn.visible = this.index>0
        }
        else
        {
            this.rightBtn.visible = false
            this.leftBtn.visible = false
        }

    }

    public hide(){
        super.hide();
    }
}