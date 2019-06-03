class DragManager extends egret.EventDispatcher{
    public constructor() {
        super();
    }

	private wx4_functionX_54583(){console.log(1142)}
    private static _instance: DragManager;
    public static  start_drag = 'start_drag'
    public static  move_drag ='move_drag'
    public static  end_drag = 'end_drag'

    public static getInstance():DragManager{
        if(!this._instance)
            this._instance = new DragManager();
        return this._instance;
    }
	private wx4_functionX_54584(){console.log(8582)}

    private startPos;
    private currentDrag;
    private dragDes;
    private isDraging = false
    //设置该MC可拖动
    public setDrag(mc,lockCenter=true,drag_sp?){
        mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin_1066,this,true,999)
        mc.lockCenter = lockCenter;
	wx4_function(4189);
        mc.drag_sp = drag_sp;
    }

    private onBegin_1066(e:egret.TouchEvent){

         //if(GuideManager.getInstance().isGuiding && GuideManager.getInstance().guideKey != 'randomBtn' )
         //   return;
        if(e.currentTarget.stopDrag || this.isDraging)
            return;
        this.currentDrag = e.currentTarget;
	wx4_function(189);
        this.currentDrag.dispatchEventWith('before_drag',true,{x:e.stageX,y:e.stageY});
        this.isDraging = true;

        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_1206,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)


        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_1206,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)
        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_8058,this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,function(){
        //    console.log('cancel')
        //},this)
        //this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_8634,this)
	wx4_function(8239);

        this.startPos = {x:e.stageX,y:e.stageY};
        this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
        if(this.currentDrag.lockCenter)
            this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    }
	private wx4_functionX_54585(){console.log(7661)}

    ////设为拖动状态
    //public setDragBegin(item,stageX,stageY,noEvent?){
    //    noEvent = noEvent || {};
    //    this.currentDrag = item;
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_1206,this)
    //    this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)
    //    if(!noEvent.cancel)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd_8634,this)
    //    if(!noEvent.outside)
    //        this.currentDrag.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd_8634,this)   //滚动区的拖不出来
    //
    //    this.startPos = {x:stageX,y:stageY,drag:true};
    //    this.dragDes = {x:this.currentDrag.x,y:this.currentDrag.y}
    //
    //
    //    //this.dragDes = {x:this.currentDrag.x + (e.localX -this.currentDrag.width/2),y:this.currentDrag.y + e.localY - this.currentDrag.height/2}
    //}

    private onMove_1206(e:egret.TouchEvent){
        if(!this.startPos.drag)
        {
            if(Math.abs(e.stageX - this.startPos.x) > 10 || Math.abs(e.stageY - this.startPos.y) > 10)
            {
                this.startPos.drag = true;
	wx4_function(2715);
                this.currentDrag.dispatchEventWith('start_drag',true,{x:e.stageX,y:e.stageY});
            }
        }
        if(this.startPos.drag)
        {
            if(!this.currentDrag.stopMove)
            {
                this.currentDrag.x = e.stageX-this.startPos.x + this.dragDes.x;
	wx4_function(2149);
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
	wx4_function(6903);
        }
    }

    public stopDrag(){
         this.onEnd_8634(null);
    }
	private wx4_functionX_54586(){console.log(8312)}

    private onEnd_8634(e:egret.TouchEvent){
        if(this.startPos.drag && this.currentDrag)
        {
            this.currentDrag.dispatchEventWith('end_drag',true);
        }
        var currentDrag = this.currentDrag
        this.endDrag();
	wx4_function(1795);
        if(currentDrag)
        {
            currentDrag.dispatchEventWith('after_drag',true);
        }
    }

	private wx4_functionX_54587(){console.log(7658)}
    private onCancel_8058(e){
        e.preventDefault()
        console.log('cancel')
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)
        GameManager_wx4.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)
    }
	private wx4_functionX_54588(){console.log(1164)}

    public endDrag(){
        this.isDraging = false;
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove_1206,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd_8634,this)
        GameManager_wx4.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancel_8058,this)
        if(this.currentDrag)
        {
            this.currentDrag = null;
	wx4_function(2666);
        }
    }
}
