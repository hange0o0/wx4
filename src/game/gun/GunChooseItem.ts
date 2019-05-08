class GunChooseItem extends game.BaseItem{

    private bg: eui.Image;
    private mc: eui.Image;
    private levelText: eui.Label;
    private usingGroup: eui.Group;
    private usingText: eui.Label;




    public constructor() {
        super();
        this.skinName = "GunChooseItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {
        this.usingGroup.visible = false;
        this.mc.source = this.data.getThumb()
        this.levelText.text = this.data.name
        this.bg.source = this.data.getBGRect(1)
    }


}