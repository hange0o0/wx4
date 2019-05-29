class MonsterVO {
    public static dataKey = 'monster';
    public static key = 'id';
    public static getObject(id): MonsterVO{ //id有可能带\n or \r
        return CM_wx4.table[this.dataKey][Math.floor(id)];
    }
	private wx4_functionX_45847(){console.log(96)}
    public static get data(){
        return CM_wx4.table[this.dataKey]
    }


    public width: number;
	private wx4_functionX_45848(){console.log(1798)}
    public height: number;
    public atk: number;
    public headoff: number;
    public heightoff: number;
    public atkcd: number;
    public atkrage: number;
	private wx4_functionX_45849(){console.log(2800)}
    public level: number;
    public mcheight: number;
    public mcnum: number;
    public name: string;
    public speed: number;
    public hp: number;
	private wx4_functionX_45850(){console.log(883)}
    public def: number;//对刀的攻击力
    public id: number;
    public mcwidth: number;
    public mv_atk: number;
    public atkx: number;
    public atky: number;
	private wx4_functionX_45851(){console.log(1616)}
    public mvid: number;
    public diesound: number;

    public constructor() {

    }

	private wx4_functionX_45852(){console.log(7814)}
    public reInit(){
        this.atkcd = this.atkcd * 1000
        this.mv_atk = this.mv_atk * 1000
    }

    public getAtkDis(){
        return this.width/2 + this.atkrage
    }
	private wx4_functionX_45853(){console.log(3090)}

    public isHero(){
        return this.id > 100;
    }

    public playDieSound(){
        if(this.isHero())
            SoundManager.getInstance().playEffect('enemy_dead4')
        else
            SoundManager.getInstance().playEffect('enemy_dead' + this.diesound)
    }

}