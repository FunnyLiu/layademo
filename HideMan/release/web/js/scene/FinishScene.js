define(['Scene'], function (Scene) {
    return (function (_super) {
        function FinishScene(game) {
            FinishScene.__super.call(this, game);
        }

        Laya.class(FinishScene, 'scene.FinishScene', _super);

        var _proto = FinishScene.prototype;

        //初始化场景
        _proto.initScene = function () {
            this.titleText = new ui.Label({
                font: "Microsoft YaHei",
                text: "",
                fontSize: 300,
                color: '#0ff',
                stroke: 15,
                strokeColor: '#fff',
                x: 1920,
                y: 450,
                align: 'center',
                valign: 'middle'
            });
            this.addChild(this.titleText);

            this.contentText = new ui.Label({
                font: "Microsoft YaHei",
                text: "",
                fontSize: 144,
                color: '#0ff',
                stroke: 15,
                strokeColor: '#fff',
                x: 1920,
                y: 800,
                align: 'center',
                valign: 'middle',
                width: 2000
            });
            this.addChild(this.contentText);

            this.toInitGameBtn = new ui.Button({
                font: "Microsoft YaHei",
                text: "不玩了",
                fontSize: 144,
                color: '#00f',
                stroke: 6,
                strokeColor: '#fff',
                x: 1320,
                y: 1100,
                align: 'center',
                valign: 'middle',
                width: 350,
                height: 160
            });
            this.addChild(this.toInitGameBtn);

            this.reStartGameBtn = new ui.Button({
                font: "Microsoft YaHei",
                text: "重新开始",
                fontSize: 144,
                color: '#0f0',
                stroke: 6,
                strokeColor: '#fff',
                x: 2520,
                y: 1100,
                align: 'center',
                valign: 'middle',
                width: 350,
                height: 160
            });
            this.addChild(this.reStartGameBtn);

            this.toInitGameBtn.setClickHandler(this.onToInit.bind(this));
            this.reStartGameBtn.setClickHandler(this.onReStart.bind(this));
        }

        _proto.setResult = function (result) {
            if (result.level <= 3) {
                title = '太遗憾了';
            } else if (result.crossLevel) {
                title = '恭喜你通关了';
            } else {
                title = '你太棒了';
            }
            content = '你的总得分为{0}分'.replace('{0}', result.score);
            this.titleText.text = title;
            this.contentText.text = content;
        }

        _proto.onToInit = function(){
            this._game&&this._game.toInit();
        }

        _proto.onReStart = function(){
            this._game&&this._game.reStart();
        }

        return FinishScene;
    })(Scene)
});