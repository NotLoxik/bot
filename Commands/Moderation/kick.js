const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the discord server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("User to be kicked.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the kick.")
    ),

  async execute(interaction) {
    const { channel, options } = interaction;

    const user = options.getUser("target");
    const reason = options.getString("reason") || "No reason provided";

    const member = await interaction.guild.members.fetch(user.id);

    const errEmbed = new EmbedBuilder()
      .setDescription("Something went wrong. Please try again later.")
      .setColor("#ED4245");

    const successEmbed = new EmbedBuilder()
      .setTitle("**Kick**")
      .setDescription(`Succesfully kicked ${user}.`)
      .addFields(
        { name: "Reason", value: `${reason}`, inline: true },
        { name: "Status", value: `Passed`, inline: true }
      )
      .setColor("#57F287");

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.ModerateMembers
      )
    )
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    await member.kick(reason);

    await interaction.reply({
      embeds: [successEmbed],
    });
  },
};
