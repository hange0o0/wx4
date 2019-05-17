class GunChooseItem extends game.BaseItem{

    private bg: eui.Image;
    private mc: eui.Image;
    private levelText: eui.Label;
    private usingGroup: eui.Group;
    private usingText: eui.Label;
    private skillText: eui.Label;





    public constructor() {
        super();
        this.skinName = "GunChooseItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            GunInfoUI.getInstance().show(this.data)
        })

        //MyTool.addLongTouch(this,()=>{
        //   GunListUI.getInstance().show(this.data.id)
        //},this)
    }

    public dataChanged():void {
        var pos = GunManager.getInstance().getPosByGun(this.data)
        if(pos)
        {
            this.usingGroup.visible = true;
            this.usingText.text =  pos + '号位';
        }
        else
        {
            this.usingGroup.visible = false;
        }

        var vo = GunVO.getObject(this.data);
        this.mc.source = vo.getThumb()
        this.levelText.text = vo.name
        this.bg.source = vo.getBGRound()
        this.skillText.text = vo.getTitle()
        if(DEBUG)
        {
            this.levelText.text += this.data
        }
        //
        //this.data.getTitle();
    }


}