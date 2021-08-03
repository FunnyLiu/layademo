package LayaAir3D_Resource {
    import laya.display.Stage;
    import laya.utils.Stat;
    import laya.d3.shader.Shader3D;
    import laya.d3.core.scene.Scene3D;
    import laya.utils.Handler;
    import laya.d3.core.Camera;
    import laya.d3.math.Vector3;
    import laya.d3.core.light.DirectionLight;
    import laya.d3.math.Matrix4x4;
    import laya.d3.core.Sprite3D;
    import laya.net.Loader;
    import laya.d3.resource.TextureCube;
    import laya.gltf.glTFLoader;
	import common.CameraMoveScript;

    public class LoadGltfRosource {
        var scene: Scene3D;
        var camera: Camera;

        public function LoadGltfRosource() {
            Laya3D.init(0, 0);
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;

            Stat.show();

            Shader3D.debugMode = true;

            this.scene = <Scene3D>Laya.stage.addChild(new Scene3D);
            this.camera = <Camera>this.scene.addChild(new Camera);
            this.camera.addComponent(CameraMoveScript);

            this.camera.transform.position = new Vector3(0, 1, 7);

            //light
            var directionLight: DirectionLight = (<DirectionLight>this.scene.addChild(new DirectionLight()));
            directionLight.color = new Vector3(0.6, 0.6, 0.6);
            //设置平行光的方向
            var mat: Matrix4x4 = directionLight.transform.worldMatrix;
            mat.setForward(new Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;

            // 配置环境反射贴图
            Laya.loader.create("res/threeDimen/LayaScene_depthNormalScene/Conventional/Assets/Scenes/depthNormalSceneGIReflection.ltcb.ls", Handler.create(this, function () {
                this.scene.ambientColor = new Vector3(0.858, 0.858, 0.858);
                this.scene.reflection = Loader.getRes("res/threeDimen/LayaScene_depthNormalScene/Conventional/Assets/Scenes/depthNormalSceneGIReflection.ltcb.ls") as TextureCube;
                this.scene.reflectionDecodingFormat = 1;
                this.scene.reflectionIntensity = 1;
            }));

            // 初始化 glTFLoader
            glTFLoader.init();

            var gltfResource = [
                "res/threeDimen/gltf/RiggedFigure/RiggedFigure.gltf",
                "res/threeDimen/gltf/Duck/Duck.gltf",
                "res/threeDimen/gltf/AnimatedCube/AnimatedCube.gltf"
            ];

            Laya.loader.create(gltfResource, Handler.create(this, this.onGLTFComplate));
        }

        public function onGLTFComplate(success: boolean): void {
            if (!success) {
                // 加载失败
                console.log("gltf load failed");
                return;
            }
            var RiggedFigure: Sprite3D = Loader.getRes("res/threeDimen/gltf/RiggedFigure/RiggedFigure.gltf");
            this.scene.addChild(RiggedFigure);
            RiggedFigure.transform.position = new Vector3(-2, 0, 0);
            console.log("RiggedFigure: This model is licensed under a Creative Commons Attribution 4.0 International License.");
    
            var duck: Sprite3D = Loader.getRes("res/threeDimen/gltf/Duck/Duck.gltf");
            this.scene.addChild(duck);
    
            var cube: Sprite3D = Loader.getRes("res/threeDimen/gltf/AnimatedCube/AnimatedCube.gltf");
            this.scene.addChild(cube);
            cube.transform.position = new Vector3(2.5, 0.6, 0);
            cube.transform.setWorldLossyScale(new Vector3(0.6, 0.6, 0.6));
        }
    }

}