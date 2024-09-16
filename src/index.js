require("dotenv").config();

const { Client, IntentsBitField } = require('discord.js');
const TOKEN = process.env.TOKEN

// Defining client with the discord intents (https://discord.com/developers/docs/topics/gateway#list-of-intents)
const client = new Client({
    intents: [
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// Listens for whenever the bot is ready
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`)
});

// Login, actually running the bot
client.login(TOKEN);