# nodejs-rabbitmq-producer-consumer

NodeJS - RabbitMQ. Sample Producer(Publisher) and Consumer(Worker)


### Preparation

- Clone This repository

- Create docker server RabbitMQ
```
docker-compose -f docker-compose.yml up
```

- Create new user as admin on RabbitMQ:
```
username: node-cli
password: node-cli
```

- Install packages: 
`npm install`

### Run

Generate 3000 jobs: `node new_task.js Hello World`

Run Worker: `node worker.js`
