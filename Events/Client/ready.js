const {Client, EmbedBuilder, Guild, guild} = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        client.user.setActivity(`/help — /invite`);
        client.user.setStatus('online');
        console.log(`${client.user.username} is now online.`);

    },
};