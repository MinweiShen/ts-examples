#! ./node_modules/.bin/ts-node

interface ISDCard {
  data(): void;
}
class SDCard implements ISDCard {
  data() {
    console.log("sd card");
  }
}

class TFCard {
  info() {
    console.log("tf card");
  }
};

class TFCardAdapter implements ISDCard {
  constructor(private tf: TFCard) {}

  data() {
    this.tf.info();
  }
}

class Computer {
  readSDCard(s: ISDCard): void {
    s.data();
  }
}


function main() {
  // computer only knows how to read SD Card
  const computer = new Computer();
  computer.readSDCard(new SDCard());

  // now use adapter to read tf card
  const adapter = new TFCardAdapter(new TFCard());
  computer.readSDCard(adapter)
}

main();

export {};