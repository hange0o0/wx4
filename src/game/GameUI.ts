class GameUI extends game.BaseUI {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private bg: eui.Image;
    private gunCon: eui.Group;
    private bulletGroup: eui.Group;
    private endLessBtn: eui.Button;
    private startBtn: eui.Button;
    private coinText: eui.Label;
    private soundBtn: eui.Image;
    private rankBtn: eui.Group;
    private gunBtn: eui.Group;
    private buildBtn: eui.Group;
    private buildLockMC: eui.Image;
    private friendBtn: eui.Group;
    private desText: eui.Label;
    private blackBG: eui.Image;





    private dragTarget = new MainGunItem()


    public endLessLevel = 5;
    public gunArr = [];
    public lastShoot = 0
    public tipsTimer = 0
    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.startBtn,()=>{
            PlayManager.getInstance().isEndLess = false
            this.startMV();
        })
        this.addBtnEvent(this.endLessBtn,()=>{
            if(UM.level <= this.endLessLevel)
            {
                MyWindow.ShowTips('通关第'+this.endLessLevel+'关后开启')
                return;
            }
            PlayManager.getInstance().isEndLess = true
            this.startMV();
        })
        this.addBtnEvent(this.soundBtn,()=>{
            SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
            SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
            //if(SoundManager.getInstance().bgPlaying)
            //    SoundManager.getInstance().playSound('bg')
            //else
            //    SoundManager.getInstance().stopBgSound()
            this.renewSound();
        },this,true)
        this.addBtnEvent(this.rankBtn,()=>{
            RankUI.getInstance().show();
        })
        this.addBtnEvent(this.gunBtn,()=>{
            GunListUI.getInstance().show();
        })
        this.addBtnEvent(this.friendBtn,()=>{
            BuffUI.getInstance().show();
        })
        this.addBtnEvent(this.buildBtn,()=>{
            MyWindow.ShowTips('双 刀 合 一\n武器改造 100关 开启')
        })

        for(var i=0;i<GunManager.getInstance().maxGunNum;i++)
        {
            var item = new MainGunItem();
            item.data = i+1;
            this.gunArr.push(item);
            this.gunCon.addChild(item);
        }

        MyTool.addLongTouch(this.coinText,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)

        this.gunCon.addEventListener('start_drag',this.onDragStart,this);
        this.gunCon.addEventListener('end_drag',this.onDragEnd,this);
        this.gunCon.addEventListener('move_drag',this.onDragMove,this);
    }

    private onDragStart(e){
        e.target.setChoose(true);
        this.dragTarget.data = e.target.data
        this.stage.addChild(this.dragTarget);
        this.dragTarget.x = e.data.x;
        this.dragTarget.y = e.data.y;
    }

    private onDragMove(e){
        if(!this.dragTarget.parent)
            return;
        this.dragTarget.x = e.data.x
        this.dragTarget.y = e.data.y

        var x = this.dragTarget.x //+ this.dragTarget.width/2
        var y = this.dragTarget.y //+ this.dragTarget.height/2
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            mc.showDragState(false)
        }
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            if(mc.currentState == 'normal' && mc.visible && mc.hitTestPoint(x,y))
            {
                if(mc.data != this.dragTarget.data)
                {
                    mc.showDragState(true)
                    break;
                }
            }
        }
    }

    private onDragEnd(e){
        if(!this.dragTarget.parent)
            return;
        MyTool.removeMC(this.dragTarget)
        var x = this.dragTarget.x
        var y = this.dragTarget.y
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            mc.showDragState(false);
            mc.setChoose(false);
            if(mc.currentState == 'normal' && mc.visible && mc.hitTestPoint(x,y))
            {
                if(mc.data != this.dragTarget.data)
                {
                    GunManager.getInstance().addGun(GunManager.getInstance().getGunByPos(this.dragTarget.data),mc.data)
                }
            }
        }
    }

    private renewSound(){
        this.soundBtn.source = SoundManager.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        if(_get['pos'])
            UM.gunPosNum = parseInt(_get['pos']);
        if(_get['level'])
            UM.level = parseInt(_get['level']);
        SoundManager.getInstance().playSound('bg')


        this.bg.height = GameManager.uiHeight + 250;
        this.bg.y = 0;
        GameTool.getInstance().preLoadMV();
        RES.loadGroup('hero');
        this.renewSound();
        this.renew();
        this.renewCoin();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)

        if(UM.pastDayCoin.coin)
        {
            PassDayAwardUI.getInstance().show();
        }
        this.showTips();

    }

    private showTips(){
        this.desText.text = '长按武器查看详情,拖动调整位置'
        clearTimeout(this.tipsTimer);
        this.tipsTimer = setTimeout(()=>{
            this.desText.text = ''
        },5000)
    }

    private onE(){
        if(!this.visible)
            return;
        for(var i=0;i<this.gunArr.length;i++) {
            var item = this.gunArr[i];
            item.onE();
        }
        if(this.dragTarget.stage)
            this.dragTarget.onE();

        if(!this.startBtn.visible)
            return;
        //this.gunCon.rotation += 0.1;
        //for(var i=0;i<this.gunArr.length;i++) {
        //    var item = this.gunArr[i];
        //    item.rotation = -this.gunCon.rotation
        //}

        this.bg.y += 1;
        if(this.bg.y > 0)
            this.bg.y -= 200;

        if(egret.getTimer() - this.lastShoot > 500)
        {
            this.lastShoot = egret.getTimer();
            var mc = BulletMC.createItem();
            this.bulletGroup.addChild(mc);
            mc.x = 10 + Math.random()*620
            mc.y = GameManager.uiHeight + 50;
            mc.data = {
                scale:1,
                id:ArrayUtil.randomOne(GunManager.getInstance().getMyGunList()),
            };
            egret.Tween.get(mc).to({y:-100},(GameManager.uiHeight+150)*1).call(()=>{
                BulletMC.freeItem(mc);
            })
            mc.rotation = 0
            egret.Tween.get(mc,{loop:true}).to({rotation:360},300)
        }
    }

    public onVisibleChange(){
        if(this.visible)
        {
            this.renew();
            this.showTips();
        }
    }

    private renewCoin(){
        this.coinText.text = NumberUtil.addNumSeparator(UM.coin);
    }

    public renew(){
        this.blackBG.visible = false
        this.startBtn.label = '第 '+UM.level+' 关'
        this.bg.source = UM.getBG();
        var num = Math.min(UM.gunPosNum + 1,GunManager.getInstance().maxGunNum);
        //var r = 220;
        //var rotaAdd = 360/num;
        var lineObj = {
            4:[2,2],
            5:[2,3],
            6:[1,2,3],
            7:[1,3,3],
            8:[2,3,3],
            9:[3,3,3]
        }
        var pos = lineObj[num];
        for(var i=0;i<this.gunArr.length;i++)
        {
            var item = this.gunArr[i];
            if(i < num)
            {
                this.gunCon.addChild(item);
                //var rota = rotaAdd*i - 90;
                item.scaleX = item.scaleY = 1;
                var xy = this.getPos(i+1,pos)
                item.y = xy.y
                item.x = xy.x
                item.dataChanged();
            }
            else
            {
                 MyTool.removeMC(item);
            }
        }

        this.startBtn.visible = true
        this.endLessBtn.visible = true
        if(UM.level > this.endLessLevel)
            this.endLessBtn.icon = ''
    }

    private getPos(index,pos){
        var count = 0;
        for(var i=0;i<pos.length;i++)
        {
            var num = pos[i];
            if(index <= count + num)//在这一行
            {
                index = index - count
                var width = 540;
                if(num < 3)
                    width = width - width/3
                var des = width/num;
                return {
                    x:des*(index-1) + des/2 + (540-width)/2,
                    y:60 + 180*i
                }
            }
            count += pos[i];
        }
    }

    public startMV(){
        this.startBtn.visible = false
        this.endLessBtn.visible = false
        this.desText.text = ''
        clearTimeout(this.tipsTimer);
        var num =  Math.min(UM.gunPosNum + 1,GunManager.getInstance().maxGunNum);
        var r = 220;
        var rotaAdd = 360/num;

        var hh = this.gunCon.height/2
        for(var i=0;i<num;i++)
        {
            var item = this.gunArr[i];
            if(GunManager.getInstance().getGunByPos(item.data))
            {
                var lastX = item.x
                var lastY = item.y
                var p = item.localToGlobal(60,60)
                this.globalToLocal(p.x,p.y,p);
                this.addChild(item);
                item.x = p.x
                item.y = p.y
                //this.moveItem(item,i,Math.atan2(lastY - hh,lastX - 250)*180/Math.PI+90,true);
                this.moveItem(item,i,Math.atan2(lastY - hh,lastX - 250)*180/Math.PI+90,(lastY - hh==0 && lastX - 250 == 0));
                //this.moveItem(item,i,i*rotaAdd + this.gunCon.rotation);
            }
            else
            {
                egret.Tween.get(item).to({scaleX:0,scaleY:0},300);
            }
        }

        this.blackBG.visible = true
        this.blackBG.alpha = 0
        this.addChild(this.blackBG);
        egret.Tween.get(this.blackBG).wait(700).to({alpha:1},200)



        setTimeout(()=>{
            PKingUI.getInstance().show()
        },1000)
    }

    private moveItem(item,index,rota,isMiddle?){
        //var unlockNum = 10;
        //var des = 80;
        //var toy = (GameManager.uiHeight - unlockNum*des)/2 + des/2 + (item.data-1)*80
        //egret.Tween.get(item).to({x:320,y:toy,scaleX:0.7,scaleY:0.7},200).wait(300).to({x:250},200).to({x:800},200)

        //var rota = 360*Math.random();
        var r0 = 120
        var r = 700
        var y0 = Math.sin(rota/180*Math.PI)*r0 + GameManager.uiHeight/2-50;
        var x0 = Math.cos(rota/180*Math.PI)*r0 + 320;
        var y = Math.sin(rota/180*Math.PI)*r + GameManager.uiHeight/2-50;
        var x = Math.cos(rota/180*Math.PI)*r + 320;

        var tw = egret.Tween.get(item)
        for(var i=0;i<8;i++)
        {
            tw.to({x:-10+20*Math.random() + item.x,y:-10+20*Math.random() + item.y},50)
        }
        if(isMiddle)
            tw.to({scaleX:1.2,scaleY:1.2},100).to({scaleX:0,scaleY:0},100)
        else
            tw.to({x:x,y:y},300)
    }



}