define(function () {
    return (function (_super) {
        function Scene(game) {
            Scene.__super.call(this);
            this.size(3840, 1536)
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.centerX = 0;
            this.centerY = 0;
            this.visible = false;
            this.alpha = 0;
            this._init();
            this._game = game;
        }

        Laya.class(Scene, 'scene.Scene', _super);

        var _proto = Scene.prototype;

        _proto._init = function () {
            Laya.timer.frameLoop(1, this, this._loop.bind(this));
            this.initScene();
        }

        //初始化场景
        _proto.initScene = function () {

        }

        _proto._loop = function () {
            if (this._enableLoop) {
                this.mainLoop();
            }
        }

        //主循环
        _proto.mainLoop = function () {

        }

        //开始场景
        _proto.startScene = function () {
            this._enableLoop = true;
        }

        //暂停场景
        _proto.pauseScene = function () {
            this._enableLoop = false;
        }

        //显示
        _proto.show = function (callback) {
            this.visible = true;
            Laya.Tween.to(this, { alpha: 1 }, 1000, Laya.Ease.backIn, new Laya.Handler(this, function () {
                this.alpha = 1;
                callback&&callback();
            }));
        }

        //隐藏
        _proto.hide = function (callback) {
            Laya.Tween.to(this, { alpha: 0 }, 1000, Laya.Ease.backOut, new Laya.Handler(this, function () {
                this.alpha = 0;
                this.visible = false;
                callback&&callback();
            }));
        }

        return Scene;
    })(Laya.Box)
});