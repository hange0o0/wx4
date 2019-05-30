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


    public constructor() {
        super();
        this.skinName = "MakeSplitUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
            ResultUI.getInstance().show();
        })

    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }



    private onE(){

    }


    public renew(){

    }

    public hide(){
        super.hide();
    }
}