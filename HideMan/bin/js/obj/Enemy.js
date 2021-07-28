define(function () {
    return (function (_super) {
        function Enemy() {
            Enemy.__super.call(this);
            this.size(80, 120);
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.graphics.drawRect(0, 0, this.width, this.height, '#f00');
        }

        Laya.class(Enemy, 'obj.Enemy', _super);

        var _proto = Enemy.prototype;

        _proto.setData = function (data) {
            this._data = data;
            var range = Math.random() * (data.inspect_range[1] - data.inspect_range[0]) + data.inspect_range[0]
            this.graphics.drawCircle(0, 0, range, null, '#f00', 3);
        }

        return Enemy;
    })(Laya.Box)
});