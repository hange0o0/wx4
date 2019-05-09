class PKCode_wx3 {
    private static instance:PKCode_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx3();
        return this.instance;
    }

    public myHp = 1000;
    public myHpMax = 1000;
    public wudiTime = 1000;
    public actionStep = 0;
    public monsterList = [];
    public wallArr = [];
    public autoList = [];
    public enemyHp = 0//
    public enemyHpMax = 0//

    public getWudiCD(){
        return Math.max(0,this.wudiTime - TM.nowMS())
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
        this.myHp = this.myHpMax = 500+BuffManager.getInstance().getHpAdd();
    }


    public initData(){
        var level = UM.level;
        var list = PlayManager.getInstance().getLevelMonster(level)
        var height = Math.min(300 + level*10,960)
        var startY = (GameManager.uiHeight - height)/2 + 30
        var hpRate = 1 + (level - 1)*0.2;

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

        this.enemyHp = 0;
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

        var wallDec = 70;
        var len = Math.ceil(GameManager.uiHeight/wallDec)
        for(var i=0;i<len;i++)
        {
            var wall = PKMonsterItem_wx3.createItem();
            wall.data = {mid:99};
            PKingUI.getInstance().con.addChild(wall);
            wall.y =i*wallDec+80
            wall.x =150
            this.wallArr.push(wall);
        }

        this.actionStep = 0;
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
         while(this.autoList[0] && this.autoList[0].step <= this.actionStep)
         {
             b = true;
             var oo = this.autoList.shift();
             var monster = PKMonsterItem_wx3.createItem();
             monster.data = oo;
             PKingUI.getInstance().addMonster(monster)
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
            if(target.stop)
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
            step:this.getStepByTime(target.getVO().mv_atk),
            id:id,
            target:target,
            fun:()=>{
                if(target.isDie)
                    return;
                var step = this.getStepByTime(target.getVO().atkrage*5);
                if(target.mid == 1)
                    step = 10;
                AtkMVCtrl_wx3.getInstance().mAtkMV(target.mid,target,step);//飞行动画

                PKMonsterAction_wx3.getInstance().addList({  //攻击生效
                    step:step,
                    id:id,
                    target:target,
                    fun:()=>{
                        if(!this.getWudiCD())
                            this.myHp -= target.getAtk()
                        if(this.myHp > 0)
                            target.target.atk();
                        //console.log(this.myHp)
                        EM.dispatch(GameEvent.client.HP_CHANGE)
                    }
                })
            }
        })

        //僵直结束
        PKMonsterAction_wx3.getInstance().addList({
            step:this.getStepByTime(target.getVO().atkcd),
            id:id,
            target:target,
            fun:()=>{
                target.stop=0;
            }
        })
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
            target.run();
        }
    }

    //一轮操作结束,移队死，过线的，结算,清除BUFF
    public actionFinish(){
        for(var i=0;i<this.monsterList.length;i++)
        {
            var target = this.monsterList[i]
            if(target.isDie==2) //死的
            {
                this.monsterList.splice(i,1);
                i--;
                PKMonsterItem_wx3.freeItem(target);
            }
        }
    }


}