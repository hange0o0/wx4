class GunChooseUI extends game.BaseWindow{

    private static _instance:GunChooseUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunChooseUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;


    public index;
    public dataList;
    public constructor() {
        super();
        this.skinName = "GunChooseUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunChooseItem
    }

    public show(v?){
        this.index = v;
        super.show()
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewList)
    }

    public renewList(){
        MyTool.renewList(this.list);
    }


    public renew(){
        var GM = GunManager.getInstance();
        this.setTitle('更换'+this.index+'号位武器')
        var arr = GunManager.getInstance().getMyGunList();
        for(var s in arr)
        {
            arr[s] = {
                id:arr[s],
                open:GunVO.getObject(arr[s]),
                lv:GM.getGunLevel(arr[s]),
            }
        }
        ArrayUtil.sortByField(arr,['lv','open'],[1,1]);
        for(var s in arr)
        {
            arr[s] = arr[s].id;
        }
        this.dataList = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    public hide(){
        super.hide();
    }
}