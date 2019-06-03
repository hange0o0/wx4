class EventManager_wx4 extends egret.EventDispatcher {
    
    private static _instance: EventManager_wx4;
    
    public static getInstance():EventManager_wx4{
        if(!EventManager_wx4._instance)
            EventManager_wx4._instance = new EventManager_wx4();
        return EventManager_wx4._instance;
    }
	private wx4_functionX_54609(){console.log(3566)}
        
	public constructor() {
        super();
	}
	public dispatch(type:string, data?:any){
        EventManager_wx4.getInstance().dispatchEventWith(type, false, data);
	wx4_function(7912);
	}
	public addEvent(type:string, func:Function, thisObj:any){
    	  EventManager_wx4.getInstance().addEventListener(type, func, thisObj);
	}
    public removeEvent(type: string, func: Function, thisObj: any) {
        EventManager_wx4.getInstance().removeEventListener(type, func, thisObj);
	wx4_function(4685);
    }

}

