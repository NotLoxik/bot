const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows a list of all coammnds."),
  async execute(interaction, client) {
    const emojis = {
      moderation: "🛠️",
      general: "📌",
    };

    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "There is no description for this command.",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username}'s help page`)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/1003985217008181282/c4f70b2ff891e5137e07f84781461764.webp?size=512`
      )
      .setColor("#5865F2")
      .setFooter({
        text: `Choose a category below to list all of commands from each category.`,
      }).setDescription(`
    Hey there ${interaction.user}, your help has arrived!
    ${client.user.username} is a moderation bot with lots of features and high-quality moderation!

    **Command categories**

    ➡ General
    ➡ Moderation

    `);

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Nothing selected.")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `List all commands form ${cmd.directory} category.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      ephemeral: false,
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const mappedCommands = category.commands.map((cmd) => {
        return `\`${cmd.name}\``;
      });

      const stringedCommands = mappedCommands.join(", ");

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`Commands from ${formatString(directory)} category.`)
        .setDescription(stringedCommands)
        .setColor("#5865F2");

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
      console.error();
    });
  },
};
