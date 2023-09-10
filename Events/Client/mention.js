const {
  Client,
  Message,
  EmbedBuolder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "messageCreate",

  async execute(message, client, interaction) {
    const { author, guild, content } = message;
    const { user } = client;

    if (!guild || author.bot) return;
    if (content.includes("@here") || content.includes("@everyone")) return;
    if (!content.includes(user.id)) return;

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#5966F3")
          .setDescription(
            `Hey there ${message.author}, ${client.user.username} is fully moderation bot with lots of features and high-quality moderation! Use /help to get started.`
          )
          .setFooter({ text: `I'm currently serving ${client.guilds.cache.size} servers and ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users.` }),
      ],
    });
  },
};
