class EventManager_wx4 extends egret.EventDispatcher {
    
    private static _instance: EventManager_wx4;
    
    public static getInstance():EventManager_wx4{
        if(!EventManager_wx4._instance)
            EventManager_wx4._instance = new EventManager_wx4();
        return EventManager_wx4._instance;
    }
	private wx4_functionX_45894(){console.log(8412)}
        
	public constructor() {
        super();
	}
	public dispatch(type:string, data?:any){
        EventManager_wx4.getInstance().dispatchEventWith(type, false, data);
	wx4_function(3014);
	}
	public addEvent(type:string, func:Function, thisObj:any){
    	  EventManager_wx4.getInstance().addEventListener(type, func, thisObj);
	}
    public removeEvent(type: string, func: Function, thisObj: any) {
        EventManager_wx4.getInstance().removeEventListener(type, func, thisObj);
	wx4_function(7892);
    }

}

