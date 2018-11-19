var amqp = require("amqplib/callback_api");
var url = "amqp://node-cli:node-cli@localhost:5672";
var queueName = "task_queue";

function addingToQueue(err, conn) {
  conn.createChannel(generateToQueue);
  executeProcess(conn);
}

function generateToQueue(err, channel) {
  for (i = 0; i <= 10000; i++) {
    sendToQueue(err, channel);
  }
}

function sendToQueue(err, channel) {
  if (err) throw err;
  var data = {
    id: generateId(),
    data: [1, 2, 3, 4, 5]
  };
  var message = JSON.stringify(data);
  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, new Buffer(message), { persistent: true });
  console.log(" [x] Sent '%s'", message);
}

function executeProcess(conn) {
  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
}

function generateId() {
  var min = 1;
  var max = 10000;
  return Math.floor(Math.random() * (max - min) + min);
}

amqp.connect(
  url,
  addingToQueue
);
