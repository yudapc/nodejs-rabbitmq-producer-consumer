var amqp = require('amqplib/callback_api');
var url = 'amqp://node-cli:node-cli@localhost:5672';

function addingToQueue(err, conn) {
  conn.createChannel(sendToQueue);
  executeProcess(conn);
}

function sendToQueue(err, ch) {
  if (err) throw err;
  var q = 'task_queue';
  var msg = process.argv.slice(2).join(' ') || 'Hello World!';

  for (i=0; i<=3000; i++) {
    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
  }
  console.log(" [x] Sent '%s'", msg);
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

