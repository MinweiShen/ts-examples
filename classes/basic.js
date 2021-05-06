var Point = /** @class */ (function () {
    function Point(x, y) {
        var _this = this;
        /*
        You can have arrow function in class to bind this.
        however:
        1. this will use more memory because each instance of Point will have its own sum
        2. you can't use super.sum() in the subclass because sum is on the instance, not on the prototype chain!
        */
        this.sum = function () { return _this.x + _this.y; };
        this.x = typeof x === 'string' ? parseInt(x) : x;
        this.y = typeof y === 'string' ? parseInt(y) : y;
        this.z = 100;
        this._value = -1;
    }
    // static method is one way to do constructor overload I think
    Point.factory = function (x) {
        return new Point(x, 100);
    };
    Object.defineProperty(Point.prototype, "value", {
        // getter and setter
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
        },
        enumerable: false,
        configurable: true
    });
    Point.prototype.minus = function () {
        this.x - this.y;
    };
    return Point;
}());
var point = new Point(1, 2);
var point1 = new Point("1", "2");
