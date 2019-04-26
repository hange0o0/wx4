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
    public maxEnergy = 20;
    public onLineAwardCD = [5*60,30*60,3600,2*3600,3*3600]

    public nick
    public head
    public gender


    public isTest;
    public testVersion = 1//与服务器相同则为测试版本
    public shareFail;

    public gameid: string;
    public dbid: string;

    public coin: number = 999;
    public diamond: number = 0;
    public energy: any;
    public chapterLevel: number = 0;  //已完成关卡，默认为0
    public chapterStar: any = {};
    public task: any;
    public dayTask: any;
    public chapterResetTime = 0;
    public chapterCoin = 0;
    public buffDiamond = 0;

    public shareUser = [];//buff玩家的数据   openid:{head,nick,time}

    public coinObj:{
        loginTime,
        //loginDays,
        //loginDayAward,
        //onLineAwardTime,
        //onLineAwardNum,
        shareNum,
        //newAward,
        videoNum,
        videoAwardNum,
        gameNum,
        shareAward
    }
    //public guideFinish: boolean = false;

    public initDataTime;
    public loginTime = 0
    public maxForce = 0


    public isFirst = false
    public hourEarn = 0;
    public offlineTime
    public fill(data:any):void{
        //this.isFirst = true;     //debug

        //console.log(data)

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
        this.diamond = data.diamond || 0;
        this.energy = data.energy;
        //this.guideFinish = data.guideFinish;
        this.chapterStar = data.chapterStar;
        this.chapterLevel = data.chapterLevel || 0;
        this.chapterResetTime = data.chapterResetTime;
        this.chapterCoin = data.chapterCoin;
        this.maxForce = data.maxForce;
        this.shareUser = data.shareUser;
        this.buffDiamond = data.buffDiamond || 0;
        this.task = data.task || 0;
        this.dayTask = data.dayTask || [];
        this.coinObj = data.coinObj || {
                loginTime:TM.now(),   //登陆时间
                shareNum:0,   //分享金币次数
                shareAward:0,   //分享金币次数
                videoNum:0,
                videoAwardNum:0,
                gameNum:0,
            };

        //if(!window['wx'])
        //{
        //    this.shareUser = [
        //        {h:'',n:'1'},
        //        {h:'',n:'2'},
        //        {h:'',n:'3'},
        //        {h:'',n:'4'},
        //        {h:'',n:'5'},
        //        {h:'',n:'6'},
        //        {h:'',n:'7'},
        //    ]
        //}

        this.initDataTime = TM.now();
        this.testPassDay();

        //this.lastForce = this.getForce();

        DM.addTime = SharedObjectManager.getInstance().getMyValue('addTime') || 0;


        this.offlineTime = TM.now() - saveTime;


        this.localSave();
    }

    public renewInfo(userInfo){
        if(!userInfo)
            return;
        this.nick = userInfo.nickName
        this.head = userInfo.avatarUrl
        this.gender = userInfo.gender || 1 //性别 0：未知、1：男、2：女
    }

    ////降低时间数据的位数
    //public now(){
    //    return TM.now() - UM.loginTime
    //}
    //
    //public nowMS(){
    //    return TM.nowMS() - UM.loginTime*1000;
    //}

    //public getForce(){
    //    var force = 0;
    //    var mForce = 0;
    //    var MM = MonsterManager.getInstance();
    //    var TEM = TecManager.getInstance();
    //    var monsterList = MM.getOpenMonster();
    //    for(var i=0;i<monsterList.length;i++)
    //    {
    //         var vo = monsterList[i];
    //        mForce += (Math.pow(vo.cost,0.5)*(1+MM.getMonsterLevel(vo.id)/10)*MM.getMonsterNum(vo.id));
    //    }
    //    force += mForce;
    //    force += (TEM.getTecLevel(31) + TEM.getTecLevel(31))*0.05*mForce;
    //    force += (TEM.getTecLevel(33)*0.02 + TEM.getTecLevel(34)*0.06)*mForce;
    //    return Math.floor(force)
    //}



    public get coinText(){
        return NumberUtil.addNumSeparator(this.coin,2)
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

    public testAddInvite(){
        //console.log('testAddInvite')
        if(!this.isFirst)
            return;
        var wx = window['wx'];
        if(!wx)
            return;
        var query = wx.getLaunchOptionsSync().query;
        //console.log(query)
        if(query.type == '1')
        {
            wx.cloud.callFunction({      //取玩家openID,
                name: 'onShareIn',
                data:{
                    other:query.from,
                    nick:UM.nick,
                    head:UM.head,
                },
                complete: (res) => {
                     console.log(res)
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
             coin:10000,   //$
             diamond:50,   //$
             guideFinish:true,
             chapterLevel:0,
             chapterStar:{},
             chapterResetTime:0,
             chapterCoin:0,
             task:0,
             dayTask:[],
             fight:{},
             saveTime:0,
             buffDiamond:0,
             energy:{v:0,t:0},
             shareUser:[],
             def:'',
             work:'65#0#1', //初始1个在工作
             coinObj:{
                 loginTime:TM.now(),   //登陆时间
                 //loginDays:1,   //登陆天数
                 //loginDayAward:0,   //领取登陆礼包
                 //onLineAwardTime:TM.now(),   //在线礼包领取时间
                 //onLineAwardNum:0,   //在线礼包领取数量
                 shareNum:0,   //分享金币次数
                 shareAward:0,   //分享金币次数
                 //newAward:0,   //拉新领奖次数
                 videoNum:0,
                 videoAwardNum:0,
                 gameNum:0,
             },
         };
    }

    //跨天处理
    public testPassDay(){
        if(!this.coinObj)
            return false;
        if(DateUtil.isSameDay(this.coinObj.loginTime))
            return false;
        this.coinObj.loginTime = TM.now();
        //this.coinObj.loginDays ++;
        //this.coinObj.loginDayAward = 0;
        //this.coinObj.onLineAwardTime = this.coinObj.loginTime;
        //this.coinObj.onLineAwardNum = 0;
        this.coinObj.shareNum = 0;
        this.coinObj.shareAward = 0;
        this.coinObj.videoNum = 0;
        this.coinObj.videoAwardNum = 0;
        this.coinObj.gameNum = 0;
        UM.needUpUser = true;
        return true;
    }

    private getUpdataData(){
        return {
            loginTime:UM.loginTime,
            coin:UM.coin,
            diamond:UM.diamond,
            buffDiamond:UM.buffDiamond,
            energy:UM.energy,
            chapterLevel:UM.chapterLevel,
            chapterStar:UM.chapterStar,
            chapterResetTime:UM.chapterResetTime,
            chapterCoin:UM.chapterCoin,
            maxForce:UM.maxForce,
            coinObj:UM.coinObj,
            task:UM.task,
            dayTask:UM.dayTask,
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
    //
    ////如果战力不同则上传数据
    //public upWXData(){
    //    var wx = window['wx'];
    //    if(!wx)
    //        return;
    //    var currentForce =  UM.getForce()
    //    if(currentForce == UM.lastForce)
    //        return;
    //    UM.lastForce = currentForce;
    //    var score = JSON.stringify({"wxgame":{"score":currentForce,"update_time": TM.now()}})
    //    var upList = [{ key: 'force', value: score}];
    //    wx.setUserCloudStorage({
    //        KVDataList: upList,
    //        success: res => {
    //            console.log(res);
    //        },
    //        fail: res => {
    //            console.log(res);
    //        }
    //    });
    //}

    public upWXChapter(){
        var wx = window['wx'];
        if(!wx)
            return;
        var score = JSON.stringify({"wxgame":{"score":UM.chapterLevel,"update_time": TM.now()}})
        var upList = [{ key: 'chapter', value: score}]; //{ key: 'level', value: UM.chapterLevel + ',' + TM.now()},
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

    public addEnergy(v){
         if(!v)
            return;
        this.resetEnergy();
        if(this.energy.v >= this.maxEnergy)
            this.energy.t = TM.now();
        this.energy.v += v;

        UM.needUpUser = true;
    }

    private resetEnergy(){
        var v = this.getEnergyStep();
        var t = TM.now();
        var add =  Math.floor((t - this.energy.t)/v)
        if(add > 0)
        {
            this.energy.v = Math.min(this.maxEnergy,this.energy.v + add);
            this.energy.t = this.energy.t + add*v;
            EM.dispatchEventWith(GameEvent.client.energy_change)
        }
    }

    public getEnergy(){
        this.resetEnergy();
        return this.energy.v;
    }

    public getEnergyStep(){
        return 30*60;
    }

    public getNextEnergyCD(){
        var v = this.getEnergyStep();
        this.getEnergy();
        //if(this.energy.t == TM.now())
        //    return 0;
        return  this.energy.t + v -  TM.now();
    }




}
