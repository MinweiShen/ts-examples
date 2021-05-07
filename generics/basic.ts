// a generic interface
interface Generic<T> {
  (args: T): T;
  value: T;
}

// generic class
class G<T> {
  constructor(public value: T) {}
}