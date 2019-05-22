class RankItem extends game.BaseItem{

    private bg: eui.Rect;
    private headMC: eui.Image;
    private indexText: eui.Label;
    private nickText: eui.Label;
    private valueText: eui.Label;



    public constructor() {
        super();
        this.skinName = "RankItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public dataChanged():void {

        this.indexText.textColor = this.data.index < 4 ? 0xffffff : 0xcccccc;
        this.indexText.text = this.data.index;
        this.nickText.text = this.data.nick
        this.headMC.source = this.data.head
        this.valueText.text = this.data.type == 'level'?NumberUtil.addNumSeparator(this.data.value,2):'第' +this.data.value + '关'
    }


}