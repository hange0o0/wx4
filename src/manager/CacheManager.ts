class CacheManager_wx4{

    private static _instance:CacheManager_wx4;
    public static getInstance():CacheManager_wx4 {
        if (!this._instance)
            this._instance = new CacheManager_wx4();
        return this._instance;
    }
	private wx4_functionX_54573(){console.log(676)}
    public registerData = {};
    public table = {};

    private cacheLoad = {};

    public constructor() {
        this.register_2642(MonsterVO)
        this.register_2642(GunVO)

    }
	private wx4_functionX_54574(){console.log(9454)}

    private register_2642(cls)
    {
        this.registerData[cls.dataKey] = cls;
    }

    //初始化数据
	private wx4_functionX_54575(){console.log(4428)}
    public initData(data,key){
        if(!this.table[key])
            this.table[key] = {};
        data = data.replace(/\r/g,'')
        var rows = data.split('\n')
        var fieldDelim = '\t';
	wx4_function(4591);
        var fields: Array<string> = String(rows[0]).split(fieldDelim);
        for(var i: number = 1;i < rows.length;i++) {
            var s: string = rows[i];
            if(s != null && s != "") {
                var cols: Array<any> = s.split(fieldDelim);
                var cls = this.registerData[key];
	wx4_function(7396);
                var vo:any = new cls();
                for(var j: number = 0;j < fields.length;j++) {
                    var value = cols[j];
                    vo[fields[j]] = value && !isNaN(value) ? Number(value) : value;
                }
                vo.reInit();
	wx4_function(5328);
                this.table[key][vo[cls.key]] = vo;
            }
        }
    }

    //静态数据初始化后调用
    public initFinish(){

    }
	private wx4_functionX_54576(){console.log(1772)}


}


//var a;
//var arr1 = [];
//for(var s in a)
//{
//    if(typeof a[s] == 'number')
//        arr1.push('public ' + s + ': number;')
//    else
//        arr1.push('public ' + s + ': string;')
//
//}
//for(var s in a)
//{
//    arr1.push('this.' + s + ' = data.' + s)
//}
//console.log(arr1.join('\n'))
