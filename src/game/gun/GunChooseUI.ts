class GunChooseUI extends game.BaseWindow{

    private static _instance:GunChooseUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunChooseUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;


    private index;
    public constructor() {
        super();
        this.skinName = "GunChooseUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('更换武器')
        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunChooseItem
    }

    public show(v?){
        this.index = v;
        super.show()
    }

    public onShow(){
        this.renew();
    }


    public renew(){
        this.list.dataProvider = new eui.ArrayCollection(ObjectUtil.objToArray(GunVO.data))
    }

    public hide(){
        super.hide();
    }
}