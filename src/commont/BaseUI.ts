
module game {

    /**
    *  界面基类
	private wx4_functionX_54464(){console.log(5210)}
    */
    export class BaseContainer_wx4 extends eui.Component {
        
        
        public constructor(skinName?:string) {
            super();
	wx4_function(1260);
            
            if(skinName)
                this.skinName = skinName;
        }
                    
        public childrenCreated() {
        }
	private wx4_functionX_54465(){console.log(3640)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx4_function(6524);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
        //
        //public getImg(name:string):eui.Image{
        //    return <eui.Image>this[name];
        //}
        //
        //public getLabel(name: string): eui.Label {
        //    return <eui.Label>this[name];
        //}
        //
        //public getText(name: string): egret.TextField {
        //    return <egret.TextField>this[name];
        //}
        //
        //public getButton(name: string): eui.Button {
        //    return <eui.Button>this[name];
        //}
        //
        //public getItem(name: string): game.BaseItem {
        //    return <game.BaseItem>this[name];
        //}
	private wx4_functionX_54466(){console.log(4157)}

                
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
	private wx4_functionX_54467(){console.log(4564)}
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
        }  
                
        /*
        * 给按钮添加事件  
	private wx4_functionX_54468(){console.log(2257)}
        * this.addBtnEvent(this.btn, this.btnClick);
        */ 
        public addBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any,stopAddSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,fun,thisObject || this);

