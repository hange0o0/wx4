class GunManager extends egret.EventDispatcher {
    private static _instance:GunManager;
    public static getInstance() {
        if (!this._instance) this._instance = new GunManager();
        return this._instance;
    }

    public maxGunNum = 9

    public getGunByPos(index){
        //if(index%2 == 0)
        //    return 0
        return 1;
    }
}