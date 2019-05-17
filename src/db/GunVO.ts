class GunVO {
    public static dataKey = 'gun';
    public static key = 'id';
    public static getObject(id): GunVO{ //id有可能带\n or \r
        return CM.table[this.dataKey][Math.floor(id)];
    }
    public static get data(){
        return CM.table[this.dataKey]
    }


    public id: number;
    public type: number;
    public name: string;
    public atk: number;
    public open: number;
    public speed: number;
    public v1: number;
    public v2: number;
    public add1: number;
    public add2: number;

    public constructor() {

    }

    public reInit(){
         this.speed/=1000
        this.add1 = this.add1 || 0
        this.add2 = this.add2 || 0
    }

    public getThumb(){
        return 'thum_'+this.id+'_png'
    }

    public getUrl(){
        return 'knife_'+this.id+'_png'
    }

    public getLevel(){
        return GunManager.getInstance().getGunLevel(this.id);
    }

    public getDes(lv?,stopUp?){

        var str = ''
        switch(this.type)
        {
            case 1://散射
                str =  '每次可同时射出 #1 把飞刀';
                break;
            case 2://穿透
                str =  '飞刀不会被阻挡，对飞行路径上的所有敌人造成伤害';
                break;
            case 3://杀敌爆炸
                str =  '消灭敌人后爆炸，对 #1 范围内的敌人造成 #2 点伤害';
                break;
            case 4://杀敌吸血
                str =  '每消灭一个敌人会回复城墙 #1 点血量';
                break;
            case 5://杀敌攻击成长
                str =  '每消灭一个敌人会提升自身 #1 点攻击力';
                break;
            case 6://全体加攻
                str =  '增加所有出战飞刀 #1 点攻击力';
                break;
            case 7://减速
                str =  '使中刀敌人减慢 #1% 速度，持续 #2 秒';
                break;
            case 8://晕 机率
                str =  '有 #1% 的机率使敌人陷入眩晕状态，持续 #2 秒';
                break;
            case 9://机率 暴击
                str =  '有 #1% 的机率造成 #1 倍伤害';
                break;
            case 10://增加金币收益
                str =  '战斗结束后多获得 #1% 的金币';
                break;
            case 11://增加城墙血量
                str =  '增加 #1 点城墙血量';
                break;
            case 12://推后
                str =  '使被命中的敌人退后 #1 距离';
                break;
            case 13://追踪
                str =  '飞刀会追踪敌人直至命中';
                break;
            case 14://命中后分裂
                str =  '命中敌人后会分裂出 #1 把飞刀';
                break;
            case 15://命中吸血
                str =  '命中敌人后回复城墙 #1 点血量';
                break;
        }
        if(!str)
            return '无特殊技能';
        lv = lv || this.getLevel()
        return str.replace('#1',this.changeValue(1,lv,stopUp)).
            replace('#2',this.changeValue(2,lv,stopUp))
    }

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
                return '吸血'
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
                return '回血'
        }
        return '';
    }

    private fillColor(str,color?){
        return MyTool.createHtml(str,color || 0xFFFF00)
    }

    public getLevelValue(index,lv?){
        lv = lv || this.getLevel();
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
        return Math.floor(orgin + add*(lv-1))
    }

    private changeValue(index,lv,stopUp?){
        var needShowAdd = true
        if(lv == 0)
        {
            lv = 1;
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

        var str = this.fillColor(this.getLevelValue(index,lv));
        if(needShowAdd)
            str += this.fillColor('(' + this.getLevelValue(index,lv+1) + ')',0x00FF00);
        return str;
    }

    public getBGRound(lv?){
        lv = lv || this.getLevel() || 1
        return 'role_'+lv+'_png'
    }
    public getBGRect(lv?){
        lv = lv || this.getLevel() || 1
        return 'role_rect_'+lv+'_png'
    }
}