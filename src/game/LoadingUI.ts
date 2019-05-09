class LoadingUI extends game.BaseUI {

    private static _instance:LoadingUI;

    public static getInstance():LoadingUI {
        if (!this._instance)
            this._instance = new LoadingUI();
        return this._instance;
    }


    private changeUser: ChangeUserUI;
    private startBtn: eui.Image;
    private loadText: eui.Label;


    private infoBtn:UserInfoBtn
    private haveGetInfo = false;
    private haveLoadFinish = false;
    private haveGetUser = false;
    private needShowStartBtn = false;

    public constructor() {
        super();
        this.skinName = "LoadingUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.infoBtn = new UserInfoBtn(this.startBtn, (res)=>{
            this.renewInfo(res);
        }, this, Config.localResRoot + "wx_btn_info.png");
        this.infoBtn.visible = false;
        this.startBtn.visible = false;
    }

    private renewInfo(res?){
        var wx = window['wx'];
        if(!wx)
        {
            this.haveGetUser = true;
            this.initData();
            return;
        }
        if(res)
        {
            if(!res.userInfo)
                return;
            this.infoBtn.visible = false;
            UM.renewInfo(res.userInfo)
            this.haveGetUser = true;
            this.initData();
            return;
        }
        wx.getSetting({
            success: (res) =>{
                console.log(res.authSetting)
                if(res.authSetting["scope.userInfo"])//已授权
                {
                    this.haveGetUser = true;
                    this.initData()
                    wx.getUserInfo({
                        success: (res) =>{
                            var userInfo = res.userInfo
                            UM.renewInfo(userInfo)
                        }
                    })
                }
                else
                {
                    this.needShowStartBtn = true;
                }
            }
        })
    }

    private initData(){
        if(this.haveLoadFinish && this.haveGetInfo && !this.haveGetUser && this.needShowStartBtn)
        {
            this.changeUser.dataChanged()
            this.loadText.text = '点击屏幕授权进入游戏';
            this.needShowStartBtn = false;
            this.infoBtn.visible = true;
            return;
        }
        if(!this.haveLoadFinish || !this.haveGetInfo  || !this.haveGetUser)
            return;
        this.hide();
        GameUI.getInstance().show();
    }

    public onShow(){
        var self = this;
        ChangeUserUI.getAD();
        self.loadText.text = '正在加载素材，请耐心等候..'
        this.renewInfo();
        UM.getUserInfo(()=>{
            this.haveGetInfo = true;
            this.initData();
        });
        var wx =  window["wx"];
        if(wx)
        {
            const loadTask = wx.loadSubpackage({
                name: 'assets2', // name 可以填 name 或者 root
                success(res) {
                    self.callShow();
                    setTimeout(()=>{
                        self.changeUser.dataChanged()
                    },5000)
                },
                fail(res) {
                }
            })

            loadTask.onProgressUpdate(res => {
                self.loadText.text = '正在加载素材..' + res.progress + '%'
            })
            return;
        }
        this.callShow();
    }

    private callShow(){
        this.loadText.text = '初始化中'
        if(this.needShowStartBtn)
        {
            this.haveLoadFinish = true;
            this.initData();
            return;
        }
        setTimeout(()=>{
            this.haveLoadFinish = true;
            this.initData();
        },1000)

    }
}