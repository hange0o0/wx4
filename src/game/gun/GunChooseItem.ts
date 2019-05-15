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
        this.addBtnEvent(this,()=>{
            var pos = GunManager.getInstance().getPosByGun(this.data.id)
            if(pos == GunChooseUI.getInstance().index)
                GunManager.getInstance().removeGun(this.data.id)
            else
                GunManager.getInstance().addGun(this.data.id,GunChooseUI.getInstance().index)
            GunChooseUI.getInstance().hide();
        })

        //MyTool.addLongTouch(this,()=>{
        //   GunListUI.getInstance().show(this.data.id)
        //},this)
    }

    public dataChanged():void {
        var pos = GunManager.getInstance().getPosByGun(this.data.id)
        if(pos)
        {
            this.usingGroup.visible = true;
            this.usingText.text = '位置' + pos;
        }
        else
        {
            this.usingGroup.visible = false;
        }

        this.mc.source = this.data.getThumb()
        this.levelText.text = this.data.name
        this.bg.source = this.data.getBGRound()
        if(DEBUG)
        {
            this.levelText.text += this.data.id
        }

        this.data.getTitle();
    }


}