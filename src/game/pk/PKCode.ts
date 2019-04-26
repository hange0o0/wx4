class PKCode_wx3 {
    private static instance:PKCode_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx3();
        return this.instance;
    }

    public myHp = 1000;
    public myHpMax = 1000;
    public actionStep = 0;
    public monsterList = [];
    public wallArr = [];
    public autoList = [];

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


    public initData(list?){
        list =  '4|50,5|50,6|50,48|50,46|50';

        while(this.wallArr.length)
        {
            PKMonsterItem_wx3.freeItem(this.wallArr.pop())
        }
        while(this.monsterList.length)
        {
            PKMonsterItem_wx3.freeItem(this.monsterList.pop())
        }

        this.autoList = list.split(',');
        for(var i=0;i<this.autoList.length;i++)
        {
            var temp = this.autoList[i].split('|')
            this.autoList[i] = {
                mid:parseInt(temp[0]),
                step:parseInt(temp[1]),
            }
        }
        var wallDec = 70;
        var len = Math.ceil(GameManager.uiHeight/wallDec)
        for(var i=0;i<len;i++)
        {
            var wall = PKMonsterItem_wx3.createItem();
            wall.data = {mid:99};
            PKingUI.getInstance().addChild(wall);
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
             monster.y = 200 + Math.random()*(GameManager.uiHeight-300);
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
                    step = 10
                AtkMVCtrl_wx3.getInstance().mAtkMV(target.mid,target,step);//飞行动画

                PKMonsterAction_wx3.getInstance().addList({  //攻击生效
                    step:step,
                    id:id,
                    target:target,
                    fun:()=>{
                        this.myHp -= target.getAtk()
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