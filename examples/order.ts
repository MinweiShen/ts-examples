#! ./node_modules/.bin/ts-node
interface OrderStatus {}
class Success implements OrderStatus {
  constructor(public orderPlacedTime: Date) {}
}
class Failure implements OrderStatus {
  constructor(public reason: string) {}
}
class Pending implements OrderStatus {}

class Order {}

const statuses = [new Success(new Date()), new Failure('some reason'), new Pending()];
const getOrderStatus = (o: Order = new Order()): OrderStatus => statuses[(Math.random() * statuses.length) >> 0]

const status = getOrderStatus();

switch(true) {
  case status instanceof Success:
    const s: Success = status as Success;
    console.log('success');
    console.log('order placed at', s.orderPlacedTime)
    break;
  case status instanceof Failure:
    console.log('failure');
    break;
  case status instanceof Pending:
    console.log('pending');
    break;
  default:
    console.log('unknown');
}

const orderHandlers = new Map<OrderStatus, Function>();
orderHandlers.set(Success, function(s: Success) { console.log('success handler placed at', s.orderPlacedTime);});
orderHandlers.set(Failure, function() { console.log('failure handler');})
orderHandlers.set(Pending, function() { console.log('pending handler');})

const handler = orderHandlers.get(status.constructor)
handler && handler(status)

export {}