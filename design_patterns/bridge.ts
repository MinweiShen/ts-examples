#! ./node_modules/.bin/ts-node

interface Payment {
  pay(): void;
}

class CreditCard implements Payment {
  pay() {
    console.log('use credit card');
  }
}

class Cash implements Payment {
  pay() {
    console.log("use cash");
  }
}

/*
Person only knows .pay() on the payment_method.

The actual implementation is determined by the concrete class
*/
class Person {
  constructor(private payment_method: Payment) {}

  buy() {
    this.payment_method.pay();
  }
}

function main() {
  const p1 = new Person(new CreditCard())

  p1.buy();

  const p2 = new Person(new Cash());
  p2.buy();
}

main();

export {};