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
    public v3: number;
    public v4: number;

    public constructor() {

    }

    public reInit(){
         this.speed/=1000
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

    public getDes(lv?){

        var str = ''
        switch(this.type)
        {
            case 1://散射
                str =  '每次可同时射出#1把飞刀';
                break;
            case 2://穿透
                str =  '飞刀不会被阻挡，对飞行路径上的所有敌人造成伤害';
                break;
            case 3://杀敌爆炸
                str =  '消灭敌人后会爆炸，对#1范围内的敌人造成$2点伤害';
                break;
            case 4://杀敌吸血
                str =  '每消灭一个敌人会回复城墙$1点血量';
                break;
            case 5://杀敌攻击成长
                str =  '每消灭一个敌人会提升自身$1点攻击力';
                break;
            case 6://全体加攻
                str =  '增加所有出战飞刀$1点攻击力';
                break;
            case 7://减速
                str =  '使中刀敌人减慢$1%速度，持续#2秒';
                break;
            case 8://晕 机率
                str =  '有$1%的机率使敌人陷入眩晕状态，持续#2秒';
                break;
            case 9://机率 暴击
                str =  '有$1%的机率造成#1倍伤害';
                break;
            case 10://增加金币收益
                str =  '战斗结束后多获得$1%的金币';
                break;
            case 11://增加城墙血量
                str =  '增加$1点城墙血量';
                break;
            case 12://推后
                str =  '使被命中的敌人退后$1距离';
                break;
            case 13://追踪
                str =  '飞刀会追踪敌人直至命中';
                break;
            case 14://命中后分裂
                str =  '命中敌人后会分裂出#1把飞刀';
                break;
            case 15://命中吸血
                str =  '命中敌人后回复城墙$1点血量';
                break;
        }
        if(!str)
            return '无特殊技能';
        lv = lv || this.getLevel()
        return str.replace('#1',this.fillColor(this.v1)).
            replace('#2',this.fillColor(this.v2)).
            replace('$1',this.changeValue(this.v1,lv,this.v3)).
            replace('$2',this.changeValue(this.v2,lv,this.v4))
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
                return '晕'
            case 9://机率 暴击
                return '暴击'
            case 10://增加金币收益
                return '金币'
            case 11://增加城墙血量
                return '血量'
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
        return MyTool.createHtml(str,color || 0xFFD67F)
    }

    public getLevelValue(v,add=-999,lv?){
        lv = lv || this.getLevel();
        if(add == -999)
            return Math.ceil(v*(1+(lv-1)*0.3))
        return Math.ceil(add + v*(1+(lv-1)))
    }

    private changeValue(v,lv,add=0){
        var needShowAdd = true
        if(lv == 0)
        {
            lv = 1;
            needShowAdd = false
        }
        if(lv >= 8)
            needShowAdd = false
        var str = this.fillColor(this.getLevelValue(v,add,lv));
        if(needShowAdd)
            str += this.fillColor('(' + this.getLevelValue(v,add,lv+1) + ')',0x00FF00);
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