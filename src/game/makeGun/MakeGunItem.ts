class MakeGunItem extends game.BaseItem{

    private bg2: eui.Image;
    private bg: eui.Image;
    private mc: eui.Image;
    private mc2: eui.Image;
    private lvText: eui.Label;
    private nameText: eui.Label;
    private skillText: eui.Label;
    private splitMC: eui.Image;


    public constructor() {
        super();
        this.skinName = "MakeGunItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,()=>{
            var GM = GunManager.getInstance();
            var lv = GM.getGunLevel(this.data)
            if(lv)
            {
                MakeGunInfoUI.getInstance().show(this.data,MakeGunUI.getInstance().myGuns)
            }
            else
            {
                MakeBeforeUI.getInstance().show(this.data)
            }
        })

    }

    public dataChanged():void {
        var GM = GunManager.getInstance();

        var lv = GM.getGunLevel(this.data)
        var vos = GM.getVOs(this.data);
        if(lv == 0)
            this.bg.source = 'role_1_png'
        else
            this.bg.source = 'role_'+(lv%8 || 8)+'_png'
        this.bg2.visible = lv > 8
        if(this.bg2.visible)
            this.bg2.source = 'role_'+Math.floor(lv/8)+'_png';


        this.mc.source = vos.vo1.getThumb()
        this.mc2.visible = vos.vo2 != null
        if(this.mc2.visible)
            this.mc2.source = vos.vo2.getThumb()

        this.skillText.text = GM.getGunTitle(this.data)
        if(lv)
        {
            this.splitMC.visible = false
            this.lvText.text =  'LV.' + lv;
        }
        else
        {
            this.splitMC.visible = true
            var atk = Math.floor(GM.getGunAtk(this.data)/GM.getGunSpeed(this.data))
            this.lvText.text =  atk + ' /秒'
        }

        this.nameText.text = GM.getGunName(this.data)
    }

    public move(){
        this.mc.rotation -= 20;
    }

}