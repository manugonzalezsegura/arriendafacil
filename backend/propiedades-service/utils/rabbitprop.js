// backend/propiedades-service/utils/rabbitprop.js

const amqp = require ('amqplib');
const {rabbit} = require('../config/env');//importo submodulo
const rabbiturl = rabbit.url;  //desestructuro para acceder a sus valores 

let channel;

async function initRabbit(){

    const conn =await amqp.connect(rabbiturl);
    channel = await conn.createChannel();
    console.log('✅ Propiedades Service: RabbitMQ conectado');

}

async function subscribe(queue,onMessage) {
    if(!channel)throw new Error('RabbitMQ channel no inicializado');
    await channel.assertQueue(queue,{durable:true})
    channel.consume(queue,msg =>{
        
        const data =  JSON.parse(msg.content.toString());
        onMessage(data);
        channel.ack(msg);
    });
}

module.exports ={initRabbit,subscribe};