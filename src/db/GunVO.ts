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
    public atk: number;
    public hp: number;
    public speed: number;
    public v1: number;
    public v2: number;
    public v3: number;

    public constructor() {

    }

    public reInit(){

    }
}