class PKMonsterItem_wx3 extends game.BaseItem {
    private static pool = [];
    private static index = 1
     public static createItem():PKMonsterItem_wx3{
         var item:PKMonsterItem_wx3 = this.pool.pop();
         if(!item)
         {
             item = new PKMonsterItem_wx3();
         }
         item.id = this.index;
         this.index++
         return item;
     }
     public static freeItem(item){
         if(!item)
             return;
         item.remove();
         if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
     }

     public id = 0
    public vo;


    private barGroup: eui.Group;
    private bar: eui.Rect;
    public speed = 50;

    public hp
    public maxHp
    public stop = 0  //攻击中
    public isDie = 0
    public mid = 0

    public target
    public yunStep = 0;
    public slowStep = 0;
    public speedDec = 0;
    public buffHp = 0;
    public moveSpeed = 0;



    public get speedDec2(){
        var count = 0
        var PC = PKCode_wx4.getInstance();
        if(PC.isInBuff(104))
            count += 20;
        if(PC.isInBuff(1103))
            count -= 20;
        return count;
    }






    public stateMV =  new MonsterAtkMV();
    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();

    public constructor() {
        super();
        this.skinName = "PKMonsterItemSkin";
        this.monsterMV.addEventListener('mv_die',this.onDieFinish,this)
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = this.touchEnabled = false;

        this.addChildAt(this.monsterMV,0)
        this.monsterMV.x = 50;
        this.monsterMV.y = 300;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;


        this.stateMV.x =  50 -  154/4

        this.stateMV.load('effect2_png',0,154,39,2)
        this.stateMV.stop()
    }

    public getAtk(){
        var hp = this.vo.atk
        var add = 1;
        var PC = PKCode_wx4.getInstance();
        if(PC.isInBuff(102))
            add += 0.2;
        if(PC.isInBuff(105))
            add += 0.2;
        if(PC.isInBuff(1106))
            add -= 0.2;
        if(PC.isInBuff(1109))
            add -= 0.2;
        return Math.ceil(hp*add);
    }

    private onDieFinish(){
        this.isDie = 2;
    }

    public setSlow(speedDec,cd){
        var step = Math.ceil(cd*1000*(60/1000))
        this.slowStep = Math.max(this.slowStep,step)
        this.speedDec = Math.max(this.speedDec,speedDec)
        this.onSpeedChange();
        this.monsterMV.alpha = 0.6;
    }

    public onSpeedChange(){
        var speed = -this.speedDec + this.speedDec2;
        this.monsterMV.speed = speed

        var speedAdd = (this.speed/20)/this.getSpeedRate();
        if(!speedAdd || speedAdd < 0) //防止一动不动
            speedAdd = 1;
        this.moveSpeed = speedAdd;
    }


    public setYun(cd){
        var step = Math.ceil(cd*1000*(60/1000))
        if(!this.yunStep)//表现晕
        {
            this.addChild(this.stateMV)
            this.stateMV.y = 300 - this.vo.height - 35;
            this.stateMV.play()
        }
        this.yunStep = Math.max(step,this.yunStep);
    }

    public onE(){
        this.monsterMV.onE();
        if(this.yunStep)
        {
            this.yunStep --;
            if(this.yunStep <= 0)
            {
                this.yunStep = 0;
                this.stateMV.stop()
                MyTool.removeMC(this.stateMV)
            }
        }

        if(this.slowStep)
        {
            this.slowStep --;
            if(this.slowStep <= 0)
            {
                this.speedDec = 0;
                this.monsterMV.speed = 0;
                this.monsterMV.alpha = 1;
                this.onSpeedChange();
            }
        }
    }

    public getSpeedRate(){
        return 1 + (this.speedDec - this.speedDec2)/100 * 1.5
    }

    public dataChanged(){
        this.stop = 0;
        this.buffHp = 0;
        this.isDie = 0;
        this.yunStep = 0;
        this.slowStep = 0;
        this.speedDec = 0;
        this.mid = this.data.mid;
        this.vo = MonsterVO.getObject(this.mid)
        this.monsterMV.load(this.mid)
        this.monsterMV.stand();
        this.monsterMV.alpha = 1;
        if(this.data.mid == 99)
        {
            this.monsterMV.scaleX = -1
            //this.monsterMV.scaleY = 1
        }
        else
        {
            this.monsterMV.scaleX = 1//.2
            //this.monsterMV.scaleY = 1.2
        }

        this.hp = this.data.hp
        this.maxHp = this.hp
        this.speed = this.vo.speed


        this.barGroup.visible = false;
        this.barGroup.alpha = 1;
        this.barGroup.y = 300 - this.vo.height - 20;
        this.renewHp();
        this.onSpeedChange();

        this.stateMV.stop()
        MyTool.removeMC(this.stateMV)

    }

    public isWuDi(){
        return this.x > 620
    }


    public run(){
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();

        this.x -=  this.moveSpeed;
        //if(isNaN(this.x))
        //    console.log('???')
    }

    public stand(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }

    public die(){
        this.isDie = 1;
        this.monsterMV.die();
        this.bar.width = 0;
        this.barGroup.visible = false;
        this.vo.playDieSound();
        if(this.data.mid != 99)
            PlayManager.getInstance().showDropCoin(this)
    }

    public atk(){
        this.monsterMV.atk();
    }

    public renewHp(){
        if(this.hp < this.maxHp)
        {
            this.barGroup.visible = true;
        }
        this.bar.width = 40 * this.hp/this.maxHp
    }

    public addHp(v){
        if(this.isDie)
            return;
        if(v < 0 && this.buffHp < 3 && PKCode_wx4.getInstance().isInBuff(110))
        {
            this.buffHp ++;
            return;
        }
        //if(!v)
        //    console.log(v);
        var PC = PKCode_wx4.getInstance();
        if(v < 0)
        {
            var add = 1;
            PC.isInBuff(1102)
                add += 0.2
            PC.isInBuff(1105)
                add += 0.2
            v = Math.floor(v*add)
        }

        if(-v > this.hp)
            v = -this.hp;
        this.hp += v;
        //if(v < 0)

        PC.enemyHp += v;

        this.renewHp();
        if(this.hp <= 0)
            this.die();
    }

    public setDie(){
        this.addHp(-this.hp)
    }

    public remove(){
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.barGroup);
        MyTool.removeMC(this);
        this.monsterMV.stop();
    }
}