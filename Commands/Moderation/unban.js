const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the discord server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("Discord ID of the user you want to unban.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { channel, options } = interaction;

    const userId = options.getString("userid");

    try {
      await interaction.guild.members.unban(userId);

      const successEmbed = new EmbedBuilder()
        .setTitle("**Unban**")
        .setDescription(`Succesfully unbanned <@${userId}>.`)
        .addFields({ name: "Status", value: `Passed`, inline: true })
        .setColor("#57F287");

      await interaction.reply({
        embeds: [successEmbed],
      });
    } catch (err) {
      console.log(err);

      const errEmbed = new EmbedBuilder()
        .setDescription("Something went wrong. Please try again later.")
        .setColor("#ED4245");

      interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
