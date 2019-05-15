class GunInfoUI extends game.BaseWindow{

    private static _instance:GunInfoUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunInfoUI();
        return this._instance;
    }

    private leftBtn: eui.Image;
    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private rightBtn: eui.Image;
    private atkText: eui.Label;
    private nameText: eui.Label;
    private desText: eui.Label;
    private gunItem: GunItem;
    private levelText: eui.Label;




    public constructor() {
        super();
        this.skinName = "GunInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,this.hide)
    }

    public onShow(){
        this.renew();
    }


    public renew(){

    }

    public hide(){
        super.hide();
    }
}