class AlertUI extends game.BaseWindow_wx4 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx4_functionX_54752(){console.log(2168)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private closeBtn: eui.Button;
    public text: eui.Label;

	private wx4_functionX_54753(){console.log(8776)}
    private textIn;
    private fun;
    private btnLabel;

    public childrenCreated() {
        this.canBGClose = false;
	wx4_function(7344);
        super.childrenCreated();
        this.addBtnEvent(this.okBtn, this.onClick_96);
        MyTool.removeMC(this.closeBtn)
        MyTool.removeMC(this.cancelBtn)
    }

	private wx4_functionX_54754(){console.log(4288)}
    public show(v?,fun?,btnLabel?){
        this.textIn = v;
        this.fun = fun;
        this.btnLabel = btnLabel;
        super.show();
    }
	private wx4_functionX_54755(){console.log(8961)}

    public onShow(){
        MyTool.setColorText(this.text, this.textIn);
        this.okBtn.label = this.btnLabel || '确认'
        if(this.text.numLines > 1)
            this.text.textAlign = 'left'

	wx4_function(3120);

        var ww = GameManager_wx4.container.width;
        var hh = GameManager_wx4.container.height;
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
    }
	private wx4_functionX_54756(){console.log(8548)}

    private onClick_96(){
        this.hide();
        if(this.fun)
            this.fun();
    }
}
