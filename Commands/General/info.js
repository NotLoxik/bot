// Please dont remove any of my credit.

const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Info about this bot."),
    async execute(interaction) {

        const sourcecode = new ButtonBuilder()
	        .setLabel('Source Code')
	        .setURL('https://github.com/NotLoxik/bot/')
	        .setStyle(ButtonStyle.Link);

        const github = new ButtonBuilder()
	        .setLabel("Creator's Github")
	        .setURL('https://github.com/NotLoxik/')
	        .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
			.addComponents(sourcecode, github);

        const embed = new EmbedBuilder()
            .setColor('#FEE75C')
            .setDescription("This is a template bot made by Loxik, you can view the source code by clicking GitHub button. And dont forget to star my repository.")


        await interaction.reply({ embeds: [embed], components: [row], });
    },
};