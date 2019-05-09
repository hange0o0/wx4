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
        lv = lv || this.getLevel() || 1
        switch(this.type)
        {
            case 1://散射
                break;
            case 2://穿透
                break;
            case 3://杀敌爆炸
                break;
            case 4://杀敌吸血
                break;
            case 5://杀敌攻击成长
                break;
            case 6://全体加攻
                break;
            case 7://减速
                break;
            case 8://晕 机率
                break;
            case 9://机率 暴击
                break;
            case 10://增加金币收益
                break;
            case 11://增加城墙血量
                break;
            case 12://推后
                break;
            case 13://追踪
                break;
            case 14://命中后分裂
                break;
            case 15://命中吸血
                break;
        }
        return '无'
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