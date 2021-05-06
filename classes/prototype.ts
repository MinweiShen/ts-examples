class BaseClass {}

class Log extends BaseClass {
  constructor(public log: string) {
    super();
  }
}

const log = new Log("log");

// 注意区分原型链和原型就行
console.log(BaseClass)
console.log(BaseClass.prototype)
console.log(Object.getPrototypeOf(BaseClass.prototype) == Object.prototype)
console.log(BaseClass.prototype.constructor)
console.log('-----------------')
console.log(Log)
console.log(Log.prototype)
console.log(Object.getPrototypeOf(Log.prototype))
console.log(Log.prototype.constructor)
console.log('-----------------')
console.log(log)
console.log(Object.getPrototypeOf(log))
console.log(Object.getPrototypeOf(log) === Log.prototype)
console.log(log.constructor)
