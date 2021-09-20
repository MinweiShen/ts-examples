#! ./node_modules/.bin/ts-node

// see https://www.runoob.com/design-pattern/factory-pattern.html

interface Shape {
  draw(): void;
}

class Circle implements Shape {
  draw() {
    console.log("Circle");
  }
}

class Rectangle implements Shape {
  draw() {
    console.log("Rectangle");
  }
}

// this factory has limitation on the constructor
// this is a bit anti-pattern because users need to know the class is Circle!!
class Factory {
  getShape(constructor: (new (...args: any[]) => Shape)): Shape {
    return new constructor();
  }
}

enum Shapes {
  Rectangle,
  Circle
}
class Factory1 {
  getShape(s: Shapes): Shape {
    switch(s) {
      case Shapes.Circle: return new Circle();
      case Shapes.Rectangle: return new Rectangle();
    }
  }
}

const ShapeMap = {
  [Shapes.Circle]: Circle,
  [Shapes.Rectangle]: Rectangle
}
// this is so much simpler
class Factory2 {
  getShape(s: Shapes): Shape {
    return new ShapeMap[s]();
  }
}

function main() {
  const factory = new Factory();
  factory.getShape(Circle).draw();
  factory.getShape(Rectangle).draw();

  const factory1 = new Factory1();
  factory1.getShape(Shapes.Circle).draw();
  factory1.getShape(Shapes.Rectangle).draw();

  const factory2 = new Factory2();
  factory2.getShape(Shapes.Circle).draw();
  factory2.getShape(Shapes.Rectangle).draw();
}

main();


export {};