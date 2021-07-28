import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.Main {
    export class HeaderUI extends Dialog {
		public m_label_level:Laya.Label;
		public m_label_job:Laya.Label;
		public m_progress_hp:Laya.ProgressBar;
		public m_progress_mp:Laya.ProgressBar;
		public m_label_hp:Laya.Label;
		public m_label_mp:Laya.Label;
		public m_btn_buff:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":305,"height":128},"compId":1,"child":[{"type":"Image","props":{"y":-10,"x":80,"staticCache":true,"skin":"comp/main/header/image_fightbg.png","cacheAs":"bitmap"},"compId":13},{"type":"Image","props":{"y":16,"x":4,"staticCache":true,"skin":"comp/main/header/image_tao.png","cacheAs":"bitmap"},"compId":3},{"type":"Image","props":{"y":-2,"x":81,"staticCache":true,"skin":"comp/main/header/image_fight.png","cacheAs":"bitmap"},"compId":14},{"type":"Image","props":{"y":0,"x":0,"visible":true,"staticCache":true,"skin":"comp/main/header/bg_header.png","mouseThrough":true,"mouseEnabled":true,"hitTestPrior":true,"cacheAs":"bitmap"},"compId":2},{"type":"Label","props":{"y":104,"x":75,"width":29,"var":"m_label_level","text":"1","styleSkin":"comp/label.png","strokeColor":"#0a0909","stroke":1,"height":19,"fontSize":19,"font":"SimSun","color":"#f9f3f3","align":"center"},"compId":4},{"type":"Label","props":{"y":5,"x":5,"width":23,"var":"m_label_job","text":"法","styleSkin":"comp/label.png","strokeColor":"#0d0d0d","stroke":1,"height":12,"fontSize":20,"font":"SimSun","color":"#f8f1f1"},"compId":5},{"type":"ProgressBar","props":{"y":38,"x":89,"var":"m_progress_hp","value":1,"skin":"comp/main/header/progressBar_hp.png","mouseEnabled":false},"compId":7},{"type":"ProgressBar","props":{"y":54,"x":96,"var":"m_progress_mp","value":1,"skin":"comp/main/header/progressBar_mp.png","mouseEnabled":false},"compId":8},{"type":"Label","props":{"y":35,"x":94,"width":157,"var":"m_label_hp","text":"1000/1000","styleSkin":"comp/label.png","strokeColor":"#060606","stroke":1,"height":12,"fontSize":20,"font":"SimSun","color":"#f9f1f1","align":"center"},"compId":9},{"type":"Label","props":{"y":52,"x":95,"width":157,"var":"m_label_mp","text":"1000/1000","styleSkin":"comp/label.png","strokeColor":"#060606","stroke":1,"height":12,"fontSize":20,"font":"SimSun","color":"#f9f1f1","align":"center"},"compId":10},{"type":"Button","props":{"y":78,"x":110,"stateNum":1,"skin":"comp/main/header/button_pk.png","labelStroke":1,"labelSize":20,"labelColors":"#f9f3f3","labelAlign":"center","label":"和平"},"compId":11},{"type":"Button","props":{"y":78,"x":177,"var":"m_btn_buff","stateNum":1,"skin":"comp/main/header/button_buff.png","labelStroke":1,"labelSize":18,"labelColors":"#f9f3f3","labelAlign":"center","label":"BUFF"},"compId":12}],"loadList":["comp/main/header/image_fightbg.png","comp/main/header/image_tao.png","comp/main/header/image_fight.png","comp/main/header/bg_header.png","comp/label.png","comp/main/header/progressBar_hp.png","comp/main/header/progressBar_mp.png","comp/main/header/button_pk.png","comp/main/header/button_buff.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.HeaderUI.uiView);
        }
    }
}
module ui.Main {
    export class joyUI extends Dialog {
		public m_joy:Laya.Image;
        public static  uiView:any ={"type":"Dialog","props":{"width":123,"height":123},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/main/joy/image_joybg.png"},"compId":2},{"type":"Image","props":{"y":40,"x":39,"var":"m_joy","skin":"comp/main/joy/image_dir.png","scaleY":1,"scaleX":1},"compId":3}],"loadList":["comp/main/joy/image_joybg.png","comp/main/joy/image_dir.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.joyUI.uiView);
        }
    }
}
module ui.Main {
    export class joybtnUI extends Dialog {
		public m_btn_normalatk:Laya.Image;
		public m_btn_selectplayer:Laya.Button;
		public m_btn_selectmonster:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":300,"height":300},"compId":1,"child":[{"type":"Image","props":{"y":161,"x":158,"skin":"comp/main/joybtn/image_joybtnbg.png"},"compId":2},{"type":"Image","props":{"y":169,"x":164,"var":"m_btn_normalatk","skin":"comp/main/joybtn/image_joybtn.png"},"compId":3},{"type":"Button","props":{"y":154,"x":260,"var":"m_btn_selectplayer","stateNum":1,"skin":"comp/main/joybtn/button_selectplayer.png"},"compId":4,"child":[{"type":"Image","props":{"y":40,"x":16,"skin":"comp/main/joybtn/image_player.png","mouseThrough":true,"mouseEnabled":false},"compId":5}]},{"type":"Button","props":{"y":260,"x":149,"var":"m_btn_selectmonster","stateNum":1,"skin":"comp/main/joybtn/button_selectmonster.png"},"compId":6,"child":[{"type":"Image","props":{"y":14,"x":41,"skin":"comp/main/joybtn/image_monster.png","mouseThrough":true,"mouseEnabled":false},"compId":7}]}],"loadList":["comp/main/joybtn/image_joybtnbg.png","comp/main/joybtn/image_joybtn.png","comp/main/joybtn/button_selectplayer.png","comp/main/joybtn/image_player.png","comp/main/joybtn/button_selectmonster.png","comp/main/joybtn/image_monster.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.joybtnUI.uiView);
        }
    }
}
module ui.Main {
    export class loadingUI extends Dialog {
		public m_label_progress:Laya.Label;
        public static  uiView:any ={"type":"Dialog","props":{"width":1136,"height":640},"compId":1,"child":[{"type":"Image","props":{"y":175,"x":394,"skin":"comp/main/other/image_yiyi.png"},"compId":5},{"type":"Label","props":{"y":338,"x":464,"width":296,"var":"m_label_progress","text":"正在加载","styleSkin":"comp/label.png","height":21,"fontSize":32,"font":"SimSun","color":"#f6f0ef","bold":true,"align":"left"},"compId":2}],"loadList":["comp/main/other/image_yiyi.png","comp/label.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.loadingUI.uiView);
        }
    }
}
module ui.Main {
    export class logUI extends Dialog {
		public m_btn_clear:Laya.Button;
		public m_text_log:Laya.HTMLDivElement;
        public static  uiView:any ={"type":"Dialog","props":{"width":320,"height":320},"compId":1,"child":[{"type":"Button","props":{"y":6,"x":231,"var":"m_btn_clear","skin":"comp/main/log/button.png","label":"清除"},"compId":2},{"type":"HTMLDivElement","props":{"y":39,"x":4,"width":313,"var":"m_text_log","styleSkin":"comp/html.png","innerHTML":"htmlText","height":272},"compId":5}],"loadList":["comp/main/log/button.png","comp/html.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",Laya.HTMLDivElement);
            super.createChildren();
            this.createView(ui.Main.logUI.uiView);
        }
    }
}
module ui.Main {
    export class mainUI extends Dialog {
		public m_image_header:Laya.Image;
        public static  uiView:any ={"type":"Dialog","props":{"width":1136,"mouseThrough":true,"mouseEnabled":true,"height":640},"compId":1,"child":[{"type":"Image","props":{"y":6,"x":0,"var":"m_image_header","skin":"comp/main/main/image_top.png"},"compId":2}],"loadList":["comp/main/main/image_top.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.mainUI.uiView);
        }
    }
}
module ui.Main {
    export class minimapUI extends Dialog {
		public m_image_bg:Laya.Image;
		public m_label_mapname:Laya.Label;
		public m_label_point:Laya.Label;
        public static  uiView:any ={"type":"Dialog","props":{"width":159,"height":70},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"var":"m_image_bg","skin":"comp/main/minimap/image_bg.png"},"compId":2},{"type":"Label","props":{"y":3,"x":5,"width":143,"var":"m_label_mapname","text":"卡诺萨城","styleSkin":"comp/label.png","stroke":2,"mouseThrough":true,"mouseEnabled":false,"height":26,"fontSize":33,"font":"SimSun","color":"#e8f10c","align":"center"},"compId":3},{"type":"Label","props":{"y":34,"x":5,"width":143,"var":"m_label_point","text":"100 100","styleSkin":"comp/label.png","stroke":2,"mouseThrough":true,"mouseEnabled":false,"height":26,"fontSize":33,"font":"SimSun","color":"#e8f10c","align":"center"},"compId":4}],"loadList":["comp/main/minimap/image_bg.png","comp/label.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.minimapUI.uiView);
        }
    }
}
module ui.Main {
    export class npctalkUI extends Dialog {
		public m_text_npctalk:Laya.TextInput;
		public m_text_select1:Laya.Label;
		public m_text_select2:Laya.Label;
		public m_text_select3:Laya.Label;
		public m_text_select4:Laya.Label;
		public m_text_select5:Laya.Label;
		public m_btnClose:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":481,"height":304},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/main/npctalk/image_bg.png"},"compId":2},{"type":"Image","props":{"y":31,"x":10,"skin":"comp/main/npctalk/image_head1.png"},"compId":3},{"type":"Image","props":{"y":169,"x":342,"skin":"comp/main/npctalk/image_head.jpg"},"compId":4},{"type":"TextInput","props":{"y":21,"x":142,"wordWrap":false,"width":329,"var":"m_text_npctalk","type":"text","strokeColor":"#050100","stroke":2,"skin":"comp/textinput.png","multiline":true,"mouseEnabled":false,"height":145,"fontSize":18,"font":"SimSun","editable":false,"color":"#f3f308"},"compId":9},{"type":"Label","props":{"y":171,"x":17,"width":315,"var":"m_text_select1","underline":true,"text":"label","styleSkin":"comp/label.png","height":22,"fontSize":18,"font":"SimSun","color":"#e1f404"},"compId":15},{"type":"Label","props":{"y":198,"x":16,"width":315,"var":"m_text_select2","underline":true,"text":"label","styleSkin":"comp/label.png","height":22,"fontSize":18,"font":"SimSun","color":"#e1f404"},"compId":16},{"type":"Label","props":{"y":224,"x":16,"width":315,"var":"m_text_select3","underline":true,"text":"label","styleSkin":"comp/label.png","height":22,"fontSize":18,"font":"SimSun","color":"#e1f404"},"compId":17},{"type":"Label","props":{"y":250,"x":16,"width":315,"var":"m_text_select4","underline":true,"text":"label","styleSkin":"comp/label.png","height":22,"fontSize":18,"font":"SimSun","color":"#e1f404"},"compId":18},{"type":"Label","props":{"y":276,"x":16,"width":315,"var":"m_text_select5","underline":true,"text":"label","styleSkin":"comp/label.png","height":22,"fontSize":18,"font":"SimSun","color":"#e1f404"},"compId":20},{"type":"Button","props":{"y":4,"x":454,"width":18,"var":"m_btnClose","stateNum":1,"skin":"comp/main/npctalk/button_close.jpg","height":17},"compId":21}],"loadList":["comp/main/npctalk/image_bg.png","comp/main/npctalk/image_head1.png","comp/main/npctalk/image_head.jpg","comp/textinput.png","comp/label.png","comp/main/npctalk/button_close.jpg"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.npctalkUI.uiView);
        }
    }
}
module ui.Main {
    export class shortcutUI extends Dialog {
		public m_btn_role:Laya.Button;
		public m_btn_bag:Laya.Button;
		public m_btn_skill:Laya.Button;
		public m_btn_friend:Laya.Button;
		public m_btn_guild:Laya.Button;
		public m_btn_system:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{},"compId":1,"child":[{"type":"Button","props":{"y":-2,"x":3,"var":"m_btn_role","stateNum":1,"skin":"comp/main/shortcut/button_role.png"},"compId":2,"child":[{"type":"Image","props":{"y":54,"x":4,"skin":"comp/main/shortcut/image_role.png"},"compId":3}]},{"type":"Button","props":{"y":-9,"x":83,"var":"m_btn_bag","stateNum":1,"skin":"comp/main/shortcut/button_bag.png"},"compId":4,"child":[{"type":"Image","props":{"y":61,"x":16,"skin":"comp/main/shortcut/image_bag.png"},"compId":6}]},{"type":"Button","props":{"y":2,"x":173,"var":"m_btn_skill","stateNum":1,"skin":"comp/main/shortcut/button_skill.png"},"compId":7,"child":[{"type":"Image","props":{"y":52,"x":19,"skin":"comp/main/shortcut/image_skill.png"},"compId":8}]},{"type":"Button","props":{"y":0,"x":270,"var":"m_btn_friend","stateNum":1,"skin":"comp/main/shortcut/button_friend.png"},"compId":9,"child":[{"type":"Image","props":{"y":53,"x":16,"skin":"comp/main/shortcut/image_friend.png"},"compId":10}]},{"type":"Button","props":{"y":4,"x":359,"var":"m_btn_guild","stateNum":1,"skin":"comp/main/shortcut/button_guild.png"},"compId":11,"child":[{"type":"Image","props":{"y":48,"x":22,"skin":"comp/main/shortcut/image_guild.png"},"compId":12}]},{"type":"Button","props":{"y":1,"x":457,"var":"m_btn_system","stateNum":1,"skin":"comp/main/shortcut/button_system.png"},"compId":13,"child":[{"type":"Image","props":{"y":52,"x":18,"skin":"comp/main/shortcut/image_system.png"},"compId":14}]}],"loadList":["comp/main/shortcut/button_role.png","comp/main/shortcut/image_role.png","comp/main/shortcut/button_bag.png","comp/main/shortcut/image_bag.png","comp/main/shortcut/button_skill.png","comp/main/shortcut/image_skill.png","comp/main/shortcut/button_friend.png","comp/main/shortcut/image_friend.png","comp/main/shortcut/button_guild.png","comp/main/shortcut/image_guild.png","comp/main/shortcut/button_system.png","comp/main/shortcut/image_system.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.shortcutUI.uiView);
        }
    }
}
module ui.Main {
    export class topheaderUI extends Dialog {
		public m_label_gold:Laya.Label;
		public m_label_yuanbao:Laya.Label;
		public m_label_bindgold:Laya.Label;
		public m_label_bindyuanbao:Laya.Label;
        public static  uiView:any ={"type":"Dialog","props":{"width":1136,"height":33},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"width":1334,"skin":"comp/main/topheader/image_bg.png"},"compId":2},{"type":"Image","props":{"y":5,"x":20,"skin":"comp/main/topheader/image_textbg.png"},"compId":3},{"type":"Image","props":{"y":5,"x":180,"skin":"comp/main/topheader/image_textbg.png"},"compId":4},{"type":"Image","props":{"y":5,"x":340,"skin":"comp/main/topheader/image_textbg.png"},"compId":5},{"type":"Image","props":{"y":5,"x":500,"skin":"comp/main/topheader/image_textbg.png"},"compId":6},{"type":"Image","props":{"y":8,"x":26,"skin":"comp/main/topheader/image_gold.png"},"compId":7},{"type":"Image","props":{"y":10,"x":185,"skin":"comp/main/topheader/image_yuanbao.png"},"compId":8},{"type":"Image","props":{"y":7,"x":345,"skin":"comp/main/topheader/image_bindgold.png"},"compId":9},{"type":"Image","props":{"y":9,"x":504,"skin":"comp/main/topheader/image_bindyuanbao.png"},"compId":10},{"type":"Label","props":{"y":5,"x":48,"width":95,"var":"m_label_gold","text":"111111","styleSkin":"comp/label.png","strokeColor":"#0a0909","stroke":1,"height":25,"fontSize":25,"font":"SimSun","color":"#fbf6f6","align":"left"},"compId":11},{"type":"Label","props":{"y":5,"x":210,"width":95,"var":"m_label_yuanbao","text":"111111","styleSkin":"comp/label.png","strokeColor":"#0a0909","stroke":1,"height":25,"fontSize":25,"font":"SimSun","color":"#fbf6f6","align":"left"},"compId":13},{"type":"Label","props":{"y":5,"x":369,"width":95,"var":"m_label_bindgold","text":"111111","styleSkin":"comp/label.png","strokeColor":"#0a0909","stroke":1,"height":25,"fontSize":25,"font":"SimSun","color":"#fbf6f6","align":"left"},"compId":14},{"type":"Label","props":{"y":5,"x":532,"width":95,"var":"m_label_bindyuanbao","text":"111111","styleSkin":"comp/label.png","strokeColor":"#0a0909","stroke":1,"height":25,"fontSize":25,"font":"SimSun","color":"#fbf6f6","align":"left"},"compId":15}],"loadList":["comp/main/topheader/image_bg.png","comp/main/topheader/image_textbg.png","comp/main/topheader/image_gold.png","comp/main/topheader/image_yuanbao.png","comp/main/topheader/image_bindgold.png","comp/main/topheader/image_bindyuanbao.png","comp/label.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Main.topheaderUI.uiView);
        }
    }
}
module ui.Scene {
    export class LoginUI extends View {
		public m_btnEnter:Laya.Button;
		public m_TextPaswd:Laya.TextInput;
		public m_TextUser:Laya.TextInput;
        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/scene/login/image_bg.png"},"compId":10},{"type":"Image","props":{"y":227,"x":405,"skin":"comp/scene/login/image_login.png"},"compId":3,"child":[{"type":"Button","props":{"y":146,"x":117,"var":"m_btnEnter","skin":"comp/scene/login/btn_enter.png"},"compId":7},{"type":"TextInput","props":{"y":101,"x":83,"width":149,"var":"m_TextPaswd","text":"yiyibushe","skin":"comp/textinput.png","height":22,"fontSize":18,"font":"SimSun","color":"#ffffff"},"compId":6},{"type":"TextInput","props":{"y":67,"x":83,"width":149,"var":"m_TextUser","text":"yiyi","skin":"comp/textinput.png","height":22,"fontSize":18,"font":"SimSun","color":"#ffffff"},"compId":5}]}],"loadList":["comp/scene/login/image_bg.png","comp/scene/login/image_login.png","comp/scene/login/btn_enter.png","comp/textinput.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Scene.LoginUI.uiView);
        }
    }
}
module ui.Scene {
    export class createroleUI extends View {
		public m_warrior_man:Laya.Image;
		public m_warrior_woman:Laya.Image;
		public m_mage_man:Laya.Image;
		public m_mage_woman:Laya.Image;
		public m_tao_man:Laya.Image;
		public m_tao_woman:Laya.Image;
		public m_ImageCreate:Laya.Image;
		public m_TextName:Laya.TextInput;
        public static  uiView:any ={"type":"View","props":{"width":1024,"height":768},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/scene/createrole/00000.png"},"compId":2},{"type":"Image","props":{"y":158,"x":110,"var":"m_warrior_man","skin":"comp/scene/createrole/00011.png"},"compId":3},{"type":"Image","props":{"y":157,"x":242,"var":"m_warrior_woman","skin":"comp/scene/createrole/00009.png"},"compId":4},{"type":"Image","props":{"y":155,"x":374,"var":"m_mage_man","skin":"comp/scene/createrole/00007.png"},"compId":5},{"type":"Image","props":{"y":159,"x":506,"var":"m_mage_woman","skin":"comp/scene/createrole/00005.png"},"compId":6},{"type":"Image","props":{"y":156,"x":637,"var":"m_tao_man","skin":"comp/scene/createrole/00015.png"},"compId":7},{"type":"Image","props":{"y":158,"x":768,"var":"m_tao_woman","skin":"comp/scene/createrole/00013.png"},"compId":8},{"type":"Image","props":{"y":555,"x":371,"var":"m_ImageCreate","skin":"comp/scene/createrole/00355.png"},"compId":9},{"type":"TextInput","props":{"y":520,"x":409,"width":157,"var":"m_TextName","type":"text","text":"后天","skin":"comp/textinput.png","height":22,"fontSize":21,"font":"SimSun","color":"#ffffff"},"compId":10}],"loadList":["comp/scene/createrole/00000.png","comp/scene/createrole/00011.png","comp/scene/createrole/00009.png","comp/scene/createrole/00007.png","comp/scene/createrole/00005.png","comp/scene/createrole/00015.png","comp/scene/createrole/00013.png","comp/scene/createrole/00355.png","comp/textinput.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Scene.createroleUI.uiView);
        }
    }
}
module ui.Scene {
    export class loadingUI extends View {
		public m_Progress:Laya.ProgressBar;
        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/scene/loading/iamge_bg.png"},"compId":9},{"type":"ProgressBar","props":{"y":613,"x":258,"var":"m_Progress","skin":"comp/scene/loading/progressBar_q.png"},"compId":7,"child":[{"type":"Image","props":{"y":-32,"x":-37,"skin":"comp/scene/loading/GameStart_ProgressBar_Bg.png"},"compId":8}]}],"loadList":["comp/scene/loading/iamge_bg.png","comp/scene/loading/progressBar_q.png","comp/scene/loading/GameStart_ProgressBar_Bg.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Scene.loadingUI.uiView);
        }
    }
}
module ui.Window {
    export class MapUI extends Dialog {
		public m_image_bg:Laya.Image;
		public m_list_npc:Laya.List;
		public m_btn_close:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":1334,"height":750},"compId":1,"child":[{"type":"Image","props":{"y":146,"x":224,"skin":"comp/dialog/map/image_bg.png"},"compId":5},{"type":"Image","props":{"y":194,"x":266,"var":"m_image_bg","skin":"comp/dialog/map/image_ng.png"},"compId":6},{"type":"Image","props":{"y":234,"x":963,"skin":"comp/dialog/map/image_jiu.png"},"compId":7},{"type":"List","props":{"y":277,"x":961,"width":124,"var":"m_list_npc","vScrollBarSkin":"comp/dialog/map/vscroll.png","selectEnable":true,"repeatX":1,"height":336},"compId":9,"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"compId":11,"child":[{"type":"Label","props":{"y":0,"x":0,"text":"依依","strokeColor":"#080808","stroke":1,"name":"label","fontSize":18,"font":"SimSun","color":"#f6f0ef"},"compId":12}]}]},{"type":"Button","props":{"y":150,"x":1139,"var":"m_btn_close","stateNum":1,"skin":"comp/main/other/button_close.png"},"compId":13}],"loadList":["comp/dialog/map/image_bg.png","comp/dialog/map/image_ng.png","comp/dialog/map/image_jiu.png","comp/dialog/map/vscroll.png","comp/main/other/button_close.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Window.MapUI.uiView);
        }
    }
}
module ui.Window {
    export class itemtipsUI extends Dialog {
		public m_image_bg:Laya.Image;
		public m_label_name:Laya.Label;
		public m_btn_close:Laya.Button;
		public m_image_icon:Laya.Image;
		public m_btn_1:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{},"compId":1,"child":[{"type":"Image","props":{"y":1,"x":1,"width":318,"var":"m_image_bg","skin":"comp/dialog/itemtips/image_bg.png","sizeGrid":"11,11,11,11","height":78,"alpha":0.5},"compId":2},{"type":"Label","props":{"y":14,"x":93,"width":103,"var":"m_label_name","text":"斩首者","styleSkin":"comp/label.png","strokeColor":"#080808","stroke":1,"mouseEnabled":false,"height":25,"fontSize":24,"font":"SimSun","color":"#f8f3f3","align":"center"},"compId":3},{"type":"Label","props":{"y":51,"x":98,"width":103,"underlineColor":"#080808","text":"糖糖糖糖糖糖糖糖糖糖糖糖糖糖","styleSkin":"comp/label.png","strokeColor":"#060606","stroke":1,"height":25,"color":"#f8f3f3"},"compId":4},{"type":"Button","props":{"y":3,"x":268,"var":"m_btn_close","stateNum":1,"skin":"comp/main/other/button_close.png"},"compId":5},{"type":"Image","props":{"y":8,"x":12,"width":64,"var":"m_image_icon","skin":"comp/dialog/itemtips/image_bg.png","height":64},"compId":6},{"type":"Image","props":{"y":99,"x":215,"visible":false,"skin":"comp/dialog/itemtips/image_egg.jpg"},"compId":7},{"type":"Button","props":{"y":42,"x":96,"var":"m_btn_1","stateNum":1,"skin":"comp/main/other/button_1.png","labelSize":28,"labelFont":"SimSun","labelColors":"FFFFFF","label":"label"},"compId":8}],"loadList":["comp/dialog/itemtips/image_bg.png","comp/label.png","comp/main/other/button_close.png","comp/dialog/itemtips/image_egg.jpg","comp/main/other/button_1.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Window.itemtipsUI.uiView);
        }
    }
}
module ui.Window {
    export class roleUI extends Dialog {
		public m_btn_close:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":1334,"height":750},"compId":1,"child":[{"type":"Image","props":{"y":125,"x":180,"skin":"comp/dialog/role/image_bg.png"},"compId":2},{"type":"Button","props":{"y":129,"x":1112,"var":"m_btn_close","stateNum":1,"skin":"comp/main/other/button_close.png"},"compId":3},{"type":"Image","props":{"y":166,"x":207,"width":468,"skin":"comp/dialog/role/image_nk.png","sizeGrid":"15,15,16,16","height":468},"compId":4},{"type":"Image","props":{"y":167,"x":672,"width":468,"skin":"comp/dialog/role/image_nk.png","sizeGrid":"15,15,16,16","height":360},"compId":5},{"type":"Image","props":{"y":521,"x":674,"width":468,"skin":"comp/dialog/role/image_nk.png","sizeGrid":"15,15,16,16","height":107},"compId":6},{"type":"Button","props":{"y":533,"x":687,"stateNum":1,"skin":"comp/dialog/role/button_style.png","label":"label"},"compId":8},{"type":"Button","props":{"y":537,"x":832,"stateNum":1,"skin":"comp/dialog/role/button_style.png","label":"label"},"compId":9},{"type":"Button","props":{"y":531,"x":975,"stateNum":1,"skin":"comp/dialog/role/button_style.png","label":"label"},"compId":10},{"type":"Image","props":{"y":208,"x":197,"skin":"comp/dialog/role/image_bg2.png"},"compId":11},{"type":"Image","props":{"y":-23,"x":312,"skin":"comp/yiyi.JPG"},"compId":13}],"loadList":["comp/dialog/role/image_bg.png","comp/main/other/button_close.png","comp/dialog/role/image_nk.png","comp/dialog/role/button_style.png","comp/dialog/role/image_bg2.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Window.roleUI.uiView);
        }
    }
}
module ui.Window {
    export class skillUI extends Dialog {
		public m_btn_close:Laya.Button;
        public static  uiView:any ={"type":"Dialog","props":{"width":1136,"height":640},"compId":1,"child":[{"type":"Image","props":{"y":74,"x":120,"skin":"comp/dialog/skill/image_bg.png"},"compId":2},{"type":"Button","props":{"y":77,"x":1042,"var":"m_btn_close","stateNum":1,"skin":"comp/main/other/button_close.png"},"compId":3},{"type":"Image","props":{"y":208,"x":192,"skin":"comp/dialog/skill/image_bg2.png"},"compId":5}],"loadList":["comp/dialog/skill/image_bg.png","comp/main/other/button_close.png","comp/dialog/skill/image_bg2.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Window.skillUI.uiView);
        }
    }
}