	wx4_function(8545);
            var btnName = (btn['id'] || '').toLocaleLowerCase();
            if(!stopAddSound && (btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1))
                SoundManager.getInstance().addBtnClickEffect(btn);
        }

        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
	private wx4_functionX_54469(){console.log(5199)}

        /*
        * 给按钮移除事件  
        * this.removeBtnEvent(this.btn, this.btnClick);
        */ 
        public removeBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
	wx4_function(2736);
        }

        public clearList(list:eui.List | Array<eui.List>){
            var lists:any = list;
            if(list instanceof eui.List){
                lists = [list];
	wx4_function(3866);
            }
            for(var key in lists){
                try{
                    lists[key].dataProvider = null;
                    //必现调用下面2句，并且 需要在hide之前调用
                    lists[key].dataProviderRefreshed();
                }
                catch(e){
                }
            }
            this.validateNow();
	wx4_function(4753);
        }
        
    }
    
    
    /**
    *  界面基类
    */
    export class BaseUI_wx4 extends game.BaseContainer_wx4 {
	private wx4_functionX_54470(){console.log(3520)}
        
        public LoadFiles: Array<string>;//加载文件配置['party', 'js_xxxxx'];
        private isStartLoad: boolean = false;
        
        private static UIshowList: any = {};
        public BaseTypeList: Array<number> = [];//页面模块配置，主要用来控制全局调用
	private wx4_functionX_54471(){console.log(1684)}
        public isInitUI: boolean = true;//是否已经初始化完皮肤
        
        private _arguments: Array<any>;
        private sizeList: Array<any> = [];

        public isWindow: boolean = false;
	private wx4_functionX_54472(){console.log(4578)}
        public noMV: boolean = false;
        public isHideFlag:boolean = true;
        public canBGClose:boolean = false;


        public loadData = null;
	private wx4_functionX_54473(){console.log(9803)}
        public loadUI = null;

        public hideBehind = true;

        public showFinishFunList = []; //显示成功后回调的方法

	private wx4_functionX_54474(){console.log(5379)}
        private panelEvents: any = {};

        public isShowAD = false;
        public adBottom = 0;

        public baseX = 0
	private wx4_functionX_54475(){console.log(4500)}
        public baseY = 0

        public constructor(isWindow?:boolean) {
            super();
            this.isWindow = isWindow;
            if(!this.isWindow)
                GameManager_wx4.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
	wx4_function(9005);
        }
                    
                    
        public childrenCreated() {
            this.isInitUI = true;
            
            if(!this.isWindow)
                this.onResize(null);
	wx4_function(2531);
            
//            if(this.parent){
//                this.addEventListener(egret.Event.ENTER_FRAME,this.createComplete_236,this);
//            }
        }
        private createComplete_236(e:egret.Event){
            this.removeEventListener(egret.Event.ENTER_FRAME,this.createComplete_236,this);
            if(this._arguments)
                this.onShow.apply(this,this._arguments);
            else
                this.onShow();
	wx4_function(1157);

            this.runShowFinish_1291();
        }

        private runShowFinish_1291(){
            while(this.showFinishFunList.length > 0)
            {
                this.showFinishFunList.shift()();
	wx4_function(2493);
            }
        }

        public addShowFinishFun(fun){
            this.showFinishFunList.push(fun);
        }
	private wx4_functionX_54476(){console.log(5404)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
        }
                    
        /*public show(){
        eui.PopUpManager.addPopUp(this,true);
	wx4_function(5151);
        this.verticalCenter = -700;
        egret.Tween.get(this).to({verticalCenter:0} , 500 , egret.Ease.backOut);
                            
        }*/

        public addPanelOpenEvent(type:string, callBack:Function){
            this.panelEvents[type] = callBack;
	wx4_function(9350);
            EM_wx4.addEvent(type, callBack, this);
        }
            
        public addListenerSizeY(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"y"});
	wx4_function(4580);
            }
        }
        public addListenerSizeH(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"h"});
            }
        }
	private wx4_functionX_54477(){console.log(8703)}

        public resizeFun(){

        }
        public onVisibleChange(){

        }
	private wx4_functionX_54478(){console.log(2617)}

        public onResize(e:Event):void{
//            console.log(GameManager.stage.stageWidth, GameManager.stage.stageHeight)
//            console.log(GameManager.stage.width, GameManager.stage.height)
            this.height = GameManager_wx4.uiHeight;
            var item: any;
            for(var i = 0;i < this.sizeList.length; i++){
                /*
                item = this.sizeList[i];
	wx4_function(5259);
                if(item.type == "h"){
                    item.ui.height = GameManager.stage.stageHeight - item.ui.y;
                }
                else if(item.type == "y"){
                    item.ui.y = GameManager.stage.stageHeight - item.ui.height;
                }*/
            }

	wx4_function(7052);
            this.scrollRect = new egret.Rectangle(0,0, GameManager_wx4.uiWidth, GameManager_wx4.uiHeight);
            if(GameManager_wx4.isLiuHai())
                this.y = 50
            else
                this.y = 0;
            //this.y = (GameManager.stage.stageHeight - GameManager.uiHeight)/2

            if(this.parent)
                this.resizeFun();
	wx4_function(827);
        }
            
        public cacheFunArguments(...argument:any[]):void{
            this._arguments = argument;
        }
                            
	private wx4_functionX_54479(){console.log(4770)}
        public onShow(...argument:any[]):any{
            return this;      
        }
                        
                        		
        public show():any{

            if(this.LoadFiles && this.LoadFiles.length > 0){
                if(this.isStartLoad) return;
                this.isStartLoad = true;
	wx4_function(8737);
                LoadingFile.getInstance().loadGroup(this.LoadFiles, this.showFun_2145, this,this.loadUI,this.loadData);
                this.LoadFiles = [];
                return;
            }
            this.showFun_2145();
            
            return this;
        }
	private wx4_functionX_54480(){console.log(1103)}

        //public showToTop(){
        //    if(this.stage)
        //        PopUpManager.addPopUp(this,this.isWindow);
        //}

        
        private showFun_2145():void{
            this.isStartLoad = false;
            
            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx4_function(2291);
                    if( !BaseUI_wx4.UIshowList[ _type ]){
                        BaseUI_wx4.UIshowList[ _type ] = [];
                    }
                    if(BaseUI_wx4.UIshowList[ _type ].indexOf(this) == -1)
                        BaseUI_wx4.UIshowList[ _type ].push(this);
                }
            }
            //1102
