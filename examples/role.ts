#! ./node_modules/.bin/ts-node

interface Service1 {
  hasAccess(): void;
}

interface Service2 {
  someMethod(): void;
};

function service1<R extends Role>(r: R) {
  r.constructor.prototype.hasAccess = function() {
    switch(r.constructor) {
      case Admin: {
        console.log(`${r.type} has access`);
        break;
      }
      case Support: {
        console.log(`${r.type} has no access`);
        break;
      }
    }
  }
}

class Role {
  constructor(public type: string) {
    service1(this);
  }
}
type Extended = Service1 & Service2;

class Admin extends Role {
  constructor() {
    super('admin');
  }

  public static instance() {
    return new Admin() as (Admin & Extended);
  }
}

class Support extends Role {
  constructor() {
    super('support');
  }

  public static instance() {
    return new Support() as (Support & Extended);
  }
}

const admin = Admin.instance();
const support = Support.instance();

admin.hasAccess();
support.hasAccess();

export {};