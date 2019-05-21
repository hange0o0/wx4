class PKCode_wx3 {
    private static instance:PKCode_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx3();
        return this.instance;
    }

    public myHp = 1000;
    public myHpMax = 1000;
    public hpAdd = 0;
    public coinAdd = 0;
    public wudiTime = 1000;
    public actionStep = 0;
    public monsterList = [];
    public wallArr = [];
    public autoList = [];
    public enemyHp = 0//
    public enemyHpMax = 0//
    public endLessStep = 0//无尽的步数

    public atkList = {}
    public buffList = {}

    public getWudiCD(){
        return Math.max(0,this.wudiTime - TM.nowMS())
    }

    public getBulletAtk(bid){
        var hp = this.atkList[bid].base + this.atkList[bid].add
        var add = 1;
        if(this.isInBuff(101))
            add -= 0.2
        if(this.isInBuff(106))
            add -= 0.2
        return Math.ceil(hp*add);
    }

    public isInBuff(id){
        return this.buffList[id];
    }


    public getItemByID(id):PKMonsterItem_wx3{
        for(var i=0;i<this.monsterList.length;i++)
        {
            var item = this.monsterList[i];
            if(item.id == id)
                return item;
        }

        for(var i=0;i<this.wallArr.length;i++)
        {
            var item = this.wallArr[i];
            if(item.id == id)
                return item;
        }
    }

    public randomEnemy(){
        var arr = []
        for(var i=0;i<this.monsterList.length;i++)
        {
            var item = this.monsterList[i];
            if(!item.isDie)
                arr.push(item)
        }
        return ArrayUtil.randomOne(arr);
    }

    public playAniOn(a,mvID){
        var atker = this.getItemByID(a)
        if(!atker)
        {
            throw new Error('XXX')
            return;
        }
        var scale = Math.max(1,(atker.getVO().height)/70);
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }

    public resetHP(){
        this.myHp = this.myHpMax = 500+BuffManager.getInstance().getHpAdd() + this.hpAdd;
    }

    //对一定范围内的敌人造成伤害
    public hitEnemyAround(x,y,range,hurt){
        for(var i=0;i<this.monsterList.length;i++)
        {
            var item = this.monsterList[i];
            if(item.isDie)
                continue;
            if(Math.abs(item.x - x) <= range &&  Math.abs(item.y - y) <= range)
            {
                item.addHp(-hurt);
            }
        }
    }


    public initData(){

        this.buffList = {};
        this.atkList = {};
        var addAtk = 0;
        this.hpAdd = 0
        this.coinAdd = 0
        for(var s in UM.gunPos)
        {
            var gunid = UM.gunPos[s];
            if(gunid)
            {
                var vos = GunManager.getInstance().getGunVOs(gunid);
                this.atkList[gunid] = {
                    base:GunManager.getInstance().getGunAtk(gunid),
                    add:0,
                }
                if(vos[6])
                {
                    addAtk += vos[6].getLevelValue(1)
                }
                if(vos[10])
                {
                   this.coinAdd = vos[10].getLevelValue(1)
                }
                if(vos[11])
                {
                    this.hpAdd = vos[11].getLevelValue(1)
                }
            }
        }
        if(addAtk)
        {
            for(var s in this.atkList)
            {
                this.atkList[s].add += this.atkList[s].base*(1+addAtk/100);
            }
        }
        this.resetHP();

        PKMonsterAction_wx3.getInstance().init();
        PKBulletManager_wx3.getInstance().freeAll();
        while(this.wallArr.length)
        {
            PKMonsterItem_wx3.freeItem(this.wallArr.pop())
        }
        while(this.monsterList.length)
        {
            PKMonsterItem_wx3.freeItem(this.monsterList.pop())
        }

        var wallDec = 70;
        var len = Math.ceil(GameManager.uiHeight/wallDec)
        for(var i=0;i<len;i++)
        {
            var wall = PKMonsterItem_wx3.createItem();
            wall.data = {mid:99};
            PKingUI.getInstance().getCon().addChild(wall);
            wall.y =i*wallDec+80
            wall.x =150
            this.wallArr.push(wall);
        }

        this.actionStep = 0;
        this.enemyHp = 0;
        if(PlayManager.getInstance().isEndLess)
        {
            this.endLessStep = 1;
            this.autoList = [];
            this.createEndLess();
        }
        else
        {
            var level = UM.level;
            var list = PlayManager.getInstance().getLevelMonster(level)
            var height = Math.min(300 + level*10,960)
            var startY = (GameManager.uiHeight - height)/2 + 30
            var hpRate = 1 + (level - 1)*0.1;

            this.autoList = list.split(',');
            for(var i=0;i<this.autoList.length;i++)
            {
                var temp = this.autoList[i].split('|')
                var mid = parseInt(temp[0]);
                var hp = Math.floor(MonsterVO.getObject(mid).hp * hpRate)
                this.autoList[i] = {
                    mid:mid,
                    hp:hp,
                    step:parseInt(temp[1]),
                    y:parseInt(temp[2])/100*height + startY
                }
                this.enemyHp += hp;
            }
            this.enemyHpMax = this.enemyHp;
        }

    }

    private createEndLess(){
        var maxCost = 100 + this.endLessStep * 50
        var stepCost = maxCost/10/60; //每一帧增加的花费
        var nowCost = 0;
        var step = this.actionStep;
        var monsterCost = -10;
        var monsterList = [];
        var mlv = Math.ceil(this.endLessStep/2);
        for(var s in MonsterVO.data)
        {
            if(MonsterVO.data[s].level <= mlv)
            {
                monsterList.push(MonsterVO.data[s])
            }
        }
        ArrayUtil.sortByField(monsterList,['cost','id'],[0,0]);

        var minRate = Math.random();//出现小怪的机率
        var minRateAdd = 0.1 + Math.random()*0.4;//出现小怪的机率
        var hpRate = 1 + (this.endLessStep - 1)*0.1;
        var height = Math.min(300 + this.endLessStep*10,960)
        var startY = (GameManager.uiHeight - height)/2 + 30
        var needAddBoss = this.endLessStep%5 == 0
        while(nowCost < maxCost)
        {
            while(monsterCost < nowCost)
            {
                if(minRate > Math.random())
                    var vo = monsterList[Math.floor(monsterList.length*Math.random()*minRateAdd)]
                else
                    var vo = monsterList[Math.floor(monsterList.length*Math.random())]
                monsterCost += vo.cost;
                this.autoList.push({
                    mid:vo.id,
                    hp:Math.floor(vo.hp * hpRate),
                    step:step,
                    y:Math.random()*height + startY
                })
            }
            step++;
            nowCost += stepCost

            if(needAddBoss && nowCost/maxCost > 0.75)
            {
                needAddBoss = false;
                var bossNum = Math.ceil(this.endLessStep/50)
                if(bossNum == 1)
                    var bvo = MonsterVO.getObject(100 + Math.ceil(this.endLessStep/5))
                else
                    var bvo = MonsterVO.getObject(100 + Math.ceil(Math.random()*10))
                this.autoList.push({
                    mid:bvo.id,
                    hp:Math.floor(bvo.hp * hpRate),
                    step:step,
                    y:0.5*height + startY
                })
            }
        }
        this.endLessStep ++;
    }

    //每一步执行
    public onStep(){
        this.actionStep ++;
        this.autoAction();
        this.monsterAction();
        this.monsterMove();
        PKMonsterAction_wx3.getInstance().actionAtk();//攻击落实
        PKBulletManager_wx3.getInstance().actionAll();//攻击落实
        this.actionFinish();
    }

    //自动出战上怪
    public autoAction(){
        var b = false
        if(PlayManager.getInstance().isEndLess && this.autoList.length == 0)
        {
            this.createEndLess();
        }
         while(this.autoList[0] && this.autoList[0].step <= this.actionStep)
         {
             b = true;
             var oo = this.autoList.shift();
             var monster = PKMonsterItem_wx3.createItem();
             PKingUI.getInstance().addMonster(monster)
             monster.data = oo;
             monster.y = oo.y
             monster.x = 680
             this.monsterList.push(monster);

             //设攻击目标
             var nearWall:any = null;
             var nearDis = 0;
             for(var i=0;i<this.wallArr.length;i++)
             {
                 var wall = this.wallArr[i];
                 var dis = Math.abs(wall.y - monster.y);
                 if(!nearWall || dis < nearDis)
                 {
                     nearWall = wall
                     nearDis = dis
                 }

             }
             monster.target = nearWall;

             if(MonsterVO.getObject(oo.mid).isHero())
             {
                 if(!this.buffList[oo.mid])
                     this.buffList[oo.mid] = [];
                 this.buffList[oo.mid].push(monster.id);
                 if(this.buffList[oo.mid].length == 1)
                    EventManager.getInstance().dispatch(GameEvent.client.ADD_BOSS,oo.mid)
                 else
                    EventManager.getInstance().dispatch(GameEvent.client.ADD_BOSS)
             }
         }

        if(b)
        {
            ArrayUtil.sortByField(this.monsterList,['y'],[0]);
            for(var i=0;i<this.monsterList.length;i++)
            {
                MyTool.upMC(this.monsterList[i]);
            }
        }

    }

    private getStepByTime(t){
        return Math.round(t*60/1000)
    }

    //怪出手
    public monsterAction(){
        if(this.myHp <= 0)
            return;
        for(var i=0;i<this.monsterList.length;i++)
        {
            var target:PKMonsterItem_wx3 = this.monsterList[i]
            if(target.isDie)
                continue;
            target.onE();

            if(target.stop)
                continue;
            if(target.yunStep)
                continue;


            if(target.x < target.getVO().getAtkDis() + 200)//普攻
            {
                  this.targetAtk(target);
            }
        }
    }

    private targetAtk(target){
        target.atk();
        target.stop = 1;
        //前摇结束
        var id = target.id;
        PKMonsterAction_wx3.getInstance().addList({
            step:Math.floor(this.getStepByTime(target.getVO().mv_atk)*target.getSpeedRate()),
            id:id,
            target:target,
            fun:()=>{
                if(target.isDie)
                    return;
                var step = this.getStepByTime(target.getVO().atkrage*5);
                if(target.mid == 103)
                    step = 10;
                step = Math.floor(step*target.getSpeedRate());
                AtkMVCtrl_wx3.getInstance().mAtkMV(target.mid,target,step);//飞行动画

                PKMonsterAction_wx3.getInstance().addList({  //攻击生效
                    step:step,
                    id:id,
                    target:target,
                    fun:()=>{
                        if([61,62,63,70,76].indexOf(target.mid) != -1)
                            target.setDie();
                        if(!this.getWudiCD())
                            this.addHp(-target.getAtk())
                        if(this.myHp > 0)
                            target.target.atk();
                        //console.log(this.myHp)

                    }
                })
            }
        })

        //僵直结束
        PKMonsterAction_wx3.getInstance().addList({
            step:Math.floor(this.getStepByTime(target.getVO().atkcd)*target.getSpeedRate()),
            id:id,
            target:target,
            fun:()=>{
                target.stop=0;
            }
        })
    }

    public addHp(v){
        this.myHp += v
        if(this.myHp > this.myHpMax)
            this.myHp = this.myHpMax
        EM.dispatch(GameEvent.client.HP_CHANGE)
    }
    public addAtk(id,v){
        this.atkList[id].add += v;
    }

    //怪移动
    public monsterMove(){
        if(this.myHp <= 0)
            return;
        for(var i=0;i<this.monsterList.length;i++)
        {
            var target:PKMonsterItem_wx3 = this.monsterList[i]
            if(target.isDie)
                continue;
            if(target.stop)
                continue;
            if(target.yunStep)
                continue;
            target.run();
        }
    }

    //一轮操作结束,移队死，过线的，结算,清除BUFF
    public actionFinish(){
        //BUFF效果
        if(this.actionStep%60 == 0)
        {
            if(this.isInBuff(107))
            {
                for(var i=0;i<this.monsterList.length;i++)
                {
                    var target = this.monsterList[i]
                    if(!target.isDie) //死的
                    {
                        target.addHp(Math.ceil(target.maxHp*0.02))
                    }
                }
            }
            if(this.isInBuff(108))
            {
                if(!this.getWudiCD())
                    this.addHp(-Math.ceil(this.myHpMax*0.02))
            }
        }



        for(var i=0;i<this.monsterList.length;i++)
        {
            var target = this.monsterList[i]
            if(target.isDie==2) //死的
            {

                if(MonsterVO.getObject(target.data.mid).isHero())
                {
                    var index = this.buffList[target.data.mid].indexOf(target.id);
                    this.buffList[target.data.mid].splice(index,1);
                    if(this.buffList[target.data.mid].length == 0)
                    {
                        delete this.buffList[target.data.mid];
                        EventManager.getInstance().dispatch(GameEvent.client.REMOVE_BOSS,target.data.mid)
                    }
                }


                this.monsterList.splice(i,1);
                i--;
                PKMonsterItem_wx3.freeItem(target);
            }
        }
    }


}