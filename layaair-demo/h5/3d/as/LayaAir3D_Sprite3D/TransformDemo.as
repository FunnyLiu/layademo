package LayaAir3D_Sprite3D {
	import common.CameraMoveScript;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.Transform3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Quaternion;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	/**
	 * ...
	 * @author ...
	 */
	public class TransformDemo {
		
		private var _scene:Scene3D;
		private var tmpVector:Vector3 = new Vector3(0, 0, 0);
		private var _position:Vector3 = new Vector3( 0, 0, 0);
		private var _position1:Vector3 = new Vector3(0, 0, 0);
		private var _rotate:Vector3 = new Vector3(0, 1, 0);
		private var _rotate1:Vector3 = new Vector3(0, 0, 0);
		private var _scale:Vector3 = new Vector3();
		private var scaleDelta:Number = 0;
		private var scaleValue:Number = 0;
		
		private var layaMonkey_clone1:Sprite3D;
		private var layaMonkey_clone2:Sprite3D;
		private var layaMonkey_clone3:Sprite3D;

		private var clone1Transform:Transform3D;
		private var clone2Transform:Transform3D;
		private var clone3Transform:Transform3D;
		
		
		public function TransformDemo() {
			//初始化引擎
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//显示性能面板
			Stat.show();
			
			//创建场景
			_scene = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			//添加相机
			var camera:Camera = (_scene.addChild(new Camera(0, 0.1, 100))) as Camera;
			camera.transform.translate(new Vector3(0, 2.0, 5));
			camera.transform.rotate(new Vector3(-30, 0, 0), true, false);
			camera.addComponent(CameraMoveScript);
			
			//添加光照
			var directionLight:DirectionLight = _scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(1, 1, 1);
			directionLight.transform.rotate(new Vector3(-3.14 / 3, 0, 0));

			//批量预加载资源
			Laya.loader.create(["res/threeDimen/staticModel/grid/plane.lh", "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"], Handler.create(this, onComplete));
		
		}
		
		private function onComplete():void {
			//加载地面
			var grid:Sprite3D = _scene.addChild(Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Sprite3D;

			//加载静态小猴子
			var staticLayaMonkey:MeshSprite3D = _scene.addChild(new MeshSprite3D(Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"))) as MeshSprite3D;
			//设置材质
			staticLayaMonkey.meshRenderer.material = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/Materials/T_Diffuse.lmat");
			//设置位置
			var staticMonkeyTransform:Transform3D = staticLayaMonkey.transform;
			var pos:Vector3 = staticMonkeyTransform.position;
			pos.setValue(0, 0, 0);
			staticMonkeyTransform.position = pos;
			//设置缩放
			var staticMonkeyScale:Vector3 = staticMonkeyTransform.localScale;
			staticMonkeyScale.setValue(0.3, 0.3, 0.3);
			staticMonkeyTransform.localScale = staticMonkeyScale;
			//设置旋转
			staticMonkeyTransform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
			
			//克隆sprite3d
			layaMonkey_clone1 = Sprite3D.instantiate(staticLayaMonkey, _scene, false, _position1);
			layaMonkey_clone2 = Sprite3D.instantiate(staticLayaMonkey, _scene, false, _position1);
			layaMonkey_clone3 = Sprite3D.instantiate(staticLayaMonkey, _scene, false, _position1);
			//得到三个Transform
			clone1Transform = layaMonkey_clone1.transform;
			clone2Transform = layaMonkey_clone2.transform;
			clone3Transform = layaMonkey_clone3.transform;
			//平移
			_position1.setValue(0.0, 0, 0.0);
			clone1Transform.translate(_position1);
			_position1.setValue(-1.5, 0, 0.0);
			clone2Transform.translate(_position1);
			_position1.setValue(1.0, 0, 0.0);
			clone3Transform.translate(_position1);
			//旋转
			_rotate1.setValue(0, 60, 0);
			clone2Transform.rotate(_rotate1, false, false);
			//缩放
			var scale:Vector3 = clone3Transform.localScale;
			scale.setValue(0.1, 0.1, 0.1);
			clone3Transform.localScale = scale;
			
			staticLayaMonkey.removeSelf();
			
			//设置定时器执行,定时重复执行(基于帧率)
			Laya.timer.frameLoop(1, this, animate);
		
		}
		
		private function animate():void {
			scaleValue = Math.sin(scaleDelta += 0.1);
			
			_position.y = Math.max(0, scaleValue / 2);
			clone1Transform.position = _position;
			
			clone2Transform.rotate(_rotate, false, false);
			
			_scale.x = _scale.y = _scale.z = Math.abs(scaleValue) / 5;
			clone3Transform.localScale = _scale;
		}
	
	}

}