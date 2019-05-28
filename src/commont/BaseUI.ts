
module game {

    /**
    *  界面基类
	private wx4_functionX_45760(){console.log(1949)}
    */
    export class BaseContainer_wx4 extends eui.Component {
        
        
        public constructor(skinName?:string) {
            super();
	wx4_function(1707);
            
            if(skinName)
                this.skinName = skinName;
        }
                    
        public childrenCreated() {
        }
	private wx4_functionX_45761(){console.log(667)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx4_function(4696);
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
	private wx4_functionX_45762(){console.log(9517)}

                
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
	private wx4_functionX_45763(){console.log(8637)}
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
        }  
                
        /*
        * 给按钮添加事件  
	private wx4_functionX_45764(){console.log(4447)}
        * this.addBtnEvent(this.btn, this.btnClick);
        */ 
        public addBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any,stopAddSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,fun,thisObject || this);

	wx4_function(5483);
            var btnName = (btn['id'] || '').toLocaleLowerCase();
            if(!stopAddSound && (btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1))
                SoundManager.getInstance().addBtnClickEffect(btn);
        }

        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
	private wx4_functionX_45765(){console.log(4120)}

        /*
        * 给按钮移除事件  
        * this.removeBtnEvent(this.btn, this.btnClick);
        */ 
        public removeBtnEvent(btn: egret.DisplayObject, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
	wx4_function(6783);
        }

        public clearList(list:eui.List | Array<eui.List>){
            var lists:any = list;
            if(list instanceof eui.List){
                lists = [list];
	wx4_function(1372);
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
	wx4_function(5736);
        }
        
    }
    
    
    /**
    *  界面基类
    */
    export class BaseUI_wx4 extends game.BaseContainer_wx4 {
	private wx4_functionX_45766(){console.log(765)}
        
        public LoadFiles: Array<string>;//加载文件配置['party', 'js_xxxxx'];
        private isStartLoad: boolean = false;
        
        private static UIshowList: any = {};
        public BaseTypeList: Array<number> = [];//页面模块配置，主要用来控制全局调用
	private wx4_functionX_45767(){console.log(1880)}
        public isInitUI: boolean = true;//是否已经初始化完皮肤
        
        private _arguments: Array<any>;
        private sizeList: Array<any> = [];

        public isWindow: boolean = false;
	private wx4_functionX_45768(){console.log(4444)}
        public noMV: boolean = false;
        public isHideFlag:boolean = true;
        public canBGClose:boolean = false;


        public loadData = null;
	private wx4_functionX_45769(){console.log(9813)}
        public loadUI = null;

        public hideBehind = true;

        public showFinishFunList = []; //显示成功后回调的方法

	private wx4_functionX_45770(){console.log(9704)}
        private panelEvents: any = {};

        public isShowAD = false;
        public adBottom = 0;

        public baseX = 0
	private wx4_functionX_45771(){console.log(7563)}
        public baseY = 0

        public constructor(isWindow?:boolean) {
            super();
            this.isWindow = isWindow;
            if(!this.isWindow)
                GameManager_wx4.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
	wx4_function(8680);
        }
                    
                    
        public childrenCreated() {
            this.isInitUI = true;
            
            if(!this.isWindow)
                this.onResize(null);
	wx4_function(4008);
            
//            if(this.parent){
//                this.addEventListener(egret.Event.ENTER_FRAME,this.createComplete_6296,this);
//            }
        }
        private createComplete_6296(e:egret.Event){
            this.removeEventListener(egret.Event.ENTER_FRAME,this.createComplete_6296,this);
            if(this._arguments)
                this.onShow.apply(this,this._arguments);
            else
                this.onShow();
	wx4_function(3722);

            this.runShowFinish_5129();
        }

        private runShowFinish_5129(){
            while(this.showFinishFunList.length > 0)
            {
                this.showFinishFunList.shift()();
	wx4_function(8771);
            }
        }

        public addShowFinishFun(fun){
            this.showFinishFunList.push(fun);
        }
	private wx4_functionX_45772(){console.log(6649)}
                    
        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
        }
                    
        /*public show(){
        eui.PopUpManager.addPopUp(this,true);
	wx4_function(3864);
        this.verticalCenter = -700;
        egret.Tween.get(this).to({verticalCenter:0} , 500 , egret.Ease.backOut);
                            
        }*/

        public addPanelOpenEvent(type:string, callBack:Function){
            this.panelEvents[type] = callBack;
	wx4_function(4562);
            EM_wx4.addEvent(type, callBack, this);
        }
            
        public addListenerSizeY(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"y"});
	wx4_function(7420);
            }
        }
        public addListenerSizeH(list:Array<any>):void{
            while(list.length > 0){
                this.sizeList.push({ui:list.pop(), type:"h"});
            }
        }
	private wx4_functionX_45773(){console.log(7885)}

        public resizeFun(){

        }
        public onVisibleChange(){

        }
	private wx4_functionX_45774(){console.log(9338)}

        public onResize(e:Event):void{
//            console.log(GameManager.stage.stageWidth, GameManager.stage.stageHeight)
//            console.log(GameManager.stage.width, GameManager.stage.height)
            this.height = GameManager_wx4.uiHeight;
            var item: any;
            for(var i = 0;i < this.sizeList.length; i++){
                /*
                item = this.sizeList[i];
	wx4_function(4065);
                if(item.type == "h"){
                    item.ui.height = GameManager.stage.stageHeight - item.ui.y;
                }
                else if(item.type == "y"){
                    item.ui.y = GameManager.stage.stageHeight - item.ui.height;
                }*/
            }

	wx4_function(4821);
            this.scrollRect = new egret.Rectangle(0,0, GameManager_wx4.uiWidth, GameManager_wx4.uiHeight);
            if(GameManager_wx4.isLiuHai())
                this.y = 50
            else
                this.y = 0;
            //this.y = (GameManager.stage.stageHeight - GameManager.uiHeight)/2

            if(this.parent)
                this.resizeFun();
	wx4_function(6648);
        }
            
        public cacheFunArguments(...argument:any[]):void{
            this._arguments = argument;
        }
                            
	private wx4_functionX_45775(){console.log(6155)}
        public onShow(...argument:any[]):any{
            return this;      
        }
                        
                        		
        public show():any{

            if(this.LoadFiles && this.LoadFiles.length > 0){
                if(this.isStartLoad) return;
                this.isStartLoad = true;
	wx4_function(6469);
                LoadingFile.getInstance().loadGroup(this.LoadFiles, this.showFun_9662, this,this.loadUI,this.loadData);
                this.LoadFiles = [];
                return;
            }
            this.showFun_9662();
            
            return this;
        }
	private wx4_functionX_45776(){console.log(2258)}

        //public showToTop(){
        //    if(this.stage)
        //        PopUpManager.addPopUp(this,this.isWindow);
        //}

        
        private showFun_9662():void{
            this.isStartLoad = false;
            
            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx4_function(2535);
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
	wx4_function(7675);
            PopUpManager.addPopUp(this,this.isWindow,this.noMV);
            
            if(this.isInitUI){
                this.isHideFlag = false
                if(this._arguments)
                    this.onShow.apply(this,this._arguments);
                else
                    this.onShow();
	wx4_function(2294);

                this.runShowFinish_5129();
            }
            BaseUI_wx4.setStopEevent();
        }

	private wx4_functionX_45777(){console.log(1829)}
        public isHide():boolean{
            return this.isHideFlag
        }
                    
        public hide():any{
            this.beforeHide();
	wx4_function(5333);

            for(var key in this.panelEvents){
                EM_wx4.removeEvent(key, this.panelEvents[key], this);
            }

            if(this.BaseTypeList){
                for(var i=0; i<this.BaseTypeList.length; i++){
                    var _type = this.BaseTypeList[i];
	wx4_function(7483);
                    var list = BaseUI_wx4.UIshowList[ _type ];
                    if( list ){
                        for(var j=list.length - 1; j>=0; j--){
                            if(list[j] == self)
                                list.splice(j, 1);
                        }
                    }
                }
            }

	wx4_function(1247);
            this.isHideFlag = true;
            //1102
//            eui.PopUpManager.removePopUp(this);
//            this.validateSkinState();
            PopUpManager.removePopUp(this);
            return this;
        }
        
        private onAddToStage_9248(event:egret.Event) {
            console.log(222);
	wx4_function(2447);
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
	private wx4_functionX_45778(){console.log(2877)}
        
        //用来记录和判断一个界面打开后 禁止马上响应交互事件（最常见的是触摸屏幕关闭界面）
        private static openTime: number;
        public static get isStopEevent():boolean{
            return (Date.now() - BaseUI_wx4.openTime < 400); //面板打开后500秒内不响应交互事件（触摸、单击） 
        }
        
	private wx4_functionX_45779(){console.log(9550)}
        public static setStopEevent() {
            BaseUI_wx4.openTime = Date.now();
        }
        
        public paySound(key:string, delay?:number):void{
            
        }
	private wx4_functionX_45780(){console.log(7565)}



        public beforeHide(){

        }
	private wx4_functionX_45781(){console.log(4526)}
                
    }
    
    /**
    *  界面基类
    */
    export class BaseWindow_wx4 extends game.BaseUI_wx4 {
	private wx4_functionX_45782(){console.log(9984)}

        public constructor() {
            super(true);
            this.canBGClose = true;
        }

	private wx4_functionX_45783(){console.log(4559)}
        public setTitle(title,h?){
            var bg:any = this.getChildAt(0)
            bg.setTitle(title);
            bg.relateMC = this;
            //if(h)
            //    bg.setBottomHeight(h);
        }
    }
    
    export class BaseItem extends eui.ItemRenderer {
	private wx4_functionX_45784(){console.log(6276)}
        public constructor() {
            super();

        }

        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
	wx4_function(148);
            instance.id = partName;

            //赋予btn图片按钮的行为
            if(instance instanceof eui.Image) {
                if(partName.toLowerCase().indexOf("btn") > -1) {
                }else{
                    instance.touchEnabled = false;
	wx4_function(5235);
                }
            }
            else if(instance instanceof eui.Label){ //label不可交互
                instance.touchEnabled = false;
            }
        }
	private wx4_functionX_45785(){console.log(8181)}
        
        /*
        * 设置html  
        * this.setHtml(this.txt,"<font color=0xff0000>五23424</font>");
        */ 
        public setHtml(txt:eui.Label, str:string):void{
            txt.textFlow = new egret.HtmlTextParser().parser(str);
	wx4_function(7236);
        }
                        
        /*
        * 给按钮添加事件
        * this.addBtnEvent(this.btn, this.btnClick);
        */
	private wx4_functionX_45786(){console.log(1485)}
        public addBtnEvent(btn:eui.UIComponent, fun:any,stopSound?):void{
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);

            if(!stopSound)
            {
                var btnName = (btn['id'] || '').toLocaleLowerCase();
	wx4_function(5910);
                if(btnName.indexOf('btn')!=-1 || btnName.indexOf('button')!=-1)
                    SoundManager.getInstance().addBtnClickEffect(btn);
            }

        }

	private wx4_functionX_45787(){console.log(1364)}
        public createHtml(str:string | number, color?:number, size?:number):string{
            return MyTool.createHtml(str,color,size);
        }
        /*
        * 给按钮移除事件
        * this.removeBtnEvent(this.btn, this.btnClick);
	private wx4_functionX_45788(){console.log(1514)}
        */
        public removeBtnEvent(btn:eui.UIComponent, fun:any, thisObject?:any):void{
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, thisObject || this);
        }
                
    }

}
