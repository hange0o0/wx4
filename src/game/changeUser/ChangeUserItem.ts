class ChangeUserItem extends game.BaseItem{

    //"appid": "wxec9471079f8b6c27",
    //"desc": “免费抽⼤大奖，免费领奖品，再奖⼀一个亿！",
    //"img": "https://wllm.oss-cn-beijing.aliyuncs.com/trackposter/wxec9471079f8b6c27/75428.jpg",
    //"logo": "https://wllm.oss-cn-beijing.aliyuncs.com/logoa/wxec9471079f8b6c27.png",
    //"name": "测试号1"


    private mc: eui.Image;
    private redMC: eui.Image;
    private nameText: eui.Label;
    //private desText: eui.Label;


    public constructor() {
        super();
        this.skinName = "ChangeUserItemSkin";
    }


    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
    }


    private onClick(){
        var wx = window['wx'];
        var appid = this.data.appid
        this.redMC.visible = false;
        wx.previewImage({
            urls: [this.data.img],
            success: function () {
                if(!UM.gameid)
                    return;
                var arr = SharedObjectManager.getInstance().getMyValue('exchangeUserAppid')|| [];
                if(arr.indexOf(appid) == -1)
                {
                    GameManager.getInstance().changeUserTime = TM.now();
                    GameManager.getInstance().changeUserID = appid;
                    console.log(GameManager.getInstance().changeUserTime,GameManager.getInstance().changeUserID)
                }
            }
        })
    }

    public dataChanged():void {
        this.mc.source = this.data.logo;
        this.nameText.text = StringUtil.getStringByLength(this.data.name,5);
        this.redMC.visible = false;

        if(!this.data.stopRed)
        {
            this.currentState = 's1'
            var arr = SharedObjectManager.getInstance().getMyValue('exchangeUserAppid')|| [];
            if(UM.gameid && arr.indexOf(this.data.appid) == -1)
                this.redMC.visible = true
        }
        else
        {
            this.currentState = 's2'
        }


        //this.desText.text = this.data.desc;
    }

}