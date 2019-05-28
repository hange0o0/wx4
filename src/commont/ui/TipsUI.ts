class TipsUI extends game.BaseContainer_wx4{
	private static instancePool = [];
	private static showTips = [];
	public static getInstance() {
		var instance = this.instancePool.pop()
		if (!instance)
			instance = new TipsUI();
		return instance;
	}
	private wx4_functionX_46066(){console.log(3002)}

    private text: eui.Label;

	private timer;
	public toY

	private wx4_functionX_46067(){console.log(7124)}
	public constructor() {
		super();
		this.skinName = 'TipsUISkin';
		this.touchChildren = this.touchEnabled = false;
	}

	private wx4_functionX_46068(){console.log(3657)}
	public show(v?,cd?){
		for(var i=0;i<TipsUI.showTips.length;i++)
		{
			var item =  TipsUI.showTips[i];
			item.toY -= 70
			egret.Tween.removeTweens(item);
	wx4_function(8109);
			var tw = egret.Tween.get(item);
			tw.to({y:item.toY},Math.abs(item.toY - item.y)*2);
		}
		TipsUI.showTips.push(this)
		egret.clearTimeout(this.timer);

	wx4_function(1437);

		//this.verticalCenter = 0;
		GameManager_wx4.stage.addChild(this);
		MyTool.setColorText(this.text,v);
		//if(this.text.numLines > 1)
		//	this.text.textAlign = 'left'
		//else
		//	this.text.textAlign = 'center'
		this.visible = false
		this.timer = egret.setTimeout(this.onTimer_2483,this,cd + (TipsUI.showTips.length-1)*100);
		egret.setTimeout(function(){
			this.visible = true
		},this,(TipsUI.showTips.length-1)*100);
	wx4_function(2517);

		this.validateNow();
		this.x =  (GameManager_wx4.stage.stageWidth -this.width)/2
		this.y =  GameManager_wx4.stage.stageHeight * 0.2;
		this.toY =  this.y;
	}
	private wx4_functionX_46069(){console.log(4515)}

	private onTimer_2483(){
		this.hide();
	}

	public hide(){
		egret.clearTimeout(this.timer);
	wx4_function(9925);
		MyTool.removeMC(this);
		PopUpManager.testShape();
		TipsUI.instancePool.push(this)
		var index = TipsUI.showTips.indexOf(this)
		if(index != -1)
			TipsUI.showTips.splice(index,1)
	}
	private wx4_functionX_46070(){console.log(9273)}


}
