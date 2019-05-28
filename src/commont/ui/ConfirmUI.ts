class ConfirmUI extends game.BaseWindow_wx4 {
    public constructor() {
        super();
        this.skinName = "AlertSkin";
    }
	private wx4_functionX_46059(){console.log(8402)}

    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    public closeBtn: eui.Button;
    private text: eui.Label;

	private wx4_functionX_46060(){console.log(7509)}
    private textIn;
    private fun;
    private btnWord;
    private sp;

    public childrenCreated() {
        super.childrenCreated();
	wx4_function(6905);
        this.canBGClose = false;
        this.addBtnEvent(this.okBtn, this.onClick_4689);
        this.addBtnEvent(this.cancelBtn, this.onCancelClick_1103);
        this.addBtnEvent(this.closeBtn, this.onCloseClick_2638);
    }

	private wx4_functionX_46061(){console.log(1100)}
    public show(v?,fun?,btnWord?,sp?){
        this.textIn = v;
        this.fun = fun;
        this.btnWord = btnWord;
        this.sp = sp || {};
        super.show();
	wx4_function(4310);
    }

    public onShow(){
        MyTool.setColorText(this.text,this.textIn);
        this.text.validateNow()
        if(this.text.numLines > 1 && !this.sp.middle)
            this.text.textAlign = 'left'
        if(this.btnWord)
        {
            this.cancelBtn.label = this.btnWord[0];
	wx4_function(7475);
            this.okBtn.label = this.btnWord[1];
        }


        var ww = GameManager_wx4.container.width;
        var hh = GameManager_wx4.container.height;
	wx4_function(3265);
        this.x = (ww - this.width) / 2;
        this.y = (hh - this.height) / 2;
        this.closeBtn.visible = false;
    }

    private onClick_4689(){
        this.hide();
	wx4_function(7083);
        if(this.fun)
            this.fun(1);
    }
    private onCancelClick_1103(){
        this.hide();
        if(this.fun)
            this.fun(2);
	wx4_function(3440);
    }
    private onCloseClick_2638(){
        this.hide();
        if(this.fun)
            this.fun(3);
    }
}
