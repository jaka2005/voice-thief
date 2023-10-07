const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, EndBehaviorType, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");
const { opus } = require('prism-media')
const { newStream } = require('../../streams'); // TODO: configure `package.json` and `src/` dir
const { newConnection } = require("../../connection");
const fs = require('fs');

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
