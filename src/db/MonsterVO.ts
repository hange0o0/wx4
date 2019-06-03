class MonsterVO {
    public static dataKey = 'monster';
    public static key = 'id';
    public static getObject(id): MonsterVO{ //id有可能带\n or \r
        return CM_wx4.table[this.dataKey][Math.floor(id)];
    }
	private wx4_functionX_54550(){console.log(5658)}
    public static get data(){
        return CM_wx4.table[this.dataKey]
    }


    public width: number;
	private wx4_functionX_54551(){console.log(9532)}
    public height: number;
    public atk: number;
    public headoff: number;
    public heightoff: number;
    public atkcd: number;
    public atkrage: number;
	private wx4_functionX_54552(){console.log(9063)}
    public level: number;
    public mcheight: number;
    public mcnum: number;
    public name: string;
    public speed: number;
    public hp: number;
	private wx4_functionX_54553(){console.log(1730)}
    public def: number;//对刀的攻击力
    public id: number;
    public mcwidth: number;
    public mv_atk: number;
    public atkx: number;
    public atky: number;
	private wx4_functionX_54554(){console.log(1991)}
    public mvid: number;
    public diesound: number;

    public constructor() {

    }
	private wx4_functionX_54555(){console.log(2122)}

    public reInit(){
        this.atkcd = this.atkcd * 1000
        this.mv_atk = this.mv_atk * 1000
    }

	private wx4_functionX_54556(){console.log(8491)}
    public getAtkDis(){
        return this.width/2 + this.atkrage
    }

    public isHero(){
        return this.id > 100;
    }
	private wx4_functionX_54557(){console.log(5611)}

    public playDieSound(){
        if(this.id == 99)
            SoundManager.getInstance().playEffect('die')
        else if(this.isHero())
            SoundManager.getInstance().playEffect('enemy_dead4')
        else
            SoundManager.getInstance().playEffect('enemy_dead' + this.diesound)
    }
	private wx4_functionX_54558(){console.log(4003)}

}