/**
 *
 * @author 
 *
 */
class SoundManager {
	private wx4_functionX_54614(){console.log(8662)}
    private static instance:SoundManager;

    public constructor() {
        this.init_7107();
    }

	private wx4_functionX_54615(){console.log(7)}
    public static getInstance():SoundManager {
        if (!this.instance)
            this.instance = new SoundManager();
        return this.instance;
    }

    //默认关闭音乐
	private wx4_functionX_54616(){console.log(401)}
    private _soundPlaying:boolean = false;
    private _bgPlaying:boolean = false;
    private _openShake:boolean = true;
    private _isPlayMovie:boolean = true;
    private _isMessage:boolean = true;

	private wx4_functionX_54617(){console.log(2634)}
    private currentChannel:egret.SoundChannel;
    private currentKey:string;
    private wxChannel;
    private bgKey:string;
    private lastBGKey:string;
    private isLoad:boolean = false;


	private wx4_functionX_54618(){console.log(41)}
    private bgTimer;
    public pkKey = [];
    public effectKey = [];

    public lastSoundTime = {};
    // private tween:egret.Tween

	private wx4_functionX_54619(){console.log(3421)}
    public currentLoader;

    private init_7107() {
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

	wx4_function(2090);
        var som = SharedObjectManager_wx4.getInstance();
        if (som.getValue("sound") != undefined)
            this._soundPlaying = som.getValue("sound");
        if (som.getValue("bgsound") != undefined)
            this._bgPlaying = som.getValue("bgsound");

        if (som.getValue("openShake") != undefined)
            this._openShake = som.getValue("openShake");
	wx4_function(7298);
        if (som.getValue("playMovie") != undefined)
            this._isPlayMovie = som.getValue("playMovie");
        if (som.getValue("showMessage") != undefined)
            this._isMessage = som.getValue("showMessage");

        this.isLoad = this._soundPlaying;
	wx4_function(1031);
    }

    public get soundPlaying() {
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._soundPlaying
    }

	private wx4_functionX_54620(){console.log(9854)}
    public get bgPlaying() {
        // if(!Config.isDebug && !Config.testSound) return false;
        return this._bgPlaying
    }

    public get openShake() {
        return this._openShake
    }
	private wx4_functionX_54621(){console.log(2613)}

    public get isPlayMovie() {
        return this._isPlayMovie
    }

    public get isMessage() {
        return this._isMessage
    }
	private wx4_functionX_54622(){console.log(4697)}

    public set soundPlaying(v) {
        if (this._soundPlaying != v)
            SharedObjectManager_wx4.getInstance().setValue("sound", v)
        this._soundPlaying = v;
        //this.loadEffectSound();
    }
	private wx4_functionX_54623(){console.log(7043)}

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
	private wx4_functionX_54624(){console.log(5979)}

    public set openShake(v) {
        if (this._openShake != v)
            SharedObjectManager_wx4.getInstance().setValue("openShake", v)
        this._openShake = v;
    }
	private wx4_functionX_54625(){console.log(3856)}

    public set isPlayMovie(v) {
        if (this._isPlayMovie != v)
            SharedObjectManager_wx4.getInstance().setValue("playMovie", v)
        this._isPlayMovie = v;
    }
	private wx4_functionX_54626(){console.log(2786)}

    public set isMessage(v) {
        if (this._isMessage != v)
            SharedObjectManager_wx4.getInstance().setValue("showMessage", v)
        this._isMessage = v;
    }
	private wx4_functionX_54627(){console.log(4874)}

