class ChangeJumpUI extends game.BaseWindow{

    private static _instance:ChangeJumpUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ChangeJumpUI();
        return this._instance;
    }

    private list: eui.List;
    private destText: eui.Label;

    public fun;
    public str;
    public constructor() {
        super();
        this.skinName = "ChangeJumpUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem

        this.setTitle('体验其它小程序')
    }

    public show(str?,fun?){
        this.fun = fun;
        this.str = str;
        super.show()
    }

    public onShow(){
        this.renew();
    }

    public renewList(){
        MyTool.renewList(this.list);
    }


    public renew(){
        this.destText.text = this.str;
        //var arr = GunManager.getInstance().getMyGunList();
        //for(var s in arr)
        //{
        //    arr[s].temp = arr[s].getLevel();
        //}
        //ArrayUtil.sortByField(arr,['temp','open'],[1,1]);
        //this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    public hide(){
        super.hide();
    }
}