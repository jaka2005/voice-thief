const { joinVoiceChannel, VoiceConnection } = require("@discordjs/voice");

let connection;

function newConnection(message) {
    const channel = message.member.voice.channel;
    if(!channel) return;

    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: false
    });

    return connection;
}

function getConnection() { return connection; }

function destroyConnection() {
    if (!connection) return;
    connection.destroy()
    connection = null
}

module.exports = {
    newConnection, getConnection, destroyConnection
}
