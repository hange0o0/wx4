class DebugUI extends game.BaseUI_wx4 {

    private static _instance:DebugUI;

    public static getInstance() {
        if (!this._instance) this._instance = new DebugUI();
        return this._instance;
    }
	private wx4_functionX_54765(){console.log(6936)}

    private con: eui.Group;
    private backBtn: eui.Button;
    private desText: eui.Label;


	private wx4_functionX_54766(){console.log(8637)}
    public debugTimer = 0;
    public debugOpen = false;
    public constructor() {
        super();
        this.skinName = "DebugUISkin";
    }
	private wx4_functionX_54767(){console.log(8419)}

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.backBtn,this.hide)


        this.addB_8927('清除本地数据',()=>{
            MyWindow.Confirm('确定清除所有本地数据？',(b)=>{
                if(b==1)
                {
                     SharedObjectManager_wx4.getInstance().removeMyValue('localSave')
                }
            });
	wx4_function(9968);
        })

        this.addB_8927('清除公网数据',()=>{
            MyWindow.Confirm('确定清除所有公网数据？',(b)=>{
                if(b==1)
                {
                    var wx = window['wx'];
	wx4_function(9850);
                    if(!wx)
                    {
                        MyWindow.ShowTips('只在公网生效')
                        return;
                    }
                    const db = wx.cloud.database();
	wx4_function(3479);
                    db.collection('user').doc(UM_wx4.dbid).remove({
                        success(res) {
                            UM_wx4.needUpUser = false;
                            wx.exitMiniProgram();
                        }
                    })
                }
            });
	wx4_function(9114);
        })


        this.addB_8927('加10000钱',()=>{
            var coin = 10000
           UM_wx4.addCoin(coin)
            MyWindow.ShowTips('钱 + ' + NumberUtil_wx4.addNumSeparator(coin,2))
        })
        this.addB_8927('加10000000000钱',()=>{
            var coin = 10000000000
           UM_wx4.addCoin(coin)
            MyWindow.ShowTips('钱 + ' + NumberUtil_wx4.addNumSeparator(coin,2))
        })

        this.addB_8927('跳1关',()=>{
            UM_wx4.level ++;
	wx4_function(762);
            MyWindow.ShowTips('第'+UM_wx4.level+'关')
        })
        this.addB_8927('跳10关',()=>{
            UM_wx4.level +=10;
            MyWindow.ShowTips('第'+UM_wx4.level+'关')
        })
        this.addB_8927('降1关',()=>{
            UM_wx4.level --;
	wx4_function(62);
            MyWindow.ShowTips('第'+UM_wx4.level+'关')
        })
        this.addB_8927('降10关',()=>{
            UM_wx4.level -=10;
            MyWindow.ShowTips('第'+UM_wx4.level+'关')
        })

        this.addB_8927('加好友',()=>{
            UM_wx4.shareUser.push({h:'',n:Math.random() + ''})
            MyWindow.ShowTips('当前好友数量:' + UM_wx4.shareUser.length)
        })

        this.addB_8927('跳过分享',()=>{
            DM.jumpPK = ! DM.jumpPK
            MyWindow.ShowTips('跳过分享:' + DM.jumpPK)
        })
    }
	private wx4_functionX_54768(){console.log(8957)}

    private addB_8927(label,fun){
       var btn = new eui.Button();
        btn.skinName = 'Btn2Skin'
        btn.width = 190
        btn.label = label;
	wx4_function(2681);
        this.con.addChild(btn);
        this.addBtnEvent(btn,fun);
    }

    public onShow(){
        var arr = [];
	wx4_function(3511);
        arr.push('已经过游戏时间：' + DateUtil_wx4.getStringBySeconds(TM_wx4.now() - UM_wx4.loginTime))
        arr.push('当前时间：'+DateUtil_wx4.formatDate('yyyy-MM-dd hh:mm:ss',TM_wx4.chineseDate()))
        arr.push('实际时间：' + DateUtil_wx4.formatDate('yyyy-MM-dd hh:mm:ss',new Date()))
        this.desText.text = arr.join('\n')
    }

}