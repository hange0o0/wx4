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
        this.gunItem.scaleX = this.gunItem.scaleY = 1

        this.addBtnEvent(this,()=>{
            if(this.currentState == 'lock')
            {
                var cost = GunManager.getInstance().getPosCost();
                MyWindow.Confirm('确定花费'+this.createHtml(NumberUtil.addNumSeparator(cost),0xFFFF00)+'金币\n解锁该位置吗？',(b)=>{
                    if(b==1)
                    {
                        if(!UM.checkCoin(cost))
                            return;
                        GunManager.getInstance().unlockPos();
                    }
                });
                return;
            }
            GunChooseUI.getInstance().show(this.data)
        })
        //this.scaleX = this.scaleY = 0.7


        MyTool.addLongTouch(this,()=>{
            if(this.currentState == 'lock')
                return
            GunListUI.getInstance().show(this.data)
        },this)
    }

    public dataChanged():void {
       this.indexText.text = this.data
        if(this.data <= UM.gunPosNum)
        {
            var gun = GunManager.getInstance().getGunByPos(this.data);
            if(gun)
            {
                this.currentState = 'normal'
                this.gunItem.data = gun;
            }
            else
            {
                this.currentState = 'empty'
            }
        }
        else
        {
            this.currentState = 'lock'
        }
    }

    public onE(){
        if(this.currentState == 'normal')
            this.gunItem.move2();
    }
}