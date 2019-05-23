class GunManager extends egret.EventDispatcher {
    private static _instance:GunManager;
    public static getInstance() {
        if (!this._instance) this._instance = new GunManager();
        return this._instance;
    }

    public maxGunNum = 9
    public maxGunLevel = 8

    public getGunVOs(id){
        var typeObj = {};
        if(id < 100)
        {
            var vo = GunVO.getObject(id)
            typeObj[vo.type] = vo;
        }
        return typeObj
    }

    public getGunByPos(index){
        return UM.gunPos[index];
    }

    public getPosByGun(gunid){
        for(var s in UM.gunPos)
        {
            if(UM.gunPos[s] == gunid)
                return parseInt(s);
        }
        return 0
    }

    public addGun(gunid,pos){
        var lastPos = this.getPosByGun(gunid);
        if(lastPos)
            UM.gunPos[lastPos] = UM.gunPos[pos];
        this.removeGun(gunid);
        UM.gunPos[pos] = gunid;
        EM.dispatch(GameEvent.client.GUN_CHANGE)
        UM.needUpUser = true;
    }

    public removeGun(gunid){
       var pos = this.getPosByGun(gunid);
        if(pos)
        {
            UM.gunPos[pos] = 0;
            EM.dispatch(GameEvent.client.GUN_CHANGE)
            UM.needUpUser = true;
        }
    }

    public getGunLevel(gunid){
         return UM.gunLevel[gunid] || (GunVO.getObject(gunid).open == 0?1:0);
    }

    public getGunCost(gunid){
        var vo = GunVO.getObject(gunid);
        var level = this.getGunLevel(gunid);
        return Math.floor(Math.pow(level+2.3,1.8)*(vo.open*0.75+3)*5/10)*10
    }

    //解锁位置花费
    public getPosCost(){
        var pos = UM.gunPosNum + 1;
        return 500*Math.floor(Math.pow(pos-3,2.5))
    }

    public unlockPos(){
        UM.addCoin(-this.getPosCost())
        UM.gunPosNum ++;
        EM.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('upgrade')
        UM.needUpUser = true;
    }

    public levelUpGun(gunid){
        UM.addCoin(-this.getGunCost(gunid))
        UM.gunLevel[gunid] = this.getGunLevel(gunid) + 1;
        EM.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('buy')
        UM.needUpUser = true;
    }

    public getUnlock(){
        for(var s in GunVO.data)
        {
            if(GunVO.data[s].open < UM.level && !this.getGunLevel(s))
            {
                return s;
            }
        }
        return false;
    }

    public getMyGunList(){
        var arr = [];
        for(var s in GunVO.data)
        {
            if(this.getGunLevel(s))
            {
                arr.push(GunVO.data[s].id)
            }
        }
        return arr;
    }

    public getGunAtk(gunid,lv?){
        lv = lv || this.getGunLevel(gunid) || 1;
        return Math.floor(GunVO.getObject(gunid).atk *(1 + (lv-1)*0.3))
    }
}