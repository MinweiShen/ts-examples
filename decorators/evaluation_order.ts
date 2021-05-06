const description = `
------------------------------------------------------------
This example shows that when multiple decorators are applied,
they are evaluated top-to-bottom and executed bottom-to-top.
------------------------------------------------------------
`
console.log(description);

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

const ex = new ExampleClass()
ex.method()