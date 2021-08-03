class Laya3DCombineHtml{
        constructor(){
                let div = Laya.Browser.window.document.createElement("div");
                div.innerHTML = "<h1 style='color: red;'>此内容来源于HTML网页, 可直接在html代码中书写 - h1标签</h1>";
                document.body.appendChild(div);
                //1.开启第四个参数
                let config3D = new Laya.Config3D();
                config3D.isAlpha = true;
                Laya3D.init(0, 0, config3D);
                Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
                Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
                //2.设置舞台背景色为空
                Laya.stage.bgColor = null;
                this.scene = new Laya.Scene3D();
                let camera = new Laya.Camera(0, 0.1, 100);
                Laya.stage.addChild(this.scene);
                this.scene.addChild(camera);
                camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
                camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
                //3.清除照相机颜色
                camera.clearColor = null;
                this.directionLight = new Laya.DirectionLight();
                this.scene.addChild(this.directionLight);
                this.directionLight.direction = new Laya.Vector3(0, -0.8, -1);
                this.directionLight.color = new Laya.Vector3(0.7, 0.6, 0.6);
                Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, this.onLoadFinish));
        }
        onLoadFinish(layaMonkey){
                this.scene.addChild(layaMonkey);
        }

}

//激活启动类
new Laya3DCombineHtml();
