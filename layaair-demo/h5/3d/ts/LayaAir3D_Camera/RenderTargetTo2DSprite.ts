import { Laya } from "Laya";
import { BaseCamera } from "laya/d3/core/BaseCamera";
import { Camera } from "laya/d3/core/Camera";
import { RenderState } from "laya/d3/core/material/RenderState";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Vector3 } from "laya/d3/math/Vector3";
import { Vector4 } from "laya/d3/math/Vector4";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { RenderTexture } from "laya/d3/resource/RenderTexture";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { Loader } from "laya/net/Loader";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Laya3D } from "Laya3D";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Texture2D } from "laya/resource/Texture2D";
import { Texture } from "laya/resource/Texture";
import { Sprite } from "laya/display/Sprite";


export class RenderTargetTo2DSprite {
	constructor() {
		//初始化引擎
		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Stage.SCALE_FULL;
		Laya.stage.screenMode = Stage.SCREEN_NONE;
		//显示性能面板
		Stat.show();

		//预加载资源
		Laya.loader.create(["res/threeDimen/scene/LayaScene_city01/Conventional/city01.ls"], Handler.create(this, this.onComplete));
	}

	private onComplete(): void {
		//加载场景
		var scene: Scene3D = (<Scene3D>Laya.stage.addChild(Loader.getRes("res/threeDimen/scene/LayaScene_city01/Conventional/city01.ls")));
		//添加相机
		var camera: Camera = <Camera>scene.getChildByName("Main Camera");
		//相机添加视角控制组件(脚本)
		camera.addComponent(CameraMoveScript);

		//增加个小猴
		Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey: Sprite3D): void {
			scene.addChild(layaMonkey);
			layaMonkey.transform.localScale = new Vector3(0.5, 0.5, 0.5);
			layaMonkey.transform.rotate(new Vector3(0, 180, 0), true, false);
			layaMonkey.transform.position = new Vector3(-28.8, 5, -53);
		}));


		Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function (): void {
			var changeActionButton: Button = <Button>Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "渲染到2DSprite"));
			changeActionButton.size(240, 40);
			changeActionButton.labelBold = true;
			changeActionButton.labelSize = 30;
			changeActionButton.sizeGrid = "4,4,4,4";
			changeActionButton.scale(Browser.pixelRatio, Browser.pixelRatio);
			changeActionButton.pos(Laya.stage.width / 2 - changeActionButton.width * Browser.pixelRatio / 2, Laya.stage.height - 100 * Browser.pixelRatio);
			changeActionButton.on(Event.CLICK, this, function (): void {
				//渲染到纹理的相机
				var renderTargetCamera: Camera = <Camera>scene.addChild(new Camera(0, 0.3, 1000));
				renderTargetCamera.transform.position = new Vector3(-28.8, 8, -60);
				renderTargetCamera.transform.rotate(new Vector3(0, 180, 0), true, false);
				//选择渲染目标为纹理
				renderTargetCamera.renderTarget = new RenderTexture(512, 512);
				//渲染顺序
				renderTargetCamera.renderingOrder = -1;
				//清除标记
				renderTargetCamera.clearFlag = BaseCamera.CLEARFLAG_SKY;
				var rtex = new Texture(((<Texture2D>(renderTargetCamera.renderTarget as any))), Texture.DEF_UV);
				var sp = new Sprite();
				Laya.stage.addChild(sp);
				sp.graphics.drawTexture(rtex);
			});
		}));
	}
}

