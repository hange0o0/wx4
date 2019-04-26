class GunListUI extends game.BaseWindow{

    private static _instance:GunListUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunListUI();
        return this._instance;
    }

    private closeBtn: eui.Image;
    private bitmap: egret.Bitmap;
    private isdisplay = false;

    public constructor() {
        super();
        this.skinName = "GunListUISkin";
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