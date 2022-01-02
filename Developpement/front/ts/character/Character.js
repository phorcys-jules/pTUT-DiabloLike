"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Character = void 0;
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(name, lvl) {
        if (lvl === void 0) { lvl = 1; }
        var _this = 
        //Level has  default value of 1
        _super.call(this) || this;
        _this.name = name;
        _this.lvl = lvl;
        return _this;
    }
    Character.prototype.toString = function () {
        return "".concat(this.name, " est un ").concat(this.constructor.name, " de niveau ").concat(this.lvl);
    };
    return Character;
}(Object));
exports.Character = Character;
