class UserManager_wx4 {
    public constructor() {

    }

	private wx4_functionX_45945(){console.log(2292)}
    private static _instance: UserManager_wx4;

    public static getInstance():UserManager_wx4{
        if(!UserManager_wx4._instance)
            UserManager_wx4._instance = new UserManager_wx4();
        return UserManager_wx4._instance;
    }
	private wx4_functionX_45946(){console.log(6664)}

    private _needUpUser = false;
    public get needUpUser(){return this._needUpUser}
    public set needUpUser(v){this._needUpUser = v;v && egret.callLater(this.localSave_3405,this)}


	private wx4_functionX_45947(){console.log(7158)}
    public nick
    public head
    public gender


    public isTest;
	private wx4_functionX_45948(){console.log(5608)}
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;

    public gameid: string;
    public dbid: string;

	private wx4_functionX_45949(){console.log(7640)}
    public coin: number = 999;
    public level: number = 1;
    public gunLevel: any = {};
    public gunPos: any = {};
    public pastDayCoin
    public gunPosNum = 3;
	private wx4_functionX_45950(){console.log(1471)}
    public endLess = 0;
    public coinTimes = 0;
    public helpUser = null;


    public shareUser = [];//buff玩家的数据   openid:{head,nick,time}
    public loginTime = 0
	private wx4_functionX_45951(){console.log(3980)}


    public isFirst = false
    public hourEarn = 0;
    public offlineTime
    public initDataTime
	private wx4_functionX_45952(){console.log(5316)}


    public nextMakeTime = 0//上次免费时间
    public videoMakeTimes = 0;
    public makeList = []  //图纸



    public haveGetUser = false
    public fill(data:any):void{
        var localData = SharedObjectManager_wx4.getInstance().getMyValue('localSave')
        if(localData && localData.saveTime && localData.saveTime - data.saveTime > 10) //本地的数据更新
        {
            //console.log('overwrite')
            for(var s in localData)
            {
                data[s] = localData[s];
	wx4_function(6742);
            }
        }
        var saveTime = data.saveTime;

        this.dbid = data._id;
        this.loginTime = data.loginTime || TM_wx4.now();
	wx4_function(9109);
        this.coin = data.coin || 0;
        this.shareUser = data.shareUser;
        this.helpUser = data.helpUser;
        this.endLess = data.endLess || 0;
        this.level = data.level || 1;
        this.coinTimes = data.coinTimes || 0;
        this.gunLevel = data.gunLevel || {};
        this.nextMakeTime = data.nextMakeTime || 0;
        this.videoMakeTimes = data.videoMakeTimes || 0;
        this.makeList = data.makeList || [];
	wx4_function(111);
        this.gunPos = data.gunPos || {};
        this.gunPosNum = _get['pos'] || data.gunPosNum || 3;
        this.pastDayCoin = data.pastDayCoin

        this.testPassDay()

        DM.addTime = SharedObjectManager_wx4.getInstance().getMyValue('addTime') || 0;
        this.offlineTime = TM_wx4.now() - saveTime;
	wx4_function(6307);

        this.initDataTime = TM_wx4.now()

        if(this.isFirst)
        {
            var wx = window['wx'];
	wx4_function(1242);
            if(wx)
            {
                var query = wx.getLaunchOptionsSync().query;
                if(query.type == '1')
                {
                    this.helpUser = query.from
                }
            }
        }

	wx4_function(5335);
        this.testAddInvite_3788();
        this.localSave_3405();
        GunManager.getInstance().initData();
    }

    public getPassDayCoin(){
        return Math.floor(this.level * 5*Math.pow(1.23,this.level/10))*100
    }

