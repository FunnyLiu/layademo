import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Laya3D } from "Laya3D";
import { Handler } from "laya/utils/Handler";
import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Stat } from "laya/utils/Stat";
import { Camera } from "laya/d3/core/Camera";
import { Vector3 } from "laya/d3/math/Vector3";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Transform3D } from "laya/d3/core/Transform3D";
import { Rigidbody3D } from "laya/d3/physics/Rigidbody3D";
import { BoxColliderShape } from "laya/d3/physics/shape/BoxColliderShape";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Physics3D } from "laya/d3/physics/Physics3D";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { Vector4 } from "laya/d3/math/Vector4";
import { Texture2D } from "laya/resource/Texture2D";
import { SphereColliderShape } from "laya/d3/physics/shape/SphereColliderShape";
import { Shader3D } from "laya/d3/shader/Shader3D";
import { ConfigurableConstraint } from "laya/d3/physics/constraints/ConfigurableConstraint";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Config3D } from "Config3D";



export class PhysicsWorld_ConfigurableJoint{
    private scene:Scene3D;
	private camera: Camera;
    constructor() {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
		Stat.show();
		Config3D.useCannonPhysics = false;
		Shader3D.debugMode = true;
        this.scene = (<Scene3D>Laya.stage.addChild(new Scene3D()));
        this.camera = (<Camera>this.scene.addChild(new Camera(0, 0.1, 100)));
		this.camera.transform.translate(new Vector3(0, 3, 30));
		this.camera.addComponent(CameraMoveScript)
        var directionLight: DirectionLight = (<DirectionLight>this.scene.addChild(new DirectionLight()));
        directionLight.color = new Vector3(1, 1, 1);
		directionLight.transform.worldMatrix.setForward(new Vector3(-1.0, -1.0, 1.0));
		//??????
		var plane: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(40, 40, 40, 40))));
		plane.transform.position = new Vector3(0, -2.0, 0);
		var planeMat: BlinnPhongMaterial = new BlinnPhongMaterial();
		Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(this, function (tex: Texture2D): void {
			planeMat.albedoTexture = tex;
		}));
		//???????????????????????????
		var tilingOffset: Vector4 = planeMat.tilingOffset;
		tilingOffset.setValue(5, 5, 0, 0);
		planeMat.tilingOffset = tilingOffset;
		//????????????
		plane.meshRenderer.material = planeMat;

		this.springTest();
		this.bounceTest();
		// this.bounceTestY();

		this.alongZAixs();
		//this.alongXAixs();
		//this.alongYAixs();

		this.freeRotate();
		this.rotateAngularX();
		// this.rotateAngularZ();
		// this.rotateAngularY();
		this.rotateAngularPoint();

		
	}

	springTest(): void {
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(7, 3, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);
		boxARigid.overrideGravity = true;
		boxARigid.isKinematic = true;

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(10, 0, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -3, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);

		configurableConstraint.minLinearLimit = new Vector3(-3,0,0);
		configurableConstraint.maxLinearLimit = new Vector3(3,0,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.linearLimitSpring = new Vector3(100,0,0);
		configurableConstraint.linearDamp = new Vector3(0,0,0);
	}



	bounceTest(): void {
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(7, 3, 3),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(7, 0, 3),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -3, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);
		
		configurableConstraint.minLinearLimit = new Vector3(-2,0,0);
		configurableConstraint.maxLinearLimit = new Vector3(2,0,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;

		configurableConstraint.linearBounce = new Vector3(0.5, 0, 0);
		boxBRigid.applyImpulse(new Vector3(100, 0, 0));

	}

	bounceTestY(): void {
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(0, 4, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(0, 2, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -2, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);
		
		configurableConstraint.minLinearLimit = new Vector3(0,-2,0);
		configurableConstraint.maxLinearLimit = new Vector3(0,10,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
	}

	rotateAngularX():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(-2, 3, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(-2, 1, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -2, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);

		configurableConstraint.minAngularLimit = new Vector3(-2, 0,0);
		configurableConstraint.maxAngularLimit = new Vector3(2, 0,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		boxBRigid.angularVelocity = new Vector3(5, 0, 0);

	}

	rotateAngularZ():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(-7, 6, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(-7, 4, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -2, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);

		configurableConstraint.minAngularLimit = new Vector3(0, 0, -1);
		configurableConstraint.maxAngularLimit = new Vector3(0, 0, 1);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		boxBRigid.angularVelocity = new Vector3(0.0, 0, 0.5);

	}

	rotateAngularY():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(-5, 6, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(-5, 4, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -2, 0);
		configurableConstraint.connectAnchor = new Vector3(0,0,0);

		configurableConstraint.minAngularLimit = new Vector3(0, -1, 0);
		configurableConstraint.maxAngularLimit = new Vector3(0, 1, 0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		boxBRigid.angularVelocity = new Vector3(0.0, 0.5, 0);

	}

	freeRotate(){
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(-6, 3, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(-6, 1, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, -1, 0);
		configurableConstraint.connectAnchor = new Vector3(0,1,0);

		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
		boxBRigid.angularVelocity = new Vector3(20, 2, 10);
	}

	rotateAngularPoint():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(0, 15, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(6, 15, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
	
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0, 0, 0);
		configurableConstraint.connectAnchor = new Vector3(-6,0,0);

		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
	
	}

	alongXAixs():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(0, 0, -4),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(5, 0, -4),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0,0,0);
		configurableConstraint.connectAnchor = new Vector3(-5,0,0);
		
		configurableConstraint.minLinearLimit = new Vector3(-2,0,0);
		configurableConstraint.maxLinearLimit = new Vector3(2,0,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;

		boxBRigid.linearVelocity = new Vector3(1.0, 0.0, 0);

	}

	alongYAixs():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(0, 0, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);


		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(5, 0, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);
		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0,0,0);
		configurableConstraint.connectAnchor = new Vector3(-5,0,0);
		
		configurableConstraint.minLinearLimit = new Vector3(0,-3,0);
		configurableConstraint.maxLinearLimit = new Vector3(0,3,0);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;

		boxBRigid.linearVelocity = new Vector3(0.0, 1.0, 0);

	}

	alongZAixs():void{
		var boxA:MeshSprite3D = this.addRigidBodySphere(new Vector3(2, 3, 0),1);
		var boxARigid:Rigidbody3D = boxA.getComponent(Rigidbody3D);

		var boxB:MeshSprite3D = this.addRigidBodyBox(new Vector3(2, 0, 0),1);
		(<BlinnPhongMaterial>boxB.meshRenderer.material).albedoColor = new Vector4(1, 0, 0, 1);
		var boxBRigid:Rigidbody3D = boxB.getComponent(Rigidbody3D);

		var configurableConstraint:ConfigurableConstraint = boxA.addComponent(ConfigurableConstraint); 
		configurableConstraint.setConnectRigidBody(boxARigid,boxBRigid);
	    configurableConstraint.anchor = new Vector3(0,0,0);
		configurableConstraint.connectAnchor = new Vector3(0,3,0);
		
		configurableConstraint.minLinearLimit = new Vector3(0,0,-4);
		configurableConstraint.maxLinearLimit = new Vector3(0,0,4);
		configurableConstraint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
		configurableConstraint.angularXMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularYMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
		configurableConstraint.angularZMotion= ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;

		boxBRigid.linearVelocity = new Vector3(0.0, 0.0, 4);

	}

	addRigidBodyBox(pos:Vector3, scale:number):MeshSprite3D{
        //????????????MeshSprite3D
		var box: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(scale, scale, scale))));
		box.transform.position = pos;
		//box.addComponent(TriggerCollisionScript);

		var mat:BlinnPhongMaterial = new BlinnPhongMaterial();
		box.meshRenderer.material = mat;

		//?????????????????????
		var rigidBody: Rigidbody3D = box.addComponent(Rigidbody3D);
		//???????????????????????????
		var boxShape: BoxColliderShape = new BoxColliderShape(scale, scale, scale);
		//???????????????????????????
		rigidBody.colliderShape = boxShape;
		//?????????????????????
		rigidBody.mass = 1;
		//??????????????????????????????
		rigidBody.friction = 0.5;
		//???????????????????????????
		rigidBody.restitution = 10.0;
		return box;	
	}   
	addRigidBodySphere(pos:Vector3, scale:number):MeshSprite3D{
        //????????????MeshSprite3D
		var sphere: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.2))));
		sphere.transform.position = pos;

		var mat:BlinnPhongMaterial = new BlinnPhongMaterial();
		mat.albedoColor = new Vector4(0, 1, 0, 1);
		sphere.meshRenderer.material = mat;

		//?????????????????????
		var rigidBody: Rigidbody3D = sphere.addComponent(Rigidbody3D);
		//???????????????????????????
		var boxShape: SphereColliderShape = new SphereColliderShape(0.2);
		//???????????????????????????
		rigidBody.colliderShape = boxShape;
		//?????????????????????
		rigidBody.mass = 1;
		//??????????????????????????????
		rigidBody.friction = 0.5;
		//???????????????????????????
		rigidBody.restitution = 0.0;
		rigidBody.isKinematic = true;
		return sphere;	
    }  
}


