var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UI;
(function (UI) {
    var Loading = /** @class */ (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            var _this = _super.call(this) || this;
            _this.m_LoadItem = [];
            _this.m_Progress.value = 0;
            return _this;
        }
        Loading.prototype.Init = function () {
            //动态适配屏幕分辨率
            Laya.timer.loop(1000, this, this.onInited);
            // Laya.stage.setScreenSize()
            //播放音乐
            //SoundManager.GetInstance().PlayBackMusic("data/sound/bg/1000-3.mp3",1)
        };
        Loading.prototype.onInited = function () {
            if (Laya.Browser.clientWidth > 300 || Laya.Browser.clientHeight > 300) {
                var pCfg = Config.GlobalConfig._Instance;
                Common.MirLog.Log(Common.MirLogType.Tips, "屏幕宽度:" + Laya.Browser.clientWidth + "屏幕高度:" + Laya.Browser.clientHeight);
                // pCfg._nWidth = pCfg._nSceneWidth = Laya.Browser.clientWidth;
                // pCfg._nHeight = pCfg._nSceneHeight = Laya.Browser.clientHeight;
                // Laya.stage.setScreenSize(pCfg._nWidth,pCfg._nHeight);
                // Laya.stage.scaleMode = "exactfit";
                //飘血特效
                UI.DamageEff.GetInstance().Init(this.m_LoadItem);
                //主UI
                UI.UIManager.GetInstance().LoadMainLayer(this.m_LoadItem);
                //配置文件
                Config.ConfigManager.GetInstance().LoadConfig(this.m_LoadItem);
                //其他资源
                this.m_LoadItem.push({ url: "res/atlas/comp/main/other.json", type: Laya.Loader.ATLAS });
                //hp血条
                this.m_LoadItem.push({ url: pCfg._szHPProgressUrl[0], type: Laya.Loader.IMAGE });
                this.m_LoadItem.push({ url: pCfg._szHPProgressUrl[1], type: Laya.Loader.IMAGE });
                Laya.loader.load(this.m_LoadItem, Laya.Handler.create(this, this.OnLoaded), Laya.Handler.create(this, this.OnProgress));
                Laya.timer.clear(this, this.onInited);
            }
        };
        Loading.prototype.OnLoaded = function () {
            UI.DamageEff.GetInstance().OnLoaded();
            UI.UIManager.GetInstance().onLoadedUI();
            Config.ConfigManager.GetInstance().OnLoaded();
        };
        Loading.prototype.OnProgress = function (data) {
            this.m_Progress.value = parseInt(data);
        };
        return Loading;
    }(ui.Scene.loadingUI));
    UI.Loading = Loading;
})(UI || (UI = {}));
//# sourceMappingURL=Loading.js.map