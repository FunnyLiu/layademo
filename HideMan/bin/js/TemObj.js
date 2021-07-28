define(function () {
    return (function (_super) {
        function TemObj() {
            TemObj.__super.call(this);
        }

        Laya.class(TemObj, 'view.templatebase.TemObj', _super);

        var _proto = TemObj.prototype;

        _proto.setData = function (data) {
            this._data = data;
        }

        return TemObj;
    })(Laya.Box)
});