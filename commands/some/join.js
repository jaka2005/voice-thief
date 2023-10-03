const { SlashCommandBuilder, Collection } = require("discord.js");
const { joinVoiceChannel, EndBehaviorType } = require("@discordjs/voice");
const { opus } = require('prism-media')
const fs = require('fs');

const streams = new Collection();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("join to channel"),
    async execute(message) {
        const channel = message.member.voice.channel;
        if(!channel) return message.reply('Join a VC first!');

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: false
        });

        const audioStream = connection.receiver.subscribe(message.user.id, {
            end: {
                behavior: EndBehaviorType.AfterSilence,
                duration: 15,
            }
        });

        const decoder = new opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
        const stream = audioStream.pipe(decoder).pipe(fs.createWriteStream("./test.pcm"));
        stream.on("finish", () => {
            console.log("finished")
            exec("ffmpeg -y -f s16le -ar 48k -ac 2 -i test.pcm test.mp3")
        });

        streams.set(message.user.id, stream);
    },
};
