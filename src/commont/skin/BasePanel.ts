class BasePanel extends game.BaseContainer_wx4 {
    public constructor() {
        super();
        this.skinName = "BasePanelSkin";
    }
	private wx4_functionX_46052(){console.log(159)}

    private nameText: eui.Label;
    private closeBtn: eui.Group;



	private wx4_functionX_46053(){console.log(8953)}
    public relateMC
    public setTitle(title){
       this.nameText.text = title
    }

    public childrenCreated() {
        super.childrenCreated();
	wx4_function(9236);
        this.addBtnEvent(this.closeBtn,()=>{
             this.relateMC && this.relateMC.hide();
        })
    }

    public setBottomHeight(v){
       //this.bottomGroup.height = v
    }
}