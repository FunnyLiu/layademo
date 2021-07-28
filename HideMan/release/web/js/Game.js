define(['InitScene'], function (InitScene) {
    return (function (_super) {
        function Game() {
            Game.__super.call(this);
            this.size(3840, 1536)
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.name = 'game';
            this.centerX = 0;
            this.centerY = 0;
            this.graphics.drawRect(10, 10, 3820, 1515, null, '#f00', 2);
        }

        Laya.class(Game, 'Game', _super);

        var _proto = Game.prototype;

        //初始化游戏
        _proto.initGame = function () {
            this._initScene = new InitScene(this);
            this._initScene.zOrder = 3;
            this.addChild(this._initScene);
            this._initScene.show();
        }

        //开始游戏，加载正式的游戏场景
        _proto.startGame = function () {
            if (!this._gameScene) {
                this._gameScene = new scene.GameScene(this);
                this._gameScene.zOrder = 0;
                this.addChild(this._gameScene);
                this._initScene.hide();
                this._gameScene.show();
            } else {
                this._initScene.hide(function () {
                    this._gameScene.reStart();
                    this._gameScene.show();
                }.bind(this));
            }
        }

        //游戏结束，显示得分界面
        _proto.finishGame = function (result) {
            if (!this._finishScene) {
                this._finishScene = new scene.FinishScene(this);
                this._finishScene.zOrder = 2;
                this.addChild(this._finishScene);
                this._gameScene.hide();
                this._finishScene.setResult(result);
                this._finishScene.show();
            } else {
                this._gameScene.hide();
                this._finishScene.setResult(result);
                this._finishScene.show();
            }
        }

        //回到初始界面
        _proto.toInit = function () {
            this._finishScene.hide();
            this._initScene.show();
        }

        //重新开始游戏
        _proto.reStart = function () {
            this._finishScene.hide(function () {
                this._gameScene.reStart();
                this._gameScene.show();
            }.bind(this));
        }

        return Game;
    })(Laya.Box)
});