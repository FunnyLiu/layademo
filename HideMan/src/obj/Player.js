define(function () {
    return (function (_super) {
        function Player() {
            Player.__super.call(this);

            this.size(80, 120);
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.graphics.clear();
            this.graphics.drawRect(0, 0, this.width, this.height, '#fff');
        }

        Laya.class(Player, 'obj.Player', _super);

        var _proto = Player.prototype;

        _proto.setData = function (data, scene) {
            this._data = data;
            this._scene = scene;
            this._hurtCount = 0;
        }

        //更新状态
        _proto.update = function (dt, vector) {
            this._updatePos(dt, vector);
            if (this.isDead()) {
                this._scene.gameOver();
            }
            if (this.isToTarget()) {
                this._scene.finishLevel();
            }
        }

        //更新位置
        _proto._updatePos = function (dt, vector) {
            var s = this._data.player_speed * dt / 1000;
            var nx = this.x + vector.x * s;
            var ny = this.y + vector.y * s;

            if (nx < this.width / 2) {
                nx = this.width / 2;
            } else if (nx > 3840 - this.width / 2) {
                nx = 3840 - this.width / 2;
            }
            if (ny < this.height / 2) {
                ny = this.height / 2;
            } else if (ny > 1536 - this.height / 2) {
                ny = 1536 - this.height / 2;
            }
            this.pos(nx, ny);
        }

        //受伤
        _proto.beHurt = function () {
            var timeline = new Laya.TimeLine();
            this._hurtProtect = true;
            this._hurtCount++;
            timeline.from(this, { alpha: 0.3 }, 300, Laya.Ease.cubicIn);
            timeline.from(this, { alpha: 1 }, 300, Laya.Ease.cubicOut);
            timeline.from(this, { alpha: 0.3 }, 300, Laya.Ease.cubicIn);
            timeline.from(this, { alpha: 1 }, 300, Laya.Ease.cubicOut);
            timeline.from(this, { alpha: 0.3 }, 300, Laya.Ease.cubicIn);
            timeline.from(this, { alpha: 1 }, 300, Laya.Ease.cubicOut);
            timeline.on(Laya.Event.COMPLETE, this, function () {
                this._hurtProtect = false;
            });
            timeline.play();
        }

        //是否可以被伤害
        _proto.canBeHurt = function () {
            var topLimit = this._scene.getTopLimit();
            var bottomLimit = this._scene.getBottomLimit();
            var isInSafeArea = this.y + this.height / 2 < topLimit || this.y - this.height / 2 > bottomLimit;
            return !this._hurtProtect && !isInSafeArea;
        }

        //是否死亡
        _proto.isDead = function () {
            return this._hurtCount >= this._data.healthNum;
        }

        //是否到达对岸
        _proto.isToTarget = function () {
            var topLimit = this._scene.getTopLimit();
            return this.y + this.height / 2 < topLimit;
        }

        //获取剩余健康值
        _proto.getLeftHealth = function(){
            return this._data.healthNum - this._hurtCount;
        }

        //回收前恢复状态
        _proto.restoreState = function(){
            this.alpha = 1;
        }

        return Player;
    })(Laya.Box)
});