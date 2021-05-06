console.log(`
------------------------------------------------------
This example shows how to apply a decorator on a class.
Unfortunately, as of now, I don't think the @ annotation works
------------------------------------------------------
`);

// es6 class is just a syntax sugar!!!
type Constructor<T> = new (...args: any[]) => T;
function mixin_class<T extends Constructor<{}>>(base: T) {
  return class extends base {
    value: number;

    constructor(...args: any[]) {
      super(...args);
      this.value = -1;
    }

    report() {
      console.log(this.value);
    }
  }
}

class Person {}

const mixed = mixin_class(Person);
const p = new mixed();
p.value = 123;
p.report();

// The following code is not working!!!
function class_decorator(target: Function) {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
    }

    report() {
      console.log('report')
    }
  }
}

@class_decorator
class Example {}

const ex1 = new Example();
ex1.report();

