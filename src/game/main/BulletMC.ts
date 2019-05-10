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
    public vo:GunVO

    public constructor() {
        super();
        this.skinName = "BulletItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
        this.scaleX = this.scaleY = 0.7
        this.mc.scaleX = -1
    }

    public dataChanged():void {
        egret.Tween.removeTweens(this);
        this.alpha = 1;
        this.isDie = 0;
        this.mc.source = 'knife_'+this.data.id+'_png'
        this.rotation = 90 + this.data.rota;
        this.hitMonster = {};
        this.vo = GunVO.getObject(this.data.id)
        console.log(this.data.rota)
    }

    public move(){
        if(this.isDie)
            return;
        this.x += this.speed*Math.cos(this.data.rota/180*Math.PI)
        this.y += this.speed*Math.sin(this.data.rota/180*Math.PI)
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
            if(item.y > this.y + item.getVO().height*1)
                continue;
            if(Math.abs(item.x -this.x)>item.getVO().width/3)
                continue;

            item.addHp(-PKCode_wx3.getInstance().getBulletAtk(this.data.id)*this.data.double);
            if(item.isDie) //杀人啦
            {
                if(this.vo.type == 3) //杀敌爆炸
                {
                    PKCode_wx3.getInstance().hitEnemyAround(item.x,item.y,this.vo.v1,this.vo.getLevelValue(this.vo.v2,this.vo.v4))
                    AniManager_wx3.getInstance().playOnItem(112,item);
                }
                else if(this.vo.type == 4) //杀敌吸血
                {
                    PKCode_wx3.getInstance().addHp(this.vo.getLevelValue(this.vo.v1,this.vo.v3))
                }
                else if(this.vo.type == 5) //杀敌攻击成长
                {
                    PKCode_wx3.getInstance().addAtk(this.vo.id,this.vo.getLevelValue(this.vo.v1,this.vo.v3))
                }
            }
            else
            {
                if(this.vo.type == 7) //使中刀敌人减慢$1%速度，持续#2秒
                {
                    item.setSlow(this.vo.getLevelValue(this.vo.v1,this.vo.v3),this.vo.v2)
                }
                else if(this.vo.type == 8) //'有$1%的机率使敌人陷入眩晕状态，持续#2秒';
                {
                    if(Math.random() < this.vo.getLevelValue(this.vo.v1,this.vo.v3)/100)
                    {
                        item.setYun(this.vo.v1)
                    }
                }
                //else if(this.vo.type == 9) //'有$1%的机率造成@2倍伤害';
                //{
                //    if(Math.random() < this.vo.v1/100)
                //    {
                //
                //    }
                //    PKCode_wx3.getInstance().addHp(this.vo.getLevelValue(this.vo.v1,this.vo.v3))
                //}
                else if(this.vo.type == 12) //'使被命中的敌人退后@1距离';
                {
                    item.x += this.vo.getLevelValue(this.vo.v1,this.vo.v3)
                }
                else if(this.vo.type == 14) //'命中敌人后会分裂出#1把飞刀';
                {
                    var num = this.vo.v1;
                    var rota = 180/num;
                    var total = (num - 1)*rota;
                    var start = -total/2
                    for(var i=0;i<num;i++)
                    {
                        PKingUI.getInstance().createBullet(this.vo.id,this.x,this.y,start + i*rota).hitMonster[item.id] = true
                    }
                }
                else if(this.vo.type == 15) // '命中敌人后回复城墙@1点血量';
                {
                    PKCode_wx3.getInstance().addHp(this.vo.getLevelValue(this.vo.v1,this.vo.v3))
                }
            }
            this.hitMonster[item.id] = true//已经对这个怪造成伤害了
            if(this.vo.type != 2) //穿透
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
    }


}