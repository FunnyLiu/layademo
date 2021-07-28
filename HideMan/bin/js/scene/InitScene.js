define(['Scene', 'Label', 'Button'], function (Scene, Label, Button) {
    return (function (_super) {
        function InitScene(game) {
            InitScene.__super.call(this, game);
        }

        Laya.class(InitScene, 'scene.InitScene', _super);

        var _proto = InitScene.prototype;

        //初始化场景
        _proto.initScene = function () {
            var nameText = new Label({
                font: "Microsoft YaHei",
                text: "潜行者",
                fontSize: 350,
                color: '#f00',
                stroke: 15,
                strokeColor: '#fff',
                x: 1920,
                y: 500,
                align: 'center',
                valign: 'middle'
            });

            this.addChild(nameText);

            var startGameBtn = new Button({
                font: "Microsoft YaHei",
                text: "开始游戏",
                fontSize: 144,
                color: '#ff0',
                stroke: 6,
                strokeColor: '#f0f',
                x: 1920,
                y: 900,
                align: 'center',
                valign: 'middle',
                width: 350,
                height: 160
            });

            this.addChild(startGameBtn);

            startGameBtn.setClickHandler(this.onStartGame.bind(this));
        }

        //主循环
        _proto.mainLoop = function () {

        }

        _proto.onStartGame = function(){
            this._game&&this._game.startGame();
        }

        return InitScene;
    })(Scene)
});