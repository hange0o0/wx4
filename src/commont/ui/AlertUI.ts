class AlertUI extends game.BaseWindow_wx4 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx4_functionX_46054(){console.log(1574)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private closeBtn: eui.Button;
    public text: eui.Label;

	private wx4_functionX_46055(){console.log(184)}
    private textIn;
    private fun;
    private btnLabel;

    public childrenCreated() {
        this.canBGClose = false;
	wx4_function(2367);
        super.childrenCreated();
        this.addBtnEvent(this.okBtn, this.onClick_8317);
        MyTool.removeMC(this.closeBtn)
        MyTool.removeMC(this.cancelBtn)
    }

	private wx4_functionX_46056(){console.log(5498)}
    public show(v?,fun?,btnLabel?){
        this.textIn = v;
        this.fun = fun;
        this.btnLabel = btnLabel;
        super.show();
    }
	private wx4_functionX_46057(){console.log(6805)}

    public onShow(){
        MyTool.setColorText(this.text, this.textIn);
        this.okBtn.label = this.btnLabel || '确认'
        if(this.text.numLines > 1)
            this.text.textAlign = 'left'

	wx4_function(5051);

        var ww = GameManager_wx4.container.width;
        var hh = GameManager_wx4.container.height;
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
    }
	private wx4_functionX_46058(){console.log(2492)}

    private onClick_8317(){
        this.hide();
        if(this.fun)
            this.fun();
    }
}
