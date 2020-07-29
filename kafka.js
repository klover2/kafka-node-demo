'use strict';
let kafka = require('kafka-node');

(async () => {
    let options = {
        'groupId': 'kafka-node-group', // 消费者组ID，默认为`kafka-node-group`
        'autoCommit': true, // 自动提交配置
        'autoCommitIntervalMs': 5000,
        // 最大等待时间是发出请求时没有足够数据时阻止等待的最长时间（以毫秒为单位），默认为100ms
        'fetchMaxWaitMs': 100,
        // 这是给出响应所必需的消息的最小字节数，默认为1字节
        'fetchMinBytes': 1,
        // 要包含在此分区的消息集中的最大字节。这有助于限制响应的大小。
        'fetchMaxBytes': 1024 * 1024,
        // 如果设置为true，则消费者将从有效负载中的给定偏移量获取消息
        'fromOffset': false,
        // 如果设置为'buffer'，则值将作为原始缓冲区对象返回。
        'encoding': 'utf8',
        'keyEncoding': 'utf8',
    };
    let Consumer = kafka.Consumer,
        client = new kafka.KafkaClient({ 'kafkaHost': 'dev.guaishoubobo.com:9092' });

    console.log('-----------------------------');

    let consumer = new Consumer(
        client,
        [
            { 'topic': 'asddafad', 'partition': 0 },
        ],
        {
            //  自动提交配置   (false 不会提交偏移量，每次都从头开始读取)
            'autoCommit': true,
            'autoCommitIntervalMs': 5000,
            //  如果设置为true，则consumer将从有效负载中的给定偏移量中获取消息
            'fromOffset': false,
        }
    );

    consumer.on('message', function(message) {
        console.log(message);
    });

    // 关闭接收订阅消息
    // consumer.close(true, function(e) {
    //     console.log(e);
    // });
})();
