/* an example of index signature in class*/
class MyClass {
  // this is mostly not easy to use because it needs to capture the method types as well
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

const myClass = new MyClass();
myClass["a"] = true;
console.log(myClass.check("a"))
export {};