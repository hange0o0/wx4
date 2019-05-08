class GunListUI extends game.BaseWindow{

    private static _instance:GunListUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunListUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;


    public constructor() {
        super();
        this.skinName = "GunListUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('我的飞刀')
        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunListItem
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