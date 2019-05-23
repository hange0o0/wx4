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
            if(!this.data)
            {
                GunListUI.getInstance().show(GunManager.getInstance().getUnlock());
                return;
            }
            GunInfoUI.getInstance().show(this.data)
        })

        MyTool.addLongTouch(this,()=>{
            if(!this.data)
            {
                return;
            }
           GunListUI.getInstance().show(this.data)
        },this)
    }

    public dataChanged():void {
        if(!this.data)
        {
            this.currentState = 's2'
            return;
        }
        var pos = GunManager.getInstance().getPosByGun(this.data)
        if(pos)
        {
            this.usingGroup.visible = true;
            this.usingText.text =  pos + '号位';
            if(pos == GunChooseUI.getInstance().index)
                this.usingText.textColor = 0x66ff66
            else
                this.usingText.textColor = 0xffffff
        }
        else
        {
            this.usingGroup.visible = false;
        }

        var vo = GunVO.getObject(this.data);
        this.mc.source = vo.getThumb()
        //this.levelText.text = vo.name
        this.bg.source = vo.getBGRound()
        this.skillText.text = vo.getTitle()

        var atk = Math.floor(GunManager.getInstance().getGunAtk(vo.id)/vo.speed)
        this.levelText.text =  atk + ' /秒'

        //if(DEBUG)
        //{
        //    this.levelText.text += this.data
        //}
        //
        //this.data.getTitle();
    }


}