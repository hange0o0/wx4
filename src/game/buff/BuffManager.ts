class BuffManager {
    private static _instance:BuffManager;
    public static getInstance():BuffManager {
        if (!this._instance)
            this._instance = new BuffManager();
        return this._instance;
    }

    public buffHp = 50
    public buffWork = 10

    public getUserNum(){
        return Math.min(100,UM.shareUser.length)
    }

    public getHpAdd(){
        return this.getUserNum()*this.buffHp
    }

    public getCoinAdd(){
        return this.getUserNum()*this.buffWork
    }


}