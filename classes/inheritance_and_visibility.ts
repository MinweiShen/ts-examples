/* One way to implement inheritance is using interface
One class can implements multiple interfaces
*/
interface Ping {
  ping(): void;
}

interface Pong {
  pong(): void;
}

class TableTennis implements Ping, Pong {
  ping() {
    console.log('ping');
  }

  pong() {
    console.log('pong')
  }
}

//////////////////////////////////////////
/* 
Another way is using extends 
*/
class Animal {
  protected age = 0;
  private v = 1;
  move() {
    console.log("Moving along!");
  }

  sleep() {
    console.log('sleep');
  }

  interact(another: Animal) {
    // Note: accessing private value of the same class is allowed in ts
    another.v === this.v;
  }
}

class Dog extends Animal {
  /* Note:
   if protected is not provided here, age will become public!!!!
   it's important to remember keeping the member visibility
  */
  protected age = 10;

  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
  
  /*
    method can be overwritten but needs to follow method contract. otherwise:
    Property 'sleep' in type 'Dog' is not assignable to the same property in base type 'Animal'.
    Type '(time: number) => void' is not assignable to type '() => void'.
  */
  sleep(time?: number) {
    if (time === undefined) {
      super.sleep()
    } else {
      console.log(`sleep ${time} minutes`);
    }
  }

}
const d = new Dog();
d.move();
d.woof(3);