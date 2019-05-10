class PKingUI extends game.BaseUI {

    private static _instance: PKingUI;
    public static getInstance(): PKingUI {
        if(!this._instance)
            this._instance = new PKingUI();
        return this._instance;
    }

    private bg1: eui.Image;
    private bg2: eui.Image;
    public con: eui.Group;
    private monsterGroup: eui.Group;
    private gunGroup: eui.Group;
    private barGroup: eui.Group;
    private bar: eui.Image;
    private hpText: eui.Label;
    private tipsText: eui.Label;
    private rateCon: eui.Group;
    private rateBar: eui.Rect;
    private rateMC: eui.Group;
    private rateText: eui.Label;
    private blackBG: eui.Image;





    public ww = 630

    public bulletArr = [];
    public gunArr = [];
    public speed = 5
    public txtPool = []

    private touchID

    private stoping = true
    private begining = true
    private isFinish = true
    private isDie = false
    //private showWudi = false
    private isReborn = false
    public constructor() {
        super();
        this.skinName = "PKingUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd,this);
    }

    private onTouchBegin(e:egret.TouchEvent){
        this.touchID = {
            touchY:e.stageY,
            gunY:this.gunGroup.y
        }
    }

    private onTouchMove(e){
        if(!this.touchID)
            return;
        if(this.isDie)
            return
        this.gunGroup.y = this.touchID.gunY - this.touchID.touchY + e.stageY
    }

    private onTouchEnd(e){
        this.touchID = null
    }

    public shoot(item:GunItem){
        if(this.isDie)
            return
        var vo = GunVO.getObject(item.data)
        var num = 1;
        if(vo.type == 1)//散射
            num = vo.v1;
        var rota = 20;
        var total = (num - 1)*rota;
        var start = -total/2
        for(var i=0;i<num;i++)
        {
            this.createBullet(item.data,50,item.y + this.gunGroup.y,start + i*rota,item)
        }
    }

    public createBullet(id,x,y,rota,item?){
        var mc = BulletMC.createItem();
        this.bulletArr.push(mc);
        this.con.addChild(mc);
        mc.x = x
        mc.y = y
        var double = 1;
        var vo = GunVO.getObject(id)
        if(vo.type == 9)//有$1%的机率造成@2倍伤害';
        {
            if(Math.random() < vo.getLevelValue(vo.v1,vo.v3)/100)
            {
                double = vo.v2
                if(item)
                {
                    this.playDoubleHit(item,MyTool.toFixed(double,2))
                }
            }
        }
        mc.data = {
            id:id,
            rota:rota,
            double:double
        };
        return mc
    }

    public removeBullet(mc:BulletMC){
        var index = this.bulletArr.indexOf(mc);
        this.bulletArr.splice(index,1);
        BulletMC.freeItem(mc);
    }

    public playDoubleHit(item:GunItem,value){
        var txt = this.createTxt();
        txt.textColor = 0xFF0000;
        txt.text = '!' + value;
        txt.x = item.x;
        txt.y = item.y;
        this.con.addChildAt(txt,item.parent.getChildIndex(item) + 1)

        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 20},300).wait(200).call(function(){
            this.freeTxt(txt);
        },this)
    }

    private createTxt():eui.Label{
        var item:eui.Label = this.txtPool.pop();
        if(!item)
        {
            item = new eui.Label();
            item.size = 20;
            item.stroke = 2;
            item.width = 160;
            item.textAlign="center"
            item.anchorOffsetX = 80;
        }
        item.strokeColor = 0x000000
        item.alpha = 1;
        return item;
    }

    private freeTxt(item){
        if(!item)
            return;
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
        this.txtPool.push(item);
    }


    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.isDie = false
        this.isReborn = false
        this.isFinish = false
        this.stoping = true
        this.begining = true
        this.blackBG.visible = true
        this.blackBG.alpha = 1
        egret.Tween.get(this.blackBG).to({alpha:0},300).call(()=>{
            this.blackBG.visible = false
        })
        this.createMap();

        this.gunGroup.x = 0;
        egret.Tween.get(this.gunGroup).to({x:280},500).to({x:196},100).to({x:0},400).wait(100).call(()=>{
            this.stoping = false
            this.begining = false
        })

        this.bg1.x = 0;
        egret.Tween.get(this.bg1).to({x:150-640},1000)
        this.bg2.x = 640;
        egret.Tween.get(this.bg2).to({x:150},1000)

        var wall = PKCode_wx3.getInstance().wallArr;
        var middleIndex = wall.length/2;
        for(var i=0;i<wall.length;i++)
        {
            var wallItem = wall[i];
            wallItem.stand();
            //wallItem.visible = false;
            this.wallMV(wallItem)
        }

        this.tipsText.text = ''
        this.barGroup.y = -50;
        this.renewBar()
        egret.Tween.get(this.barGroup).wait(1000).to({y:10},200)

        this.rateCon.bottom = -100;
        egret.Tween.get(this.rateCon).wait(1000).to({bottom:0},200)

        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.HP_CHANGE,this.renewBar)
    }

    private wallMV(wallItem){
        wallItem.x = 640;
        egret.Tween.get(wallItem).to({x:150},1000)
    }

    private renewBar(){
        if(this.isDie)
            return;
        var rate = PKCode_wx3.getInstance().myHp/ PKCode_wx3.getInstance().myHpMax

        if( PKCode_wx3.getInstance().myHp <= 0)
        {
            this.isDie = true;
            this.hpText.text = '城墙血量：' + 0;
            this.bar.scrollRect = new egret.Rectangle(0,0,0,40)
            var wall = PKCode_wx3.getInstance().wallArr;
            for(var i=0;i<wall.length;i++)
            {
                var wallItem = wall[i];
                this.dieWall(wallItem);
            }
            var wall = PKCode_wx3.getInstance().monsterList;
            for(var i=0;i<wall.length;i++)
            {
                var wallItem = wall[i];
                wallItem.stand()
            }
            egret.Tween.get(this.gunGroup).wait(500).to({x:-100},200).wait(500).call(()=>{
                this.stoping = true;
                while(this.bulletArr.length)
                {
                    BulletMC.freeItem(this.bulletArr.pop())
                }
                if(this.isReborn)
                    ResultUI.getInstance().show()
                else
                    RebornUI.getInstance().show();
            })
        }
        else
        {
            this.hpText.text = '城墙血量：' + PKCode_wx3.getInstance().myHp;
            this.bar.scrollRect = new egret.Rectangle(0,0,rate*630,40)
        }
    }

    private dieWall(wallItem){
        setTimeout(()=>{wallItem.die()},Math.random()*800)
    }

    public reborn(){
        PKCode_wx3.getInstance().wudiTime = TM.nowMS() + 10*1000;
        //this.showWudi = true;
        this.isDie = false;
        this.isReborn = true
        PKCode_wx3.getInstance().resetHP();
        var wall = PKCode_wx3.getInstance().wallArr;
        for(var i=0;i<wall.length;i++)
        {
            var wallItem = wall[i];
            wallItem.run()
        }
        egret.Tween.get(this.gunGroup).wait(500).to({x:50},200).to({x:0},200).wait(100).call(()=>{
            this.stoping = false
        })
    }

    private onE(){
        if(this.begining)
        {
            for(var i=0;i<this.gunArr.length;i++)
            {
                this.gunArr[i].move2();
            }
        }
        if(this.stoping)
            return;

        var PD = PKCode_wx3.getInstance();
        PD.onStep();

        var cd = PD.getWudiCD();
        if(cd)
        {
            this.tipsText.text = '无敌时间：' + (cd/1000).toFixed(1)  + '秒';
        }
        else
        {
            this.tipsText.text = '';
        }

        if(this.isFinish)
            return;

        for(var i=0;i<this.bulletArr.length;i++)
        {
            var bullet = this.bulletArr[i];
            bullet.move();
            bullet.testHit(PD.monsterList)
            if(bullet.isDie == 2 || bullet.x > 700)
            {
                this.bulletArr.splice(i,1);
                BulletMC.freeItem(bullet);
                i--;
                continue;
            }
        }
        for(var i=0;i<this.gunArr.length;i++)
        {
            this.gunArr[i].move();
        }


        var rate = PD.enemyHp / PD.enemyHpMax;
        this.rateText.text = MyTool.toFixed(rate*100,1) + '%'
        this.rateBar.width = 600*rate;
        this.rateMC.x = this.rateBar.width;

        if(rate == 0)
        {
            this.isFinish = true;
            while(this.bulletArr.length)
            {
                BulletMC.freeItem(this.bulletArr.pop())
            }
            setTimeout(()=>{
                this.stoping = true;
                ResultUI.getInstance().show()
            },1000)

        }
    }

    private createMap(){
        while(this.gunArr.length)
        {
            GunItem.freeItem(this.gunArr.pop())
        }
        while(this.bulletArr.length)
        {
            BulletMC.freeItem(this.bulletArr.pop())
        }
        this.bg1.source = UM.getBG();
        this.bg2.source = UM.getBG(UM.level + 1);


        var num = UM.gunPosNum;
        for(var i=0;i<num;i++)
        {
            var gunid = GunManager.getInstance().getGunByPos(i+1);
            if(gunid)
            {
                var gun = GunItem.createItem();
                gun.data = gunid
                gun.y = (i+0.5)*80;
                gun.x = 50;
                this.gunArr.push(gun);
                this.gunGroup.addChild(gun);
            }

        }
        this.gunGroup.y = (GameManager.uiHeight - num*80)/2

        PKCode_wx3.getInstance().initData();
    }

    public addMonster(item){
        this.con.addChild(item);
    }


}