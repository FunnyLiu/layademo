var gameConfig = {
    'levelCount': 6,
    'levelConfig': {
        '1': {
            'enenmyNum': 2,
            'inspect_range': [200, 300],
            'enenmy_speed': 360,
            'score_ratio': 10,
            'healthNum': 5,
            'player_speed': 360
        },
        '2': {
            'enenmyNum': 4,
            'enenmy_speed': 360,
            'inspect_range': [300, 350],
            'score_ratio': 15,
            'healthNum': 6,
            'player_speed': 360
        },
        '3': {
            'enenmyNum': 8,
            'enenmy_speed': 360,
            'inspect_range': [350, 400],
            'score_ratio': 20,
            'healthNum': 7,
            'player_speed': 360
        },
        '4': {
            'enenmyNum': 12,
            'enenmy_speed': 360,
            'inspect_range': [400, 450],
            'score_ratio': 25,
            'healthNum': 8,
            'player_speed': 360
        },
        '5': {
            'enenmyNum': 16,
            'enenmy_speed': 360,
            'inspect_range': [400, 450],
            'score_ratio': 30,
            'healthNum': 9,
            'player_speed': 360
        },
        '6': {
            'enenmyNum': 20,
            'enenmy_speed': 360,
            'inspect_range': [450, 500],
            'score_ratio': 35,
            'healthNum': 10,
            'player_speed': 360
        }
    }
}

