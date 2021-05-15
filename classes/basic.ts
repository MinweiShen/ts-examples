class Point {
  x: number // implicitly public
  y: number
  readonly z: number; // read-only values can only be initialized in constructor and can't be modified
  private _value: number;

  // static method is one way to do constructor overload I think
  static factory(x: number) {
    return new Point(x, 100);
  }

  // Very odd but the last constructor needs to implement all the constructors!!
  // here is a good article on how to overload constructors in different ways https://www.broculos.net/2017/10/typescript-constructor-overloads.html
  constructor(x: string, y: string);
  constructor(x: number, y: number);
  constructor(x: number | string, y: number | string) {
    this.x = typeof x === 'string' ? parseInt(x) : x;
    this.y = typeof y === 'string' ? parseInt(y) : y;
    this.z = 100;
    this._value = -1;
  }

  // getter and setter
  get value() {
    return this._value;
  }
  set value(v: number) {
    this._value = v;
  }

  /*
  You can have arrow function in class to bind this.
  however:
  1. this will use more memory because each instance of Point will have its own sum
  2. you can't use super.sum() in the subclass because sum is on the instance, not on the prototype chain!
  */
  sum = () => this.x + this.y

  // Note: this parameter is erased when compiled but it's used for type check
  // the following code p1() will fail because this is global not Point
  minus(this: Point) {
    this.x - this.y
  }

}

const point = new Point(1, 2);
const p1 = point.minus
p1();
const point1 = new Point("1", "2");
export {};