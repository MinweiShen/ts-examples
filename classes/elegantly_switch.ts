class BaseClass {}

class Log extends BaseClass {
  constructor(public log: string) {
    super();
  }
}

class Message extends BaseClass {
  constructor(public msg: string) {
    super();
  }
}

const log = new Log("test");
const msg = new Message("test");
let value: BaseClass = msg;

/* following code attempts to implement something like the match statement in Scala */
// Approach one: using switch
switch(value.constructor) {
  case Log:
    console.log(`Log: ${(value as Log).log}`);
    break;
  case Message:
    console.log(`Message: ${(value as Message).msg}`);
    break;
  default:
    console.log("no match")
}

// Approach two: using map
const handlers = new Map<BaseClass, Function>();
handlers.set(Message, (m: Message) => console.log(`Message: ${m.msg}`));
handlers.set(Log, (m: Log) => console.log(`Log: ${m.log}`));

const handle = handlers.get(value.constructor);
(handle && handle(value));
