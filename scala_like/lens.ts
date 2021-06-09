#! ./node_modules/.bin/ts-node
// try implementing Lenses in Scala https://medium.com/zyseme-technology/functional-references-lens-and-other-optics-in-scala-e5f7e2fdafe
interface Lens<I, V> {
  get: (instance: I) => V;
  set: (instance: I, v: V) => I
}

function compose<Outer, Inner, V>(outer: Lens<Outer, Inner>, inner: Lens<Inner, V>): Lens<Outer, V> {
  return {
    get: (instance: Outer) => inner.get(outer.get(instance)),
    set: (instance: Outer, v: V) => outer.set(instance, inner.set(outer.get(instance), v))
  };
}

class Street {
  constructor(public number: number) {}
}
class City {
  constructor(public name: string) {}
}

class Address {
  constructor(public city: City, public street: Street) {}

  toString() {
    return `City: ${this.city.name}, Street number: ${this.street.number}`
  }
}

const streetNumberLens: Lens<Street, number> = {
  get: (s) => s.number,
  set: (_, n) => new Street(n)
}

const addressStreetLens: Lens<Address, Street> = {
  get: (a) => a.street,
  set: (a, s) => new Address(a.city, s)
}

const addressStreetNumberLens = compose(addressStreetLens, streetNumberLens)

const address = new Address(new City('SFO'), new Street(123));
const newAddress = addressStreetNumberLens.set(address, 456)
console.log(newAddress.toString());

export {}