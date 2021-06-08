/* interfaces can be extended*/
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

/* so can types*/
type Person = {
  name: string
}

type Customer = Person & { 
  age: number 
}

/* new fields can be added to existing interface but types can't */
interface Window {
  title: string;
}

interface Window {
  ts: boolean;
}

/*
Window will be:
interface Window {
  title: string;
  ts: boolean;
}
*/

function method(method: {m: 'GET' | 'POST'}) {}
// removing as const will be an error because m is string not 'GET' | 'POST'
// m is string because it can be reassigned before calling method(verb)
// as const makes m literal type not string
const verb = {m: 'GET'} as const 
method(verb)

/*type prediction*/
class Fish {
  swim(){}
}
class Bird{}
/* pet is Fish is type prediction*/
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

/* discriminated union*/
interface Circle {
  kind: 'circle'
  radius: number;
}

interface Square {
  kind: 'square',
  side: number;
}
type Shape = Circle | Square

function isCircle(s: Shape): s is Circle {
  return s.kind === 'circle';
}

function area(s: Shape) {
  if (isCircle(s)) return Math.PI * s.radius ** 2
}

/*Exhaustiveness checking*/
// this is very like sealed trait in Scala!!
type Shape1 = Circle | Square | {kind: 'rect'};
function getArea(shape: Shape1) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rect":
      // removing this case state will have compiler error
      return 11;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

export {};
