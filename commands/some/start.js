const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, EndBehaviorType, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");
const { stopStream } = require('../../streams.js');
const { getConnection } = require("../../connection");
const { newStream } = require('../../streams');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("start voice recording"),
    async execute(message) {
        const connection = getConnection();
        if (!connection) return message.reply("first use /join");

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: 'stop'
            }
        });
        connection.subscribe(player);

        const audioResource = createAudioResource("beep.mp3", { metadata: {
            title: 'A good song!',
        }});

        player.play(audioResource);
        
        message.reply("recording!");

        player.on(AudioPlayerStatus.Idle, () => {
            if (audioResource.ended) {
                console.log("start record")
                const audioStream = connection.receiver.subscribe(message.user.id, { mode: 'pcm' });
        
                // const decoder = new opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
                const outputStream = fs.createWriteStream("./test.pcm", { flags: 'a' });
                const stream = audioStream.pipe(outputStream);
                outputStream.on("data", console.log);

                // audioStream.on('data', (chunk) => {
                    
                // });
        
                stream.on("finish", () => {
                    connection.destroy();
                    console.log("finished");
                });
                
                newStream(message.user.id, stream);
            }
        });
    }
}