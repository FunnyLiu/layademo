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
    var Role = /** @class */ (function (_super) {
        __extends(Role, _super);
        function Role() {
            var _this = _super.call(this) || this;
            _this.m_ItemGrid = null;
            _this.on(Laya.Event.ADDED, _this, _this.OnLoaded);
            _this.on(Laya.Event.REMOVED, _this, _this.OnRemove);
            return _this;
        }
        Role.prototype.OnLoaded = function () {
            this.m_btn_close.on(Laya.Event.CLICK, this, this.OnBtnClose);
            //测试物品格子
            this.m_ItemGrid = new UI.ItemGrid(true);
            this.m_ItemGrid.SetItemByItemID(111104);
            //Laya.stage.addChild(ItemGrid);
            this.addChild(this.m_ItemGrid);
            this.m_ItemGrid.pos(100, 100);
            this.m_ItemGrid.zOrder = 10000;
        };
        Role.prototype.OnRemove = function () {
            this.m_ItemGrid.removeSelf();
            this.m_ItemGrid.Destory();
            this.m_ItemGrid = null;
            this.m_btn_close.off(Laya.Event.CLICK, this, this.OnBtnClose);
        };
        Role.prototype.OnBtnClose = function () {
            UI.UIManager.GetInstance().HideDialog(UI.UIDialogID.Role);
        };
        return Role;
    }(ui.Window.roleUI));
    UI.Role = Role;
})(UI || (UI = {}));
//# sourceMappingURL=Role.js.map