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
    public static getAD(num=10,fun?){
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

    public childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = ChangeUserItem
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection();
    }

    private isSet = false;
    public dataChanged(){
        if(this.isSet)
            return;
        ChangeUserUI.getAD(10,()=>{
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

        for(var i=0;i<ChangeUserUI.adList.length;i++)
        {
            ChangeUserUI.adList[i].stopRed = this.stopRed
        }
        this.dataProvider.source = ChangeUserUI.adList;
        this.dataProvider.refresh();
    }
}