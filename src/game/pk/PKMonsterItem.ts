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


    private barGroup: eui.Group;
    private bar: eui.Rect;
    public speed = 50;

    public hp
    public maxHp
    public stop = 0
    public isDie = 0
    public mid = 0

    public target
    public yunStep = 0;
    public slowStep = 0;
    public speedDec = 0;


    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();

    public constructor() {
        super();
        this.skinName = "PKMonsterItemSkin";
        this.monsterMV.addEventListener('mv_die',this.onDieFinish,this)
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addChildAt(this.monsterMV,0)
        this.monsterMV.x = 50;
        this.monsterMV.y = 300;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;
    }

    public getAtk(){
        return this.getVO().atk
    }

    private onDieFinish(){
        this.isDie = 2;
    }

    public getVO(){
        return MonsterVO.getObject(this.mid);
    }

    public setSlow(speedDec,cd){
        var step = Math.ceil(cd*1000*(60/1000))
        this.slowStep = Math.max(this.slowStep,step)
        this.speedDec = Math.max(this.speedDec,speedDec)
        this.monsterMV.speed = - this.speedDec
        this.alpha = 0.8;
    }

    public setYun(cd){
        var step = Math.ceil(cd*1000*(60/1000))
        if(!this.yunStep)//表现晕
        {

        }
        this.yunStep = step;
    }

    public onE(){
        if(this.yunStep)
        {
            this.yunStep --;
            if(this.yunStep == 0)
            {

            }
        }
        if(this.slowStep)
        {
            this.slowStep --;
            if(this.slowStep == 0)
            {
                this.speedDec = 0;
                this.monsterMV.speed = 0;
                this.alpha = 1;
            }
        }
    }

    public getSpeedRate(){
        return 1 + this.speedDec/100
    }

    public dataChanged(){
        this.isDie = 0;
        this.yunStep = 0;
        this.slowStep = 0;
        this.speedDec = 0;
        this.mid = this.data.mid;
        this.monsterMV.load(this.mid)
        this.monsterMV.stand();
        this.alpha = 1;
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


        this.barGroup.visible = false;
        this.barGroup.alpha = 1;
        this.barGroup.y = 300 - this.getVO().height - 20;
        this.renewHp();

    }


    public run(){
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();
        this.x -= (this.speed/20)/this.getSpeedRate();
    }

    public stand(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }

    public die(){
        this.isDie = 1;
        this.monsterMV.die();
        this.bar.width = 0;
        this.barGroup.visible = true;
        var tw = egret.Tween.get(this.barGroup);
        tw.to({alpha:0},300)
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
        if(-v > this.hp)
            v = -this.hp;
        this.hp += v;
        PKCode_wx3.getInstance().enemyHp += v;
        this.renewHp();
        if(this.hp <= 0)
            this.die();
    }

    public remove(){
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.barGroup);
        MyTool.removeMC(this);
        this.monsterMV.stop();
    }
}