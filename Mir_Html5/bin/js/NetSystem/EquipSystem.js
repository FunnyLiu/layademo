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
var NetSystem;
(function (NetSystem) {
    var EquipSystem = /** @class */ (function (_super) {
        __extends(EquipSystem, _super);
        function EquipSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_ArrEquip = new Array();
            return _this;
        }
        EquipSystem.prototype.Process = function (nCmdId, pack) {
            switch (nCmdId) {
                case ClientMsgPack.PackType.EquipSystem.sGetEquipInfo:
                    {
                        this.onGetEquipInfo(pack);
                        break;
                    }
                default:
                    {
                        _super.prototype.Process.call(this, nCmdId, pack);
                    }
            }
        };
        EquipSystem.prototype.onGetEquipInfo = function (pack) {
            this.m_ArrEquip.splice(0, this.m_ArrEquip.length);
            var msg = new ClientMsgPack.EquipPack.QueryEquipRetPack();
            msg.DeSerialize(pack);
            for (var i = 0; i < msg._ListEquip.length; i++) {
                this.m_ArrEquip.push(msg._ListEquip[i]);
            }
        };
        return EquipSystem;
    }(NetSystem.BaseNetSystem));
    NetSystem.EquipSystem = EquipSystem;
})(NetSystem || (NetSystem = {}));
//# sourceMappingURL=EquipSystem.js.map