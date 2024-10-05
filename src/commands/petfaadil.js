const { log } = require('console');
const { SlashCommandBuilder, AttachmentBuilder, ImageFormat } = require('discord.js');
const fs = require('node:fs');                              // file system module. used to read the commands directory and identify our command files
const path = require('node:path');                          // helps construct paths to access files and directories
const imageLinks = [];



// ON START UP

// init petCount
var petCount = 0;
initializePetCount();

// init images
const imagesFolder = path.join(path.dirname(path.dirname(__dirname)), 'images');
const imageFiles = fs.readdirSync(imagesFolder);
for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    
    const filePath = path.join(imagesFolder, file);
    imageLinks[i] = new AttachmentBuilder(filePath);
}



// COMMAND BUILDER

module.exports = {
	data: new SlashCommandBuilder()
		.setName('petfaadil')
		.setDescription('Pets faadil'),
	async execute(interaction) {
		incramentPetCount();

		let reply = 'faadil has been pet ' + petCount;
		
		if (petCount == 1) reply += ' time';
		else reply += ' times';
		
		let x = Math.floor(Math.random() * imageLinks.length)
		await interaction.reply( { content: reply, files: [imageLinks[x]] } );
	},
};



// FUNCTIONS

// Increase the pet count by one in both this file and the JSON. The JSON is updated asynchronously
function incramentPetCount() {
	petCount++;
	
	fs.readFile('data/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
    
        // Edit the JSON data
        jsonData.petCount += 1;
    
        const updatedJsonData = JSON.stringify(jsonData, null, 2);
    
        fs.writeFile('data/data.json', updatedJsonData, (err) => {
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
	fs.readFile('data/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        
        const jsonData = JSON.parse(data);
		
		petCount = jsonData.petCount;
    });
}