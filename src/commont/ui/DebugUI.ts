class DebugUI extends game.BaseUI {

    private static _instance:DebugUI;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugUI();
        return this._instance;
    }

    private con: eui.Group;
    private backBtn: eui.Button;
    private desText: eui.Label;


    public debugTimer = 0;
    public debugOpen = false;
    public constructor() {
        super();
        this.skinName = "DebugUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)


        this.addB('清除本地数据',()=>{
            MyWindow.Confirm('确定清除所有本地数据？',(b)=>{
                if(b==1)
                {
                     SharedObjectManager.getInstance().removeMyValue('localSave')
                     SharedObjectManager.getInstance().removeMyValue('fight')
                     SharedObjectManager.getInstance().removeMyValue('addTime')
                     SharedObjectManager.getInstance().removeMyValue('lastAtkList')
                     SharedObjectManager.getInstance().removeMyValue('pkSpeed')
                     SharedObjectManager.getInstance().removeMyValue('addTaskTime')
                }
            });
        })

        this.addB('清除公网数据',()=>{
            MyWindow.Confirm('确定清除所有公网数据？',(b)=>{
                if(b==1)
                {
                    var wx = window['wx'];
                    if(!wx)
                    {
                        MyWindow.ShowTips('只在公网生效')
                        return;
                    }
                    const db = wx.cloud.database();
                    db.collection('user').doc(UM.dbid).remove({
                        success(res) {
                            UM.needUpUser = false;
                            wx.exitMiniProgram();
                        }
                    })
                }
            });
        })

        this.addB('超前1小时',()=>{
            DM.addTimeCD(3600)
            MyWindow.ShowTips('已超前' + DateUtil.getStringBySeconds(DM.addTime,false,2))
        })
        this.addB('超前1天',()=>{
            DM.addTimeCD(3600*24)
            MyWindow.ShowTips('已超前' + DateUtil.getStringBySeconds(DM.addTime,false,2))
        })

        this.addB('加1天钱',()=>{
            var coin = UM.hourEarn*24
           UM.addCoin(coin)
            MyWindow.ShowTips('钱 + ' + NumberUtil.addNumSeparator(coin,2))
        })

        //this.addB('加100钻石',()=>{
        //    UM.addDiamond(100)
        //    MyWindow.ShowTips('钻石 + ' + 100)
        //})
        this.addB('跳过PK',()=>{
            DM.jumpPK = !DM.jumpPK;
            if(DM.jumpPK)
                MyWindow.ShowTips('自动跳过PK')
            else
                MyWindow.ShowTips('取消自动跳过PK')
        })
        this.addB('加好友',()=>{
            UM.shareUser.push({h:'',n:Math.random() + ''})
            MyWindow.ShowTips('当前好友数量:' + UM.shareUser.length)
        })
        this.addB('跳转小程序',()=>{
            var wx = window['wx'];
            if(!wx)
            {
                MyWindow.ShowTips('只在公网生效')
                return;
            }
            wx.navigateToMiniProgram({
                appId: 'wxf9c8e218c23e2eb7',
                success(res) {
                    // 打开成功
                }
            })
        })
    }

    private addB(label,fun){
       var btn = new eui.Button();
        btn.skinName = 'Btn1Skin'
        btn.width = 190
        btn.label = label;
        this.con.addChild(btn);
        this.addBtnEvent(btn,fun);
    }

    public onShow(){
        var arr = [];
        arr.push('已经过游戏时间：' + DateUtil.getStringBySeconds(TM.now() - UM.loginTime))
        arr.push('当前时间：'+DateUtil.formatDate('yyyy-MM-dd hh:mm:ss',TM.chineseDate()))
        arr.push('实际时间：' + DateUtil.formatDate('yyyy-MM-dd hh:mm:ss',new Date()))
        this.desText.text = arr.join('\n')
    }

}