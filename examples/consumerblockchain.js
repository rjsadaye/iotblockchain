"use strict";

const {KafkaStreams} = require("./../index.js");
const {nativeConfig: config} = require("./../test/test-config.js");
//const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
//let myModule = require('./producerblockchain.js');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
//exec("ls -la", puts);

const kafkaStreams = new KafkaStreams(config);
const stream = kafkaStreams.getKStream("test").mapBufferKeyToString() //key: Buffer -> key: string
    .mapBufferValueToString(); //value: Buffer -> value: string;

stream.forEach(message => {
    //input_data=message;
    //myModule.contractInsurance(message);
    console.log(message.value);
    
    
    exec("node producerblockchain.js "+JSON.stringify(message.value), puts);
    //require('./testblockchain.js')(message);
    //require('./producerblockchain.js')(message);
    //myModule.contractInsurance(message);

    //promise(message)
    //const myModule = require('./producerblockchain.js',message);
    
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

//const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection



