/* abstract class can have both abstract and concrete method
but a concrete class must have all methods concrete
*/
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Derived extends Base {
  getName() {
    return 'name';
  }
}

// ===============================================================
/* Sometimes you want to pass some constructors as parameter*/
// this is not perfect because you can still call fn(Base) despite the error
function fn(cons: typeof Base) {
  const concrete = new cons();
}

// instead you can use:
// again, class is a just a syntax sugar in es6
function fn1(cons: new () => Base) {
  const concrete = new cons();
}
fn1(Base)
fn1(Derived)
