#! ./node_modules/.bin/ts-node

interface IState {
  render(): void;
  publish(): void;
  toString(): string;
}

class Document {
  private state: IState;
  constructor() {
    this.state = new Draft(this);
  }

  public setState(s: IState) {
    this.state = s;
  }

  public publish() {
    this.state.publish();
  }

  public render() {
    this.state.render();
  }

  public getState() {
    return this.state.toString();
  }
}

class Draft implements IState {
  constructor(private document: Document) {}

  render() {
    console.log("not ready for rendering")
  }

  publish() {
    console.log('publish');
    this.document.setState(new Published(this.document));
  }

  toString() {
    return "Draft";
  }
}

class Published implements IState {
  constructor(private document: Document) {}
  
  render() {
    console.log("render")
    this.document.setState(new Rendered(this.document));
  }

  publish() {
    console.log('published');
  }

  toString() {
    return "Published";
  }
} 

class Rendered implements IState {
  constructor(private document: Document) {}
  
  render() {
    console.log('rendered')
  }

  publish() {
    console.log('published');
  }

  toString() {
    return "Rendered";
  }
} 

function main() {
  const document = new Document();
  console.log(document.getState());
  document.render();
  console.log(document.getState());
  document.publish();
  console.log(document.getState());
  document.publish();
  console.log(document.getState());
  document.render();
  console.log(document.getState());
}

main();

export {};