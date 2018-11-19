var amqp = require('amqplib/callback_api');
var url = 'amqp://node-cli:node-cli@localhost:5672';
var queueName = 'task_queue';

function addingToQueue(err, conn) {
  conn.createChannel(sendToQueue);
  executeProcess(conn);
}

function sendToQueue(err, channel) {
  if (err) throw err;
  var message = process.argv.slice(2).join(' ') || 'Hello World!';

  for (i = 0; i <= 3000; i++) {
    channel.assertQueue(queueName, {durable: true});
    channel.sendToQueue(queueName, new Buffer(message), {persistent: true});
  }
  console.log(" [x] Sent '%s'", message);
}

function executeProcess(conn) {
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
}

amqp.connect(
  url,
  addingToQueue,
);
