class GunChooseUI extends game.BaseWindow{

    private static _instance:GunChooseUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunChooseUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private bitmap: egret.Bitmap;
    private isdisplay = false;

    public constructor() {
        super();
        this.skinName = "GunChooseUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.closeBtn,this.hide)
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