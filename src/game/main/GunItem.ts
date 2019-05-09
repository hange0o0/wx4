class GunItem extends game.BaseItem{
    private static pool = [];
    public static createItem():GunItem{
        var item:GunItem = this.pool.pop();
        if(!item)
        {
            item = new GunItem();
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

    private roleBG: eui.Image;
    private role: eui.Image;
    private shootMC: eui.Image;
    private mcGroup: eui.Group;
    private roundMC: eui.Image;








    public step = 0;
    public tw;
    public timer;
    public maxStep;

    public constructor() {
        super();
        this.skinName = "GunItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
        this.scaleX = this.scaleY = 0.7

        this.shootMC.scaleX = -1
        this.shootMC.rotation = 90

        this.roundMC.scaleX = -1
        this.roundMC.horizontalCenter = 50

        //this.roleBG.scaleX = this.roleBG.scaleY = 0.8
        this.tw = egret.Tween.get(this.roleBG,{loop:true}).to({alpha:0.2},1000).to({alpha:1},1000)
        this.tw.setPaused(true)
    }

    public dataChanged():void {
        clearTimeout(this.timer)
        var lv = GunManager.getInstance().getGunLevel(this.data) || 1
        var vo = GunVO.getObject(this.data);
        this.timer = setTimeout(()=>{this.tw && this.tw.setPaused(false)},1000*Math.random())
        this.roleBG.source = 'role_bg_'+lv+'_png'
        this.role.source = 'role_'+lv+'_png'
        this.roundMC.source = 'knife_'+this.data+'_png'
        this.shootMC.source = 'knife_'+this.data+'_png'
        this.step = 0;
        this.maxStep = Math.floor(vo.speed*60) - 10;
    }

    public move(){
        this.step ++;
        this.mcGroup.rotation += 30 - this.maxStep/5
        if(this.step >= this.maxStep)
        {
            this.step = -10;
            this.shootMC.visible = false
            PKingUI.getInstance().shoot(this);
        }
        if(this.step >=0 )
        {
            this.shootMC.visible = true

            this.shootMC.horizontalCenter = -80*(this.step)/this.maxStep + 20
        }
    }

    public move2(){
        this.mcGroup.rotation += 10
        this.shootMC.visible = false;
    }

    public remove():void {
        MyTool.removeMC(this);
        this.tw.setPaused(true)
        clearTimeout(this.timer)
    }


}