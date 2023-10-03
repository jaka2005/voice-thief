const { SlashCommandBuilder } = require("discord.js");
const { stopStream } = require('../../streams.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("leave the channel"),
    async execute(message) {
        stopStream(message.user.id)
        message.reply("Leave(")
    }
}
