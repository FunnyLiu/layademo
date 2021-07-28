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
//掉落道具的实体
var Entity;
(function (Entity) {
    var DropItem = /** @class */ (function (_super) {
        __extends(DropItem, _super);
        function DropItem(handle) {
            var _this = _super.call(this, handle) || this;
            _this.m_Type = Entity.EntityType.DropItem;
            return _this;
        }
        DropItem.prototype.SetItemInfo = function (msg) {
        };
        return DropItem;
    }(Entity.CustomEntity));
    Entity.DropItem = DropItem;
})(Entity || (Entity = {}));
//# sourceMappingURL=DropItem.js.map