const { SlashCommandBuilder } = require("discord.js");
const { newConnection } = require("../../connection");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("join to channel"),
    async execute(message) {
        if (!newConnection(message)) return message.reply('Join a VC first!');
        const channel = message.member.voice.channel;

        message.reply('Join!');
    },
};