    public testPassDay(){
        if(!DateUtil_wx4.isSameDay(this.pastDayCoin.t))
        {
            this.pastDayCoin.t = TM_wx4.now();
            this.videoMakeTimes = 0;
            this.coinTimes = 0;
            this.pastDayCoin.coin = this.getPassDayCoin();
            this.needUpUser = true
        }
    }

    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.haveGetUser = true;
	wx4_function(236);
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
        this.testAddInvite_3788();
    }
    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
	wx4_function(4332);
        if(this.coin < 0)
            this.coin = 0;
        if(!stopSave)
            UM_wx4.needUpUser = true;
        EM_wx4.dispatch(GameEvent.client.COIN_CHANGE)
    }
	private wx4_functionX_45953(){console.log(8079)}

    public getUserInfo(fun){
        var wx = window['wx'];
        if(!wx)
        {
            setTimeout(()=>{
                this.gameid = _get['openid'];
	wx4_function(75);
                this.isFirst = !SharedObjectManager_wx4.getInstance().getMyValue('localSave')
                this.fill(this.orginUserData_8159());
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
	wx4_function(8095);
                            })
                            return;
                        }
                        //console.log(res)
                        this.gameid = res.result.openid
                        this.isTest = res.result.testVersion == this.testVersion;
                        this.shareFail = res.result.shareFail;
                        //console.log(11)
                        TimeManager_wx4.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
	wx4_function(1947);
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
	wx4_function(5922);
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                //console.log(res,res.data.length == 0);
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser_2916(fun)
                    return;
                }
                this.fill(res.data[0]);
	wx4_function(1186);
                fun && fun();
            }
        })
    }

    public renewFriendNew(fun)
    {
        if(TM_wx4.now() - this.initDataTime < 5*60)
        {
            fun && fun();
	wx4_function(7470);
            return;
        }
        this.initDataTime = TM_wx4.now();
        var wx = window['wx'];
        if(!wx)
        {
            fun && fun();
	wx4_function(1106);
            return;
        }
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                var data = res.data[0];
	wx4_function(2256);
                this.shareUser = data.shareUser;
                fun && fun();
            }
        })
    }

	private wx4_functionX_45954(){console.log(3139)}
    private testAddInvite_3788(){
        if(this.helpUser && this.haveGetUser)
        {
            var wx = window['wx'];
            if(!wx)
                return;
            wx.cloud.callFunction({      //取玩家openID,
                name: 'onShareIn',
                data:{
                    other:this.helpUser,
                    nick:UM_wx4.nick,
                    head:UM_wx4.head,
                },
                complete: (res) => {
                    console.log(res)
                    this.helpUser = null;
	wx4_function(3398);
                    this.needUpUser = true;
                }
            })
        }
    }

    //新用户注册
	private wx4_functionX_45955(){console.log(4531)}
    private onNewUser_2916(fun?){
        //console.log('newUser')
        this.isFirst = true;
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData_8159();
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
	wx4_function(4462);
                this.fill(initData);
                fun && fun();
            }
        })
        //
        //this.needUpUser = true;
    }

	private wx4_functionX_45956(){console.log(3620)}
    private orginUserData_8159(){
         return {
             loginTime:TM_wx4.now(),   //$
             coin:500,   //$
             level:1,   //$
             gunPos:{1:2,2:1,3:3},   //$
             gunLevel:{},   //$
             guideFinish:true,
             pastDayCoin:{coin:0,t:TM_wx4.now()},
             saveTime:0,
             shareUser:[],
         };
	wx4_function(6011);
    }

    private getUpdataData_4415(){
        return {
            loginTime:UM_wx4.loginTime,
            coin:UM_wx4.coin,
            level:UM_wx4.level,
            endLess:UM_wx4.endLess,
            helpUser:UM_wx4.helpUser,
            gunLevel:UM_wx4.gunLevel,
            gunPos:UM_wx4.gunPos,
            coinTimes:UM_wx4.coinTimes,
            nextMakeTime:UM_wx4.nextMakeTime,
            videoMakeTimes:UM_wx4.videoMakeTimes,
            makeList:UM_wx4.makeList,
            gunPosNum:UM_wx4.gunPosNum,
            pastDayCoin:UM_wx4.pastDayCoin,
            //guideFinish:UM.guideFinish,
            saveTime:TM_wx4.now(),
        };
	wx4_function(9141);
    }


    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
	wx4_function(3696);
        if(wx)
        {
            var updateData:any = this.getUpdataData_4415();;
            WXDB.updata('user',updateData)
        }
        this.needUpUser = false;
	wx4_function(1156);
        this.localSave_3405();
        //this.upWXData();
    }

    private localSave_3405(){
        SharedObjectManager_wx4.getInstance().setMyValue('localSave',this.getUpdataData_4415())
    }
	private wx4_functionX_45957(){console.log(3603)}


    public upWXEndLess(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM_wx4.endLess,"update_time": TM_wx4.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
	wx4_function(4411);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx4_functionX_45958(){console.log(7736)}

    public upWXLevel(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM_wx4.level,"update_time": TM_wx4.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
	wx4_function(4620);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx4_functionX_45959(){console.log(6019)}

    public getBG(lv?){
        lv = lv || UM_wx4.level;
        var add = Math.ceil(lv/15)
        var index = (lv * add)%15 || 1;
        return 'bg_'+index+'_jpg'
    }
	private wx4_functionX_45960(){console.log(2636)}

    public checkCoin(v){
        if(this.coin < v)
        {
            NotEnoughCoinUI.getInstance().show();
            return false
        }
        return true
    }
	private wx4_functionX_45961(){console.log(9962)}

}
