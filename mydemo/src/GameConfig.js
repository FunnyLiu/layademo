/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import secondUI from ".//pages/secondUI"
import firstUI from ".//pages/firstUI"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("/pages/secondUI.js",secondUI);
		reg("/pages/firstUI.js",firstUI);
    }
}
GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "bigScene.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
