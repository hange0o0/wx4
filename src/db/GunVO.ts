class GunVO {
    public static dataKey = 'gun';
    public static key = 'id';
    public static getObject(id): GunVO{ //id有可能带\n or \r
        return CM_wx4.table[this.dataKey][Math.floor(id)];
    }
	private wx4_functionX_45837(){console.log(4051)}
    public static get data(){
        return CM_wx4.table[this.dataKey]
    }


    public id: number;
	private wx4_functionX_45838(){console.log(4325)}
    public type: number;
    public name: string;
    public atk: number;
    public atkrate: number;
    public open: number;
    public speed: number;
	private wx4_functionX_45839(){console.log(9485)}
    public v1: number;
    public v2: number;
    public add1: number;
    public add2: number;

    public constructor() {

    }
	private wx4_functionX_45840(){console.log(4886)}

    public reInit(){
         this.speed/=1000
        this.v1 =this.v1 || 0
        this.v2 = this.v2 || 0
        this.add1 = this.add1 || 0
        this.add2 = this.add2 || 0
    }
	private wx4_functionX_45841(){console.log(6352)}

    public getThumb(){
        return 'thum_'+this.id+'_png'
    }

    public getUrl(){
        return 'knife_'+this.id+'_png'
    }
	private wx4_functionX_45842(){console.log(1043)}

    public getLevel(){
        return GunManager.getInstance().getGunLevel(this.id);
    }

    public getDes(lv?,stopUp?){

        var str = ''
        switch(this.type)
        {
            case 1://散射
                str =  '每次可同时射出 #1 把飞刀';
	wx4_function(4357);
                break;
            case 2://穿透
                str =  '飞刀不会被阻挡，对飞行路径上的所有敌人造成伤害';
                break;
            case 3://杀敌爆炸
                str =  '消灭敌人后爆炸，对 #1 范围内的敌人造成 #2 点伤害';
	wx4_function(3245);
                break;
            case 4://杀敌吸血
                str =  '每消灭一个敌人会回复城墙 #1 点血量';
                break;
            case 5://杀敌攻击成长
                str =  '每消灭一个敌人会提升自身 #1 点攻击力';
	wx4_function(7988);
                break;
            case 6://全体加攻
                str =  '增加所有出战飞刀 #1% 攻击力';
                break;
            case 7://减速
                str =  '使中刀敌人减慢 #1% 速度，持续 $2 秒';
	wx4_function(684);
                break;
            case 8://晕 机率
                str =  '有 #1% 的机率使敌人陷入眩晕状态，持续 $2 秒';
                break;
            case 9://机率 暴击
                str =  '有 #1% 的机率造成 $2 倍伤害';
	wx4_function(2816);
                break;
            case 10://增加金币收益
                str =  '战斗结束后多获得 #1% 的金币';
                break;
            case 11://增加城墙血量
                str =  '战斗开始时增加 #1 点城墙血量';
	wx4_function(9511);
                break;
            case 12://推后
                str =  '使被命中的敌人退后 #1 距离';
                break;
            case 13://追踪
                str =  '飞刀会追踪敌人直至命中';
	wx4_function(1626);
                break;
            case 14://命中后分裂
                str =  '命中敌人后会分裂出 #1 把飞刀';
                break;
            case 15://命中吸血
                str =  '命中敌人后回复城墙 #1 点血量';
	wx4_function(5876);
                break;
        }
        if(!str)
            return '无特殊技能';
        lv = lv || this.getLevel()
        return str.replace('#1',this.changeValue_9990(1,lv,stopUp)).
            replace('#2',this.changeValue_9990(2,lv,stopUp)).
            replace('$1',this.changeValue_9990(1,lv,stopUp,false)).
            replace('$2',this.changeValue_9990(2,lv,stopUp,false))
    }
	private wx4_functionX_45843(){console.log(4261)}

    public getTitle(){
        switch(this.type)
        {
            case 1://
               return '散射'
            case 2://穿透
                return '穿透'
            case 3://杀敌爆炸
                return '爆炸'
            case 4://杀敌吸血
                return '反哺'
            case 5://杀敌攻击成长
                return '成长'
            case 6://全体加攻
                return '加攻'
            case 7://减速
                return '减速'
            case 8://晕 机率
                return '眩晕'
            case 9://机率 暴击
                return '暴击'
            case 10://增加金币收益
                return '金山'
            case 11://增加城墙血量
                return '血牛'
            case 12://推后
                return '推后'
            case 13://追踪
                return '追踪'
            case 14://命中后分裂
                return '分裂'
            case 15://命中吸血
                return '吸血'
        }
        return '';
    }
	private wx4_functionX_45844(){console.log(8215)}

    private fillColor_3859(str,color?){
        return MyTool.createHtml(str,color || 0xFFFF00)
    }

    public getLevelValue(index,lv?,needInt=true){
        lv = lv || this.getLevel();
	wx4_function(6118);
        if(index == 1)
        {
            var orgin = this.v1
            var add = this.add1
        }
        else if(index == 2)
        {
            var orgin = this.v2
            var add = this.add2
        }
        if(needInt)
            return Math.floor(orgin + add*(lv-1))
        return orgin + add*(lv-1)
    }
	private wx4_functionX_45845(){console.log(7225)}

    private changeValue_9990(index,lv,stopUp?,needInt=true){
        var needShowAdd = true
        if(lv == 0)
        {
            lv = 1;
	wx4_function(3731);
            needShowAdd = false
        }
        if(lv >= 8)
            needShowAdd = false
        if(index == 1 && this.add1 == 0)
            needShowAdd = false
        if(index == 2 && this.add2 == 0)
            needShowAdd = false
        if(stopUp)
            needShowAdd = false

	wx4_function(495);
        var str = this.fillColor_3859(MyTool.toFixed(this.getLevelValue(index,lv,needInt),1));
        if(needShowAdd)
            str += this.fillColor_3859('(' + MyTool.toFixed(this.getLevelValue(index,lv+1,needInt),1) + ')',0x00FF00);
        return str;
    }

	private wx4_functionX_45846(){console.log(9970)}
    //public getBGRound(lv?){
    //    lv = lv || this.getLevel() || 1
    //    return 'role_'+lv+'_png'
    //}
    //public getBGRect(lv?){
    //    lv = lv || this.getLevel() || 1
    //    return 'role_rect_'+lv+'_png'
    //}
}