#! ./node_modules/.bin/ts-node

class Singleton {
  private static instance: Singleton;
  private id: string;
  
  constructor() {
    this.id = Math.random().toString();
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  say() {
    console.log(this.id)
  }
}

function main() {
  const s = Singleton.getInstance();
  s.say()

  const s1 = Singleton.getInstance();
  s1.say();
}

main();

export {};