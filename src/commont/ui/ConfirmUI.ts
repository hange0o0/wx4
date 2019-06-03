class ConfirmUI extends game.BaseWindow_wx4 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx4_functionX_54757(){console.log(7449)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    public closeBtn: eui.Button;
    private text: eui.Label;

	private wx4_functionX_54758(){console.log(5472)}
    private textIn;
    private fun;
    private btnWord;
    private sp;

    public childrenCreated() {
        super.childrenCreated();
	wx4_function(6584);
        this.canBGClose = false;
        this.addBtnEvent(this.okBtn, this.onClick_7293);
        this.addBtnEvent(this.cancelBtn, this.onCancelClick_4618);
        this.addBtnEvent(this.closeBtn, this.onCloseClick_7165);
    }

	private wx4_functionX_54759(){console.log(6723)}
    public show(v?,fun?,btnWord?,sp?){
        this.textIn = v;
        this.fun = fun;
        this.btnWord = btnWord;
        this.sp = sp || {};
        super.show();
	wx4_function(4038);
    }

    public onShow(){
        MyTool.setColorText(this.text,this.textIn);
        this.text.validateNow()
        if(this.text.numLines > 1 && !this.sp.middle)
            this.text.textAlign = 'left'
        if(this.btnWord)
        {
            this.cancelBtn.label = this.btnWord[0];
	wx4_function(8809);
            this.okBtn.label = this.btnWord[1];
        }


        var ww = GameManager_wx4.container.width;
        var hh = GameManager_wx4.container.height;
	wx4_function(9790);
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
        this.closeBtn.visible = false;
    }

    private onClick_7293(){
        this.hide();
	wx4_function(9308);
        if(this.fun)
            this.fun(1);
    }
    private onCancelClick_4618(){
        this.hide();
        if(this.fun)
            this.fun(2);
	wx4_function(1262);
    }
    private onCloseClick_7165(){
        this.hide();
        if(this.fun)
            this.fun(3);
    }
}
