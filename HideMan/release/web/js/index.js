var parseUrl = function (url) {
    var r = Laya.URL.formatURL(url).replace('.js', '');
    console.log(r);
    return r;
};
require.config({
    paths: {
        "Game": parseUrl("js/Game.js"),
        "Label": parseUrl("js/ui/Label.js"),
        "Button": parseUrl("js/ui/Button.js"),
        "Player": parseUrl("js/obj/Player.js"),
        "Enenmy": parseUrl("js/obj/Enenmy.js"),
        "Scene": parseUrl("js/scene/Scene.js"),
        "InitScene": parseUrl("js/scene/InitScene.js"),
        "GameScene": parseUrl("js/scene/GameScene.js"),
        "FinishScene": parseUrl("js/scene/FinishScene.js"),
    }
});

var jsLoadList = [
    "Game",
    "Label",
    "Button",
    "Player",
    "Enenmy",
    "Scene",
    "InitScene",
    "GameScene",
    "FinishScene"
];

require(jsLoadList, function () {
    var WebGL = laya.webgl.WebGL;
    Laya.init(3840, 1536, WebGL);
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

    Laya.stage.scaleMode = "fixedheight";

    //显示调试面板
    // Laya.DebugPanel.init();

    var game = new Game();
    Laya.stage.addChild(game);

    //初始化游戏
    game.initGame();
});