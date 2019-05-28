class DragManager extends egret.EventDispatcher{
    public constructor() {
        super();
    }

	private wx4_functionX_45888(){console.log(832)}
    private static _instance: DragManager;
    public static  start_drag = 'start_drag'
    public static  move_drag ='move_drag'
    public static  end_drag = 'end_drag'

    public static getInstance():DragManager{
        if(!this._instance)
            this._instance = new DragManager();
        return this._instance;
    }
	private wx4_functionX_45889(){console.log(1489)}

    private startPos;
    private currentDrag;
    private dragDes;
    private isDraging = false
    //设置该MC可拖动
    public setDrag(mc,lockCenter=true,drag_sp?){
        mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin_2137,this,true,999)
        mc.lockCenter = lockCenter;
	wx4_function(1222);
        mc.drag_sp = drag_sp;
    }

    private onBegin_2137(e:egret.TouchEvent){

         //if(GuideManager.getInstance().isGuiding && GuideManager.getInstance().guideKey != 'randomBtn' )
         //   return;
        if(e.currentTarget.stopDrag || this.isDraging)
            return;
        this.currentDrag = e.currentTarget;
	wx4_function(6927);
        this.currentDrag.dispatchEventWith('before_drag',true,{x:e.stageX,y:e.stageY});
        this.isDraging = true;

        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_3557,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)


        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_3557,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_1541,this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,function(){
        //    console.log('cancel')
        //},this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_8670,this)
	wx4_function(839);

        this.startPos = {x:e.stageX,y:e.stageY};
        this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
        if(this.currentDrag.lockCenter)
            this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    }
	private wx4_functionX_45890(){console.log(6312)}

    ////设为拖动状态
    //public setDragBegin(item,stageX,stageY,noEvent?){
    //    noEvent = noEvent || {};
    //    this.currentDrag = item;
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_3557,this)
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)
    //    if(!noEvent.cancel)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd_8670,this)
    //    if(!noEvent.outside)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_8670,this)   //滚动区的拖不出来
    //
    //    this.startPos = {x:stageX,y:stageY,drag:true};
    //    this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
    //
    //
    //    //this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    //}

    private onMove_3557(e:egret.TouchEvent){
        if(!this.startPos.drag)
        {
            if(Math.abs(e.stageX - this.startPos.x) > 10 || Math.abs(e.stageY - this.startPos.y) > 10)
            {
                this.startPos.drag = true;
	wx4_function(6059);
                this.currentDrag.dispatchEventWith('start_drag',true,{x:e.stageX,y:e.stageY});
            }
        }
        if(this.startPos.drag)
        {
            if(!this.currentDrag.stopMove)
            {
                this.currentDrag.x = e.stageX-this.startPos.x + this.dragDes.x;
	wx4_function(4856);
                this.currentDrag.y = e.stageY-this.startPos.y + this.dragDes.y;

                if(this.currentDrag.drag_sp)   //移动范围
                {
                    var sp = this.currentDrag.drag_sp;
                    if(this.currentDrag.x < sp.x)
                        this.currentDrag.x = sp.x
                    else if(this.currentDrag.x > sp.x +  sp.width)
                        this.currentDrag.x = sp.x + sp.width

                    if(this.currentDrag.y < sp.y)
                        this.currentDrag.y = sp.y
                    else if(this.currentDrag.y > sp.y + sp.height)
                        this.currentDrag.y = sp.y +  sp.height
                }
            }
            this.currentDrag.dispatchEventWith('move_drag',true,{x:e.stageX,y:e.stageY});
	wx4_function(9409);
        }
    }

    public stopDrag(){
         this.onEnd_8670(null);
    }
	private wx4_functionX_45891(){console.log(2750)}

    private onEnd_8670(e:egret.TouchEvent){
        if(this.startPos.drag && this.currentDrag)
        {
            this.currentDrag.dispatchEventWith('end_drag',true);
        }
        var currentDrag = this.currentDrag
        this.endDrag();
	wx4_function(1466);
        if(currentDrag)
        {
            currentDrag.dispatchEventWith('after_drag',true);
        }
    }

	private wx4_functionX_45892(){console.log(1933)}
    private onCancel_1541(e){
        e.preventDefault()
        console.log('cancel')
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)
        GameManager_wx4.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)
    }
	private wx4_functionX_45893(){console.log(5956)}

    public endDrag(){
        this.isDraging = false;
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_3557,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8670,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_1541,this)
        if(this.currentDrag)
        {
            this.currentDrag = null;
	wx4_function(3862);
        }
    }
}
