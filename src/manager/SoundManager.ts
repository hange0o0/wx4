/**
 *
 * @author 
 *
 */
class SoundManager {
	private wx4_functionX_45914(){console.log(773)}
    private static instance:SoundManager;

    public constructor() {
        this.init_5052();
    }

	private wx4_functionX_45915(){console.log(161)}
    public static getInstance():SoundManager {
        if (!this.instance)
            this.instance = new SoundManager();
        return this.instance;
    }

    //默认关闭音乐
	private wx4_functionX_45916(){console.log(6762)}
    private _soundPlaying:boolean = false;
    private _bgPlaying:boolean = false;
    private _openShake:boolean = true;
    private _isPlayMovie:boolean = true;
    private _isMessage:boolean = true;

	private wx4_functionX_45917(){console.log(1707)}
    private currentChannel:egret.SoundChannel;
    private currentKey:string;
    private bgKey:string;
    private lastBGKey:string;
    private isLoad:boolean = false;

	private wx4_functionX_45918(){console.log(168)}
    private bgTimer;
    public pkKey = [];
    public effectKey = [];

    public lastSoundTime = {};
    // private tween:egret.Tween

	private wx4_functionX_45919(){console.log(5539)}
    public currentLoader;

    private init_5052() {
        //if(!App.isMobile){//pc上默认开音乐
        //    this._soundPlaying = true;
        //    this._bgPlaying = true;
        //}
        //
        //if(Config.isDebug)
        //{
        this._soundPlaying = true;
        this._bgPlaying = true;
        //}

	wx4_function(162);
        var som = SharedObjectManager_wx4.getInstance();
        if (som.getValue("sound") != undefined)
            this._soundPlaying = som.getValue("sound");
        if (som.getValue("bgsound") != undefined)
            this._bgPlaying = som.getValue("bgsound");

        if (som.getValue("openShake") != undefined)
            this._openShake = som.getValue("openShake");
	wx4_function(5550);
        if (som.getValue("playMovie") != undefined)
            this._isPlayMovie = som.getValue("playMovie");
        if (som.getValue("showMessage") != undefined)
            this._isMessage = som.getValue("showMessage");

        this.isLoad = this._soundPlaying;
	wx4_function(2351);
    }

    public get soundPlaying() {
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._soundPlaying
    }

	private wx4_functionX_45920(){console.log(7011)}
    public get bgPlaying() {
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._bgPlaying
    }

    public get openShake() {
        return this._openShake
    }
	private wx4_functionX_45921(){console.log(8210)}

    public get isPlayMovie() {
        return this._isPlayMovie
    }

    public get isMessage() {
        return this._isMessage
    }
	private wx4_functionX_45922(){console.log(2958)}

    public set soundPlaying(v) {
        if (this._soundPlaying != v)
            SharedObjectManager_wx4.getInstance().setValue("sound", v)
        this._soundPlaying = v;
        //this.loadEffectSound();
    }
	private wx4_functionX_45923(){console.log(3412)}

    public set bgPlaying(v) {
        if (this._bgPlaying != v) {
            SharedObjectManager_wx4.getInstance().setValue("bgsound", v);
        }
        this._bgPlaying = v;

        if (!v) {
            this.stopBgSound();
        }
        else {
            this.playSound('bg');
        }
    }
	private wx4_functionX_45924(){console.log(397)}

    public set openShake(v) {
        if (this._openShake != v)
            SharedObjectManager_wx4.getInstance().setValue("openShake", v)
        this._openShake = v;
    }
	private wx4_functionX_45925(){console.log(5568)}

    public set isPlayMovie(v) {
        if (this._isPlayMovie != v)
            SharedObjectManager_wx4.getInstance().setValue("playMovie", v)
        this._isPlayMovie = v;
    }
	private wx4_functionX_45926(){console.log(7079)}

    public set isMessage(v) {
        if (this._isMessage != v)
            SharedObjectManager_wx4.getInstance().setValue("showMessage", v)
        this._isMessage = v;
    }
	private wx4_functionX_45927(){console.log(9233)}

