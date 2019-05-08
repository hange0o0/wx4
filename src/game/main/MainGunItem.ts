class MainGunItem extends game.BaseItem{

    private gunItem: GunItem;
    private indexText: eui.Label;


    public constructor() {
        super();
        this.skinName = "MainGunItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 60
        this.anchorOffsetY = 60

        this.addBtnEvent(this,()=>{
            GunChooseUI.getInstance().show(this.data)
        })
        //this.scaleX = this.scaleY = 0.7

    }

    public dataChanged():void {
       this.indexText.text = this.data
    }
}