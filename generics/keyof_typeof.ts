type Point = {x: number, y: number};
type PointKey = keyof Point;

function f() {
  return { x: 10, y: 3 };
}
// this is wrong
// type P = ReturnType<f>;

// this is right
type P1 = ReturnType<typeof f>


const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

// use number to get the type of an array’s elements
type PersonInMyArray = typeof MyArray[number];

export {};