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

        var maxCost = 100 + level*20;
        var stepCost = maxCost/Math.min(180,20 + level)/60; //每一帧增加的花费
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
        ArrayUtil.sortByField(monsterList,['cost','id'],[0,0]);
        var minRate = this.random();//出现小怪的机率
        var minRateAdd = 0.1 + this.random()*0.4;//出现小怪的机率
        var list = [];
        //list.push(103+'|' + step + '|' +50)

        var needAddBoss = level%5 == 0
        while(nowCost < maxCost)
        {
            while(monsterCost < nowCost)
            {
                if(this.random() < minRate)
                    var vo = monsterList[Math.floor(monsterList.length*this.random()*minRateAdd)]
                else
                    var vo = monsterList[Math.floor(monsterList.length*this.random())]
                list.push(vo.id+'|' + step + '|' + Math.floor(this.random()*100))
                monsterCost += vo.cost;
            }
            step++;
            nowCost += stepCost

            if(needAddBoss && nowCost/maxCost > 0.75)
            {
                needAddBoss = false;
                var bossNum = Math.ceil(level/50)
                if(bossNum == 1)
                    list.push((100 + Math.ceil(level/5))+'|' + step + '|' +50)
                else
                {
                    var bossObj = {};
                    var hh = (100/bossNum);
                    for(var i=0;i<bossNum;i++)
                    {
                        var bossid =  Math.ceil(Math.random()*10)
                        if(!bossObj[bossid])
                        {
                            list.push((100 + bossid)+'|' + step + '|' +Math.floor(this.random()*hh +hh*i))
                            bossObj[bossid] = true
                        }
                        else
                            i--;
                    }
                }
            }


        }
        return list.join(',')
    }




}