    public addBtnClickEffect(btn:egret.DisplayObject) {
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playBtn, this)
    }

    public playBtn() {
        this.playEffect('btn');
	wx4_function(9615);
    }

    public testBGPlay() {
        if (PKingUI.getInstance().stage)
            this.playSound('bg2')
        else
            this.playSound('bg')
    }
	private wx4_functionX_54628(){console.log(6764)}

    public stopBgSound() {
        this.lastBGKey = this.bgKey;
        this.bgKey = null;
        if(window['wx'])
        {
            if(this.wxChannel) {
                this.wxChannel.destroy()
                this.wxChannel = null
            }
            this.currentKey = null;
            return;
        }
        try {
            // if(this.tween){
            //     this.tween.pause();
            //     this.tween = null;
            // }

	wx4_function(5362);
            egret.clearTimeout(this.playTime);
            if (this.currentChannel) {
                egret.Tween.removeTweens(this.currentChannel);
                this.currentChannel.stop();
                console.log('stopchannel', this.currentChannel.hashCode)
            }
            this.onSoundComplete_2596();
	wx4_function(8609);
        } catch (e) {
        }
    }

    public playEffect(v:string, fun?, thisObj?) {
        //if(v == 'enemy_dead')
        //    throw new Error('1234')
        if (GuideManager.getInstance().isGuiding)
            return;
        if (!this.soundPlaying) return;
        if (this.lastSoundTime[v] && egret.getTimer() - this.lastSoundTime[v] < 200)
            return;
        if (v == 'die' && this.lastSoundTime[v] && egret.getTimer() - this.lastSoundTime[v] < 2000)
            return;
        this.lastSoundTime[v] = egret.getTimer();
        if(window['wx'])
        {
            const innerAudioContext = window['wx'].createInnerAudioContext()
            innerAudioContext.autoplay = true
            innerAudioContext.src = "resource/sound/" + v +".mp3";
            return;
        }

        //console.log('call:',v)
        var url = "resource/sound/" + v + ".mp3"
        var loader:egret.URLLoader = new egret.URLLoader();
	wx4_function(1785);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.once(egret.Event.COMPLETE, ()=> {
            var sound:egret.Sound = <egret.Sound>loader.data;
            var channel = sound.play(0, 1);
            //console.log(v)
            if (fun)
                channel.once(egret.Event.SOUND_COMPLETE, fun, thisObj)
        }, this);
	wx4_function(9916);
        loader.load(new egret.URLRequest(url));
    }

    public resumeSound() {
        if (this.lastBGKey)
            this.playSound(this.lastBGKey);
	wx4_function(4590);
    }

    private tempLoop:number;

    public playSound(key:string, loop:number = 9999) {

        if (GuideManager.getInstance().isGuiding)
            return;
        //console.log(key)
        if (!this.bgPlaying) return;
        if (this.bgKey == key) return;

	wx4_function(7511);


        var url = "resource/sound/" + key + ".mp3"
        if (this.currentKey == url) return;


        if (this.currentLoader) {
            this.onLoadError_7808({target: this.currentLoader})
        }
        this.stopBgSound()
        this.bgKey = key;
        this.currentKey = url;

        if(window['wx'])
        {
            const innerAudioContext = this.wxChannel = window['wx'].createInnerAudioContext()
            innerAudioContext.autoplay = true
            innerAudioContext.src =url;
            innerAudioContext.loop =true;
            return;
        }


        try {

	wx4_function(372);
            this.tempLoop = loop;
            /*if(this.currentChannel && this.currentKey == url){
             return;
             }

             this.currentKey=url*/

	wx4_function(6841);
            var loader:egret.URLLoader = this.currentLoader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete_3110, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError_7808, this);
            loader.load(new egret.URLRequest(url));
        }
        catch (e) {
        }
    }
	private wx4_functionX_54629(){console.log(1229)}

    /************************************************************************************************** */

    private playTime:number;

    private onLoadComplete_3110(event:egret.Event):void {
        egret.clearTimeout(this.playTime);
	wx4_function(1738);

        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        if (loader != this.currentLoader)
            return;

        var self = this;
	wx4_function(7884);
        try {
            this.onLoadError_7808(event);
            if ((this.currentKey && loader.data.url != this.currentKey) || !this._bgPlaying)
                return;
            if (this.currentChannel) {

	wx4_function(1251);
                self.currentChannel.stop();
                console.log('stopchannel', self.currentChannel.hashCode)
                self.currentChannel = null;

                if (!self._bgPlaying)return;
                this.playTime = setTimeout(()=> {
                    fun();
	wx4_function(7731);
                }, 150);
            }
            else
                fun();
        }
        catch (e) {
        }

        function fun() {
            var sound:egret.Sound = <egret.Sound>loader.data;
	wx4_function(6416);
            if (!sound)
                return;
            var channel:egret.SoundChannel = sound.play(0, self.tempLoop);
            if (self.currentChannel) {
                console.log('stopchannel2', self.currentChannel.hashCode)
                self.currentChannel.stop();
	wx4_function(9270);
            }
            self.currentChannel = channel;
            console.log('playchannel', channel.hashCode)

            channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onSoundComplete_2596, self);
        }

    }
	private wx4_functionX_54630(){console.log(8172)}

    private onSoundComplete_2596(event?:egret.Event):void {
        this.currentChannel = null;
        this.currentKey = null;

    }
	private wx4_functionX_54631(){console.log(3938)}

    private onLoadError_7808(event):void {
        this.currentLoader = null;
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        loader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete_3110, this);
        loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError_7808, this);
	wx4_function(2608);
    }
}
    

