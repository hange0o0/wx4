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
        this.rotation = 90;
        //this.speed = this.data.speed
        this.hitMonster = {};
        //this.hp = this.data.hp
    }

    public move(){
        if(this.isDie)
            return;
        this.x += this.speed
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

            item.addHp(-GunManager.getInstance().getGunAtk(this.data.id));
            if(this.data.type != 100)
            {
                this.hitMonster[item.id] = true
            }
            //this.hp -= item.getVO().def;
            //if(this.hp <= 0)
            //{
                this.playDie();
                return;
            //}
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