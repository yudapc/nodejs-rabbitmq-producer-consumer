var amqp = require("amqplib/callback_api");
var url = "amqp://node-cli:node-cli@localhost:5672";
var queueName = "task_queue";

function executeProcess(err, conn) {
  conn.createChannel(getMessageFromQueue);
}

function getMessageFromQueue(err, channel) {
  channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);
  console.log(
    " [*] Waiting for messages in %s. To exit press CTRL+C",
    queueName
  );
  consumeJob(queueName, channel);
}

function consumeJob(queueName, channel) {
  channel.consume(
    queueName,
    function(message) {
      processing(message, channel);
    },
    { noAck: false }
  );
}

function processing(message, channel) {
  var data = JSON.parse(message.content);
  console.log(" [x] ID Received %s", data.id);
  console.log(" [x] Data Received %s", data.data);
  finishTheWork(message, channel);
}

function finishTheWork(message, channel) {
  var secs = message.content.toString().split(".").length - 1;
  setTimeout(function() {
    console.log(" [x] Done");
    channel.ack(message);
  }, secs * 1000);
}

amqp.connect(
  url,
  executeProcess
);
