package LayaAir3D_Resource {
	import common.CameraMoveScript;
	import laya.d3.animation.AnimationClip;
	import laya.d3.component.Animator;
	import laya.d3.component.AnimatorState;
	import laya.d3.core.BaseCamera;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.BaseMaterial;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Quaternion;
	import laya.d3.math.Vector3;
	import laya.d3.resource.models.Mesh;
	import laya.d3.resource.models.PrimitiveMesh;
	import laya.d3.resource.models.SkyBox;
	import laya.d3.resource.models.SkyRenderer;
	import laya.display.Stage;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.utils.Stat;
	import laya.resource.Texture2D;
	
	/**
	 * ...
	 * @author ...
	 */
	public class LoadResourceDemo {
		
		private var _scene:Scene3D;
		private var sprite3D:Sprite3D;
		private var pangzi:Sprite3D;
		private var pangziAnimator:Animator;
		
		public function LoadResourceDemo() {
			//初始化引擎
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//显示性能面板
			Stat.show();
			
			//加载资源
			LoadRes();
		
			//批量预加载方式
			//PreloadingRes();
		
		}
		
		//加载资源
		public function LoadRes() {
			//场景加载
			Scene3D.load("res/threeDimen/scene/XunLongShi/XunLongShi.ls", Handler.create(this, function(scene:Scene3D):void {
				_scene = scene;
				Laya.stage.addChild(scene);
				//添加相机
				var camera:Camera = new Camera();
				scene.addChild(camera);
				//设置相机清楚标记，使用天空
				camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
				//调整相机的位置
				camera.transform.translate(new Vector3(3, 20, 47));
				//相机视角控制组件(脚本)
				camera.addComponent(CameraMoveScript);
				//添加光照
				var directionLight:DirectionLight = _scene.addChild(new DirectionLight()) as DirectionLight;
				directionLight.color = new Vector3(1, 1, 1);
				directionLight.transform.rotate(new Vector3(-1.14 / 3, 0, 0));
				
				//材质加载
				BaseMaterial.load("res/threeDimen/skyBox/skyBox2/skyBox2.lmat", Handler.create(this, function(mat:BaseMaterial):void {
					//获取相机的天空渲染器
					var skyRenderer:SkyRenderer = camera.skyRenderer;
					//创建天空盒的mesh
					skyRenderer.mesh = SkyBox.instance;
					//设置天空盒材质
					skyRenderer.material = mat;
				}));
				
				(scene.getChildByName('Scenes').getChildByName('HeightMap') as MeshSprite3D).active = false;
				(scene.getChildByName('Scenes').getChildByName('Area') as MeshSprite3D).active = false;
				sprite3D = _scene.addChild(new Sprite3D()) as Sprite3D;
				
				//加载纹理
				Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function(tex:Texture2D):void {
					//使用纹理
					var earth1:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(5, 32, 32))) as MeshSprite3D;
					earth1.transform.translate(new Vector3(17, 20, 0));
					
					var earthMat:BlinnPhongMaterial = new BlinnPhongMaterial();
					earthMat.albedoTexture = tex;
					earthMat.albedoIntensity = 1;
					earth1.meshRenderer.material = earthMat;
				}));
				
				//加载Mesh
				Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function(mesh:Mesh):void {
					var layaMonkey:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
					var layaMonkeyTrans:Transform = layaMonkey.transform;
					var layaMonkeyScale:Vector3 = layaMonkeyTrans.localScale;
					layaMonkeyScale.setValue(4, 4, 4);
					layaMonkeyTrans.localScale = layaMonkeyScale;
					layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
					layaMonkey.transform.translate(new Vector3(5, 3, 13));
				}));
				//加载精灵
				Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function(sp:Sprite3D):void {
					var layaMonkey2:Sprite3D = scene.addChild(sp) as Sprite3D;
					var layaMonkey2Trans:Transform = layaMonkey2.transform;
					var layaMonkey2Scale:Vector3 = layaMonkey2Trans.localScale;
					layaMonkey2Scale.setValue(4, 4, 4);
					layaMonkey2Trans.localScale = layaMonkey2Scale;
					layaMonkey2Trans.translate(new Vector3(-10, 13, 0));
				}));
				
				//加载胖子精灵
				Sprite3D.load("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh", Handler.create(this, function(sp:Sprite3D):void {
					pangzi = scene.addChild(sp) as Sprite3D;
					var pangziTrans:Transform = pangzi.transform;
					var pangziScale:Vector3 = pangziTrans.localScale;
					pangziScale.setValue(4, 4, 4);
					pangziTrans.localScale = pangziScale;
					pangziTrans.translate(new Vector3(-20, 13, 0));
					//获取动画组件
					pangziAnimator = pangzi.getChildAt(0).getComponent(Animator) as Animator;
					//AnimationClip的加载要放在Avatar加载完成之后
					AnimationClip.load("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani", Handler.create(this, function(aniClip:AnimationClip):void {
						//创建动作状态
						var state1:AnimatorState = new AnimatorState();
						//动作名称
						state1.name = "hello";
						//动作播放起始时间
						state1.clipStart = 0 / 581;
						//动作播放结束时间
						state1.clipEnd = 581 / 581;
						//设置动作
						state1.clip = aniClip;
						//设置动作循环
						state1.clip.islooping = true;
						//为动画组件添加一个动作状态
						pangziAnimator.addState(state1);
						//播放动作
						pangziAnimator.play("hello");
					}));
					
				}));
			
			
			}));
		}
		
		//批量预加载方式
		public function PreloadingRes() {
			//预加载所有资源
			var resource:Array = ["res/threeDimen/scene/XunLongShi/XunLongShi.ls",
			"res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
			"res/threeDimen/texture/earth.png", 
			"res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
			"res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", 
			"res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
			"res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani"];
			Laya.loader.create(resource, Handler.create(this, onPreLoadFinish));
		}
		
		public function onPreLoadFinish() {
			//初始化3D场景
			_scene = Laya.stage.addChild(Loader.getRes("res/threeDimen/scene/XunLongShi/XunLongShi.ls")) as Scene3D;
			//添加相机
			var camera:Camera = new Camera();
			_scene.addChild(camera);
			//设置相机清楚标记，使用天空
			camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
			//调整相机的位置
			camera.transform.translate(new Vector3(4, 20, 47));
			//相机视角控制组件(脚本)
			camera.addComponent(CameraMoveScript);
			
			//添加光照
			var directionLight:DirectionLight = _scene.addChild(new DirectionLight()) as DirectionLight;
			//光照颜色
			directionLight.color = new Vector3(1, 1, 1);
			directionLight.transform.rotate(new Vector3(-3.14 / 3, 0, 0));
			
			//使用材质
			var skyboxMaterial:BaseMaterial = Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat") as BaseMaterial;
			var skyRenderer:SkyRenderer = camera.skyRenderer;
			skyRenderer.mesh = SkyBox.instance;
			skyRenderer.material = skyboxMaterial;
			
			//激活场景中的子节点
			(_scene.getChildByName('Scenes').getChildByName('HeightMap') as MeshSprite3D).active = false;
			(_scene.getChildByName('Scenes').getChildByName('Area') as MeshSprite3D).active = false;
			
			//使用纹理
			var earth1:MeshSprite3D = _scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(5, 32, 32))) as MeshSprite3D;
			earth1.transform.translate(new Vector3(17, 20, 0));
			
			var earthMat:BlinnPhongMaterial = new BlinnPhongMaterial();
			earthMat.albedoTexture = Loader.getRes("res/threeDimen/texture/earth.png") as Texture2D;
			earthMat.albedoIntensity = 1;
			earth1.meshRenderer.material = earthMat;
			
			//获取Mesh资源
			var mesh:Mesh = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm") as Mesh;
			//为精灵设置Mesh资源
			var layaMonkey:MeshSprite3D = _scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
			var layaMonkeyTrans:Transform = layaMonkey.transform;
			var layaMonkeyScale:Vector3 = layaMonkeyTrans.localScale;
			layaMonkeyScale.setValue(4, 4, 4);
			layaMonkeyTrans.localScale = layaMonkeyScale;
			layaMonkeyTrans.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
			layaMonkeyTrans.translate(new Vector3(5, 3, 13));
			
			//使用精灵
			var sp:Sprite3D = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Sprite3D;
			var layaMonkey2:Sprite3D = _scene.addChild(sp) as Sprite3D;
			var layaMonkey2Trans:Transform = layaMonkey2.transform;
			var layaMonkey2Scale:Vector3 = layaMonkey2Trans.localScale;
			layaMonkey2Scale.setValue(4, 4, 4);
			layaMonkey2Trans.localScale = layaMonkey2Scale;
			layaMonkey2Trans.translate(new Vector3(-10, 13, 0));
			
			//使用精灵
			pangzi = Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh") as Sprite3D;
			pangzi = _scene.addChild(pangzi) as Sprite3D;
			var pangziTrans:Transform = pangzi.transform;
			var pangziScale:Vector3 = pangziTrans.localScale;
			pangziScale.setValue(4, 4, 4);
			pangziTrans.localScale = pangziScale;
			pangziTrans.translate(new Vector3( -20, 13, 0));
			
			//获取动画组件
			pangziAnimator = pangzi.getChildAt(0).getComponent(Animator) as Animator; 
			
			var pangAni:AnimationClip = Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani") as AnimationClip;
			//创建动作状态
			var state1:AnimatorState = new AnimatorState();
			//动作名称
			state1.name = "hello";
			//动作播放起始时间
			state1.clipStart = 0 / 581;
			//动作播放结束时间
			state1.clipEnd = 581 / 581;
			//设置动作
			state1.clip = pangAni;
			//设置动作循环
			state1.clip.islooping = true;
			//为动画组件添加一个动作状态
			pangziAnimator.addState(state1);
			//播放动作
			pangziAnimator.play("hello");
		}
	
	}

}