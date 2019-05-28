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
        return UM_wx4.gunPos[index];
    }

    public getPosByGun(gunid){
        for(var s in UM_wx4.gunPos)
        {
            if(UM_wx4.gunPos[s] == gunid)
                return parseInt(s);
        }
        return 0
    }

    public addGun(gunid,pos){
        var lastPos = this.getPosByGun(gunid);
        if(lastPos)
            UM_wx4.gunPos[lastPos] = UM_wx4.gunPos[pos];
        this.removeGun(gunid);
        UM_wx4.gunPos[pos] = gunid;
        EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        UM_wx4.needUpUser = true;
    }

    public removeGun(gunid){
       var pos = this.getPosByGun(gunid);
        if(pos)
        {
            UM_wx4.gunPos[pos] = 0;
            EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
            UM_wx4.needUpUser = true;
        }
    }

    public getGunLevel(gunid){
         return UM_wx4.gunLevel[gunid] || (GunVO.getObject(gunid).open == 0?1:0);
    }

    public getGunCost(gunid){
        var vo = GunVO.getObject(gunid);
        var level = this.getGunLevel(gunid);
        return Math.floor(Math.pow(level+2.3,1.8)*(vo.open*0.75+3)*5/10)*10
    }

    //解锁位置花费
    public getPosCost(){
        var pos = UM_wx4.gunPosNum + 1;
        return 500*Math.floor(Math.pow(pos-3,2.5))
    }

    public unlockPos(){
        UM_wx4.addCoin(-this.getPosCost())
        UM_wx4.gunPosNum ++;
        EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('upgrade')
        UM_wx4.needUpUser = true;
    }

    public levelUpGun(gunid){
        UM_wx4.addCoin(-this.getGunCost(gunid))
        var isNew = !UM_wx4.gunLevel[gunid];
        UM_wx4.gunLevel[gunid] = this.getGunLevel(gunid) + 1;
        if(isNew)
            EM_wx4.dispatch(GameEvent.client.GUN_UNLOCK)
        else
            EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('buy')
        UM_wx4.needUpUser = true;
    }

    public getUnlockGun(){
        for(var s in GunVO.data)
        {
            if(GunVO.data[s].open < UM_wx4.level && !this.getGunLevel(s))
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