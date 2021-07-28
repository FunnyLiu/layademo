define(function () {
    return (function (_super) {
        function Enenmy() {
            Enenmy.__super.call(this);
            this.size(80, 120);
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }

        Laya.class(Enenmy, 'obj.Enenmy', _super);

        var _proto = Enenmy.prototype;

        _proto.setData = function (data, scene) {
            this._data = data;
            var range = Math.random() * (data.inspect_range[1] - data.inspect_range[0]) + data.inspect_range[0];
            this._range = range;
            this.graphics.clear();
            this.graphics.drawRect(0, 0, this.width, this.height, '#f00');
            this.graphics.drawCircle(this.width / 2, this.height / 2, range, null, '#f00', 3);

            this._pcLimit = 30 + Math.random() * 70;//生成随机改变巡逻方向时限
            this._upCount = 0;//初始化时限计数
            this._vector = new Laya.Point(Math.random() - 0.5, Math.random() - 0.5)
            this._vector.normalize();//生成随机巡逻方向

            this._scene = scene;
        }

        _proto.update = function (dt) {
            this._upCount++;
            if (this._upCount > this._pcLimit) {//重新生成巡逻信息数据
                this._pcLimit = 30 + Math.random() * 70;
                this._upCount = 0;
                this._vector.setTo(Math.random() - 0.5, Math.random() - 0.5);
                this._vector.normalize();//生成随机巡逻方向
            }
            var s = this._data.enenmy_speed * dt / 1000;
            var nx = this.x + this._vector.x * s;
            var ny = this.y + this._vector.y * s;

            var topLimit = this._scene.getTopLimit();
            var bottomLimit = this._scene.getBottomLimit();

            if (nx < this.width / 2) {
                nx = this.width / 2;
            } else if (nx > 3840 - this.width / 2) {
                nx = 3840 - this.width / 2;
            }
            if (ny < topLimit + this.height / 2) {
                ny = topLimit + this.height / 2;
            } else if (ny > bottomLimit - this.height / 2) {
                ny = bottomLimit - this.height / 2;
            }
            //根据巡逻信息和速度移动位置
            this.pos(nx, ny);

            //判断是否发现玩家
            var player = this._scene.getPlayer();
            if (Math.sqrt(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)) < this._range) {
                if (player.canBeHurt()) {
                    player.beHurt();
                }
            }
        }

        //回收前恢复状态
        _proto.restoreState = function () {

        }

        return Enenmy;
    })(Laya.Box)
});