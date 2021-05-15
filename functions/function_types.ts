// this is a very typical function type
type FnType = (s: string) => void;


// this is another example but with properties. Note the : instead of =>
type CallSignatureType = {
  description: string;
  (s: string): void;
}

class SomeObject {}
// this is a special one for constructors
type ConstructorType = {
  new (s: string): SomeObject;
}
function fn(ctor: ConstructorType) {
  return new ctor("hello");
}

// you can combine both, Like Date() and new Date()
interface CallOrConstructor {
  new (s: string): SomeObject
  (): SomeObject
}

/*
Functions can be generic and T can be inferred when you use it
*/
function firstElement<T>(arr: T[]): T {
  return arr[0];
}
firstElement([1,2,3]); // T is inferred as number

/* T in Above example can be any type but you can constraint it*/
function lengthOf<T extends {length: number}>(arr: T): number {
  return arr.length;
}

export {};

