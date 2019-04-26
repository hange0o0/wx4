class GunInfoUI extends game.BaseWindow{

    private static _instance:GunInfoUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunInfoUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private bitmap: egret.Bitmap;
    private isdisplay = false;

    public constructor() {
        super();
        this.skinName = "GunInfoUISkin";
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