// used just for testing purposes
// unregisters all commands

require('dotenv').config();             // used for TESTING_GUILD_ID, CLIENT_ID

const { REST, Routes } = require('discord.js');

const commands = [
    
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); 

(async () => {
    try {
        console.log('Registering slash commands...');
        
        await rest.put(
            Routes.applicationGuildCommands(                                    // JUST FOR TESTING GUILD
                process.env.CLIENT_ID, 
                process.env.TESTING_GUILD_ID
            ),
            {
                body: commands
            }
            // Routes.applicationCommands(process.env.CLIENT_ID),               // GLOBAL - ALL GUILDS
            // { body: commands },
        );
    
        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();