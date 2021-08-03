import CameraMoveScript from "./common/CameraMoveScript"
class PBRDemo
{
    constructor()
    {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        
        Laya.Scene3D.load("../res/threeDimen/scene/PBRScene/Demo.ls", Laya.Handler.create(null, function(scene:Laya.Scene3D):void {
            Laya.stage.addChild(scene);
            var camera:Laya.Camera = scene.getChildByName("Camera") as Laya.Camera;
            camera.addComponent(CameraMoveScript);
        }))
    }
}
new PBRDemo;