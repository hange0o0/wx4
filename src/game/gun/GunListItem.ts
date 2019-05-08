class GunListItem extends game.BaseItem{

    private bg: eui.Image;
    private mc: eui.Image;
    private nameText: eui.Label;
    private atkText: eui.Label;
    private desText: eui.Label;
    private lockText: eui.Label;
    private costText: eui.Label;
    private btn: eui.Button;



    public constructor() {
        super();
        this.skinName = "GunListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.btn,()=>{

        })
    }

    public dataChanged():void {
        this.bg.source = this.data.getBGRect(1)
        this.mc.source = this.data.getThumb()
        this.nameText.text = this.data.name
        this.atkText.text = '攻击：' + this.data.atk + '   攻速：' + this.data.speed + '/秒'
        this.desText.text = this.data.getDes();
        this.currentState = 'unlock'
        //this.currentState = 'levelUp'
        //this.currentState = 'max'
        //this.currentState = 'lock'
    }


    //hp
    //speed*2
    //cost*2
    //atk

}