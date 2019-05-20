class BulletMC extends game.BaseItem{
    private static pool = [];
    public static createItem():BulletMC{
        var item:BulletMC = this.pool.pop();
        if(!item)
        {
            item = new BulletMC();
        }
        return item;
    }
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }

    private mc: eui.Image;

    public speed = 20;
    public hitMonster = {};//已攻击的怪物
    //public hp = 0
    public isDie = 0
    //public vo:GunVO

    public enemy
    public addRota

    public typeObj = {};
    public isAuto = false
    public disableSkill = false

    public constructor() {
        super();
        this.skinName = "BulletItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50

        this.mc.scaleX = -1
    }


    public dataChanged():void {
        egret.Tween.removeTweens(this);
        this.enemy = null;
        this.alpha = 1;
        this.isDie = 0;
        this.scaleX = this.scaleY = this.data.scale || 0.7

        this.rotation = 90 + (this.data.rota || 0);
        this.disableSkill = this.data.disableSkill;
        this.hitMonster = {};
        this.typeObj = GunManager.getInstance().getGunVOs(this.data.id);
        if(this.data.id < 100)
        {
            this.mc.source = 'knife_'+this.data.id+'_png'
        }
        //this.vo = GunVO.getObject(this.data.id)
        this.speed = 20;
        this.isAuto = false
        if(!this.disableSkill && this.getTypeVO(13) && !this.data.scale)
        {
            this.isAuto = true
            this.speed = 12;
            var addRota = -90 + Math.random()*180;
            this.rotation += addRota
            this.addRota = addRota > 0?-5:5;
        }
        //console.log(this.data.rota)
    }

    

    private resetRota(rota){
        while(rota < 0)
            rota += 360
        while(rota > 360)
            rota -= 360
        return rota
    }
    public move(){
        var b = this.x && this.y

        if(this.isDie)
            return;
        if(this.isAuto)
        {
            if(isNaN(this.rotation))
                console.log(66666)
            if(!this.enemy || this.enemy.isDie)
                this.enemy = PKCode_wx3.getInstance().randomEnemy();
            var rota1 = this.rotation - 90;
            if(this.enemy)
            {
                var rota = Math.atan2(this.enemy.y - this.y,this.enemy.x - this.x)/Math.PI*180
                if(isNaN(rota))
                    console.log(66666)
                rota = this.resetRota(rota)
                rota1 = this.resetRota(rota1)

                if(Math.abs(rota-rota1)>5)
                {
                    this.rotation += this.addRota
                    rota1 += this.addRota
                }
                else
                {
                    rota1 = rota
                    this.rotation = rota1 + 90
                }
            }
            this.x += this.speed*Math.cos(rota1/180*Math.PI)
            this.y += this.speed*Math.sin(rota1/180*Math.PI)
        }
        else
        {
            this.x += this.speed*Math.cos(this.data.rota/180*Math.PI)
            this.y += this.speed*Math.sin(this.data.rota/180*Math.PI)
        }

        if(b && !this.x && !this.y)
            console.log(999)
    }
    
    private getTypeVO(type){
        return this.typeObj[type];
    }

    public testHit(monsterArr){
        if(this.isDie)
            return;
        for(var i=0;i<monsterArr.length;i++)
        {
            var item = monsterArr[i];
            if(item.isDie)
                continue;
            if(this.hitMonster[item.id]) //打过
                continue;
            if(item.y < this.y)
                continue;
            var mvo = item.getVO();
            if(item.y > this.y + mvo.height)
                continue;
            if(Math.abs(item.x -this.x)>mvo.width/2)
                continue;

            item.addHp(-PKCode_wx3.getInstance().getBulletAtk(this.data.id)*this.data.double);
            if(!this.disableSkill)
            {
                if(item.isDie) //杀人啦
                {
                    if(this.getTypeVO(3)) //杀敌爆炸
                    {
                        PKCode_wx3.getInstance().hitEnemyAround(item.x,item.y,this.getTypeVO(3).getLevelValue(1),this.getTypeVO(3).getLevelValue(2))
                        AniManager_wx3.getInstance().playOnItem(112,item);
                    }
                    else if(this.getTypeVO(4)) //杀敌吸血
                    {
                        PKCode_wx3.getInstance().addHp(this.getTypeVO(4).getLevelValue(1))
                    }
                    else if(this.getTypeVO(5)) //杀敌攻击成长
                    {
                        PKCode_wx3.getInstance().addAtk(this.data.id,this.getTypeVO(5).getLevelValue(1))
                    }
                }
                else
                {
                    if(this.getTypeVO(7)) //使中刀敌人减慢$1%速度，持续#2秒
                    {
                        item.setSlow(this.getTypeVO(7).getLevelValue(1),this.getTypeVO(7).getLevelValue(2))
                    }
                    else if(this.getTypeVO(8)) //'有$1%的机率使敌人陷入眩晕状态，持续#2秒';
                    {
                        if(Math.random() < this.getTypeVO(8).getLevelValue(1)/100)
                        {
                            item.setYun(this.getTypeVO(8).getLevelValue(2))
                        }
                    }
                    else if(this.getTypeVO(12)) //'使被命中的敌人退后@1距离';
                    {
                        item.x += this.getTypeVO(12).getLevelValue(1)
                    }
                }

                if(this.getTypeVO(14) && !this.data.stop14) //'命中敌人后会分裂出#1把飞刀';
                {
                    var num = this.getTypeVO(14).getLevelValue(1);
                    var rota = 180/num;
                    var total = (num - 1)*rota;
                    var start = -total/2
                    for(var i=0;i<num;i++)
                    {
                        var bullet = PKingUI.getInstance().createBullet(this.data.id,this.x,this.y,start + i*rota);
                        bullet.hitMonster[item.id] = true
                        bullet.data.stop14 = true
                    }
                }
                else if(this.getTypeVO(15)) // '命中敌人后回复城墙@1点血量';
                {
                    PKCode_wx3.getInstance().addHp(this.getTypeVO(15).getLevelValue(1))
                }

            }


            this.hitMonster[item.id] = true//已经对这个怪造成伤害了
            if(!this.getTypeVO(2) || this.disableSkill) //穿透
            {
                this.playDie();
                return;
            }

        }
    }

    public playDie(){
        this.isDie = 1;
        egret.Tween.get(this).to({
            y:this.y - 50 + Math.random()*20,
            x:this.x - 30 - Math.random()*30,
            rotation:this.rotation + 360 + 360*Math.random(),
            alpha:0,
        },300).call(()=>{
            this.isDie = 2;
        })
    }

    public remove():void {
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
    }


}