define(['Scene'], function (Scene) {
    return (function (_super) {
        function GameScene(game) {
            GameScene.__super.call(this, game);
        }

        Laya.class(GameScene, 'scene.GameScene', _super);

        var _proto = GameScene.prototype;

        //初始化场景
        _proto.initScene = function () {
            var offsetX = (3840 - Laya.stage.width) / 2;
            var scoreHint = new ui.Label({
                font: "Microsoft YaHei",
                text: "分   数",
                fontSize: 72,
                color: '#fff',
                stroke: 3,
                strokeColor: '#ff0',
                x: 200 + offsetX,
                y: 150,
                align: 'center',
                valign: 'middle'
            });

            this.addChild(scoreHint);

            this._score = new ui.Label({
                font: "Microsoft YaHei",
                text: "0",
                fontSize: 72,
                color: '#fff',
                stroke: 3,
                strokeColor: '#ff0',
                x: 490 + offsetX,
                y: 150,
                width: 300,
                align: 'left',
                valign: 'middle'
            });

            this.addChild(this._score);

            var hpHint = new ui.Label({
                font: "Microsoft YaHei",
                text: "生命值",
                fontSize: 72,
                color: '#fff',
                stroke: 3,
                strokeColor: '#3f3',
                x: 200 + offsetX,
                y: 250,
                align: 'center',
                valign: 'middle'
            });

            this.addChild(hpHint);

            this._hp = new ui.Label({
                font: "Microsoft YaHei",
                text: "5",
                fontSize: 72,
                color: '#fff',
                stroke: 3,
                strokeColor: '#3f3',
                x: 490 + offsetX,
                y: 250,
                width: 300,
                align: 'left',
                valign: 'middle'
            });

            this.addChild(this._hp);

            var topLimit = this.getTopLimit();
            var bottomLimit = this.getBottomLimit();

            //绘制游戏区域
            this.graphics.drawLine(0, topLimit, 3840, topLimit, '#f00', 3);

            this.graphics.drawLine(0, bottomLimit, 3840, bottomLimit, '#f00', 3);

            this._levelNum = 1;

            this._result = {
                score: 0,         //分数
                hp: 5,            //血量
                level: 1,         //到达的游戏等级
                crossLevel: false //是否通关
            }

            //创建敌人
            this._createEnemies();

            //创建玩家
            this._createPlayer();

            //开始场景
            this.startScene();

            this.on(Laya.Event.MOUSE_DOWN, this, this._onTouchStart);
            this.on(Laya.Event.MOUSE_MOVE, this, this._onTouchMove);
            this.on(Laya.Event.MOUSE_UP, this, this._onTouchEnd);
            this.on(Laya.Event.MOUSE_OUT, this, this._onTouchOut);

            this._vector = new Laya.Point(0, 0);
        }

        //主循环
        _proto.mainLoop = function () {
            //更新玩家状态
            this._updatePlayer();

            //更新敌人状态
            this._updateEnemies();

            //更新状态显示
            this._updateHUD();
        }

        //更新状态显示器
        _proto._updateHUD = function () {
            this._score.text = this._result.score;
            this._player && (this._hp.text = this._player.getLeftHealth());
        }

        //更新敌人状态
        _proto._updateEnemies = function () {
            this._enemies.forEach(function (e) {
                e.update(Laya.timer.delta);
            }, this);
        }

        //更新玩家状态
        _proto._updatePlayer = function () {
            this._player.update(Laya.timer.delta, this._vector);
        }

        //重新开始
        _proto.reStart = function () {
            this._levelNum = 1;

            this._result = {
                score: 0,         //分数
                hp: 5,            //血量
                level: 1,         //到达的游戏等级
                crossLevel: false //是否通关
            }

            //创建敌人
            this._createEnemies();

            //创建玩家
            this._createPlayer();

            //开始场景
            this.startScene();

            this._vector = new Laya.Point(0, 0);

            this.mouseEnabled = true;
        }

        //创建敌人
        _proto._createEnemies = function () {
            var config = gameConfig.levelConfig[this._levelNum];
            this._enemies = [];
            for (var i = 0, e; i < config.enenmyNum; i++) {
                e = Laya.Pool.getItemByClass('enenmy', obj.Enenmy);
                e.pos(1920 + (Math.random() - 0.5) * 1000, 750 + (Math.random() - 0.5) * 300);
                e.setData(config, this);
                this.addChild(e);
                this._enemies.push(e);
            }
        }

        //创建玩家
        _proto._createPlayer = function () {
            var config = gameConfig.levelConfig[this._levelNum];
            this._player = Laya.Pool.getItemByClass('player', obj.Player);
            this._player.pos(1920, 1450);
            this._player.setData(config, this);
            this.addChild(this._player);
        }

        //完成当前级别
        _proto.finishLevel = function () {
            console.log('>>>', this._levelNum);
            if (this._levelNum + 1 > gameConfig.levelCount) {//完成游戏
                this.pauseScene();
                this.mouseEnabled = false; //禁止触摸事件
                this._collectSceneInfo(true);
                this._clearScene();
                this._game && this._game.finishGame(this._result);
            } else { //开启下一关
                this.pauseScene();
                this.mouseEnabled = false; //禁止触摸事件
                this._collectSceneInfo(false);
                this._clearScene();
                this.hide(function () {
                    this._levelNum++;
                    this._createEnemies();
                    this._createPlayer();
                    this.show(function () {
                        this.startScene();
                        this.mouseEnabled = true; //禁止触摸事件
                    }.bind(this));
                }.bind(this));
            }
        }

        //游戏结束
        _proto.gameOver = function () {
            this.pauseScene();
            this.mouseEnabled = false; //禁止触摸事件
            this.hide();
            this._collectSceneInfo(false);
            this._clearScene();
            this._game && this._game.finishGame(this._result);
        }

        //收集结果信息
        _proto._collectSceneInfo = function (cross) {
            var config = gameConfig.levelConfig[this._levelNum];
            this._result.level = this._levelNum;
            this._result.hp = this._player.getLeftHealth();
            this._result.crossLevel = cross;
            this._result.score += this._player.getLeftHealth() * config.score_ratio;
        }

        //清理场景
        _proto._clearScene = function () {
            this._player.removeSelf();
            this._player.restoreState();
            Laya.Pool.recover('player', this._player);
            this._player = null;
            this._enemies.forEach(function (e) {
                e.restoreState();
                e.removeSelf();
                Laya.Pool.recover('enenmy', e);
            });
            this._enemies = [];
        }

        //获取游戏区域顶端
        _proto.getTopLimit = function () {
            return 150;
        }

        //获取游戏区域底端
        _proto.getBottomLimit = function () {
            return 1350;
        }

        //获取玩家
        _proto.getPlayer = function () {
            return this._player;
        }

        _proto._onTouchStart = function (event) {
            var point = Laya.stage.getMousePoint();
            this._vector.setTo(point.x - this._player.x, point.y - this._player.y).normalize();//设置方向向量，并进行归一化
        }

        _proto._onTouchMove = function (event) {
            var point = Laya.stage.getMousePoint();
            this._vector.setTo(point.x - this._player.x, point.y - this._player.y).normalize();//设置方向向量，并进行归一化
        }

        _proto._onTouchEnd = function (event) {
            this._vector.setTo(0, 0);//停止触屏，设置方向向量为0
        }

        _proto._onTouchOut = function (event) {
            this._vector.setTo(0, 0);//停止触屏，设置方向向量为0
        }

        return GameScene;
    })(Scene)
});