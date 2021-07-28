define(function () {
    return (function (_super) {
        function Label(config) {
            Label.__super.call(this);

            this._text = new Laya.Text();
            this._text.font = config ? config.font || "Microsoft YaHei" : "Microsoft YaHei";
            this._text.text = config ? config.text || "" : "";
            this._text.fontSize = 72;
            this._text.color = config ? config.color || '#f00' : '#f00';
            var strokeW = config && config.stroke && config.fontSize ? config.stroke / config.fontSize * 72 : 0;
            this._text.stroke = strokeW;
            this._text.strokeColor = config ? config.strokeColor || '#fff' : '#fff';
            var scale = config && config.fontSize ? config.fontSize / 72 : 1;
            this._text.scale(scale, scale);


            this._text.align = config && config.align || 'center';
            this._text.valign = config && config.valign || 'middle';
            this._text.size(config && config.width || this._text.textWidth, config && config.height || this._text.textHeight);
            this._text.pivotX = this._text.width / 2;
            this._text.pivotY = this._text.height / 2;
            this._text.pos(this._text.width / 2 * scale, this._text.height / 2 * scale);

            this.size(this._text.width * scale, this._text.height * scale);
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.pos(config && config.x || 0, config && config.y || 0);

            this.addChild(this._text);

            //为Label实例 注册 get set 方法
            Laya.getset(false, this, "text", this.getterText, this.setterText);
        }

        Laya.class(Label, 'ui.Label', _super);

        var _proto = Label.prototype;

        _proto.getterText = function () {
            return this._text.text;
        }

        _proto.setterText = function (val) {
            this._text.text = val;
        }

        return Label;
    })(Laya.Box)
});