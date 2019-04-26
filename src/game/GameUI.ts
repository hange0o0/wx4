class GameUI extends game.BaseUI {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private startBtn: eui.Rect;

    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.startBtn,()=>{
            PKingUI.getInstance().show()
        })
    }



    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        GameTool.getInstance().preLoadMV();
    }



}