class CacheManager_wx4{

    private static _instance:CacheManager_wx4;
    public static getInstance():CacheManager_wx4 {
        if (!this._instance)
            this._instance = new CacheManager_wx4();
        return this._instance;
    }
	private wx4_functionX_45878(){console.log(2427)}
    public registerData = {};
    public table = {};

    private cacheLoad = {};

    public constructor() {
        this.register_8338(MonsterVO)
        this.register_8338(GunVO)

    }
	private wx4_functionX_45879(){console.log(2672)}

    private register_8338(cls)
    {
        this.registerData[cls.dataKey] = cls;
    }

    //初始化数据
	private wx4_functionX_45880(){console.log(9645)}
    public initData(data,key){
        if(!this.table[key])
            this.table[key] = {};
        data = data.replace(/\r/g,'')
        var rows = data.split('\n')
        var fieldDelim = '\t';
	wx4_function(1908);
        var fields: Array<string> = String(rows[0]).split(fieldDelim);
        for(var i: number = 1;i < rows.length;i++) {
            var s: string = rows[i];
            if(s != null && s != "") {
                var cols: Array<any> = s.split(fieldDelim);
                var cls = this.registerData[key];
	wx4_function(6818);
                var vo:any = new cls();
                for(var j: number = 0;j < fields.length;j++) {
                    var value = cols[j];
                    vo[fields[j]] = value && !isNaN(value) ? Number(value) : value;
                }
                vo.reInit();
	wx4_function(3837);
                this.table[key][vo[cls.key]] = vo;
            }
        }
    }

    //静态数据初始化后调用
    public initFinish(){

    }
	private wx4_functionX_45881(){console.log(4108)}


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
