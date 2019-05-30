class MakeGunUI extends game.BaseWindow_wx4{

    private static _instance:MakeGunUI;
    public static getInstance() {
        if (!this._instance) this._instance = new MakeGunUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private tab: eui.TabBar;
    private btnGroup: eui.Group;
    private freeBtn: eui.Button;
    private videoBtn: eui.Button;






    public constructor() {
        super();
        this.skinName = "MakeGunUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.scroller.viewport = this.list;
        this.list.itemRenderer = MakeGunItem;

        this.addBtnEvent(this.freeBtn,()=>{
             if(UM_wx4.nextMakeTime > TM_wx4.now())
             {
                 return;
             }

            if(this.draw())
            {
                UM_wx4.nextMakeTime = TM_wx4.now() + 8*3600;
                this.renew();
            }
        })
        this.addBtnEvent(this.videoBtn,()=>{

            if(this.draw())
            {
                UM_wx4.videoMakeTimes ++;
                this.renew();
            }
        })

        this.tab.addEventListener(egret.Event.CHANGE,this.onTab,this)
        this.tab.selectedIndex = 0;
    }

    public draw(){
        var list = ObjectUtil_wx4.objToArray(GunVO.data);
        var disableKey = ['1_15','2_15','14_15']
        while(true)
        {
            var vo1 = ArrayUtil_wx4.randomOne(list)
            var vo2 = ArrayUtil_wx4.randomOne(list)
            if(vo1.type == vo2.type)
                continue;
            var arr = [vo1,vo2];
            ArrayUtil_wx4.sortByField(arr,['type'],[0]);
            var key = arr[0].type + '_' + arr[1].type;
            if(disableKey.indexOf(key) != -1)
                continue;
            var gunid = arr[0].id*100 + arr[1].id;
            if(UM_wx4.makeList.indexOf(gunid) != -1)
                continue;
            if(GunManager.getInstance().getGunLevel(gunid))
                continue;

            UM_wx4.makeList.unshift(gunid)
            return true;
        }
    }

    private onTab(){
        this.renew();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
    }



    private onTimer(){
        if(this.currentState == 's1')
        {
            if(UM_wx4.nextMakeTime > TM_wx4.now())
            {
                this.freeBtn.label = DateUtil_wx4.getStringBySecond(UM_wx4.nextMakeTime - TM_wx4.now())
            }
            else
            {
                this.freeBtn.label = '免费获取'
            }
        }

    }


    public renew(){
        if(this.tab.selectedIndex == 0)
        {
            this.currentState = 's1'
            if(UM_wx4.videoMakeTimes >= 6)
            {
                MyTool.removeMC(this.videoBtn);
            }
            else
            {
                this.btnGroup.addChild(this.videoBtn)
                this.videoBtn.label = '获取（'+(6-UM_wx4.videoMakeTimes)+'/6）'
            }
            this.list.dataProvider = new eui.ArrayCollection(UM_wx4.makeList)
        }
        else
        {
            this.list.dataProvider = new eui.ArrayCollection(GunManager.getInstance().getMakeGuns());
        }

    }

    public hide(){
        super.hide();
    }
}