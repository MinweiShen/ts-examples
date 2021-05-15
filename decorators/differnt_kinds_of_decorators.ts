const description = `
-------------------------------------------------------------------------------------------------------------------
This example shows when different types of decorators are applied, they are evaluated in some order:
1. Decorators on instance methods, according to the order of instance methods in the class
2. Decorators on static method
3. Class Decorators for the class.
-------------------------------------------------------------------------------------------------------------------
`
console.log(description);

function class_decorator() {
  console.log('class_decorator evaluated')
  return function(constructor: Function) {
    console.log('class_decorator called')
  }
}

function instance_method_decorator0() {
  console.log('instance_method_decorator0 evaluated')
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('instance_method_decorator0 called')
  }
}

function instance_method_decorator1() {
  console.log('instance_method_decorator1 evaluated')
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('instance_method_decorator1 called')
  }
}


function static_method_decorator() {
  console.log('static_method_decorator evaluated')
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('static_method_decorator called');
  }
}

@class_decorator()
class Test {
  constructor() {}
  
  @static_method_decorator()
  static static_method() {}


  @instance_method_decorator1()
  method(val: number) {
    console.log('in method val is', val);
  }

  @instance_method_decorator0()
  method1() {
    console.log('in method1');
  }
}

const ex = new Test()
ex.method()
ex.method1();
Test.static_method();
export {};