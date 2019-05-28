class GunListItem extends game.BaseItem{

    private mc: eui.Image;
    private levelText: eui.Label;
    private lockGroup: eui.Group;
    private lockText: eui.Label;




    public constructor() {
        super();
        this.skinName = "GunListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

    }

    public dataChanged():void {
        var GM = GunManager.getInstance();
        var lv = GM.getGunLevel(this.data.id);
        this.mc.source = this.data.getThumb()
        this.touchEnabled = true
        this.lockGroup.visible = false
        if(!lv)
        {
            if(this.data.open < UM_wx4.level)
            {
                this.levelText.text = '可解锁'
                this.levelText.textColor = 0x00ff00
            }
            else
            {
                this.touchEnabled = false
                this.levelText.text = ''
                this.lockGroup.visible = true
                this.lockText.text = '第'+this.data.open+'关'
            }
        }
        else if(lv == GM.maxGunLevel)
        {
            this.levelText.text = 'MAX'
            this.levelText.textColor = 0xffff00
        }
        else
        {
            this.levelText.text = 'LV.' + lv;
            this.levelText.textColor = 0xffffFF
        }

        //if(DEBUG)
        //{
        //    this.levelText.text += this.data.id
        //}

        //this.currentState = 'levelUp'
        //this.currentState = 'max'
        //this.currentState = 'lock'
    }


    //hp
    //speed*2
    //cost*2
    //atk

}