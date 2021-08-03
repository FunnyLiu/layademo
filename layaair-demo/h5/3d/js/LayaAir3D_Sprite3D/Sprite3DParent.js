class Sprite3DParent 
{
	constructor() 
	{
		//初始化引擎
		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		//显示性能面板
		Laya.Stat.show();
		
		//创建场景
		this.scene = new Laya.Scene3D();
		Laya.stage.addChild(this.scene);
		
		//创建相机
		let camera = new Laya.Camera(0, 0.1, 100);
		this.scene.addChild(camera);
		camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
		camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		camera.addComponent(CameraMoveScript);
		
		//添加光照
		let directionLight = new Laya.DirectionLight();
		this.scene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(1, 1, 1);
		directionLight.transform.rotate(new Laya.Vector3( -3.14 / 3, 0, 0));

		//预加载所有资源
		let resource = [
			"res/threeDimen/skinModel/LayaMonkey2/LayaMonkey.lh",
			"res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", ];
		Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
	}
    onPreLoadFinish() {
		//添加父级猴子
		let layaMonkeyParent = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"));
		//克隆猴子，作为子猴子
		let layaMonkeySon = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey2/LayaMonkey.lh");
		layaMonkeySon.transform.translate(new Laya.Vector3(2.5, 0, 0));
		//缩放
		let scale = new Laya.Vector3(0.5, 0.5, 0.5);
		layaMonkeySon.transform.localScale = scale;
		
		layaMonkeyParent.addChild(layaMonkeySon);
		
		this.addButton(100, 120, 160, 30, "移动父级猴子", 20, function(e) {
			layaMonkeyParent.transform.translate(new Laya.Vector3(-0.1, 0, 0));
		});
		this.addButton(100, 160, 160, 30, "放大父级猴子", 20, function(e) {
			let scale = new Laya.Vector3(0.2, 0.2, 0.2);
			layaMonkeyParent.transform.localScale = scale;
		});
		this.addButton(100, 200, 160, 30, "旋转父级猴子", 20, function(e) {
			layaMonkeyParent.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		});
		
		
		this.addButton(100, 250, 160, 30, "移动子级猴子", 20, function(e) {
			layaMonkeySon.transform.translate(new Laya.Vector3(-0.1, 0, 0));
		});
		this.addButton(100, 290, 160, 30, "放大子级猴子", 20, function(e) {
			let scale = new Laya.Vector3(1, 1, 1);
			layaMonkeySon.transform.localScale = scale;
		});
		this.addButton(100, 330, 160, 30, "旋转子级猴子", 20, function(e) {
			layaMonkeySon.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		});
	}
	
	addButton(x, y, width, height, text, size, clickFun) {
		Laya.loader.load(["res/threeDimen/ui/button.png"], Laya.Handler.create(null, function() {
			let changeActionButton = Laya.stage.addChild(new Laya.Button("res/threeDimen/ui/button.png", text));
			changeActionButton.size(width, height);
			changeActionButton.labelBold = true;
			changeActionButton.labelSize = size;
			changeActionButton.sizeGrid = "4,4,4,4";
			changeActionButton.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
			changeActionButton.pos(x, y);
			changeActionButton.on(Laya.Event.CLICK, this, clickFun);
		}));
	}
	
}

//激活启动类
new Sprite3DParent();