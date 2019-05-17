class ChangeUserUI extends game.BaseItem {



    private list: eui.List;
    private dataProvider:eui.ArrayCollection
    public stopRed = false;

    public constructor() {
        super();
        this.skinName = "ChangeUserUISkin";
    }

    public static adList = []
    private static lastGetADTime = 0;
    public static getAD(fun?){
        var num = 20
        var wx = window['wx'];
        //console.log(333333)
        if(!wx) {
            var oo = {
                "appid": "wxec9471079f8b6c27",
                "desc": '免费抽大奖，免费领奖品，再奖⼀一个亿',
                "img": "https://wllm.oss-cn-beijing.aliyuncs.com/trackposter/wxec9471079f8b6c27/75428.jpg",
                "logo": "",
                "name": "测试号1"
            }
            this.adList = [oo,oo,oo,oo,oo,oo,oo,oo,oo,oo]
            fun && fun();
            //MyTool.removeMC(this);
            return;
        }
        if(this.lastGetADTime)
        //if(TM.now() - this.lastGetADTime < 10*60)
        {
            fun && fun();
            return;
        }
        this.adList.length = 0;
        wx.wladGetAds(num,function (res) { //第⼀一个参数为获取⼴广告条数，第⼆二个参数为获取成功后回调⽅方法;
            //console.log(res);
            ChangeUserUI.lastGetADTime = TM.now();
            ChangeUserUI.adList = res.data;
            fun && fun();
        })
    }

    //取指定长度的数据
    public static getListByNum(num,fun?){
        var arr = SharedObjectManager.getInstance().getMyValue('exchangeUserAppid')|| [];
        for(var i=0;i<this.adList.length;i++)
        {
            this.adList[i].temp = arr.indexOf(this.adList[i].appid)
            this.adList[i].fun = fun;
        }
        ArrayUtil.sortByField(this.adList,['temp'],[-1]);
        return this.adList.slice(0,num);
    }

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
    }

    private isSet = false;
    public dataChanged(){
        if(this.isSet)
            return;
        ChangeUserUI.getAD(()=>{
            this.renew();
        });
    }

    public renew(){
        this.isSet = true;
        if(ChangeUserUI.adList.length == 0)
        {
            MyTool.removeMC(this);
            return;
        }

        //for(var i=0;i<ChangeUserUI.adList.length;i++)
        //{
        //    ChangeUserUI.adList[i].stopRed = this.stopRed
        //}
        this.dataProvider.source = ChangeUserUI.getListByNum(10);
        this.dataProvider.refresh();
    }
}