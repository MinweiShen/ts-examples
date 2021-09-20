#! ./node_modules/.bin/ts-node
interface Visitor {
  handleCity(city: City): void;
  handleState(state: State): void;
}

interface GEO {
  accept(v: Visitor): void;
}

/* by using accept and create different visitors
we can easily add new functionalities to GEO
*/

class City implements GEO {
  accept(v: Visitor) {
    v.handleCity(this);
  }
}

class State implements GEO {
  accept(v: Visitor) {
    v.handleState(this);
  }
};

export {};


