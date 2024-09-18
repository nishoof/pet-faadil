const { SlashCommandBuilder } = require('discord.js');

let petCounter = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('petfaadil')
		.setDescription('Pets faadil'),
	async execute(interaction) {
		let reply = 'faadil has been pet ' + ++petCounter;
		
		if (petCounter == 1) reply += ' time';
		else reply += ' times';
		
		await interaction.reply(reply);
	},
};