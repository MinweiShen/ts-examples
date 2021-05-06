/* abstract class can have both abstract and concrete method
but a concrete class must have all methods concrete
*/
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}
