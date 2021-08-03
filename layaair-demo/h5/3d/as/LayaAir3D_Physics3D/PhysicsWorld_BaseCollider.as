package LayaAir3D_Physics3D {
	import common.CameraMoveScript;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Transform3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Matrix4x4;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.physics.PhysicsCollider;
	import laya.d3.physics.Rigidbody3D;
	import laya.d3.physics.shape.BoxColliderShape;
	import laya.d3.physics.shape.CapsuleColliderShape;
	import laya.d3.physics.shape.ConeColliderShape;
	import laya.d3.physics.shape.CylinderColliderShape;
	import laya.d3.physics.shape.SphereColliderShape;
	import laya.d3.resource.models.PrimitiveMesh;
	import laya.display.Stage;
	import laya.resource.Texture2D;
	import laya.utils.Handler;
	import laya.utils.Stat;

	
	/**
	 * ...
	 * @author zqx
	 */
	public class PhysicsWorld_BaseCollider {
		private var scene:Scene3D;
		private var tmpVector:Vector3 = new Vector3(0, 0, 0);
		private var mat1:BlinnPhongMaterial;
		private var mat2:BlinnPhongMaterial; 
		private var mat3:BlinnPhongMaterial;
		private var mat4:BlinnPhongMaterial;
		private var mat5:BlinnPhongMaterial;
		
		
		public function PhysicsWorld_BaseCollider() {
			//初始化引擎
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//显示性能面板
			Stat.show();
			
			scene = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			//初始化照相机
			var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
			camera.transform.translate(new Vector3(0, 6, 9.5));
			camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
			camera.addComponent(CameraMoveScript);
			camera.clearColor = null;
			
			//方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			//设置平行光的方向
			var mat:Matrix4x4 = directionLight.transform.worldMatrix;
			mat.setForward(new Vector3(-1.0, -1.0, -1.0));
			directionLight.transform.worldMatrix=mat;
			
			//平面
			var plane:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(10, 10, 10, 10))) as MeshSprite3D;
			var planeMat:BlinnPhongMaterial = new BlinnPhongMaterial();
			Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(this, function(tex:Texture2D):void {
				planeMat.albedoTexture = tex;
			}));
			//设置纹理平铺和偏移
			var tilingOffset:Vector4 = planeMat.tilingOffset;
			tilingOffset.setValue(5, 5, 0, 0);
			planeMat.tilingOffset = tilingOffset;
			//设置材质
			plane.meshRenderer.material = planeMat;
			
			//平面添加物理碰撞体组件
			var planeStaticCollider:PhysicsCollider = plane.addComponent(PhysicsCollider);
			//创建盒子形状碰撞器
			var planeShape:BoxColliderShape = new BoxColliderShape(10, 0, 10);
			//物理碰撞体设置形状
			planeStaticCollider.colliderShape = planeShape;
			//物理碰撞体设置摩擦力
			planeStaticCollider.friction = 2;
			//物理碰撞体设置弹力
			planeStaticCollider.restitution = 0.3;
			
			
			mat1 = new BlinnPhongMaterial();
			mat2 = new BlinnPhongMaterial();
			mat3 = new BlinnPhongMaterial();
			mat4 = new BlinnPhongMaterial();
			mat5 = new BlinnPhongMaterial();
			//加载纹理资源
			Texture2D.load("res/threeDimen/Physics/rocks.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat1.albedoTexture = tex;
			}));
			
			Texture2D.load("res/threeDimen/Physics/plywood.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat2.albedoTexture = tex;
			}));
			
			Texture2D.load("res/threeDimen/Physics/wood.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat3.albedoTexture = tex;
			}));
			
			Texture2D.load("res/threeDimen/Physics/steel2.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat4.albedoTexture = tex;
			}));
			Texture2D.load("res/threeDimen/Physics/steel.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat5.albedoTexture = tex;
			}));
			
			//随机生成精灵
			randomAddPhysicsSprite();
		}
		
		public function randomAddPhysicsSprite():void {
			Laya.timer.loop(1000, this, function():void {
				var random:Number = Math.floor(Math.random() * 5) % 5;
				switch (random) {
				case 0: 
					addBox();
					break;
				case 1: 
					addSphere();
					break;
				case 2: 
					addCapsule();
					break;
				case 3: 
					addCone();
					break;
				case 4: 
					addCylinder();
					break;
				default: 
					break;
				}
			});
		}
		
		public function addBox():void {
			//随机生成坐标值
			var sX:int = Math.random() * 0.75 + 0.25;
			var sY:int = Math.random() * 0.75 + 0.25;
			var sZ:int = Math.random() * 0.75 + 0.25;
			//创建盒型MeshSprite3D
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))) as MeshSprite3D;
			//设置材质
			box.meshRenderer.material = mat1;
			var transform:Transform3D = box.transform;
			var pos:Vector3 = transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
			transform.position = pos;
			//设置欧拉角
			var rotationEuler:Vector3 = transform.rotationEuler;
			rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
			transform.rotationEuler = rotationEuler;
			//创建刚体碰撞器
			var rigidBody:Rigidbody3D = box.addComponent(Rigidbody3D);
			//创建盒子形状碰撞器
			var boxShape:BoxColliderShape = new BoxColliderShape(sX, sY, sZ);
			//设置盒子的碰撞形状
			rigidBody.colliderShape = boxShape;
			//设置刚体的质量
			rigidBody.mass = 10;
		}
		
		public function addSphere():void {
			//随机生成半径大小
			var radius:Number = Math.random() * 0.2 + 0.2;
			//创建球型MeshSprite3D
			var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))) as MeshSprite3D;
			//设置材质
			sphere.meshRenderer.material = mat2;
			var pos:Vector3 = sphere.transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
			sphere.transform.position = pos;
			
			//添加刚体碰撞器
			var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
			//创建球型碰撞器
			var sphereShape:SphereColliderShape = new SphereColliderShape(radius);
			//设置刚体碰撞器的形状
			rigidBody.colliderShape = sphereShape;
			//设置刚体的质量
			rigidBody.mass = 10;
		}
		
		public function addCapsule():void {

			var raidius:int = Math.random() * 0.2 + 0.2;
			var height:int = Math.random() * 0.5 + 0.8;
			//创建胶囊MeshSprite3D
			var capsule:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createCapsule(raidius, height))) as MeshSprite3D;
			//设置材质
			capsule.meshRenderer.material = mat3;
			var transform:Transform3D = capsule.transform;
			var pos:Vector3 = transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
			transform.position = pos;
			//设置胶囊MeshSprite3D的欧拉角
			var rotationEuler:Vector3 = transform.rotationEuler;
			rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
			transform.rotationEuler = rotationEuler;
			
			//创建刚体碰撞器
			var rigidBody:Rigidbody3D = capsule.addComponent(Rigidbody3D);
			//创建球型碰撞器
			var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(raidius, height);
			//设置刚体碰撞器的形状
			rigidBody.colliderShape = sphereShape;
			//设置刚体碰撞器的质量
			rigidBody.mass = 10;
		}
		
		public function addCone():void {
			var raidius:int = Math.random() * 0.2 + 0.2;
			var height:int = Math.random() * 0.5 + 0.8;
			//创建圆锥MeshSprite3D
			var cone:MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCone(raidius, height));
			scene.addChild(cone);
			//设置材质
			cone.meshRenderer.material = mat4;
			//设置位置
			var pos:Vector3 = cone.transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2); 
			cone.transform.position = pos;
			//创建刚体碰撞器
			var rigidBody:Rigidbody3D = cone.addComponent(Rigidbody3D);
			//创建球型碰撞器
			var coneShape:ConeColliderShape = new ConeColliderShape(raidius, height);
			//设置刚体碰撞器的形状
			rigidBody.colliderShape = coneShape;
			//设置刚体碰撞器的质量
			rigidBody.mass = 10;
		}
		
		public function addCylinder():void {
			var raidius:int = Math.random() * 0.2 + 0.2;
			var height:int = Math.random() * 0.5 + 0.8;
			//创建圆锥MeshSprite3D
			var cylinder:MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCylinder(raidius, height));
			scene.addChild(cylinder);
			//设置材质
			cylinder.meshRenderer.material = mat5;
			//设置位置
			var transform:Transform3D = cylinder.transform;
			var pos:Vector3 = transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
			transform.position = pos;
			//设置圆柱MeshSprite3D的欧拉角
			var rotationEuler:Vector3 = transform.rotationEuler;
			rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
			transform.rotationEuler = rotationEuler;
			//创建刚体碰撞器
			var rigidBody:Rigidbody3D = cylinder.addComponent(Rigidbody3D);
			//创建球型碰撞器
			var cylinderShape:CylinderColliderShape = new CylinderColliderShape(raidius, height);
			//设置刚体碰撞器的形状
			rigidBody.colliderShape = cylinderShape;
			//设置刚体碰撞器的质量
			rigidBody.mass = 10;
		}
	
	}

}