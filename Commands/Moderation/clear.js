const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear a specific amount of messages from a target or channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to clear.')
                .setMinValue(1)
                .setMaxValue(99)
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        if (amount) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            const errEmbed = new EmbedBuilder()
                .setDescription('Something went wrong. Please try again later.')
                .setColor('#ED4245')

            const successEmbed = new EmbedBuilder()
                .setTitle("**Clear**")
                .setDescription(`Succesfully deleted ${messages.size} messages from the channel.`)
                .addFields(
                    { name: "Amount", value: `${messages.size} messages`, inline: true },
                    { name: "Status", value: `Passed`, inline: true }
                )
                .setColor('#57F287')

            if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages))
                return interaction.reply({ embeds: [errEmbed], ephemeral: true });

            await channel.bulkDelete(amount, true).then(

                interaction.reply({ embeds: [successEmbed] })
            );
        }
    }
}