class BasePanel extends game.BaseContainer_wx4 {
    public constructor() {
        super();
        this.skinName = "BasePanelSkin";
    }
	private wx4_functionX_54750(){console.log(9222)}

    private nameText: eui.Label;
    private closeBtn: eui.Group;



	private wx4_functionX_54751(){console.log(2456)}
    public relateMC
    public setTitle(title){
       this.nameText.text = title
    }

    public childrenCreated() {
        super.childrenCreated();
	wx4_function(1369);
        this.addBtnEvent(this.closeBtn,()=>{
             this.relateMC && this.relateMC.hide();
        })
    }

    public setBottomHeight(v){
       //this.bottomGroup.height = v
    }
}