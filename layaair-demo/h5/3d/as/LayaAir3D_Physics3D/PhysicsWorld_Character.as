package LayaAir3D_Physics3D {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.Transform3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.math.Matrix4x4;
	import laya.d3.physics.CharacterController;
	import laya.d3.physics.PhysicsCollider;
	import laya.d3.physics.Rigidbody3D;
	import laya.d3.physics.shape.BoxColliderShape;
	import laya.d3.physics.shape.CapsuleColliderShape;
	import laya.d3.resource.models.PrimitiveMesh;
	import laya.display.Stage;
	import laya.events.KeyBoardManager;
	import laya.utils.Handler;
	import laya.utils.Stat;
	import laya.resource.Texture2D;
	
	public class PhysicsWorld_Character {
		
		private var scene:Scene3D;
		private var camera:Camera;
		private var kinematicSphere:Sprite3D;
		private var translateW:Vector3 = new Vector3(0, 0, -0.2);
		private var translateS:Vector3 = new Vector3(0, 0, 0.2);
		private var translateA:Vector3 = new Vector3(-0.2, 0, 0);
		private var translateD:Vector3 = new Vector3(0.2, 0, 0);
		private var mat1:BlinnPhongMaterial;
		private var mat2:BlinnPhongMaterial; 
		
		public function PhysicsWorld_Character() {
			//初始化引擎
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//显示性能面板
			Stat.show();
			
			//创建场景
			scene = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			//创建相机
			camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
			camera.transform.translate(new Vector3(0, 8, 20));
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置相机的清除颜色
			camera.clearColor = null;
			
			//创建平行光
			var directionLight = new DirectionLight();
			scene.addChild(directionLight);
			directionLight.color = new Vector3(1, 1, 1);
			//设置平行光的方向
			var mat:Matrix4x4 = directionLight.transform.worldMatrix;
			mat.setForward(new Vector3(-1.0, -1.0, 1.0));
			directionLight.transform.worldMatrix=mat;
			
			//创建地面
			var plane:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(20, 20, 10, 10))) as MeshSprite3D;
			var planeMat:BlinnPhongMaterial = new BlinnPhongMaterial();
			//加载纹理
			Texture2D.load("res/threeDimen/Physics/wood.jpg", Handler.create(this, function(tex:Texture2D):void {
				planeMat.albedoTexture = tex;
			}));
			//设置材质
			var tilingOffset:Vector3 = planeMat.tilingOffset;
			tilingOffset.setValue(2, 2, 0, 0);
			planeMat.tilingOffset = tilingOffset;
			plane.meshRenderer.material = planeMat;
			
			mat1 = new BlinnPhongMaterial();
			mat2 = new BlinnPhongMaterial();
			
			//加载纹理资源
			Texture2D.load("res/threeDimen/Physics/rocks.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat1.albedoTexture = tex;
			}));
			
			Texture2D.load("res/threeDimen/Physics/wood.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat2.albedoTexture = tex;
			}));
			
			//创建物理碰撞器
			var physicsCollider:PhysicsCollider = plane.addComponent(PhysicsCollider) as PhysicsCollider;
			//创建盒型碰撞器
			var boxShape:BoxColliderShape = new BoxColliderShape(20, 0, 20);
			//为物理碰撞器设置盒型碰撞器
			physicsCollider.colliderShape = boxShape;
			
			for (var i:int = 0; i < 60; i++) {
				addBox();
				addCapsule();
			}
			
			//添加角色
			addCharacter();
		}
		
		public function addCharacter():void {
			var _this:PhysicsWorld_Character = this;
			//加载精灵
			Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function(monkey:Sprite3D):void {
				scene.addChild(monkey);
				//设置精灵的缩放
				monkey.transform.localScale = new Vector3(1, 1, 1);
				//为精灵添加角色控制器
				var character:CharacterController = monkey.addComponent(CharacterController);
				//创建胶囊碰撞器
				var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(1.0, 3.4);
				//设置Shape的本地偏移
				var localOffset:Vector3 = sphereShape.localOffset;
				localOffset.setValue(0, 1.7, 0);
				sphereShape.localOffset = localOffset;
				//设置角色控制器的碰撞形状
				character.colliderShape = sphereShape;
				_this.kinematicSphere = monkey;
				Laya.timer.frameLoop(1, _this, onKeyDown);
			}))
		
		}
		
		private function onKeyDown():void {
			var character:CharacterController = kinematicSphere.getComponent(CharacterController) as CharacterController;
			KeyBoardManager.hasKeyDown(87) && character.move(translateW);//W
			KeyBoardManager.hasKeyDown(83) && character.move(translateS);//S
			KeyBoardManager.hasKeyDown(65) && character.move(translateA);//A
			KeyBoardManager.hasKeyDown(68) && character.move(translateD);//D
			KeyBoardManager.hasKeyDown(69) && character.jump();//E
		}
		
		public function addBox():void {
			var sX:int = Math.random() * 0.75 + 0.25;
			var sY:int = Math.random() * 0.75 + 0.25;
			var sZ:int = Math.random() * 0.75 + 0.25;
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))) as MeshSprite3D;
			box.meshRenderer.material = mat1;
			var transform:Transform3D = box.transform;
			var pos:Vector3 = transform.position;
			pos.setValue(Math.random() * 4 - 2, 2, Math.random() * 4 - 2);
			transform.position = pos;
			var rotationEuler:Vector3 = transform.rotationEuler;
			rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
			transform.rotationEuler = rotationEuler;
			
			var rigidBody:Rigidbody3D = box.addComponent(Rigidbody3D);
			var boxShape:BoxColliderShape = new BoxColliderShape(sX, sY, sZ);
			rigidBody.colliderShape = boxShape;
			rigidBody.mass = 10;
		}
		
		public function addCapsule():void {
			var raidius:int = Math.random() * 0.2 + 0.2;
			var height:int = Math.random() * 0.5 + 0.8;
			var capsule:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createCapsule(raidius, height))) as MeshSprite3D;
			capsule.meshRenderer.material = mat2;
			var transform:Transform3D = capsule.transform;
			var pos:Vector3 = transform.position;
			pos.setValue(Math.random() * 4 - 2, 2, Math.random() * 4 - 2);
			transform.position = pos;
			var rotationEuler:Vector3 = transform.rotationEuler;
			rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
			transform.rotationEuler = rotationEuler;
			
			var rigidBody:Rigidbody3D = capsule.addComponent(Rigidbody3D);
			var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(raidius, height);
			rigidBody.colliderShape = sphereShape;
			rigidBody.mass = 10;
		}
	}
}