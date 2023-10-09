const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("stop recording"),
    async execute(message) {
        

        message.reply("Recording is stopped!");
    }
};