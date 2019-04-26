class PKingUI extends game.BaseUI {

    private static _instance: PKingUI;
    public static getInstance(): PKingUI {
        if(!this._instance)
            this._instance = new PKingUI();
        return this._instance;
    }
    private gunGroup: eui.Group;
    private monsterGroup: eui.Group;


    public bulletArr = [];
    public gunArr = [];
    public speed = 5

    private touchID
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
        this.gunGroup.y = this.touchID.gunY - this.touchID.touchY + e.stageY
    }

    private onTouchEnd(e){
        this.touchID = null
    }

    public shoot(item:GunItem){
        var mc = BulletMC.createItem();
        this.bulletArr.push(mc);
        this.addChild(mc);
        mc.x = 50
        mc.y = item.y + this.gunGroup.y;
        mc.data = GunVO.getObject(1);
    }

    public removeBullet(mc:BulletMC){
        var index = this.bulletArr.indexOf(mc);
        this.bulletArr.splice(index,1);
        BulletMC.freeItem(mc);
    }


    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.createMap();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    private onE(){
        for(var i=0;i<this.bulletArr.length;i++)
        {
            var bullet = this.bulletArr[i];
            bullet.move();
            bullet.testHit(PKCode_wx3.getInstance().monsterList)
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
        PKCode_wx3.getInstance().onStep();
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

        for(var i=0;i<10;i++)
        {
            var gun = GunItem.createItem();
            gun.data = {id:i+1,maxStep:10+i*5,lv:Math.ceil(Math.random()*8)};
            gun.y = i*100 + 50;
            gun.x = 50;
            this.gunArr.push(gun);
            this.gunGroup.addChild(gun);
        }

        PKCode_wx3.getInstance().initData();
    }

    public addMonster(item){
        this.addChild(item);
    }


}