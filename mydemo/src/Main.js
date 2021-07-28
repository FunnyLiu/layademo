import GameConfig from "./GameConfig";
class Main {
	constructor() {
		const Stage = Laya.Stage;
		const Browser = Laya.Browser;
		//根据IDE设置初始化引擎		
		Laya.init(1136, 640, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();

		Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;

		Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;

	
		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;
		// 30帧
        Laya.stage.frameRate = "slow";
		//背景色
		// Laya.stage.bgColor = "#232628";

		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));

		//加载背景音乐 ，不能自动播放，由于浏览器用户体验的限制
		Laya.SoundManager.playMusic("res/sounds/bgm.mp3", 0, null)

	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

		// this.showText();
	}
	//展示文本
	showText() {
		const Text = Laya.Text;

		let text = new Text();

		text.text = "Orientation-Landscape";
		text.color = "gray";
		text.font = "Impact";
		text.fontSize = 50;

		text.x = Laya.stage.width - text.width >> 1;
		text.y = Laya.stage.height - text.height >> 1;

		Laya.stage.addChild(text);
	}
}
//激活启动类
new Main();