    public addBtnClickEffect(btn:egret.DisplayObject) {
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playBtn, this)
    }

    public playBtn() {
        this.playEffect('btn');
	wx4_function(281);
    }

    public testBGPlay() {
        if (PKingUI.getInstance().stage)
            this.playSound('bg2')
        else
            this.playSound('bg')
    }
	private wx4_functionX_45928(){console.log(4388)}

    public stopBgSound() {
        this.lastBGKey = this.bgKey;
        this.bgKey = null;
        try {
            // if(this.tween){
            //     this.tween.pause();
            //     this.tween = null;
            // }

	wx4_function(5349);
            egret.clearTimeout(this.playTime);
            if (this.currentChannel) {
                egret.Tween.removeTweens(this.currentChannel);
                this.currentChannel.stop();
                console.log('stopchannel', this.currentChannel.hashCode)
            }
            this.onSoundComplete_5114();
	wx4_function(4277);
        } catch (e) {
        }
    }

    public playEffect(v:string, fun?, thisObj?) {
        if (GuideManager.getInstance().isGuiding)
            return;
        if (!this.soundPlaying) return;
        if (this.lastSoundTime[v] && egret.getTimer() - this.lastSoundTime[v] < 200)
            return;
        this.lastSoundTime[v] = egret.getTimer();
        //console.log('call:',v)
        var url = "resource/sound/" + v + ".mp3"
        var loader:egret.URLLoader = new egret.URLLoader();
	wx4_function(3578);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.once(egret.Event.COMPLETE, ()=> {
            var sound:egret.Sound = <egret.Sound>loader.data;
            var channel = sound.play(0, 1);
            //console.log(v)
            if (fun)
                channel.once(egret.Event.SOUND_COMPLETE, fun, thisObj)
        }, this);
	wx4_function(7441);
        loader.load(new egret.URLRequest(url));
    }

    public resumeSound() {
        if (this.lastBGKey)
            this.playSound(this.lastBGKey);
	wx4_function(4006);
    }

    private tempLoop:number;

    public playSound(key:string, loop:number = 9999) {

        if (GuideManager.getInstance().isGuiding)
            return;
        //console.log(key)
        if (!this.bgPlaying) return;
        if (this.bgKey == key) return;

	wx4_function(4210);
        this.bgKey = key;

        var url = "resource/sound/" + key + ".mp3"
        if (this.currentKey == url) return;
        this.currentKey = url;

        if (this.currentLoader) {
            this.onLoadError_3685({target: this.currentLoader})
        }
        this.stopBgSound()
        try {

	wx4_function(8556);
            this.tempLoop = loop;
            /*if(this.currentChannel && this.currentKey == url){
             return;
             }

             this.currentKey=url*/

	wx4_function(2275);
            var loader:egret.URLLoader = this.currentLoader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete_2892, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError_3685, this);
            loader.load(new egret.URLRequest(url));
        }
        catch (e) {
        }
    }
	private wx4_functionX_45929(){console.log(7221)}

    /************************************************************************************************** */

    private playTime:number;

    private onLoadComplete_2892(event:egret.Event):void {
        egret.clearTimeout(this.playTime);
	wx4_function(675);

        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        if (loader != this.currentLoader)
            return;

        var self = this;
	wx4_function(4973);
        try {
            this.onLoadError_3685(event);
            if ((this.currentKey && loader.data.url != this.currentKey) || !this._bgPlaying)
                return;
            if (this.currentChannel) {

	wx4_function(5407);
                self.currentChannel.stop();
                console.log('stopchannel', self.currentChannel.hashCode)
                self.currentChannel = null;

                if (!self._bgPlaying)return;
                this.playTime = setTimeout(()=> {
                    fun();
	wx4_function(2653);
                }, 150);
            }
            else
                fun();
        }
        catch (e) {
        }

        function fun() {
            var sound:egret.Sound = <egret.Sound>loader.data;
	wx4_function(2165);
            if (!sound)
                return;
            var channel:egret.SoundChannel = sound.play(0, self.tempLoop);
            if (self.currentChannel) {
                console.log('stopchannel2', self.currentChannel.hashCode)
                self.currentChannel.stop();
	wx4_function(2466);
            }
            self.currentChannel = channel;
            console.log('playchannel', channel.hashCode)

            channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onSoundComplete_5114, self);
        }

    }
	private wx4_functionX_45930(){console.log(2513)}

    private onSoundComplete_5114(event?:egret.Event):void {
        this.currentChannel = null;
        this.currentKey = null;

    }
	private wx4_functionX_45931(){console.log(6609)}

    private onLoadError_3685(event):void {
        this.currentLoader = null;
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        loader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete_2892, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError_3685, this);
	wx4_function(6945);
    }
}
    

