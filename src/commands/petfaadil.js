const { log } = require('console');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');                              // file system module. used to read the commands directory and identify our command files
const path = require('node:path');                          // helps construct paths to access files and directories

var petCount = 0;
initializePetCount()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('petfaadil')
		.setDescription('Pets faadil'),
	async execute(interaction) {
		incramentPetCount();

		let reply = 'faadil has been pet ' + petCount;
		
		if (petCount == 1) reply += ' time';
		else reply += ' times';
		
		await interaction.reply(reply);
	},
};

// Increase the pet count by one in both this file and the JSON. The JSON is updated asynchronously
function incramentPetCount() {
	petCount++;
	
	fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
    
        // Edit the JSON data
        jsonData.petCount += 1;
    
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
    
        fs.writeFile('data.json', updatedJsonData, (err) => {
            if (err) {
                console.error('Error updating JSON file:', err);
            } else {
                console.log('JSON file updated successfully!');
            }
        });

		petCount = jsonData.petCount;
    });
}

// Set the pet count to the appropriate value whenever the bot starts up
function initializePetCount() {
	fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
		
		petCount = jsonData.petCount;
    });
}