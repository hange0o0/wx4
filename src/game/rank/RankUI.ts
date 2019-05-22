class RankUI extends game.BaseWindow{

    private static _instance:RankUI;
    public static getInstance() {
        if (!this._instance) this._instance = new RankUI();
        return this._instance;
    }

    private tab: eui.TabBar;
    private desText: eui.Label;
    private scroller: eui.Scroller;
    private list: eui.List;


    private bitmap: egret.Bitmap;
    private isdisplay = false;

    private rankData = {};

    public constructor() {
        super();
        this.skinName = "RankUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('排行榜')

        this.scroller.viewport = this.list;
        this.list.itemRenderer = RankItem;

        this.tab.addEventListener(egret.Event.CHANGE,this.onTab,this)
        this.tab.selectedIndex = 0;
    }

    private onTab(){
        this.renew()
    }


    public onShow(){

        this.renew();
    }


    public renew(){
        if(!window['wx'])
            return;
        this.remove();
        if(this.tab.selectedIndex == 0)
        {
            this.worldRank('level',UM.level);
        }
        else if(this.tab.selectedIndex == 1)
        {
            this.worldRank('endless',UM.endLess);
        }
        else
        {
            this.showBitmapList()
        }
    }

    private worldRank(type,myValue){
        var wx = window['wx'];
        if(!wx)
        {
            return;
        }

        //if(this.rankData[type])
        //{
        //    this.showRank(type);
        //    return;
        //}

        var oo = {
            type:type,
            openid:UM.gameid,
            nick:UM.nick,
            head:UM.head,
            value:myValue,
        }
        console.log(oo)

        wx.cloud.callFunction({      //取玩家openID,
            name: 'getRank',
            data: oo,
            complete: (res) => {
                console.log(res)
                if(res.result)
                {
                    this.rankData[oo.type] = {
                        list:res.result,
                        time:TM.now()
                    }
                    this.showRank(type);
                }
            },
            fail:()=>{
                console.log('fail')
            }
        })
    }

    public showRank(type){
        if(!this.rankData[type])
            return;
        this.scroller.visible = true;
        var arr = this.rankData[type].list;
        var b = false;
        var myScore = type=='level'?UM.level:UM.endLess;
        for(var i=0;i<arr.length;i++) //更新自己成绩
        {
            arr[i].type = type;
            if(arr[i].openid == UM.gameid)
            {
                arr[i].value = myScore;
                arr[i].nick = UM.nick;
                arr[i].head = UM.head;
                b = true;
            }
        }
        if(!b && UM.nick && arr.length<50 && myScore > 1)
        {
            arr.push({
                nick:UM.nick,
                value:myScore,
                head:UM.head,
                openid:UM.gameid
            })
        }
        ArrayUtil.sortByField(arr,['value'],[1])
        var myRank = 0
        for(var i=0;i<arr.length;i++)
        {
            arr[i].index = i+1;
            if(arr[i].openid == UM.gameid)
                myRank = i+1;
        }
        this.list.dataProvider = new eui.ArrayCollection(arr)

        if(UM.nick)
        {
            if(myRank)
                this.desText.text = '你当前排名为：' + myRank;
            else
                this.desText.text = '你还没进入前50名';
        }
        else
        {
            this.desText.text = '点击授权后可在排行榜中显示你的名次';
        }
    }



    private poseData(){
        if(this.tab.selectedIndex == 2)
        {
            var key = 'level'
            var value = UM.level
        }
        else if(this.tab.selectedIndex == 3)
        {
            var key = 'endless'
            var value = UM.endLess
        }
        let param:any = {
            me: UM.gameid,
            command: 'open',
            key:key,
            rankHeight:this.height-this.bitmap.y - 20,
            x:this.bitmap.x + (GameManager.uiWidth - this.width)/2,
            y:this.bitmap.y + (GameManager.uiHeight - this.height)/2,
            me_value: value,// + ',0', //第2位时间传0，永远排在最上面
            root: "openDataContext/",
        }

        //发送消息
        var platform = window['platform']
        platform.openDataContext.postMessage(param);
    }

    //0 好友榜，2群排行
    public showBitmapList(){
        if(!window["wx"] || !window["wx"].getOpenDataContext) return;
        this.remove();
        var platform = window['platform']
        if (!this.isdisplay) {

            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.bitmap.x = 20;
            this.bitmap.y = 75;
            this.addChild(this.bitmap);
            this.bitmap.touchEnabled = false

            this.isdisplay = true;
            this.poseData();
        }
    }

    protected remove(){
        var platform = window['platform']
        if(this.isdisplay){
            this.isdisplay = false;
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);

            if(platform.openDataContext){
                platform.openDataContext.postMessage({ command: 'close' });
            }
        }

        this.scroller.visible = false
        this.desText.text = ''
    }
    public hide(){
        this.remove();
        super.hide();
    }
}