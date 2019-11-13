class BuffItem extends game.BaseItem{
    private headMC: eui.Image;
    private nameText: eui.Label;

    public constructor() {
        super();
        this.skinName = "BuffItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            if(this.currentState == 'empty')
                BuffUI.getInstance().share()
        })
    }
    public dataChanged():void {
        var adNum = UM_wx4.adFriendNum
        var user = UM_wx4.shareUser[this.data]
        if(user)
        {
            this.currentState = 'normal'
            this.headMC.source = user.h || 'common_head_bg_jpg'
            this.nameText.text = user.n
        }
        else if(UM_wx4.shareUser.length + adNum > this.data)
        {
            var index = this.data - UM_wx4.shareUser.length + 1
            this.currentState = 'normal'
            this.headMC.source = 'ad_head' + index + '_jpg'
            this.nameText.text = ''
        }
        else
        {
             this.currentState = 'empty'
        }
    }

}