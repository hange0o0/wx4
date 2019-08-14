/**
 *
 * @author 
 *
 */
class Config {
	private wx4_functionX_54453(){console.log(1553)}
	public constructor() {
	}

    public static isDebug: boolean = true;
    public static userHost: string = 'hangegame.com';
    public static host: string = 'hangegame.com';
	private wx4_functionX_54454(){console.log(4894)}
    public static pkServerHost: string = '172.17.196.195';
    public static pkServerPose = 9029;
    public static serverID: number = 1;
    //public static host: string = '172.17.196.195:90';
    public static user_version: number = 1;
    public static version: number = 1;
    public static displayVersion = '1.0.0';
	private wx4_functionX_54455(){console.log(8855)}
    public static pk_version: number = 1;
    public static cdn: string = "";
    public static localResRoot:string = "resource/game_assets/";
    public static localResRoot2:string = "resource/game_assets2/";
    public static getShare(id){
        id = id || Math.ceil(Math.random()*4)
       return "resource/game_assets2/share/share"+id+".jpg";
    }
	private wx4_functionX_54456(){console.log(5070)}

    public static adHeight = 0

    public static openRate = 10;

    public static wx_ad = 'adunit-f4c22b43615cdc5f';
    public static wx_video = 'adunit-7ee182f90e3b372e';
    public static wx_insert = 'adunit-1ff121422175a5a1';
    public static myAppID = 'wx2f66e2c8de744d53';


	private wx4_functionX_54457(){console.log(8152)}


    //public static friendLevel = 3;
    //public static gambleLevel = 20;
    //
    //
    //public static mapLevel = 5;
    //public static dayLevel = 15;
    //public static serverLevel = 25;//卡士二阶
    //public static serverEqualLevel = 45;  //卡士五阶
    //public static leaderLevel = 95;  //
    //public static leaderSkillLevel = 145;  //


    public static platform = '';
    public static platformGameidAdd = '';
	private wx4_functionX_54458(){console.log(8032)}
    public static equalValue = 1000;


    public static init(){

    }
	private wx4_functionX_54459(){console.log(8008)}

    private static createImg(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"image",
           "url": path + name
       }
    }
	private wx4_functionX_54460(){console.log(9433)}
    private static createJSON(name,path=''){
        return {
           "name":name.replace('.','_'),
           "type":"json",
           "url": path + name
       }
    }
	private wx4_functionX_54461(){console.log(609)}

    public static initURLRequest() {
        //if(AppQU.isApp) return;

        var url = location.hash || location.search || "";
        var splitStr = location.hash ? '#' : '?';
        //        var obj = new Object();
        if(url.indexOf(splitStr) != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                _get[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }

        //if(ConfigQU.other){
        //    if(_get["iscloseSocket"]){
        //        ConfigQU.other.iscloseSocket = _get["iscloseSocket"];
        //        console.warn("设置了iscloseSocket：", _get["iscloseSocket"]);
        //    }
        //}
    }
	private wx4_functionX_54462(){console.log(1830)}

}

class _get {
    public constructor() {
    }
}

