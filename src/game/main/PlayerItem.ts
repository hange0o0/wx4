class PlayerItem extends game.BaseItem{

    private mc: eui.Image;
    public constructor() {
        super();
        this.skinName = "PlayerItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
    }

    public dataChanged():void {
        this.mc.source = 'knife_'+this.data.id+'_png'
    }

    public move(){
        this.mc.rotation -= 20;
    }

}