//            this.invalidateSkinState();
//            eui.PopUpManager.addPopUp(this,true);
	wx4_function(6566);
            PopUpManager.addPopUp(this,this.isWindow,this.noMV);
            
            if(this.isInitUI){
                this.isHideFlag = false
                if(this._arguments)
                    this.onShow.apply(this,this._arguments);
                else
                    this.onShow();
	wx4_function(3204);

                this.runShowFinish_1291();
            }
            BaseUI_wx4.setStopEevent();
        }

	private wx4_functionX_54481(){console.log(2789)}
        public isHide():boolean{
            return this.isHideFlag
        }
                    
        public hide():any{
            this.beforeHide();
	wx4_function(275);

            for(var key in this.panelEvents){
                EM_wx4.removeEvent(key, this.panelEvents[key], this);
            }

            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx4_function(2597);
                    var list = BaseUI_wx4.UIshowList[ _type ];
                    if( list ){
                        for(var j=list.length - 1; j>=0; j--){
                            if(list[j] == self)
                                list.splice(j, 1);
                        }
                    }
                }
            }

	wx4_function(5122);
            this.isHideFlag = true;
            //1102
//            eui.PopUpManager.removePopUp(this);
//            this.validateSkinState();
            PopUpManager.removePopUp(this);
            return this;
        }
        
        private onAddToStage_8765(event:egret.Event) {
            console.log(222);
	wx4_function(5907);
        }
        
        // 批量关闭UI， 用法：this.BaseTypeList = [1, 2];
        // 1xxxx 2xxxx
        public static hideType = function(type){
            var list = BaseUI_wx4.UIshowList[type];
            if(list){
                for(var i=list.length-1; i>=0; i--){
                    list[i].hide();
                }
            }
        }
	private wx4_functionX_54482(){console.log(9956)}
        
        //用来记录和判断一个界面打开后 禁止马上响应交互事件（最常见的是触摸屏幕关闭界面）
        private static openTime: number;
        public static get isStopEevent():boolean{
            return (Date.now() - BaseUI_wx4.openTime < 400); //面板打开后500秒内不响应交互事件（触摸、单击） 
        }
        
	private wx4_functionX_54483(){console.log(5832)}
        public static setStopEevent() {
            BaseUI_wx4.openTime = Date.now();
        }
        
        public paySound(key:string, delay?:number):void{
            
        }
	private wx4_functionX_54484(){console.log(6328)}



        public beforeHide(){

        }
	private wx4_functionX_54485(){console.log(1746)}
                
    }
    
    /**
    *  界面基类
    */
    export class BaseWindow_wx4 extends game.BaseUI_wx4 {
	private wx4_functionX_54486(){console.log(7826)}

        public constructor() {
            super(true);
            this.canBGClose = true;
        }

	private wx4_functionX_54487(){console.log(4869)}
        public setTitle(title,h?){
            var bg:any = this.getChildAt(0)
            bg.setTitle(title);
            bg.relateMC = this;
            //if(h)
            //    bg.setBottomHeight(h);
        }
    }
    
    export class BaseItem extends eui.ItemRenderer {
	private wx4_functionX_54488(){console.log(848)}
        public constructor() {
            super();

        }

        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
	wx4_function(3583);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx4_function(2136);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
	private wx4_functionX_54489(){console.log(3001)}
        
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
	wx4_function(2359);
        }
                        
        /*
        * 给按钮添加事件
        * this.addBtnEvent(this.btn, this.btnClick);
        */
	private wx4_functionX_54490(){console.log(7815)}
        public addBtnEvent(btn:eui.UIComponent, fun:any,stopSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);

            if(!stopSound)
            {
                var btnName = (btn['id'] || '').toLocaleLowerCase();
	wx4_function(7111);
                if(btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1)
                    SoundManager.getInstance().addBtnClickEffect(btn);
            }

        }

	private wx4_functionX_54491(){console.log(5983)}
        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
        /*
        * 给按钮移除事件
        * this.removeBtnEvent(this.btn, this.btnClick);
	private wx4_functionX_54492(){console.log(6140)}
        */
        public removeBtnEvent(btn:eui.UIComponent, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
        }
                
    }

}
