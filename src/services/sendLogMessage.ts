import amqp from "amqplib";
import { Logs } from "../domain/logs";

const RABBITMQ_URL = "amqp://microservice:microservice@localhost:5672";
const QUEUE_NAME = "logs_queue";

export async function sendLogMessage(message: Logs): Promise<void> {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    try {
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const payload = Buffer.from(JSON.stringify(message));

        channel.sendToQueue(QUEUE_NAME, payload, {
            persistent: true,
            contentType: "application/json",
        });

        console.log("Message sent:", message);
    } finally {
        setTimeout(async () => {
            await channel.close();
            await connection.close();
        }, 100);
    }
}
