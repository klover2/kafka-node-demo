'use strict';
let kafka = require('kafka-node'),
    Producer = kafka.Producer,
    // KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({ 'kafkaHost': 'dev.guaishoubobo.com:9092' }),
    producer = new Producer(client),
    // km = new KeyedMessage('key', 'message'),
    payloads = [
        { 'topic': 'asddafad', 'messages': '123', 'partition': 0 }, // 发送一条消息
    // { 'topic': 'topic2', 'messages': [ 'hello', 'world', km ] }, // 同时发送多条消息
    ];

(() => {

    // 生产者


    producer.on('ready', function() {
        producer.send(payloads, function(err, data) {
            console.log('data===============>', data);
        });
    });

    producer.on('error', function(err) { });


})();
