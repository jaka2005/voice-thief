const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("join to channel"),
    async execute(interactions) {
        interactions.reply("Join!")
    },
};
