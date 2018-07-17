"use strict";

const {KafkaStreams} = require("./../index.js");
const {nativeConfig: config} = require("./../test/test-config.js");

const kafkaStreams = new KafkaStreams(config);
const stream = kafkaStreams.getKStream("iot").mapBufferKeyToString() //key: Buffer -> key: string
    .mapBufferValueToString(); //value: Buffer -> value: string;

stream.forEach(message => {
    console.log(message);
});

//start the stream
//(wait for the kafka consumer to be ready)
stream.start().then(_ => {
    //wait a few ms and close all connections
    setTimeout(kafkaStreams.closeAll.bind(kafkaStreams), 1000000);
});
/*
const myConsumerStream =
    kafkaStreams.getKStream()
    .from("test")
    .mapBufferKeyToString() //key: Buffer -> key: string
    .mapBufferValueToString() //value: Buffer -> value: string
    .forEach(console.log);


myConsumerStream.start().then(_ => {
    //wait a few ms and close all connections
    setTimeout(kafkaStreams.closeAll.bind(kafkaStreams), 100);
});
*/
