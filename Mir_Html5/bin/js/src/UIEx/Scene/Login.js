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
    var Login = /** @class */ (function (_super) {
        __extends(Login, _super);
        function Login() {
            var _this = _super.call(this) || this;
            _this.m_TextPaswd.type = "password";
            _this.m_TextUser.text = "yiyi";
            _this.m_TextPaswd.text = "a";
            _this.m_btnEnter.on(Laya.Event.CLICK, _this, _this.OnEnterClick);
            return _this;
        }
        Login.prototype.OnEnterClick = function () {
            //记录帐号和密码
            var pCfg = Config.GlobalConfig._Instance;
            pCfg._szUser = this.m_TextUser.text;
            pCfg._szPasswd = this.m_TextPaswd.text;
            var szIp = "172.18.139.1";
            var nPort = 13006;
            Common.MirLog.Log(Common.MirLogType.Tips, "连接服务器,ip:" + szIp + " 端口:" + nPort.toString());
            Net.MainSocket.GetInstance().Connect(szIp, nPort);
            //Net.MainSocket.GetInstance().Connect("182.254.212.249",13006);
            this.m_btnEnter.visible = false;
        };
        return Login;
    }(ui.Scene.LoginUI));
    UI.Login = Login;
})(UI || (UI = {}));
//# sourceMappingURL=Login.js.map