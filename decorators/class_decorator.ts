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

interface Reportable {
  report: () => void
}

function class_decorator<T extends (new (...args: any[]) => any)>(target: T) {
  class Extended extends target implements Reportable {
        constructor(...args: any[]) {
      super(...args);
    }

    report() {
      console.log('report')
    }
  }

  return Extended;
}

type R = ReturnType<typeof class_decorator>

@class_decorator
class Example {}

const ex1 = new Example() as (R & Reportable);
ex1.report();

export {};