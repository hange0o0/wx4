class ShareTool {
    private static SHARE_KEYS = ["ACT_TYPE","FROM_SERVER","FROM_USER","ACT_ITEMID","ACT_MODE","CHANGE_S"];//注意，还有顺序之分，只能在数组后面添加顺序

    /**
     * 分享
     */
    public static share(title, imgUrl,shareArgs,success?,mustSuccess?){
        if(DEBUG){
            //if(!shareArgs || !shareArgs.ACT_TYPE){
            //    console.error("需要配置 ACT_TYPE");
            //}
            if(DEBUG && shareArgs){
                var ss = [];
                for(var key in shareArgs){
                    ss.push(key + "=" + shareArgs[key]);

                    if(DEBUG && ShareTool.SHARE_KEYS.indexOf(key) == -1){
                        console.warn("SHARE_KEYS未配置该参数：" + key);
                    }
                }
                console.log("分享参数：" + ss.join("&"));
                console.log("title：" + title);
                console.log("imgUrl：" + imgUrl);
            }
            DEBUG && MyWindow.ShowTips('分享成功');
            if(success) success();
            //let ssetvo = CMQU.wxsSet.getObject(shareArgs.ACT_TYPE);
            /*if(success && ssetvo && ssetvo.share2time && ConfigP.opShaChecK(shareArgs.ACT_TYPE)){
             ssetvo.isShareing = true;
             checkShareFun && checkShareFun();
             MyAlertQueen.showTip(ssetvo.sharetips, null, 5000);
             egret.setTimeout(()=>{
             ssetvo.isShareing = false;
             success();
             }, this, ssetvo.share2time * 1000);
             ShareTool.successToServer(shareArgs, "1");
             return;
             }*/
            // if(success) success();
            // ShareTool.successToServer(shareArgs, "1");
            //ShareTool.exucteSuccess(ssetvo, shareArgs, success);
            return;
        }
        //WXAddCode.execute();
        //if(MobileQU.isWXGame){
        //    if(!title){
        //        var vo = CMQU.shareData.getOne(1, {name:UMQU.nick});
        //        title = vo[0];
        //    }
            //imgUrl 这里imgurl只能穿大图，传小图放大来不好看，所以不传
            //if(!imgUrl) imgUrl = AppFunQueen.e.getDefaultImg();

            //let wx_shareBack = ConfigQU.appData.wx_shareBack;
            //if(wx_shareBack){
            //}
            //else{
                //7月5日起新提交的版本，用户从小程序、小游戏中分享消息给好友时，开发者将无法获知用户是否分享完成，也无法在分享后立即获得群ID
                let addPath = ''//AppFunQueen.formatShareArg();

            var wx = window['wx'];
        //console.log(title)
        //console.log(imgUrl)
        //console.log(ObjectUtil.join(shareArgs))
        var shareTime = egret.getTimer();
        var failText = '分享失败！建议分享受到其它群试试'
        GameManager.getInstance().onShowFun = function(){
            if(mustSuccess || !UM.shareFail)
            {
                success && success();
                return;
            }
            var cd = egret.getTimer()-shareTime;
            if(cd < 2500)
            {
                GameManager.getInstance().shareFailTime ++;
                MyWindow.ShowTips(failText)
                return;
            }

            if(GameManager.getInstance().shareFailTime < 3)
            {
                if(Math.random()*(GameManager.getInstance().shareFailTime+1) < 0.8)
                {
                    GameManager.getInstance().shareFailTime ++;
                    MyWindow.ShowTips(failText)
                    return;
                }
            }

            GameManager.getInstance().shareFailTime = 0;
            success && success();
        }

        wx.shareAppMessage({
            title:title,
            imageUrl:imgUrl,
            query:ObjectUtil.join(shareArgs),
            cancel:()=>{
                GameManager.getInstance().onShowFun = null;
            }
        })


                //platform.shareMessage(title, imgUrl, ObjectUtil.join(shareArgs) + addPath);
                //AppFunQueen.e.app_success = (hideTime)=>{
                //    if(success) success();
                //    //let ssetvo = CMQU.wxsSet.getObject(shareArgs.ACT_TYPE);
                //    //if(!ssetvo || !ssetvo.share2time || (ssetvo.share2time <= hideTime*1000)){
                //    //    ShareTool.exucteSuccess(ssetvo, shareArgs, success);
                //    //}
                //};
                //AppFunQueen.e.app_faile = faile;
            //}
        //    return;
        //}
    }



    private static videoAD
    private static adSuccFun;
    public static openGDTV(success?){
        if(DEBUG) {
            console.log('视频广告');
            success && success();
            return
        }
        this.adSuccFun = success;
        //if(MobileQU.isWXGame){ //视频广告，需要基础库版本号 >= 2.0.4
        if(!window["wx"].createRewardedVideoAd){
            MyWindow.Alert('暂不支持视频广告')
        }
        if(window["wx"].isPlayAD) return;//不能重复触发，否则会触发error
        window["wx"].isPlayAD = true;


        let errorFun = (res)=>{
            window["wx"].isPlayAD = false
        }
        let close = (res) => {
            if(!res || res.isEnded){ //部分版本（比如：2.0.9，不能提前关闭广告）播放完成回调res为undefined，故没有res当做成功
                success && success();
            }
            window["wx"].isPlayAD = false
        };
        let adid = 'adunit-927ee662776f3dcc';//ADUI.getADID(adindex)// || ConfigQU.appData.wx_adtvCode;//'adunit-b0ef44339fa585f0';
        if(!this.videoAD)
        {
            this.videoAD = window["wx"].createRewardedVideoAd({ adUnitId: adid });
            this.videoAD.onClose(close);
            this.videoAD.onError(errorFun);
        }
        this.videoAD.load().then(() =>this.videoAD.show()).catch(err => {
            ChangeJumpUI.getInstance().show('没有可观看的广告，体验以上小程序30秒也可获得',success)
            //MyWindow.ShowTips('没有可观看的广告，请稍后再尝试')
            window["wx"].isPlayAD = false
        })
    }

    //是否支持播放视频广告
    //默认canPay=false，表示改渠道支持播放广告，但当前播放不了，提示版本升级； true时严格判断当前是不是可以播广告
    public static canOpenGDTV(canPay?){
        if(DEBUG && !_get["noTV"]) return true;

        /*if(Mobile.isWanBa){
         var ver = getQzoneVerCode();
         if(canPay && (!isQQChannel() || ver < 70205) ){
         return false;
         };
         return true;
         }*/
        //if(ConfigQU.isWxTestVersion && ConfigQU.appData["wx_openWDTVTest"] != undefined){
        //    ConfigQU.appData.wx_openWDTV = ConfigQU.appData["wx_openWDTVTest"];
        //    delete ConfigQU.appData["wx_openWDTVTest"];
        //}
        //if(MobileQU.isWXGame && ConfigQU.appData.wx_openWDTV){
            return window["wx"] && window["wx"].createRewardedVideoAd != null;
        //}

        return false;
    }
}