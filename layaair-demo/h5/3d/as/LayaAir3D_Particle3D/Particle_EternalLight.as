package LayaAir3D_Particle3D {
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.math.Color;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.utils.Handler;
	import laya.utils.Stat;
	import laya.d3.core.BaseCamera;
	
	/**
	 * ...
	 * @author ...
	 */
	public class Particle_EternalLight {
		
		public function Particle_EternalLight() {
			Laya3D.init(0, 0);
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			Stat.show();
			
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
			camera.transform.translate(new Vector3(0, 2, 4));
			camera.transform.rotate(new Vector3( -15, 0, 0), true, false);
			camera.clearFlag = BaseCamera.CLEARFLAG_SOLIDCOLOR;
			camera.clearColor = new Color(0, 0, 0, 1);
			
			Sprite3D.load("res/threeDimen/particle/ETF_Eternal_Light.lh", Handler.create(this, function(sprite:Sprite3D):void {
				scene.addChild(sprite) as Sprite3D;
			}))
		
		}
	
	}

}