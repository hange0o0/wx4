class PlayManager extends egret.EventDispatcher {
    private static _instance:PlayManager;
    public static getInstance() {
        if (!this._instance) this._instance = new PlayManager();
        return this._instance;
    }

    public isEndLess = false;


    public randomSeed;
    public random(seedIn?){
        var seed = seedIn || this.randomSeed;
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
        if(!seedIn)
            this.randomSeed = rd * 100000000;
        return rd;
    }

    public getLevelMonster(level){
        this.randomSeed = level*1234567890;
        var maxCost = 200 + level*100;
        var stepCost = maxCost/Math.min(180,30 + level)/60; //每一帧增加的花费
        var nowCost = 0;
        var step = 0;
        var monsterCost = -10;
        var monsterList = [];
        var mlv = Math.ceil(level/3);
        for(var s in MonsterVO.data)
        {
             if(MonsterVO.data[s].level <= mlv)
             {
                 monsterList.push(MonsterVO.data[s])
             }
        }

        var list = [];
        while(nowCost < maxCost)
        {
            while(monsterCost < nowCost)
            {
                var vo = monsterList[Math.floor(monsterList.length*this.random())]
                list.push(vo.id+'|' + step + '|' + Math.floor(this.random()*100))
                monsterCost += vo.cost;
            }
            step++;
            nowCost += stepCost
        }
        return list.join(',')
    }


}