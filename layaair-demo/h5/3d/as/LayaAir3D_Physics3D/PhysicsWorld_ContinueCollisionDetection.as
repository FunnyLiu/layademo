package LayaAir3D_Physics3D {
	import common.CameraMoveScript;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.math.Matrix4x4;
	import laya.d3.physics.PhysicsCollider;
	import laya.d3.physics.Rigidbody3D;
	import laya.d3.physics.shape.BoxColliderShape;
	import laya.d3.physics.shape.SphereColliderShape;
	import laya.d3.resource.models.PrimitiveMesh;
	import laya.display.Stage;
	import laya.utils.Handler;
	import laya.utils.Stat;
	import laya.resource.Texture2D;
	
	/**
	 * ...
	 * @author wzy
	 */
	public class PhysicsWorld_ContinueCollisionDetection {
		private var scene:Scene3D;
		private var tmpVector:Vector3 = new Vector3(0, 0, 0);
		private var mat2:BlinnPhongMaterial;
		public function PhysicsWorld_ContinueCollisionDetection() {
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			Stat.show();
			
			scene = Laya.stage.addChild(new Scene3D()) as Scene3D;
			scene.physicsSimulation.gravity = new Vector3(0, -98.0, 0);
			
			//初始化照相机
			var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
			camera.transform.translate(new Vector3(0, 6, 9.5));
			camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
			camera.addComponent(CameraMoveScript);
			camera.clearColor = null;
			
			//方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color.setValue(0.6, 0.6, 0.6);
			//设置平行光的方向
			var mat:Matrix4x4 = directionLight.transform.worldMatrix;
			mat.setForward(new Vector3(-1.0, -1.0, -1.0));
			directionLight.transform.worldMatrix=mat;
			
			mat2 = new BlinnPhongMaterial();
			//加载纹理资源
			Texture2D.load("res/threeDimen/Physics/plywood.jpg", Handler.create(this, function(tex:Texture2D):void {
				mat2.albedoTexture = tex;
			}));
			
			//平面
			var plane:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(10, 10, 10, 10))) as MeshSprite3D;
			var planeMat:BlinnPhongMaterial = new BlinnPhongMaterial();
			Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(this, function(tex:Texture2D):void {
				planeMat.albedoTexture = tex;
			}));
			var tilingOffset:Vector3 = planeMat.tilingOffset;
			tilingOffset.setValue(10, 10, 0, 0);
			planeMat.tilingOffset = tilingOffset;
			plane.meshRenderer.material = planeMat;
			
			var planeStaticCollider:PhysicsCollider = plane.addComponent(PhysicsCollider);
			var planeShape:BoxColliderShape = new BoxColliderShape(10, 0, 10);
			planeStaticCollider.colliderShape = planeShape;
			planeStaticCollider.friction = 2;
			planeStaticCollider.restitution = 0.3;
			Laya.timer.loop(200, this, function():void {
				addSphere();
			});
		}
		
		public function addSphere():void {
			var radius:Number = Math.random() * 0.2 + 0.2;
			var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))) as MeshSprite3D;
			sphere.meshRenderer.material = mat2;
			var pos:Vector3 = sphere.transform.position;
			pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
			sphere.transform.position = pos;
			
			var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
			var sphereShape:SphereColliderShape = new SphereColliderShape(radius);
			rigidBody.colliderShape = sphereShape;
			rigidBody.mass = 10;
			rigidBody.ccdSweptSphereRadius = radius;
			rigidBody.ccdMotionThreshold = 0.0001;
		}
	
	}

}