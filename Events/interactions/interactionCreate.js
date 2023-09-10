const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    const { commands } = client;
    const { commandName } = interaction;

    if (interaction.isContextMenuCommand()) {
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isChatInputCommand()) {

      const command = client.commands.get(interaction.commandName);
      if (!command) {
        const outdated = new EmbedBuilder()
          .setTitle("**Outdated**")
          .setDescription(`Hey there ${interaction.user}, this command is outdated, use /help to list all of available commands.`)
          .setColor('#ED4245')
        return interaction.reply({ embed: [outdated], ephemeral: true });
      } else {

        if (command.developer &&
          interaction.user.id !== "600997092109844490") {

          const developerEmbed = new EmbedBuilder()
            .setTitle("**Access Denied**")
            .setDescription(`Hey there ${interaction.user}, this command is only available for the developer, use /help to list all of available commands.`)
            .setColor('#ED4245')

          return interaction.reply({ embed: [developerEmbed], ephemeral: true });
        }

        command.execute(interaction, client);

      }
    }
  }
}