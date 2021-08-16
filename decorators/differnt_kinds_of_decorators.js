"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var description = "\n-------------------------------------------------------------------------------------------------------------------\nThis example shows when different types of decorators are applied, they are evaluated in some order:\n1. Decorators on instance methods, according to the order of instance methods in the class\n2. Decorators on static method\n3. Class Decorators for the class.\n-------------------------------------------------------------------------------------------------------------------\n";
console.log(description);
function class_decorator() {
    console.log('class_decorator evaluated');
    return function (constructor) {
        console.log('class_decorator called');
    };
}
function instance_method_decorator0() {
    console.log('instance_method_decorator0 evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('instance_method_decorator0 called');
    };
}
function instance_method_decorator1() {
    console.log('instance_method_decorator1 evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('instance_method_decorator1 called');
    };
}
function static_method_decorator() {
    console.log('static_method_decorator evaluated');
    return function (target, propertyKey, descriptor) {
        console.log('static_method_decorator called');
    };
}
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.static_method = function () { };
    Test.prototype.method = function (val) {
        console.log('in method val is', val);
    };
    Test.prototype.method1 = function () {
        console.log('in method1');
    };
    __decorate([
        instance_method_decorator1()
    ], Test.prototype, "method");
    __decorate([
        instance_method_decorator0()
    ], Test.prototype, "method1");
    __decorate([
        static_method_decorator()
    ], Test, "static_method");
    Test = __decorate([
        class_decorator()
    ], Test);
    return Test;
}());
var ex = new Test();
ex.method(1);
ex.method1();
Test.static_method();
