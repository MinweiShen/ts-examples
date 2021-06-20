#! ./node_modules/.bin/ts-node
interface OrderStatus {}
class Success implements OrderStatus {}
class Failure implements OrderStatus {}
class Pending implements OrderStatus {}

class Order {}

const statuses = [new Success(), new Failure(), new Pending()];
const getOrderStatus = (o: Order = new Order()): OrderStatus => statuses[(Math.random() * statuses.length) >> 0]

const status = getOrderStatus();

switch(true) {
  case status instanceof Success:
    console.log('success');
    break;
  case status instanceof Failure:
    console.log('failure');
    break;
  case status instanceof Pending:
    console.log('pending');
    break;
  default:
    console.log('unknown status')
}

export {}