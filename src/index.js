require("dotenv").config();                 // used for TOKEN

const TOKEN = process.env.TOKEN

const { Client, IntentsBitField, Collection } = require('discord.js');
const fs = require('node:fs');                              // file system module. used to read the commands directory and identify our command files
const path = require('node:path');                          // helps construct paths to access files and directories

let botId = '';
let petCounter = 0;



// CLIENT

// Discord intents (https://discord.com/developers/docs/topics/gateway#list-of-intents)
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// Get all the commands so we can execute them when called
client.commands = new Collection();

const commandsFolder = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsFolder, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}



// LISTENERS 

// Listens for whenever the bot is ready
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);
    botId = c.user.id;
});

// Listens for new messages in the server
client.on(`messageCreate`, (message) => {
    let senderId = message.author.id;
    if (senderId == botId) return;                          // ignore messages sent by this bot
    
    if (message.content == 'pet faadil') {
        client.commands.get('petfaadil').execute(message);
    }
});

// Listens for interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;          // ignore any interactions that aren't slash commands
    
    console.log(interaction.commandName + " was called");
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



// LOGIN 

client.login(TOKEN);                                        // Login (actually running the bot)