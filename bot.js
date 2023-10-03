const { Client, Events, GatewayIntentBits } = require("discord.js");

// TODO: move to env
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`${c.user.tag} is ready`)
});

client.login(token);
