import { Kafka, Producer } from "kafkajs"
import fs from "fs"
import path from 'path'
import { ISocketMessage } from "../lib/types";
import { prisma } from "../lib/prisma";

const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER!],
    ssl: {
        ca: [fs.readFileSync(path.resolve("ca.pem"), "utf-8")]
    },
    sasl: {
        username: process.env.KAFKA_USERNAME as string,
        mechanism: "plain",
        password: process.env.KAFKA_PASSWORD as string
    }
})

let producer: Producer | null = null;

export async function createProducer() {
    try {
        if (producer) return producer;
        producer = kafka.producer();
        await producer.connect();
        return producer;
    }
    catch (e) {
        console.log(`Error in createProducer`, e)
    }
}

///////////////////PRODUCING MESSAGES to kafka///////////////////////
export async function produceMessage({ message }: { message: string }) {
    try {

        const producer = await createProducer();
        producer?.send({
            messages: [{ key: `Message-${Date.now()}`, value: message }],
            topic: "MESSAGES",
        });

        return true;
    }
    catch (e) {
        console.log(`Error in produceMessage`, e)
    }
}
///////////////////CONSUMING MESSAGES from KAFKA (writing data or messages to DB)///////////////////////

export async function startMessageConsumer() {
    try {
        const consumer = kafka.consumer({
            groupId: "default"
        });
        await consumer.connect()
        await consumer.subscribe({
            topic: "MESSAGES",
            fromBeginning: true
        });
        await consumer.run({
            autoCommit: true,
            eachMessage: async ({ message, pause }) => { 
                if (!message.value) { 
                    console.log(`Message at KAFKA consumer is undefined`);
                    return;
                }
                const messageFromKafkaProducer: ISocketMessage = JSON.parse(message.value.toString());

                console.log(messageFromKafkaProducer, "message at kafka consumer")

                try {

                    await prisma.message.create({
                        data:{
                            message: messageFromKafkaProducer.msg,
                            receiverId:messageFromKafkaProducer.receiverId,
                            senderId:messageFromKafkaProducer.senderId
                        }
                    })
                }
                catch (e) {
                    
                    console.log(`Error in prisma query`,e);
                    pause()
                    setTimeout( () => {

                    },6000)
                }
            }
        })
    }
    catch (e) {
        console.log(`Error in startMessageConsumer`, e);

    }
}



export default kafka;