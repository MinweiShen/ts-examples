/* a quicker way to create class using parameter_property
This is more like case class in Scala!!!
*/
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);


/* you can create class using class express. 
class express doesn't need a class name;
*/
const someClass = class<T> {
  constructor(public v: T) {}
}

const sc = new someClass(1);