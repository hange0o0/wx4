class UserManager_wx4 {
    public constructor() {

    }

	private wx4_functionX_54641(){console.log(4386)}
    private static _instance: UserManager_wx4;

    public static getInstance():UserManager_wx4{
        if(!UserManager_wx4._instance)
            UserManager_wx4._instance = new UserManager_wx4();
        return UserManager_wx4._instance;
    }
	private wx4_functionX_54642(){console.log(5253)}

    private _needUpUser = false;
    public get needUpUser(){return this._needUpUser}
    public set needUpUser(v){this._needUpUser = v;v && egret.callLater(this.localSave_7136,this)}

    public collectCD = 20;

	private wx4_functionX_54643(){console.log(6875)}
    public nick
    public head
    public gender


    public isTest;
	private wx4_functionX_54644(){console.log(2285)}
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;

    public gameid: string;
    public gameid2: string;//匿名的openid，如果是匿名，gameid与gameid2相同
    public dbid: string;

	private wx4_functionX_54645(){console.log(5518)}
    public coin: number = 999;
    public level: number = 1;
    public gunLevel: any = {};
    public gunPos: any = {};
    public pastDayCoin
    public gunPosNum = 3;
	private wx4_functionX_54646(){console.log(1944)}
    public endLess = 0;
    public coinTimes = 0;
    public helpUser = null;

    public cdCoin = 0;
    public cdCoinTime = 0;
    public cdCoinGetTime = 0;

    public addForceEnd = 0
    public adLevel
    public isDelete = false


    public shareUser = [];//buff玩家的数据   openid:{head,nick,time}
	private wx4_functionX_54647(){console.log(6974)}
    public loginTime = 0


    public isFirst = false
    public hourEarn = 0;
    public offlineTime
	private wx4_functionX_54648(){console.log(9257)}
    public initDataTime


    public nextMakeTime = 0//上次免费时间
    public videoMakeTimes = 0;
    public makeList = []  //图纸
	private wx4_functionX_54649(){console.log(2784)}



    public haveGetUser = false
    public loginSuccess = true
    public fill(data:any):void{
        var localData = SharedObjectManager_wx4.getInstance().getMyValue('localSave')
        if(localData && localData.saveTime && localData.saveTime - data.saveTime > 10) //本地的数据更新
        {
            //console.log('overwrite')
            for(var s in localData)
            {
                data[s] = localData[s];
	wx4_function(2455);
            }
        }
        var saveTime = data.saveTime;

        this.dbid = data._id;
        this.loginTime = data.loginTime || TM_wx4.now();
	wx4_function(2223);
        this.coin = data.coin || 0;
        this.shareUser = data.shareUser || [];
        this.helpUser = data.helpUser;
        this.endLess = data.endLess || 0;
        this.level = data.level || 1;
        this.coinTimes = data.coinTimes || 0;

        this.cdCoin = data.cdCoin || 0;
        this.cdCoinTime = data.cdCoinTime || 0;
        this.cdCoinGetTime = data.cdCoinGetTime || 0

	wx4_function(4749);
        this.gunLevel = data.gunLevel || {};
        this.nextMakeTime = data.nextMakeTime || 0;
        this.videoMakeTimes = data.videoMakeTimes || 0;
        this.makeList = data.makeList || [];
        this.gunPos = data.gunPos || {};
        this.gunPosNum = _get['pos'] || data.gunPosNum || 3;
	wx4_function(6588);
        this.pastDayCoin = data.pastDayCoin
        this.adLevel = data.adLevel || 0
        this.addForceEnd = data.addForceEnd || 0

        this.testPassDay()

        DM.addTime = SharedObjectManager_wx4.getInstance().getMyValue('addTime') || 0;
        this.offlineTime = TM_wx4.now() - saveTime;
	wx4_function(5930);

        this.initDataTime = TM_wx4.now()

        if(this.isFirst)
        {
            console.log('isFirst',this.isFirst)
            var wx = window['wx'];
            if(wx)
            {
                var query = wx.getLaunchOptionsSync().query;
                console.log(query)
                if(query.type == '1')
                {
                    this.helpUser = query.from
                }
            }
        }

	wx4_function(230);
        this.testAddInvite_191();
        this.localSave_7136();
        GunManager.getInstance().initData();
    }

    public getPassDayCoin(){
        return Math.floor(this.level * 5*Math.pow(1.23,this.level/10))*100
    }
	private wx4_functionX_54650(){console.log(1437)}

    public testPassDay(){
        if(!DateUtil_wx4.isSameDay(this.pastDayCoin.t))
        {
            this.pastDayCoin.t = TM_wx4.now();
            this.videoMakeTimes = 0;
	wx4_function(8245);
            this.coinTimes = 0;
            this.pastDayCoin.coin = this.getPassDayCoin();
            this.needUpUser = true
        }
    }

	private wx4_functionX_54651(){console.log(2783)}
    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.haveGetUser = true;
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
        this.testAddInvite_191();
	wx4_function(4399);
    }
    public addCoin(v,stopSave?){
        if(!v)
            return;
        this.coin += v;
        if(this.coin < 0)
            this.coin = 0;
	wx4_function(927);
        if(!stopSave)
            UM_wx4.needUpUser = true;
        EM_wx4.dispatch(GameEvent.client.COIN_CHANGE)
    }

    public getUserInfoZJ(fun,force=false){
        var tt = window['wx'];
        tt.login({
            force:force,
            success:(res)=>{
                this.loginSuccess = res.code
                console.log(res);
                var url =  Config.serverPath + 'getInfo.php'
                Net.getInstance().send(url,res,fun);
            },
            fail (res) {
                console.log(`login调用失败`);
            }
        });
    }

    public getUserInfo(fun){
        if(Config.isZJ)
        {
            this.getUserInfoZJ((data)=>{
                this.gameid = data.data.openid || data.data.anonymous_openid
                this.gameid2 = data.data.anonymous_openid
                this.isTest = data.version == this.testVersion;
                TimeManager_wx4.getInstance().initlogin(data.time)

                Net.getInstance().getServerData((data)=>{
                    console.log(data);
                    if(data.data)
                    {
                        var tempdata = JSON.parse(Base64.decode(data.data.gamedata))
                        this.fill(tempdata);
                    }
                    else
                    {
                        var initData:any = this.orginUserData_5537();
                        this.fill(initData);
                        Net.getInstance().saveServerData(true);
                    }

                    fun && fun();
                });
                //this.gameid = _get['openid'];
                //this.isFirst = !SharedObjectManager_wx4.getInstance().getMyValue('localSave')
                //this.fill(this.orginUserData_5537());

            })
            return;
        }
        var wx = window['wx'];
        if(!wx)
        {
            setTimeout(()=>{
                this.gameid = _get['openid'];
                this.isFirst = !SharedObjectManager_wx4.getInstance().getMyValue('localSave')
                this.fill(this.orginUserData_5537());
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
                        TimeManager_wx4.getInstance().initlogin(res.result.time)
                        //console.log(res.result.time)
                        this.loginUser(fun)
                    },
                    fail:()=>{
                       MyWindow.Alert('请求用户数据超时，请重新启动',()=>{
                           wx.exitMiniProgram({});
	wx4_function(3137);
                       })
                    }
                })
        //    }
        //})
    }

    public loginUser(fun?){
        var wx = window['wx'];
	wx4_function(8702);
        const db = wx.cloud.database();
        db.collection('user').where({     //取玩家数据
            _openid: this.gameid,
        }).get({
            success: (res)=>{
                //console.log(res,res.data.length == 0);
                if(res.data.length == 0)//新用户
                {
                    this.onNewUser_8475(fun)
                    return;
                }
                this.fill(res.data[0]);
	wx4_function(1769);
                fun && fun();
            }
        })
    }

    public renewFriendNew(fun)
    {
        if(TM_wx4.now() - this.initDataTime < 5*60)
        {
            fun && fun();
            return;
        }
        this.initDataTime = TM_wx4.now();
        var wx = window['wx'];
        if(!wx)
        {
            fun && fun();
            return;
        }

        if(Config.isZJ)
        {
            Net.getInstance().getShareData((data)=>{
                console.log(data);
                this.shareUser = data.data.sharedata || [];
                fun && fun();
            })
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

	private wx4_functionX_54652(){console.log(8769)}
    private testAddInvite_191(){
        console.log('testAddInvite',this.helpUser && this.haveGetUser)
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
	wx4_function(1896);
                    this.needUpUser = true;
                }
            })
        }
    }

    //新用户注册
	private wx4_functionX_54653(){console.log(6130)}
    private onNewUser_8475(fun?){
        //console.log('newUser')
        this.isFirst = true;
        var wx = window['wx'];
        const db = wx.cloud.database();
        var initData:any = this.orginUserData_5537();
        db.collection('user').add({
            data:initData,
            success: (res)=>{
                initData._id = res._id;
	wx4_function(5580);
                this.fill(initData);
                fun && fun();
            }
        })
        //
        //this.needUpUser = true;
    }

	private wx4_functionX_54654(){console.log(4900)}
    private orginUserData_5537(){
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
             cdCoin:0,
             cdCoinTime:TM_wx4.now(),
             cdCoinGetTime:TM_wx4.now(),
         };
	wx4_function(7109);
    }

    public getUpdataData(){
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
            adLevel:UM_wx4.adLevel,
            addForceEnd:UM_wx4.addForceEnd,

            cdCoin:UM_wx4.cdCoin,
            cdCoinTime:UM_wx4.cdCoinTime,
            cdCoinGetTime:UM_wx4.cdCoinGetTime,
            //guideFinish:UM.guideFinish,
            saveTime:TM_wx4.now(),
        };
    }


    public upDateUserData(){
        if(!this.needUpUser)
            return;
        var wx = window['wx'];
        if(Config.isWX)
        {
            var updateData:any = this.getUpdataData();;
            WXDB.updata('user',updateData)
        }
        else if(Config.isZJ)
        {
            Net.getInstance().saveServerData();
        }
        this.needUpUser = false;
        this.localSave_7136();
        //this.upWXData();
    }

    private localSave_7136(){
        SharedObjectManager_wx4.getInstance().setMyValue('localSave',this.getUpdataData())
    }
	private wx4_functionX_54655(){console.log(6589)}


    public upWXEndLess(){
        var wx = window['wx'];
        if(!wx)
            return;
        var pKey = 'wxgame';
        if(Config.isZJ)
            pKey = 'ttgame'
        var data = {}
        data[pKey] = {"score":UM_wx4.endLess,"update_time": TM_wx4.now()}
        var score = JSON.stringify(data)
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
	wx4_function(3752);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx4_functionX_54656(){console.log(5119)}

    public upWXLevel(){
        var wx = window['wx'];
        if(!wx)
            return;

        var pKey = 'wxgame';
        if(Config.isZJ)
            pKey = 'ttgame'
        var data = {}
        data[pKey] = {"score":UM_wx4.level,"update_time": TM_wx4.now()}
        var score = JSON.stringify(data)


        //var score = JSON.stringify({"wxgame":{"score":UM_wx4.level,"update_time": TM_wx4.now()}})
        var upList = [{ key: 'endless', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
        wx.setUserCloudStorage({
            KVDataList: upList,
            success: res => {
                console.log(res);
	wx4_function(9760);
            },
            fail: res => {
                console.log(res);
            }
        });
    }
	private wx4_functionX_54657(){console.log(3453)}

    public getBG(lv?){
        lv = lv || UM_wx4.level;
        var add = Math.ceil(lv/15)
        var index = (lv * add)%15 || 1;
        return 'bg_'+index+'_jpg'
    }
	private wx4_functionX_54658(){console.log(6298)}

    public checkCoin(v){
        if(this.coin < v)
        {
            NotEnoughCoinUI.getInstance().show();
            return false
        }
        return true
    }
	private wx4_functionX_54659(){console.log(650)}


    public resetCDCoin(){
        if(this.cdCoinTime < this.cdCoinGetTime + 8*3600)
        {
             var num = Math.floor((Math.min(TM_wx4.now(),this.cdCoinGetTime + 8*3600) - this.cdCoinTime)/this.collectCD)
            if(num > 0)
            {
                this.cdCoinTime += num*this.collectCD;
                this.cdCoin += num * Math.ceil(this.level/2)
            }
        }
    }

    public collectCDCoin(){
        if(!this.cdCoin)
        {
            MyWindow.ShowTips('暂无可领取金币')
            return;
        }
        var coin = this.cdCoin;
        var add = BuffManager.getInstance().getCoinAdd();
        if(add)
        {
            coin = Math.ceil(coin * (1+add/100));
        }
        UM_wx4.addCoin(coin);
        this.cdCoinGetTime = TM_wx4.now();
        this.cdCoinTime = TM_wx4.now();
        this.cdCoin = 0;

        MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(coin,2),0xFFFF00),2000)
        MyWindow.ShowTips('好友加成：'+MyTool.createHtml('+' + add + '%',0x00FF00),2000)
        SoundManager.getInstance().playEffect('coin')
    }



}
