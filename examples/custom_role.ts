#! ./node_modules/.bin/ts-node

interface IPlugin {
  apply(r: Role): Role;
}
interface Noop {
  noop(r: Role): void;
}

type Enhancer = IPlugin & Noop;

interface Service1 {
  method1(): void;
}

interface Service2 {
  method2(): void;
};

function noop(p: IPlugin, method: string): Enhancer {
  (p as unknown as Noop)['noop'] = function(r: Role) {
      r.constructor.prototype[method] = function() {
        console.log(`${method} not implemented`)
      }
  }
  return p as unknown as Enhancer;
}


const service1: Enhancer = noop({
  apply(r: Role) {
    r.constructor.prototype.method1 = function() {
      console.log(`method1 on ${r.type}`);
    }
    return r;
  }
}, 'method1');

const service2: Enhancer = noop({
  apply(r: Role): Role {
    r.constructor.prototype.method2 = function() {
      console.log(`method2 on ${r.type}`);
    }
    return r;
  },
}, 'method2')

const ALL_ENHANCERS = [service1, service2];

class Role {
  constructor(public type: string, private enhancers: Enhancer[]) {
    ALL_ENHANCERS.forEach(e => e.noop(this));
    this.enhancers.forEach(e => e.apply(this));
  }
}
type Extended = Service1 & Service2;

// create a new role based on services it supports
class CustomRole extends Role {
  constructor() {
    super('custom role 1', [service1])
  }

  public static instance() {
    return new CustomRole() as (CustomRole & Extended);
  }
}

const c1 = CustomRole.instance();
c1.method1();
c1.method2();


// dynamically create new roles
function role(type: string, services: Enhancer[]) {
  return class CustomRole extends Role {
    constructor() {
      super(type, services)
    }
  
    public static instance() {
      return new CustomRole() as (CustomRole & Extended);
    }
  }
}

const CustomRole2 = role('custom role 2', [service1, service2]);
const c2 = CustomRole2.instance();
c2.method1();
c2.method2();

export {};
