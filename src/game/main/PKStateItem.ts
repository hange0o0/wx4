class PKStateItem extends game.BaseItem{
    private static pool = [];
    public static createItem():PKStateItem{
        var item:PKStateItem = this.pool.pop();
        if(!item)
        {
            item = new PKStateItem();
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
    private txt: eui.Label;

    public constructor() {
        super();
        this.skinName = "PKStateItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

    }

    public dataChanged():void {
        this.mc.source = 'buff_'+this.data+'_png'
        var str = ''
        switch(this.data)
        {
            case 101:
                str = '封印所有飞刀的技能';
                break
            case 102:
                str = '降低城墙20%的防御力';
                break
            case 103:
                str = '降低飞刀20%的攻击速度';
                break
            case 104:
                str = '增加所有怪物20%的速度';
                break
            case 105:
                str = '增加所有怪物20%的攻击力';
                break
            case 106:
                str = '增加所有怪物20%的防御力';
                break
            case 107:
                str = '所有怪物每秒自动回复2%的生命';
                break
            case 108:
                str = '城墙20%每秒损失2%的生命';
                break
            case 109:
                str = '降低所有飞刀20%攻击力';
                break
            case 110:
                str = '所有怪物可免疫前3次伤害';
                break
        }

        this.txt.text = str;
    }

    public remove(){
        MyTool.removeMC(this);
    }

    public showMV(){
        this.scaleY = 0;
        egret.Tween.get(this).to({scaleY:1.1},300).to({scaleY:1},300)
    }

    public hideMV(){
        egret.Tween.get(this).to({scaleY:1.1},300).to({scaleY:0},300).call(()=>{
            PKStateItem.freeItem(this);
        })
    }
}