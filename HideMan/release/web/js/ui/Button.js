define(['Label'], function (Label) {
    return (function (_super) {
        function Button(config) {
            Button.__super.call(this, config);

            var width = Math.max(config && config.width || 0, this._text.width * this._text.scaleX);
            var height = Math.max(config && config.height || 0, this._text.height * this._text.scaleY);
            this._text.pos(width / 2, height / 2);

            this.size(width, height);

            this.graphics.drawRect(0, 0, this.width, this.height, null, '#fff', 3)

            this.on(Laya.Event.MOUSE_DOWN, this, this._onTouchStart);
            this.on(Laya.Event.MOUSE_UP, this, this._onTouchEnd);
            this.on(Laya.Event.MOUSE_OUT, this, this._onTouchOut);
        }

        Laya.class(Button, 'ui.Button', _super);

        var _proto = Button.prototype;

        _proto.setClickHandler = function (callback) {
            this._clickHandler = callback;
        }

        _proto._onTouchStart = function (event) {
            this._hasRelease = false;
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, 60, Laya.Ease.cubicIn);
        }

        _proto._onTouchEnd = function (event) {
            if (!this._hasRelease) {
                this._hasRelease = true;
                this.mouseEnabled = false;
                Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 60, Laya.Ease.cubicOut, new Laya.Handler(this, function () {
                    this._clickHandler && this._clickHandler();
                    this.mouseEnabled = true;
                }));
            }
        }

        _proto._onTouchOut = function () {
            if (!this._hasRelease) {
                this.mouseEnabled = false;
                Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, 60, Laya.Ease.cubicOut);
                this._hasRelease = true;
                this.mouseEnabled = true;
            }
        }

        return Button;
    })(Label)
});