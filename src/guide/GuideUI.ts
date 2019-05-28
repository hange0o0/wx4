class GuideUI extends game.BaseContainer_wx4{
    private topRect: eui.Group;
    private leftRect: eui.Group;
    private rightRect: eui.Group;
    private bottomRect: eui.Group;
	private wx4_functionX_45864(){console.log(985)}
    private stopClickGroup: eui.Group;
    public tipsGroup: eui.Group;
    private tipTxt: eui.Label;
    private anyClick: eui.Label;
    private handMC: eui.Image;

	private wx4_functionX_45865(){console.log(6673)}





    private nearMC
	private wx4_functionX_45866(){console.log(5220)}
    private clickFun
    private textIn
    private textIndex
    private mc


	private wx4_functionX_45867(){console.log(5626)}
    private static instance: GuideUI;
    public static getInstance() {
        if(!this.instance) this.instance = new GuideUI();
        return this.instance;
    }
    
	private wx4_functionX_45868(){console.log(412)}
    public constructor() {
        super(); 
        this.skinName = "GuideSkin";

        //GameManager.stage.addEventListener(egret.Event.RESIZE,this.resizeFun,this);
    }

	private wx4_functionX_45869(){console.log(5702)}
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick_2907);
        //this.addBtnEvent(this.soundBtn,this.onSoundClick);

        this.stopClickGroup.touchEnabled = true;
        //this.tipsBg.touchEnabled = false;

	wx4_function(7580);
        this.tipsGroup.touchChildren = this.tipsGroup.touchEnabled = false;

        this.handMC.x = this.handMC.y = 0

    }

	private wx4_functionX_45870(){console.log(41)}
    private onClick_2907(){
        if(this.textIndex < this.textIn.length)
        {
            this.textIndex = this.textIn.length
            this.testAnyClickShow_8962();

             return;
        }
        if(this.clickFun)
        {
            //this.hide();
	wx4_function(3658);
            this.clickFun();
        }
        else if(GuideManager.getInstance().guideKey2 == 'info')
        {
            MyWindow.ShowTips('请点击上方怪物进行查看')
        }

    }
	private wx4_functionX_45871(){console.log(1708)}

    private testAnyClickShow_8962(){
        if(this.clickFun != null)
        {
            this.anyClick.visible = true;
            this.anyClick.alpha = 0;
	wx4_function(9086);
            var tw = egret.Tween.get(this.anyClick,{loop:true});
            tw.to({alpha:1},500).wait(500).to({alpha:0},500)
        }
    }

    public handMovePos(formMC,toMC){
         this.handStop_8545();
	wx4_function(2647);
        var rect = formMC.getBounds();
        var p1 = formMC.localToGlobal(rect.x, rect.y);
        var p2 = formMC.localToGlobal(rect.x + rect.width, rect.y + rect.height);
        var fromP = {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2,
        }

	wx4_function(6391);
        var rect = toMC.getBounds();
        var p1 = toMC.localToGlobal(rect.x, rect.y);
        var p2 = toMC.localToGlobal(rect.x + rect.width, rect.y + rect.height);
        var toP = {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2,
        }

	wx4_function(1481);

        var tw:egret.Tween = egret.Tween.get(this.handMC,{loop:true});
        this.handMC.x = fromP.x
        this.handMC.y = fromP.y
        tw.to(toP,1000).wait(300);
    }
	private wx4_functionX_45872(){console.log(8831)}

    private handMove_2126(){
        this.handMC.anchorOffsetX = 70
        this.handMC.anchorOffsetY = 30
        var tw:egret.Tween = egret.Tween.get(this.handMC,{loop:true});
        tw.to({anchorOffsetX:90,anchorOffsetY:-10},500).to({anchorOffsetX:70,anchorOffsetY:30},500)
    }
	private wx4_functionX_45873(){console.log(7516)}
    private handStop_8545(){
        egret.Tween.removeTweens(this.handMC)
    }

    public showText(text){
        this.textIndex = 99999//1;
	wx4_function(2879);
        this.textIn = text || '';

        text = text.replace(/\[/g,'<font color="#E0A44A">').replace(/\]/g,'<\/font>')
        this.setHtml(this.tipTxt,text);

        this.testAnyClickShow_8962();
	wx4_function(198);

        //this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        //if(text.length > this.textIndex)
        //{
        //    this.tipTxt.addEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        //}
        //this.onText();
    }

    public onText(){
        var str =  this.textIn.substr(0,this.textIndex);
        var lastChar = str.substr(-1);
	wx4_function(6553);
        if(lastChar == '[' || lastChar == ']')
        {
            this.textIndex ++;
            str =  this.textIn.substr(0,this.textIndex);
        }
        str = str.replace(/\[/g,'<font color="#E0A44A">').replace(/\]/g,'<\/font>')
        this.setHtml(this.tipTxt,str);
	wx4_function(5546);
        this.textIndex ++;
        if(this.textIndex > this.textIn.length)
        {
            this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
            this.testAnyClickShow_8962();
        }
    }
	private wx4_functionX_45874(){console.log(2210)}

    public hide(){
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this.anyClick)
        this.handStop_8545();
    }
	private wx4_functionX_45875(){console.log(137)}

    public showHand(mc){
        var rect = mc.getBounds();
        var p1 = mc.localToGlobal(rect.x, rect.y);
        var p2 = mc.localToGlobal(rect.x + rect.width, rect.y + rect.height);

        this.handMC.x = p1.x + (p2.x - p1.x) / 2
        this.handMC.y = p2.y//p1.y + (p2.y - p1.y) / 2
        GameManager_wx4.container.addChild(this.handMC);
	wx4_function(6327);
        this.handMC.visible = true;
        this.handMC.rotation = 0;
        this.handMove_2126();
    }
    public hideHand(){
        this.handStop_8545();
	wx4_function(4282);
        MyTool.removeMC(this.handMC);
    }


    public show(dataIn){

	wx4_function(151);


        var mc = this.mc = dataIn.mc;
        var text = dataIn.text;
        var fun = dataIn.fun;
        var hideHand = dataIn.hideHand;
	wx4_function(6614);
        var toBottom = dataIn.toBottom;
        this.addChild(this.handMC);
        this.handStop_8545();
        this.nearMC = dataIn.nearMC;
        this.tipTxt.text = '';
        this.tipTxt.removeEventListener(egret.Event.ENTER_FRAME,this.onText,this)
        egret.callLater(function(){
            GameManager_wx4.container.addChild(this);
	wx4_function(4230);
            this.height = GameManager_wx4.stage.stageHeight;
            this.tipTxt.text = '';
            this.clickFun = fun;

            this.anyClick.visible = false;
            this.anyClick.anchorOffsetX = 0;
	wx4_function(8145);
            egret.Tween.removeTweens(this.anyClick);
            //this.anyClick.visible = fun != null;

            //if(GuideManager.getInstance().guideStep == 1)
            //{
                this.tipsGroup.alpha = 1;
                this.showText(text);
            //}
            //else
            //{
            //    this.tipsGroup.alpha = 0;
            //    var tw:egret.Tween = egret.Tween.get(this.tipsGroup);
            //    tw.wait(200).to({alpha:1},200).call(function(){
            //        this.showText(text);
            //    },this)
            //}

            if(mc)
            {
                if(mc instanceof egret.Rectangle)
                {
                    //this.setBG(mc.x,mc.y,mc.width,mc.height,fun == null);
                    var p1:any = new egret.Point(mc.x,mc.y)
                    var p2:any = new egret.Point(mc.x + mc.width,mc.y + mc.height)
                }
                else
                {
                    var rect = mc.getBounds();
	wx4_function(8890);
                    rect.x += mc.anchorOffsetX
                    rect.y += mc.anchorOffsetY
                    var p1 = mc.localToGlobal(rect.x,rect.y);
                    var p2 = mc.localToGlobal(rect.x + rect.width,rect.y + rect.height);


                }
                //console.log(p1,p2)
	wx4_function(5795);
                this.setBG(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y,fun == null);
                if(toBottom)
                    this.tipsGroup.y = GameManager_wx4.stage.stageHeight - this.tipsGroup.height - toBottom;
                //if(fun == null)
                //    mc.once(egret.TouchEvent.TOUCH_TAP,this.hide, this);


                this.handMC.visible = !hideHand;
	wx4_function(1318);
                var toX = p1.x + (p2.x-p1.x)/2;
                var toY = p2.y + 20
                var toRotation = 0
                if(this.tipsGroup.y < toY) //指针在下半屏
                {
                    toRotation = 180
                    toY = p1.y - 20
                }
                if(this.handMC.visible)
                {
                    //this.showHand(mc);
                    if(this.handMC.x == 0 && this.handMC.y == 0)
                    {
                        this.handMC.x = toX;
	wx4_function(9924);
                        this.handMC.y = toY;
                        this.handMC.rotation = toRotation;
                        this.handMove_2126();
                    }
                    else
                    {
                        if(this.handMC.rotation == toRotation && toX == this.handMC.x && toY == this.handMC.y)
                        {
                            toRotation += 360;
	wx4_function(1611);
                        }
                        var tw:egret.Tween = egret.Tween.get(this.handMC);
                        tw.to({x:toX,y:toY,rotation:toRotation},200).call(this.handMove_2126,this)
                    }
                }
            }
            else
            {
                this.setBG(320,GameManager_wx4.stage.stageHeight/2,0,0,fun == null);
	wx4_function(6021);
                this.handMC.visible = false;
            }

            dataIn.showFun && dataIn.showFun();

        },this)

    }
	private wx4_functionX_45876(){console.log(6850)}

    public setBG(x,y,width,height,itemClick?){
        var x2 = 640-x-width;
        var y2 = GameManager_wx4.stage.stageHeight - y-height
        var borderWidth = Math.max(x,y,x2,y2)

        //this.tipsBg.strokeWeight = borderWidth
        //this.tipsBg.width = borderWidth*2 + width;
        //this.tipsBg.height = borderWidth*2 + height;
        //this.tipsBg.x =  -(borderWidth - x)
        //this.tipsBg.y =  -(borderWidth - y)
	wx4_function(4614);


        this.topRect.height = Math.max(0,y);
        this.leftRect.width = Math.max(0,x);
        this.rightRect.width = Math.max(0,x2);
        this.bottomRect.height = Math.max(0,y2);
	wx4_function(2706);

        this.leftRect.height = this.rightRect.height = height
        this.leftRect.y = this.rightRect.y = y
        //this.rightRect.width = Math.max(0,x2);

        if(itemClick)
        {
            MyTool.removeMC(this.stopClickGroup)

            //this.topRect.height = Math.max(0,y);
            //this.leftRect.width = Math.max(0,x);
            //this.rightRect.width = Math.max(0,x2);
            //this.bottomRect.height = Math.max(0,y2);
	wx4_function(5100);
            this.touchEnabled = false;
        }
        else
        {
            this.addChild(this.stopClickGroup);
            this.touchEnabled = true;
	wx4_function(9577);
        }


        if(height == 0)
        {
            this.tipsGroup.y = (GameManager_wx4.stage.stageHeight - this.tipsGroup.height)/5*2
        }
        else if(y2 > y)//点在上方
        {
            this.tipsGroup.y = (y2 - this.tipsGroup.height)/2 + y + height
            if(this.nearMC)
                this.tipsGroup.y = this.leftRect.height + this.leftRect.y;
	wx4_function(9497);
        }
        else
        {
            this.tipsGroup.y = (y-this.tipsGroup.height)/2 + 10;
            if(this.nearMC)
                this.tipsGroup.y = this.leftRect.y - this.tipsGroup.height - 10;
	wx4_function(2637);
        }


    }

    public setTips(str){

    }
	private wx4_functionX_45877(){console.log(1711)}



}
