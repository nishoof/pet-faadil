require("dotenv").config();

const { Client, IntentsBitField } = require('discord.js');
const TOKEN = process.env.TOKEN
let botId = '';
let petCounter = 0;

// Defining client with the discord intents (https://discord.com/developers/docs/topics/gateway#list-of-intents)
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


// LISTENERS 

// Listens for whenever the bot is ready
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);
    botId = c.user.id;
});

// Listens for new messages in the server
client.on(`messageCreate`, (message) => {
    // console.log(message);

    let senderId = message.author.id;
    if (senderId == botId) return;              // ignore messages sent by this bot
    
    if (message.content == 'pet faadil') {
        message.reply('faadil has been pet ' + ++petCounter + ' times');
    }
});


// LOGIN

// Login (actually running the bot)
client.login(TOKEN);