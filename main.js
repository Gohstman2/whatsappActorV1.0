// main.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const input = require('apify').getInput();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
        headless: true
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');
    if (input?.number && input?.message) {
        const chatId = input.number + '@c.us';
        await client.sendMessage(chatId, input.message);
        console.log('Message sent!');
        process.exit(); // Terminer proprement
    }
});

client.initialize();
