
Kafka是由Apache软件基金会开发的一个开源流处理平台，由Scala和Java编写。Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者在网站中的所有动作流数据。 这种动作（网页浏览，搜索和其他用户的行动）是在现代网络上的许多社会功能的一个关键因素。 这些数据通常是由于吞吐量的要求而通过处理日志和日志聚合来解决。 对于像Hadoop一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka的目的是通过Hadoop的并行加载机制来统一线上和离线的消息处理，也是为了通过集群来提供实时的消息。

## zookeeper安装
```bash
docker pull mesoscloud/zookeeper:3.4.8

docker run -p 2181:2181 \
--name zookeeper \
-v /data/docker/zookeeper/conf:/opt/zookeeper/conf \
-v /data/docker/zookeeper/data:/tmp/zookeeper \
-d mesoscloud/zookeeper:3.4.8
```

## kafka安装
```bash
docker pull wurstmeister/kafka:2.11-2.0.0

192.168.10.160 dev服务器ip

docker run  -d --name kafka \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \
-v /data/docker/kafka/logs:/opt/kafka_2.11-2.0.0/logs \
-e KAFKA_ZOOKEEPER_CONNECT=192.168.10.160:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.10.160:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-d wurstmeister/kafka:2.11-2.0.0
```

## nodejs 使用
yarn add kafka-node

## Kafka的优势
   **高吞吐量、低延迟**：kafka每秒可以处理几十万条消息，它的延迟最低只有几毫秒；

   **可扩展性**：kafka集群支持热扩展；

   **持久性**、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失；

   **容错性**：允许集群中节点故障（若副本数量为n,则允许n-1个节点故障）；

   **高并发**：支持数千个客户端同时读写。
## Kafka适合以下应用场景

**日志收集**：一个公司可以用Kafka可以收集各种服务的log，通过kafka以统一接口服务的方式开放给各种consumer；

 **消息系统**：解耦生产者和消费者、缓存消息等；
 
 **用户活动跟踪**：kafka经常被用来记录web用户或者app用户的各种活动，如浏览网页、搜索、点击等活动，这些活动信息被各个服务器发布到kafka的topic中，然后消费者通过订阅这些topic来做实时的监控分析，亦可保存到数据库；
 
**运营指标**：kafka也经常用来记录运营监控数据。包括收集各种分布式应用的数据，生产各种操作的集中反馈，比如报警和报告；

**流式处理**：比如spark streaming和storm。

## 与常用Message Queue对比
1.**RabbitMQ**

RabbitMQ是使用Erlang编写的一个开源的消息队列，本身支持很多的协议：AMQP，XMPP, SMTP, STOMP，也正因如此，它非常重量级，更适合于企业级的开发。同时实现了Broker构架，这意味着消息在发送给客户端时先在中心队列排队。对路由，负载均衡或者数据持久化都有很好的支持。

2.**Redis**

Redis是一个基于Key-Value对的NoSQL数据库，开发维护很活跃。虽然它是一个Key-Value数据库存储系统，但它本身支持MQ功能，所以完全可以当做一个轻量级的队列服务来使用。对于RabbitMQ和Redis的入队和出队操作，各执行100万次，每10万次记录一次执行时间。测试数据分为128Bytes、512Bytes、1K和10K四个不同大小的数据。实验表明：入队时，当数据比较小时Redis的性能要高于RabbitMQ，而如果数据大小超过了10K，Redis则慢的无法忍受；出队时，无论数据大小，Redis都表现出非常好的性能，而RabbitMQ的出队性能则远低于Redis。

3.**ZeroMQ**

ZeroMQ号称最快的消息队列系统，尤其针对大吞吐量的需求场景。ZeroMQ能够实现RabbitMQ不擅长的高级/复杂的队列，但是开发人员需要自己组合多种技术框架，技术上的复杂度是对这MQ能够应用成功的挑战。ZeroMQ具有一个独特的非中间件的模式，你不需要安装和运行一个消息服务器或中间件，因为你的应用程序将扮演这个服务器角色。你只需要简单的引用ZeroMQ程序库，可以使用NuGet安装，然后你就可以愉快的在应用程序之间发送消息了。但是ZeroMQ仅提供非持久性的队列，也就是说如果宕机，数据将会丢失。其中，Twitter的Storm 0.9.0以前的版本中默认使用ZeroMQ作为数据流的传输（Storm从0.9版本开始同时支持ZeroMQ和Netty作为传输模块）。

4.**ActiveMQ**

ActiveMQ是Apache下的一个子项目。 类似于ZeroMQ，它能够以代理人和点对点的技术实现队列。同时类似于RabbitMQ，它少量代码就可以高效地实现高级应用场景。

5.**Kafka/Jafka**

Kafka是Apache下的一个子项目，是一个高性能跨语言分布式发布/订阅消息队列系统，而Jafka是在Kafka之上孵化而来的，即Kafka的一个升级版。具有以下特性：快速持久化，可以在O(1)的系统开销下进行消息持久化；高吞吐，在一台普通的服务器上既可以达到10W/s的吞吐速率；完全的分布式系统，Broker、Producer、Consumer都原生自动支持分布式，自动实现负载均衡；支持Hadoop数据并行加载，对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka通过Hadoop的并行加载机制统一了在线和离线的消息处理。Apache Kafka相对于ActiveMQ是一个非常轻量级的消息系统，除了性能非常好之外，还是一个工作良好的分布式系统。

## Kafka 缺点
1. 由于是批量发送，数据并非真正的实时；
2. 对于mqtt协议不支持；
3. 不支持物联网传感数据直接接入；
4. 仅支持统一分区内消息有序，无法实现全局消息有序；
5. 监控不完善，需要安装插件；
6. 依赖zookeeper进行元数据管理；

## 配置日志自动删除

docker exec -it kafka bash
cd /opt/kafka_2.11-2.0.0/config
vi server.properties

修改时间
>log.retention.hours=1

修改大小
>log.retention.bytes=1048576

设置
>log.segment.bytes=10240

添加设置
>log.cleanup.policy=delete

按照这个配置文件，只保存一小时的日志和大小不超过1M，当有一个条件满足，就触发删除日志操作。log.segment.bytes=10240表示每个文件的大小不超过10K。

目前只是设置了时间3天删除日志

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200526143713472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzExMDYwOQ==,size_16,color_FFFFFF,t_70)


## 启动
node kafka.js
node kafka2js

## 文档
[kafka](http://kafka.apache.org/project)

[kafka-node](https://www.npmjs.com/package/kafka-node)