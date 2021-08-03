import CameraMoveScript from "./common/CameraMoveScript"
class SkinnedMeshSprite3DDemo 
{
	private scene:Laya.Scene3D;
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
		var camera = new Laya.Camera(0, 0.1, 100);
		this.scene.addChild(camera);
		camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
		camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		camera.addComponent(CameraMoveScript);
		
		//添加光照
		var directionLight = new Laya.DirectionLight();
		this.scene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(1, 1, 1);
		directionLight.transform.rotate(new Laya.Vector3( -3.14 / 3, 0, 0));
		
		//预加载资源
		Laya.loader.create("res/threeDimen/skinModel/dude/dude.lh", Laya.Handler.create(this, this.onComplete));

	}
	public onComplete() {
		//添加父级猴子
		var dude = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/dude/dude.lh")) as Laya.Sprite3D;
		//缩放
		var scale = new Laya.Vector3(0.1, 0.1, 0.1);
		dude.transform.localScale = scale;
		dude.transform.rotate(new Laya.Vector3( 0, 3.14, 0));
	}
	
}

new SkinnedMeshSprite3DDemo;

