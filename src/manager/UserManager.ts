class UserManager {
    public constructor() {

    }

    private static _instance: UserManager;

    public static getInstance():UserManager{
        if(!UserManager._instance)
            UserManager._instance = new UserManager();
        return UserManager._instance;
    }

    private _needUpUser = false;
    public get needUpUser(){return this._needUpUser}
    public set needUpUser(v){this._needUpUser = v;v && egret.callLater(this.localSave,this)}


    public nick
    public head
    public gender


    public isTest;
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;

    public gameid: string;
    public dbid: string;

    public coin: number = 999;
    public level: number = 1;
    public gunLevel: any = {};
    public gunPos: any = {};
    public pastDayCoin
    public gunPosNum = 3;
    public endLess = 0;
    public helpUser = null;


    public shareUser = [];//buff玩家的数据   openid:{head,nick,time}
    public loginTime = 0


    public isFirst = false
    public hourEarn = 0;
    public offlineTime
    public initDataTime



    public haveGetUser = false
    public fill(data:any):void{
        var localData = SharedObjectManager.getInstance().getMyValue('localSave')
        if(localData && localData.saveTime && localData.saveTime - data.saveTime > 10) //本地的数据更新
        {
            //console.log('overwrite')
            for(var s in localData)
            {
                data[s] = localData[s];
            }
        }
        var saveTime = data.saveTime;

        this.dbid = data._id;
        this.loginTime = data.loginTime || TM.now();
        this.coin = data.coin || 0;
        this.shareUser = data.shareUser;
        this.helpUser = data.helpUser;
        this.endLess = data.endLess || 0;
        this.level = data.level || 1;
        this.gunLevel = data.gunLevel || {};
        this.gunPos = data.gunPos || {};
        this.gunPosNum = _get['pos'] || data.gunPosNum || 3;
        this.pastDayCoin = data.pastDayCoin
        if(!DateUtil.isSameDay(this.pastDayCoin.t))
        {
            this.pastDayCoin.t = TM.now();
            this.pastDayCoin.coin =  this.level * 200
            this.needUpUser = true
        }

        DM.addTime = SharedObjectManager.getInstance().getMyValue('addTime') || 0;
        this.offlineTime = TM.now() - saveTime;

        this.initDataTime = TM.now()

        if(this.isFirst)
        {
            var wx = window['wx'];
            if(wx)
            {
                var query = wx.getLaunchOptionsSync().query;
                if(query.type == '1')
                {
                    this.helpUser = query.from
                }
            }
        }

        this.testAddInvite();
        this.localSave();
    }

    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.haveGetUser = true;
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
        this.testAddInvite();
    }
    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
        if(this.coin < 0)
            this.coin = 0;
        if(!stopSave)
            UM.needUpUser = true;
        EM.dispatch(GameEvent.client.COIN_CHANGE)
    }

    public getUserInfo(fun){
        var wx = window['wx'];
        if(!wx)
        {
            setTimeout(()=>{
                this.gameid = _get['openid'];
                this.isFirst = !SharedObjectManager.getInstance().getMyValue('localSave')
                this.fill(this.orginUserData());
                fun && fun();
            },1000)
            return;
        }
        //wx.login({
        //    success:()=>{
                wx.cloud.callFunction({      //取玩家openID,
                    name: 'getInfo',
                    complete: (res) => {
                        if(!res.result)
                        {
                            MyWindow.Alert('请求用户数据失败，请重新启动',()=>{
                                wx.exitMiniProgram({});
                            })
                            return;
                        }
                        //console.log(res)
                        this.gameid = res.result.openid
                        this.isTest = res.result.testVersion == this.testVersion;
                        this.shareFail = res.result.shareFail;
                        //console.log(11)
                        TimeManager.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                //console.log(res,res.data.length == 0);
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser(fun)
                    return;
                }
                this.fill(res.data[0]);
                fun && fun();
            }
        })
    }

    public renewFriendNew(fun)
    {
        if(TM.now() - this.initDataTime < 5*60)
        {
            fun && fun();
            return;
        }
        this.initDataTime = TM.now();
        var wx = window['wx'];
        if(!wx)
        {
            fun && fun();
            return;
        }
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                var data = res.data[0];
                this.shareUser = data.shareUser;
                fun && fun();
            }
        })
    }

    private testAddInvite(){
        if(this.helpUser && this.haveGetUser)
        {
            var wx = window['wx'];
            if(!wx)
                return;
            wx.cloud.callFunction({      //取玩家openID,
                name: 'onShareIn',
                data:{
                    other:this.helpUser,
                    nick:UM.nick,
                    head:UM.head,
                },
                complete: (res) => {
                    console.log(res)
                    this.helpUser = null;
                    this.needUpUser = true;
                }
            })
        }
    }

    //新用户注册
    private onNewUser(fun?){
        //console.log('newUser')
        this.isFirst = true;
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData();
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
                this.fill(initData);
                fun && fun();
            }
        })
        //
        //this.needUpUser = true;
    }

    private orginUserData(){
         return {
             loginTime:TM.now(),   //$
             coin:500,   //$
             level:1,   //$
             gunPos:{1:1,2:2,3:3},   //$
             gunLevel:{},   //$
             guideFinish:true,
             pastDayCoin:{coin:0,t:TM.now()},
             saveTime:0,
             shareUser:[],
         };
    }

    private getUpdataData(){
        return {
            loginTime:UM.loginTime,
            coin:UM.coin,
            level:UM.level,
            endLess:UM.endLess,
            helpUser:UM.helpUser,
            gunLevel:UM.gunLevel,
            gunPos:UM.gunPos,
            gunPosNum:UM.gunPosNum,
            pastDayCoin:UM.pastDayCoin,
            //guideFinish:UM.guideFinish,
            saveTime:TM.now(),
        };
    }


    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
        if(wx)
        {
            var updateData:any = this.getUpdataData();;
            WXDB.updata('user',updateData)
        }
        this.needUpUser = false;
        this.localSave();
        //this.upWXData();
    }

    private localSave(){
        SharedObjectManager.getInstance().setMyValue('localSave',this.getUpdataData())
    }


    public upWXEndLess(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM.endLess,"update_time": TM.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
            },
            fail: res => {
                console.log(res);
            }
        });
    }

    public upWXLevel(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM.level,"update_time": TM.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
            },
            fail: res => {
                console.log(res);
            }
        });
    }

    public getBG(lv?){
        lv = lv || UM.level;
        var add = Math.ceil(lv/15)
        var index = (lv * add)%15 || 1;
        return 'bg_'+index+'_jpg'
    }

    public checkCoin(v){
        if(this.coin < v)
        {
            MyWindow.ShowTips('金币不足！')
            return false
        }
        return true
    }

}
